'use client'

import { useEffect, useRef, useCallback } from 'react'
import type { MotionValue } from 'framer-motion'
import {
  type DustParticle,
  type LetterTarget,
  spawnParticles,
  resetAssignment,
  updateParticles,
  settledFraction,
} from '@/lib/dustParticle'

interface DustCanvasProps {
  progress: MotionValue<number>
  trackRef: React.RefObject<SVGPathElement | null>
  pathLength: number
  letterTargets: LetterTarget[]
  width: number
  height: number
  isDark: boolean
  onShadowFormed: () => void
  /** When true the canvas fades out and stops */
  fading: boolean
}

const MAX_PARTICLES = 2400
const SPAWN_PER_SAMPLE = 8

export default function DustCanvas({
  progress,
  trackRef,
  pathLength,
  letterTargets,
  width,
  height,
  isDark,
  onShadowFormed,
  fading,
}: DustCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const particles = useRef<DustParticle[]>([])
  const phase = useRef<'spawning' | 'migrating' | 'shadow' | 'fading'>('spawning')
  const lastProgress = useRef(0)
  const startTime = useRef(0)
  const fadeOpacity = useRef(1)
  const calledShadowFormed = useRef(false)
  const rafId = useRef(0)

  // Reset when the component mounts
  useEffect(() => {
    particles.current = []
    phase.current = 'spawning'
    lastProgress.current = 0
    startTime.current = performance.now() / 1000
    fadeOpacity.current = 1
    calledShadowFormed.current = false
    resetAssignment()
  }, [])

  // Detect when external fading prop fires
  useEffect(() => {
    if (fading) phase.current = 'fading'
  }, [fading])

  const render = useCallback(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const now = performance.now() / 1000
    const time = now - startTime.current
    const dt = 1 / 60

    const p = progress.get()

    // ---- Phase transitions ----
    if (phase.current === 'spawning' && p >= 0.99) {
      phase.current = 'migrating'
    }
    if (phase.current === 'migrating') {
      const frac = settledFraction(particles.current)
      if (frac > 0.85 && !calledShadowFormed.current) {
        phase.current = 'shadow'
        calledShadowFormed.current = true
        onShadowFormed()
      }
    }

    // ---- Spawn particles during driving ----
    if (phase.current === 'spawning' && letterTargets.length > 0) {
      const delta = p - lastProgress.current
      if (delta > 0.001 && particles.current.length < MAX_PARTICLES) {
        const el = trackRef.current
        if (el && pathLength > 0) {
          // Spawn at the car's current position
          const eraseP = p
          const pt = el.getPointAtLength(eraseP * pathLength)
          const count = Math.min(
            SPAWN_PER_SAMPLE,
            MAX_PARTICLES - particles.current.length,
          )
          const newParticles = spawnParticles(pt.x, pt.y, count, letterTargets)
          particles.current.push(...newParticles)
          lastProgress.current = p
        }
      }
    }

    // ---- Update physics ----
    updateParticles(particles.current, dt, phase.current, time)

    // ---- Fade out ----
    if (phase.current === 'fading') {
      fadeOpacity.current = Math.max(0, fadeOpacity.current - dt * 2.5)
      if (fadeOpacity.current <= 0) return
    }

    // ---- Draw ----
    ctx.clearRect(0, 0, width, height)

    for (let i = 0; i < particles.current.length; i++) {
      const part = particles.current[i]
      if (!part.alive) continue

      // Sparkle: brief bright flash
      const sparkle = Math.sin(time * 10 + part.sparklePhase) > 0.85

      // Silver/white palette — clean bright tones that match the white letters
      const r = isDark ? (sparkle ? 255 : 200 + Math.sin(part.sparklePhase) * 40) : 40
      const g = isDark ? (sparkle ? 255 : 200 + Math.sin(part.sparklePhase * 1.3) * 40) : 40
      const b = isDark ? (sparkle ? 255 : 215 + Math.sin(part.sparklePhase * 0.7) * 40) : 50

      const opacity = sparkle
        ? Math.min(1, part.baseOpacity + 0.4)
        : part.baseOpacity
      const size = sparkle ? part.size * 1.3 : part.size

      ctx.globalAlpha = fadeOpacity.current * opacity
      ctx.fillStyle = `rgb(${r}, ${g}, ${b})`
      ctx.beginPath()
      ctx.arc(part.x, part.y, size, 0, Math.PI * 2)
      ctx.fill()

      // Subtle warm glow (not a big halo — just a soft edge)
      if (sparkle) {
        ctx.globalAlpha = fadeOpacity.current * opacity * 0.15
        ctx.beginPath()
        ctx.arc(part.x, part.y, size * 2, 0, Math.PI * 2)
        ctx.fill()
      }
    }

    ctx.globalAlpha = 1

    rafId.current = requestAnimationFrame(render)
  }, [progress, trackRef, pathLength, letterTargets, width, height, isDark, onShadowFormed])

  // Start/stop the animation loop
  useEffect(() => {
    rafId.current = requestAnimationFrame(render)
    return () => cancelAnimationFrame(rafId.current)
  }, [render])

  return (
    <canvas
      ref={canvasRef}
      width={width}
      height={height}
      className="absolute inset-0 pointer-events-none"
      style={{ zIndex: 5 }}
    />
  )
}
