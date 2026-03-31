'use client'

import { useState, useEffect, useRef, useMemo } from 'react'
import { motion, animate, useMotionValue, useTransform, AnimatePresence, useReducedMotion } from 'framer-motion'
import Image from 'next/image'
import PhysicsName from '@/components/ui/PhysicsName'
import DustCanvas from '@/components/ui/DustCanvas'
import ThemeToggle from '@/components/ui/ThemeToggle'
import { useStore } from '@/store/useStore'
import { computePretextLayout, measureCharacters } from '@/lib/pretext'
import type { LetterTarget } from '@/lib/dustParticle'

const DRIVE_DURATION = 5
const CAR_W = 520
const CAR_H = 330

interface CarLandingProps {
  onEnter: () => void
}

// Wide sweeping circuit: top-center → right → bottom → left → center arrival
function buildCircuit(w: number, h: number): string {
  const cx = w / 2
  return [
    `M ${cx} ${h * 0.08}`,
    `C ${w * 0.82} ${h * 0.04} ${w * 0.95} ${h * 0.25} ${w * 0.90} ${h * 0.42}`,
    `C ${w * 0.85} ${h * 0.59} ${w * 0.72} ${h * 0.74} ${w * 0.52} ${h * 0.78}`,
    `C ${w * 0.32} ${h * 0.82} ${w * 0.16} ${h * 0.72} ${w * 0.13} ${h * 0.55}`,
    `C ${w * 0.10} ${h * 0.38} ${w * 0.25} ${h * 0.32} ${cx} ${h * 0.48}`,
  ].join(' ')
}

