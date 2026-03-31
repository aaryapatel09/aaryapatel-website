'use client'

import { useState, useEffect, useRef } from 'react'
import { motion, animate, useMotionValue, useTransform, AnimatePresence, useReducedMotion } from 'framer-motion'
import Image from 'next/image'
import ThemeToggle from '@/components/ui/ThemeToggle'
import { useStore } from '@/store/useStore'

const DRIVE_DURATION = 4.5

interface CarLandingProps {
  onEnter: () => void
}

// Open path: starts upper-center (far/small), sweeps clockwise right then down, arrives center (close/large)
function buildCircuit(w: number, h: number): string {
  const cx = w / 2
  return [
    `M ${cx} ${h * 0.11}`,
    `C ${w * 0.77} ${h * 0.07} ${w * 0.93} ${h * 0.21} ${w * 0.91} ${h * 0.39}`,
    `C ${w * 0.89} ${h * 0.57} ${w * 0.76} ${h * 0.70} ${w * 0.62} ${h * 0.76}`,
    `C ${w * 0.55} ${h * 0.80} ${w * 0.52} ${h * 0.82} ${cx} ${h * 0.50}`,
  ].join(' ')
}

export default function CarLanding({ onEnter }: CarLandingProps) {
  const [isExiting, setIsExiting] = useState(false)
  const [isSettled, setIsSettled] = useState(false)
  const [isHovering, setIsHovering] = useState(false)
  const [size, setSize] = useState({ w: 1440, h: 900 })
  const trackRef = useRef<SVGPathElement>(null)
  const [pathLen, setPathLen] = useState(1400)
  const progress = useMotionValue(0)
  const theme = useStore(s => s.theme)
  const isDark = theme === 'dark'
  const shouldReduceMotion = useReducedMotion()

  const circuit = buildCircuit(size.w, size.h)

  // All motion derived from a single progress value (0 → 1)
  const offsetDist = useTransform(progress, v => `${v * 100}%`)
  const carScale = useTransform(progress, [0, 0.3, 0.75, 1], [0.06, 0.15, 0.72, 1.0])
  // Eraser draws from path start to current car position, covering the track behind it
  const eraserDash = useTransform(progress, v => `${v * pathLen * 1.05} ${pathLen}`)

  useEffect(() => {
    const onResize = () => setSize({ w: window.innerWidth, h: window.innerHeight })
    onResize()
    window.addEventListener('resize', onResize)
    return () => window.removeEventListener('resize', onResize)
  }, [])

  // Measure true path length once the SVG renders
  useEffect(() => {
    if (trackRef.current) {
      setPathLen(trackRef.current.getTotalLength())
    }
  }, [circuit])

  useEffect(() => {
    if (shouldReduceMotion) {
      progress.set(1)
      setIsSettled(true)
      return
    }
    const t = setTimeout(() => {
      animate(progress, 1, {
        duration: DRIVE_DURATION,
        ease: [0.12, 0.0, 0.28, 1.0], // slow at back, accelerates, eases into arrival
        onComplete: () => setIsSettled(true),
      })
    }, 400)
    return () => clearTimeout(t)
  }, [shouldReduceMotion, progress])

  const handleClick = () => {
    if (!isSettled) return
    setIsExiting(true)
    setTimeout(onEnter, 800)
  }

  const trackColor = isDark ? 'rgba(255,255,255,0.18)' : 'rgba(0,0,0,0.18)'
  const dashColor  = isDark ? 'rgba(255,255,255,0.40)' : 'rgba(0,0,0,0.40)'

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

      {/* Circuit SVG — track surface + dashed center line + eraser overlay */}
      <svg
        className="absolute inset-0 pointer-events-none"
        width={size.w}
        height={size.h}
      >
        {/* Track surface */}
        <path
          ref={trackRef}
          d={circuit}
          stroke={trackColor}
          strokeWidth="28"
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
        {/* Eraser: same path, bg color, grows to cover the track behind the car */}
        <motion.path
          d={circuit}
          stroke="var(--bg-primary)"
          strokeWidth="34"
          strokeLinecap="round"
          fill="none"
          style={{ strokeDasharray: eraserDash }}
        />
      </svg>

      {/* F1 car following the circuit via CSS offset-path */}
      {!isSettled && (
        <motion.div
          className="absolute top-0 left-0 pointer-events-none"
          style={{
            offsetPath: `path('${circuit}')`,
            offsetDistance: offsetDist,
            offsetRotate: 'auto',
            scale: carScale,
            width: 520,
            height: 320,
            willChange: 'transform',
          }}
        >
          <Image
            src="/images/f1-car.png"
            alt=""
            fill
            className="object-contain"
            priority
          />
        </motion.div>
      )}

      {/* Settled: large centered car + click prompt */}
      <AnimatePresence>
        {isSettled && !isExiting && (
          <motion.div
            initial={{ opacity: 0, scale: 0.92 }}
            animate={{ opacity: 1, scale: isHovering ? 1.03 : 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.35 }}
            className="absolute inset-0 flex flex-col items-center justify-center z-10"
            onMouseEnter={() => setIsHovering(true)}
            onMouseLeave={() => setIsHovering(false)}
          >
            <div className="relative w-[580px] h-[370px] md:w-[740px] md:h-[460px]">
              <Image
                src="/images/f1-car.png"
                alt="Formula One Car"
                fill
                className="object-contain"
                priority
              />
            </div>
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
          </motion.div>
        )}
      </AnimatePresence>

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
