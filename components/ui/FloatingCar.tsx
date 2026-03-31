'use client'

import { useEffect, useRef } from 'react'
import Image from 'next/image'

/**
 * A small F1 car that floats across the page on a gentle path.
 * Uses requestAnimationFrame for smooth animation — no React re-renders.
 */
export default function FloatingCar() {
  const carRef = useRef<HTMLDivElement>(null)
  const rafRef = useRef(0)

  useEffect(() => {
    const el = carRef.current
    if (!el) return

    const startTime = performance.now() / 1000

    const animate = () => {
      const t = performance.now() / 1000 - startTime

      // Gentle sinusoidal path across the viewport
      // Horizontal: slow sweep left to right and back (~30s period)
      // Vertical: slow drift up and down (~18s period)
      const vw = window.innerWidth
      const vh = window.innerHeight

      const x = vw * 0.1 + (vw * 0.7) * (0.5 + 0.5 * Math.sin(t * 0.21))
      const y = vh * 0.15 + (vh * 0.6) * (0.5 + 0.5 * Math.sin(t * 0.34))

      // Slight rotation based on horizontal movement direction
      const dx = Math.cos(t * 0.21) // derivative of sin
      const rotation = dx * -8 // tilt slightly in direction of travel

      el.style.transform = `translate(${x}px, ${y}px) rotate(${rotation}deg)`
      el.style.opacity = '0.12'

      rafRef.current = requestAnimationFrame(animate)
    }

    rafRef.current = requestAnimationFrame(animate)
    return () => cancelAnimationFrame(rafRef.current)
  }, [])

  return (
    <div
      ref={carRef}
      className="fixed pointer-events-none"
      style={{
        width: 220,
        height: 140,
        zIndex: 1,
        opacity: 0,
        willChange: 'transform',
      }}
    >
      <Image
        src="/images/f1-car.png"
        alt=""
        fill
        className="object-contain"
        style={{ filter: 'brightness(0.4) contrast(0.8)' }}
      />
    </div>
  )
}
