// Pure logic module — no React. Manages particle data + physics for the
// track-dissolution dust effect on the landing page.

export interface LetterTarget {
  x: number
  y: number
  char: string
  width: number
  height: number
}

export interface DustParticle {
  x: number
  y: number
  vx: number
  vy: number
  targetX: number
  targetY: number
  targetLetterIndex: number
  size: number        // 0.4–1.4 px (tiny specks)
  baseOpacity: number // 0.4–0.9
  sparklePhase: number
  phase: 'dissolve' | 'migrate' | 'settled'
  age: number         // seconds since spawn
  alive: boolean
}

/** Precomputed glyph mask — list of valid (dx, dy) offsets within the letter shape. */
export type GlyphMask = Array<{ dx: number; dy: number }>

/**
 * Build pixel masks for each letter target using an offscreen canvas.
 * Particles will sample from these masks instead of random bounding-box positions,
 * so the settled dust actually looks like letters, not rectangles.
 */
export function buildGlyphMasks(
  targets: LetterTarget[],
  font: string,
): GlyphMask[] {
  if (typeof document === 'undefined') return targets.map(() => [])

  const canvas = document.createElement('canvas')
  const ctx = canvas.getContext('2d')
  if (!ctx) return targets.map(() => [])

  return targets.map((t) => {
    const w = Math.ceil(t.width)
    const h = Math.ceil(t.height)
    canvas.width = w
    canvas.height = h
    ctx.clearRect(0, 0, w, h)
    ctx.font = font
    ctx.fillStyle = 'white'
    ctx.textBaseline = 'top'
    ctx.fillText(t.char, 0, 0)

    const imageData = ctx.getImageData(0, 0, w, h)
    const mask: GlyphMask = []
    // Sample every 2nd pixel for performance (still dense enough)
    for (let py = 0; py < h; py += 2) {
      for (let px = 0; px < w; px += 2) {
        const alpha = imageData.data[(py * w + px) * 4 + 3]
        if (alpha > 80) {
          mask.push({ dx: px, dy: py })
        }
      }
    }
    // Fallback: if mask is empty (e.g. weird char), fill with random points
    if (mask.length === 0) {
      for (let i = 0; i < 20; i++) {
        mask.push({ dx: Math.random() * w, dy: Math.random() * h })
      }
    }
    return mask
  })
}

let _nextAssign = 0

/** Spawn `count` particles at (x, y) and assign them round-robin to letter targets. */
export function spawnParticles(
  x: number,
  y: number,
  count: number,
  targets: LetterTarget[],
  glyphMasks?: GlyphMask[],
): DustParticle[] {
  const out: DustParticle[] = []
  for (let i = 0; i < count; i++) {
    const angle = Math.random() * Math.PI * 2
    const speed = 30 + Math.random() * 80
    const ti = _nextAssign % targets.length
    _nextAssign++
    const t = targets[ti]

    // Sample target position from glyph mask (letter shape) if available,
    // otherwise fall back to random within bounding box
    let tx: number
    let ty: number
    const mask = glyphMasks?.[ti]
    if (mask && mask.length > 0) {
      const sample = mask[Math.floor(Math.random() * mask.length)]
      tx = t.x + sample.dx
      ty = t.y + sample.dy
    } else {
      tx = t.x + Math.random() * t.width
      ty = t.y + Math.random() * t.height
    }

    out.push({
      x: x + (Math.random() - 0.5) * 30,
      y: y + (Math.random() - 0.5) * 30,
      vx: Math.cos(angle) * speed,
      vy: Math.sin(angle) * speed,
      targetX: tx,
      targetY: ty,
      targetLetterIndex: ti,
      size: 0.4 + Math.random() * 1.0,
      baseOpacity: 0.4 + Math.random() * 0.5,
      sparklePhase: Math.random() * Math.PI * 2,
      phase: 'dissolve',
      age: 0,
      alive: true,
    })
  }
  return out
}

/** Reset the round-robin counter (call when a new animation starts). */
export function resetAssignment() {
  _nextAssign = 0
}

/** Mutate particles in-place for one frame. */
export function updateParticles(
  particles: DustParticle[],
  dt: number,
  globalPhase: 'spawning' | 'migrating' | 'shadow' | 'fading',
  time: number,
) {
  const clampedDt = Math.min(dt, 0.05) // cap to avoid explosion after tab switch

  for (let i = 0; i < particles.length; i++) {
    const p = particles[i]
    if (!p.alive) continue
    p.age += clampedDt

    if (globalPhase === 'spawning') {
      // Dissolve: drift outward with friction
      p.vx *= 0.94
      p.vy *= 0.94
      p.x += p.vx * clampedDt
      p.y += p.vy * clampedDt
    } else if (globalPhase === 'migrating' || p.phase === 'migrate') {
      p.phase = 'migrate'
      const dx = p.targetX - p.x
      const dy = p.targetY - p.y
      const dist = Math.sqrt(dx * dx + dy * dy)
      // Faster lerp so particles converge in ~1.5s
      const lerpSpeed = 0.06
      p.x += dx * lerpSpeed
      p.y += dy * lerpSpeed
      // Spiral that fades out as particle approaches target — prevents blocking settle
      const spiralStrength = Math.min(dist * 0.005, 0.5)
      p.x += Math.sin(time * 4 + p.sparklePhase) * spiralStrength
      p.y += Math.cos(time * 4 + p.sparklePhase) * spiralStrength
      // Snap when close
      if (dist < 4) {
        p.x = p.targetX
        p.y = p.targetY
        p.phase = 'settled'
      }
    } else if (globalPhase === 'shadow' || globalPhase === 'fading') {
      // Subtle jitter around target
      p.x = p.targetX + Math.sin(time * 3 + p.sparklePhase) * 0.3
      p.y = p.targetY + Math.cos(time * 3 + p.sparklePhase) * 0.3
    }
  }
}

/** Returns the fraction of particles that have settled at their target. */
export function settledFraction(particles: DustParticle[]): number {
  let alive = 0
  let settled = 0
  for (let i = 0; i < particles.length; i++) {
    if (!particles[i].alive) continue
    alive++
    if (particles[i].phase === 'settled') settled++
  }
  return alive === 0 ? 0 : settled / alive
}