export default function CarLanding({ onEnter }: CarLandingProps) {
  const [isExiting, setIsExiting] = useState(false)
  const [isSettled, setIsSettled] = useState(false)
  const [shadowFormed, setShadowFormed] = useState(false)
  const [isHovering, setIsHovering] = useState(false)
  const [size, setSize] = useState({ w: 1440, h: 900 })
  const [carBounds, setCarBounds] = useState<{ x: number; y: number; width: number; height: number } | undefined>()
  const trackRef = useRef<SVGPathElement>(null)
  const pathLenRef = useRef(2000)
  const settledCarRef = useRef<HTMLDivElement>(null)
  const progress = useMotionValue(0)
  const theme = useStore(s => s.theme)
  const isDark = theme === 'dark'
  const shouldReduceMotion = useReducedMotion()

  const circuit = buildCircuit(size.w, size.h)

  // ---- Lift letter-target computation so DustCanvas + PhysicsName share it ----
  const letterTargets: LetterTarget[] = useMemo(() => {
    if (size.w === 0 || size.h === 0) return []
    const name = 'AARYA PATEL'
    const isMobile = size.w < 768
    const letterSize = isMobile ? 40 : 100
    const font = isMobile ? '700 40px "Courier New"' : '700 100px "Courier New"'
    const lineHeight = isMobile ? 64 : 120

    const { lines } = computePretextLayout({
      text: name,
      font,
      lineHeight,
      maxWidth: isMobile ? size.w * 0.52 : size.w * 0.9,
      fit: isMobile ? 'container' : 'balance',
    })

    const targets: LetterTarget[] = []
    const startY = size.h * (isMobile ? 0.14 : 0.1)

    lines.forEach((line, lineIndex) => {
      const charWidths = measureCharacters(line.text, font)
      let cursorX = size.w / 2 - line.width / 2
      Array.from(line.text).forEach((char, ci) => {
        const w = charWidths[ci] ?? letterSize
        if (char !== ' ') {
          targets.push({ x: cursorX, y: startY + lineIndex * lineHeight, char, width: w, height: letterSize })
        }
        cursorX += w
      })
    })
    return targets
  }, [size.w, size.h])

  // ---- Derived motion values ----
  const carX = useTransform(progress, v => {
    if (!trackRef.current) return size.w / 2 - CAR_W / 2
    return trackRef.current.getPointAtLength(v * pathLenRef.current).x - CAR_W / 2
  })
  const carY = useTransform(progress, v => {
    if (!trackRef.current) return size.h * 0.08 - CAR_H / 2
    return trackRef.current.getPointAtLength(v * pathLenRef.current).y - CAR_H / 2
  })
  const carScale = useTransform(progress, [0, 0.25, 0.7, 1], [0.05, 0.12, 0.65, 1.0])

  // Eraser trails just behind the car — track dissolves where the car has been
  const eraserDash = useTransform(progress, v => {
    const len = pathLenRef.current
    return `${v * len * 0.92} ${len}`
  })

  useEffect(() => {
    const onResize = () => setSize({ w: window.innerWidth, h: window.innerHeight })
    onResize()
    window.addEventListener('resize', onResize)
    return () => window.removeEventListener('resize', onResize)
  }, [])

  useEffect(() => {
    if (trackRef.current) {
      pathLenRef.current = trackRef.current.getTotalLength()
    }
  }, [circuit])

  useEffect(() => {
    if (shouldReduceMotion) {
      progress.set(1)
      setIsSettled(true)
      setShadowFormed(true)
      return
    }
    const t = setTimeout(() => {
      animate(progress, 1, {
        duration: DRIVE_DURATION,
        ease: [0.25, 0.0, 0.1, 1.0],
        onComplete: () => {
          setIsSettled(true)
          setTimeout(() => {
            if (settledCarRef.current) {
              const rect = settledCarRef.current.getBoundingClientRect()
              setCarBounds({ x: rect.left, y: rect.top, width: rect.width, height: rect.height })
            }
          }, 400)
        },
      })
    }, 400)
    return () => clearTimeout(t)
  }, [shouldReduceMotion, progress])

  const handleClick = () => {
    if (!isSettled) return
    setIsExiting(true)
    setTimeout(onEnter, 1200)
  }

  const trackColor = isDark ? 'rgba(255,255,255,0.12)' : 'rgba(0,0,0,0.12)'
  const trackEdgeColor = isDark ? 'rgba(255,255,255,0.25)' : 'rgba(0,0,0,0.25)'
  const dashColor  = isDark ? 'rgba(255,255,255,0.35)' : 'rgba(0,0,0,0.35)'

  return (
    <motion.div
      className="relative w-full h-screen overflow-hidden cursor-none"
      style={{ backgroundColor: 'var(--bg-primary)' }}
      animate={{ opacity: isExiting ? 0 : 1 }}
      transition={{ duration: 0.8 }}
      onClick={handleClick}
      role="button"
      tabIndex={0}
      aria-label="Enter the site"
      onKeyDown={(e) => {
        if (!isSettled || e.target !== e.currentTarget) return
        if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); handleClick() }
      }}
    >
      {/* Theme Toggle */}
      <div className="absolute top-6 right-6 z-30" onClick={e => e.stopPropagation()}>
        <ThemeToggle />
      </div>

      {/* Circuit SVG */}
      <svg
        className="absolute inset-0 pointer-events-none"
        width={size.w}
        height={size.h}
      >
        {/* Track edge lines */}
        <path
          d={circuit}
          stroke={trackEdgeColor}
          strokeWidth="42"
          strokeLinecap="round"
          fill="none"
        />
        {/* Track surface */}
        <path
          ref={trackRef}
          d={circuit}
          stroke={trackColor}
          strokeWidth="34"
          strokeLinecap="round"
          fill="none"
        />
        {/* Dashed center line */}
        <path
          d={circuit}
          stroke={dashColor}
          strokeWidth="2"
          strokeDasharray="16 12"
          strokeLinecap="round"
          fill="none"
        />
        {/* Eraser: dissolves track behind the car */}
        <motion.path
          d={circuit}
          stroke="var(--bg-primary)"
          strokeWidth="48"
          strokeLinecap="round"
          fill="none"
          style={{ strokeDasharray: eraserDash }}
        />
      </svg>

      {/* Dust particle canvas — spawns from track, migrates to letter positions */}
      {!shouldReduceMotion && letterTargets.length > 0 && !isExiting && (
        <DustCanvas
          progress={progress}
          trackRef={trackRef}
          pathLength={pathLenRef.current}
          letterTargets={letterTargets}
          width={size.w}
          height={size.h}
          isDark={isDark}
          onShadowFormed={() => setShadowFormed(true)}
          fading={shadowFormed}
        />
      )}

      {/* Driving car */}
      {!isSettled && (
        <motion.div
          className="absolute top-0 left-0 pointer-events-none"
          style={{
            x: carX,
            y: carY,
            scale: carScale,
            width: CAR_W,
            height: CAR_H,
            willChange: 'transform',
          }}
        >
          <Image src="/images/f1-car.png" alt="" fill className="object-contain" priority />
        </motion.div>
      )}

      {/* Settled: large centered car + click prompt */}
      <AnimatePresence>
        {isSettled && (
          <motion.div
            initial={{ opacity: 0, scale: 0.92 }}
            animate={{
              opacity: 1,
              scale: isExiting ? 8 : isHovering ? 1.03 : 1,
            }}
            exit={{ opacity: 0 }}
            transition={
              isExiting
                ? { duration: 1.2, ease: [0.4, 0, 0.2, 1] }
                : { duration: 0.35 }
            }
            className="absolute inset-0 flex flex-col items-center justify-center z-10"
            onMouseEnter={() => setIsHovering(true)}
            onMouseLeave={() => setIsHovering(false)}
          >
            <div ref={settledCarRef} className="relative w-[580px] h-[370px] md:w-[740px] md:h-[460px]">
              <Image src="/images/f1-car.png" alt="Formula One Car" fill className="object-contain" priority />
            </div>
            {!isExiting && (
              <motion.p
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: [0.5, 1, 0.5], y: 0 }}
                transition={{
                  opacity: { duration: 1.5, repeat: Infinity, delay: 0.25 },
                  y: { duration: 0.35, delay: 0.15 },
                }}
                className={`mt-5 text-lg md:text-xl font-mono tracking-[0.35em] ${isDark ? 'text-white' : 'text-black'}`}
              >
                CLICK TO ENTER
              </motion.p>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Name letters — mount once dust shadow has formed */}
      {shadowFormed && !isExiting && (
        <PhysicsName carBounds={carBounds} letterTargets={letterTargets} />
      )}

      {/* Exit fade overlay */}
      {isExiting && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          className="absolute inset-0 z-20 pointer-events-none"
          style={{ backgroundColor: 'var(--bg-primary)' }}
        />
      )}
    </motion.div>
  )
}
