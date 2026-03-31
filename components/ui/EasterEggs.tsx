'use client'

import { useEffect, useRef, useState, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

/**
 * Global Easter Eggs — mounts once in the root layout.
 *
 * 1. Konami Code (↑↑↓↓←→←→BA) → full-screen F1 race animation
 * 2. Typing "f1" anywhere → brief speed-lines flash
 * 3. Clicking the page 10x rapidly → confetti burst
 * 4. Idle for 30s → sleeping F1 car animation
 */

const KONAMI = ['ArrowUp','ArrowUp','ArrowDown','ArrowDown','ArrowLeft','ArrowRight','ArrowLeft','ArrowRight','b','a']

export default function EasterEggs() {
  const [showKonami, setShowKonami] = useState(false)
  const [showSpeedLines, setShowSpeedLines] = useState(false)
  const [showConfetti, setShowConfetti] = useState(false)
  const [showIdle, setShowIdle] = useState(false)

  const konamiIdx = useRef(0)
  const typedKeys = useRef('')
  const clickTimes = useRef<number[]>([])
  const idleTimer = useRef<ReturnType<typeof setTimeout>>()

  const resetIdle = useCallback(() => {
    setShowIdle(false)
    clearTimeout(idleTimer.current)
    idleTimer.current = setTimeout(() => setShowIdle(true), 60000) // 60s idle
  }, [])

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      resetIdle()

      // Konami code
      if (e.key === KONAMI[konamiIdx.current]) {
        konamiIdx.current++
        if (konamiIdx.current === KONAMI.length) {
          konamiIdx.current = 0
          setShowKonami(true)
          setTimeout(() => setShowKonami(false), 4000)
        }
      } else {
        konamiIdx.current = e.key === KONAMI[0] ? 1 : 0
      }

      // Typing "f1"
      typedKeys.current += e.key.toLowerCase()
      if (typedKeys.current.length > 10) typedKeys.current = typedKeys.current.slice(-10)
      if (typedKeys.current.endsWith('f1')) {
        setShowSpeedLines(true)
        setTimeout(() => setShowSpeedLines(false), 800)
      }
    }

    const handleClick = () => {
      resetIdle()
      const now = Date.now()
      clickTimes.current.push(now)
      // Keep last 10 clicks
      clickTimes.current = clickTimes.current.filter(t => now - t < 3000)
      if (clickTimes.current.length >= 10) {
        clickTimes.current = []
        setShowConfetti(true)
        setTimeout(() => setShowConfetti(false), 2500)
      }
    }

    const handleMove = () => resetIdle()

    window.addEventListener('keydown', handleKey)
    window.addEventListener('click', handleClick)
    window.addEventListener('mousemove', handleMove)
    resetIdle()

    return () => {
      window.removeEventListener('keydown', handleKey)
      window.removeEventListener('click', handleClick)
      window.removeEventListener('mousemove', handleMove)
      clearTimeout(idleTimer.current)
    }
  }, [resetIdle])

  return (
    <>
      {/* Easter Egg 1: Konami Code — F1 car races across the screen */}
      <AnimatePresence>
        {showKonami && (
          <motion.div
            className="fixed inset-0 z-[9999] pointer-events-none overflow-hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            {/* Flashing lights */}
            <motion.div
              className="absolute inset-0"
              animate={{
                backgroundColor: ['rgba(225,6,0,0.1)', 'rgba(0,0,0,0)', 'rgba(225,6,0,0.1)', 'rgba(0,0,0,0)'],
              }}
              transition={{ duration: 0.3, repeat: 6 }}
            />
            {/* Racing car zooms across */}
            <motion.div
              className="absolute top-1/2 -translate-y-1/2"
              initial={{ x: '-200px' }}
              animate={{ x: 'calc(100vw + 200px)' }}
              transition={{ duration: 1.5, ease: [0.2, 0, 0.3, 1] }}
            >
              <div className="text-6xl">🏎️</div>
            </motion.div>
            {/* Second car following */}
            <motion.div
              className="absolute top-[55%] -translate-y-1/2"
              initial={{ x: '-300px' }}
              animate={{ x: 'calc(100vw + 300px)' }}
              transition={{ duration: 1.8, ease: [0.2, 0, 0.3, 1], delay: 0.3 }}
            >
              <div className="text-5xl">🏎️</div>
            </motion.div>
            {/* "KONAMI!" text */}
            <motion.div
              className="absolute inset-0 flex items-center justify-center"
              initial={{ scale: 0, rotate: -30 }}
              animate={{ scale: [0, 1.3, 1], rotate: [-30, 5, 0] }}
              transition={{ delay: 0.5, duration: 0.6, type: 'spring' }}
            >
              <span className="text-5xl md:text-7xl font-bold text-[#e10600] font-mono tracking-widest drop-shadow-[0_0_30px_rgba(225,6,0,0.8)]">
                KONAMI!
              </span>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Easter Egg 2: Type "f1" — speed lines flash */}
      <AnimatePresence>
        {showSpeedLines && (
          <motion.div
            className="fixed inset-0 z-[9998] pointer-events-none overflow-hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.15 }}
          >
            {[...Array(12)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute bg-white/20"
                style={{
                  top: `${8 + i * 7.5}%`,
                  height: '2px',
                  left: 0,
                  right: 0,
                }}
                initial={{ scaleX: 0, originX: Math.random() > 0.5 ? 0 : 1 }}
                animate={{ scaleX: [0, 1, 0] }}
                transition={{ duration: 0.5, delay: i * 0.03 }}
              />
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Easter Egg 3: 10 rapid clicks — confetti burst */}
      <AnimatePresence>
        {showConfetti && (
          <motion.div
            className="fixed inset-0 z-[9998] pointer-events-none"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            {[...Array(40)].map((_, i) => {
              const colors = ['#e10600', '#00ff64', '#ffffff', '#ffd700', '#ff69b4', '#00bfff']
              return (
                <motion.div
                  key={i}
                  className="absolute w-2 h-2 rounded-full"
                  style={{
                    backgroundColor: colors[i % colors.length],
                    left: '50%',
                    top: '50%',
                  }}
                  initial={{ x: 0, y: 0, scale: 1 }}
                  animate={{
                    x: (Math.random() - 0.5) * window.innerWidth * 0.8,
                    y: (Math.random() - 0.5) * window.innerHeight * 0.8,
                    scale: 0,
                    rotate: Math.random() * 720,
                  }}
                  transition={{
                    duration: 1.5 + Math.random(),
                    ease: 'easeOut',
                  }}
                />
              )
            })}
            <motion.p
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-2xl font-mono font-bold"
              initial={{ scale: 0 }}
              animate={{ scale: [0, 1.2, 1] }}
              style={{ color: 'var(--text-primary)' }}
            >
              🎉 Nice clicking!
            </motion.p>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Easter Egg 4: Idle for 60s — sleeping F1 car */}
      <AnimatePresence>
        {showIdle && (
          <motion.div
            className="fixed bottom-8 right-8 z-[9997] pointer-events-none"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
          >
            <motion.div
              animate={{ y: [0, -5, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <span className="text-4xl">🏎️</span>
              <motion.span
                className="absolute -top-4 -right-2 text-lg"
                animate={{ opacity: [0, 1, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                💤
              </motion.span>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
