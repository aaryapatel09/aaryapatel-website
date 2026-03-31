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
  size: number        // 1–3 px
  baseOpacity: number // 0.3–0.7
  sparklePhase: number
  phase: 'dissolve' | 'migrate' | 'settled'
  age: number         // seconds since spawn
  alive: boolean
}

let _nextAssign = 0

/** Spawn `count` particles at (x, y) and assign them round-robin to letter targets. */
export function spawnParticles(
  x: number,
  y: number,
  count: number,
  targets: LetterTarget[],
): DustParticle[] {
  const out: DustParticle[] = []
  for (let i = 0; i < count; i++) {
    const angle = Math.random() * Math.PI * 2
    const speed = 20 + Math.random() * 60
    const ti = _nextAssign % targets.length
    _nextAssign++
    const t = targets[ti]
    // Randomise within the letter's bounding box so the cluster looks like the glyph
    const tx = t.x + Math.random() * t.width
    const ty = t.y + Math.random() * t.height
    out.push({
      x: x + (Math.random() - 0.5) * 6,
      y: y + (Math.random() - 0.5) * 6,
      vx: Math.cos(angle) * speed,
      vy: Math.sin(angle) * speed,
      targetX: tx,
      targetY: ty,
      targetLetterIndex: ti,
      size: 1 + Math.random() * 2,
      baseOpacity: 0.3 + Math.random() * 0.4,
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
      // Lerp toward target with slight spiral
      const dx = p.targetX - p.x
      const dy = p.targetY - p.y
      const dist = Math.sqrt(dx * dx + dy * dy)
      const lerpSpeed = 0.045 // per frame ≈ 2.7/s at 60fps
      p.x += dx * lerpSpeed
      p.y += dy * lerpSpeed
      // Subtle spiral
      p.x += Math.sin(time * 4 + p.sparklePhase) * 0.6
      p.y += Math.cos(time * 4 + p.sparklePhase) * 0.6
      // Snap when close
      if (dist < 2) {
        p.x = p.targetX
        p.y = p.targetY
        p.phase = 'settled'
      }
    } else if (globalPhase === 'shadow' || globalPhase === 'fading') {
      // Subtle jitter around target
      p.x = p.targetX + Math.sin(time * 3 + p.sparklePhase) * 0.4
      p.y = p.targetY + Math.cos(time * 3 + p.sparklePhase) * 0.4
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
