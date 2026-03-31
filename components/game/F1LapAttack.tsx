'use client'

import { useEffect, useState, useRef, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useStore } from '@/store/useStore'
import {
  loadLeaderboard,
  saveToLeaderboard,
  type LeaderboardEntry,
} from '@/lib/gameTrack'

/**
 * F1 Lights Out — Reaction Time Challenge
 *
 * 5 red lights appear one by one (like a real F1 start).
 * All lights go out at a random delay — click/tap as fast as you can.
 * Measures reaction time in milliseconds.
 */

type Phase = 'idle' | 'building' | 'waiting' | 'go' | 'result' | 'jumped'

export default function F1LapAttack() {
  const [phase, setPhase] = useState<Phase>('idle')
  const [litCount, setLitCount] = useState(0)
  const [reactionTime, setReactionTime] = useState<number | null>(null)
  const [bestTime, setBestTime] = useState<number | null>(null)
  const [showNameEntry, setShowNameEntry] = useState(false)
  const [playerName, setPlayerName] = useState('')
  const [leaderboard, setLeaderboard] = useState<LeaderboardEntry[]>([])
  const [attempts, setAttempts] = useState(0)

  const goTimeRef = useRef(0)
  const buildTimerRef = useRef<ReturnType<typeof setTimeout>>()
  const goTimerRef = useRef<ReturnType<typeof setTimeout>>()

  const theme = useStore(s => s.theme)
  const isDark = theme === 'dark'

  useEffect(() => {
    setLeaderboard(loadLeaderboard())
  }, [])

  const cleanup = useCallback(() => {
    clearTimeout(buildTimerRef.current)
    clearTimeout(goTimerRef.current)
  }, [])

  const startSequence = useCallback(() => {
    cleanup()
    setPhase('building')
    setLitCount(0)
    setReactionTime(null)
    setShowNameEntry(false)

    // Light up 5 lights one by one (800ms apart, like real F1)
    let count = 0
    const lightUp = () => {
      count++
      setLitCount(count)
      if (count < 5) {
        buildTimerRef.current = setTimeout(lightUp, 800)
      } else {
        // All 5 lit — wait random 1-4s then go dark
        setPhase('waiting')
        const delay = 1000 + Math.random() * 3000
        goTimerRef.current = setTimeout(() => {
          setLitCount(0)
          setPhase('go')
          goTimeRef.current = performance.now()
        }, delay)
      }
    }
    buildTimerRef.current = setTimeout(lightUp, 600)
  }, [cleanup])

  const handleClick = useCallback(() => {
    if (phase === 'idle') {
      startSequence()
      return
    }

    if (phase === 'result' || phase === 'jumped') {
      startSequence()
      return
    }

    // Jump start — clicked before lights went out
    if (phase === 'building' || phase === 'waiting') {
      cleanup()
      setPhase('jumped')
      setLitCount(0)
      return
    }

    // Valid reaction
    if (phase === 'go') {
      const rt = performance.now() - goTimeRef.current
      const rtRounded = Math.round(rt)
      setReactionTime(rtRounded)
      setPhase('result')
      setAttempts(a => a + 1)

      if (bestTime === null || rtRounded < bestTime) {
        setBestTime(rtRounded)
        // Only offer name entry for genuinely good times (under 500ms)
        if (rtRounded < 500) {
          setShowNameEntry(true)
        }
      }
    }
  }, [phase, startSequence, cleanup, bestTime])

  const handleSubmitScore = () => {
    if (!reactionTime || !playerName.trim()) return
    const lb = saveToLeaderboard({
      name: playerName.trim().slice(0, 15),
      time: reactionTime,
      date: new Date().toISOString().slice(0, 10),
    })
    setLeaderboard(lb)
    setShowNameEntry(false)
  }

  // Keyboard support
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === ' ' || e.key === 'Enter') {
        // Don't trigger if typing in the name input
        if (showNameEntry) return
        e.preventDefault()
        handleClick()
      }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [handleClick, showNameEntry])

  useEffect(() => cleanup, [cleanup])

  const getTimeColor = (ms: number) => {
    if (ms < 200) return '#00ff64'  // Incredible
    if (ms < 250) return '#88ff00'  // Great
    if (ms < 350) return '#ffcc00'  // Good
    if (ms < 500) return '#ff8800'  // OK
    return '#e10600'                // Slow
  }

  const getTimeLabel = (ms: number) => {
    if (ms < 150) return 'SUPERHUMAN!'
    if (ms < 200) return 'F1 DRIVER LEVEL!'
    if (ms < 250) return 'INCREDIBLE!'
    if (ms < 300) return 'GREAT REFLEXES!'
    if (ms < 350) return 'NICE!'
    if (ms < 500) return 'NOT BAD'
    return 'KEEP TRYING'
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-100px' }}
      transition={{ duration: 0.6 }}
      className="w-full max-w-[900px] mx-auto"
    >
      {/* Header */}
      <div className="text-center mb-6">
        <h2
          className="text-3xl md:text-5xl font-bold mb-2 tracking-tight"
          style={{ color: 'var(--text-primary)' }}
        >
          LIGHTS OUT
        </h2>
        <p className="font-mono text-sm" style={{ color: 'var(--text-secondary)' }}>
          Wait for all 5 lights to go out, then click as fast as you can!
        </p>
      </div>

      <div className="flex flex-col lg:flex-row gap-4">
        {/* Game area */}
        <div
          className="flex-1 rounded-xl border-2 overflow-hidden cursor-pointer select-none"
          style={{ borderColor: 'var(--border-color)' }}
          onClick={handleClick}
        >
          <div
            className="relative flex flex-col items-center justify-center py-12 px-6 min-h-[340px]"
            style={{
              backgroundColor: phase === 'go'
                ? (isDark ? '#0a1a0a' : '#e8ffe8')
                : (isDark ? '#0a0a0f' : '#f0f0f0'),
              transition: 'background-color 0.15s',
            }}
          >
            {/* F1-style lights panel */}
            <div className="flex gap-3 md:gap-5 mb-10">
              {[0, 1, 2, 3, 4].map(i => (
                <div
                  key={i}
                  className="flex flex-col gap-2"
                >
                  {/* Each column has 2 lights (like real F1) */}
                  {[0, 1].map(j => (
                    <motion.div
                      key={j}
                      className="w-8 h-8 md:w-12 md:h-12 rounded-full border-2"
                      style={{
                        borderColor: isDark ? '#444' : '#999',
                        backgroundColor: i < litCount
                          ? '#e10600'
                          : (isDark ? '#1a1a1a' : '#ddd'),
                        boxShadow: i < litCount
                          ? '0 0 20px rgba(225, 6, 0, 0.8), 0 0 40px rgba(225, 6, 0, 0.4)'
                          : 'none',
                      }}
                      animate={i < litCount ? {
                        scale: [1, 1.05, 1],
                      } : {}}
                      transition={{ duration: 0.2 }}
                    />
                  ))}
                </div>
              ))}
            </div>

            {/* Status text */}
            <AnimatePresence mode="wait">
              {phase === 'idle' && (
                <motion.div
                  key="idle"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="text-center"
                >
                  <p className="text-xl md:text-2xl font-bold font-mono" style={{ color: 'var(--text-primary)' }}>
                    CLICK TO START
                  </p>
                  <p className="text-sm font-mono mt-2" style={{ color: 'var(--text-secondary)' }}>
                    or press Space
                  </p>
                </motion.div>
              )}

              {(phase === 'building' || phase === 'waiting') && (
                <motion.div
                  key="wait"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="text-center"
                >
                  <p className="text-xl md:text-2xl font-bold font-mono" style={{ color: '#e10600' }}>
                    WAIT...
                  </p>
                  <p className="text-xs font-mono mt-2" style={{ color: 'var(--text-secondary)' }}>
                    Don&apos;t click yet!
                  </p>
                </motion.div>
              )}

              {phase === 'go' && (
                <motion.div
                  key="go"
                  initial={{ scale: 0.5, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="text-center"
                >
                  <p className="text-3xl md:text-5xl font-bold font-mono" style={{ color: '#00ff64' }}>
                    GO! GO! GO!
                  </p>
                </motion.div>
              )}

              {phase === 'jumped' && (
                <motion.div
                  key="jumped"
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="text-center"
                >
                  <p className="text-2xl md:text-3xl font-bold font-mono" style={{ color: '#e10600' }}>
                    JUMP START!
                  </p>
                  <p className="text-sm font-mono mt-2" style={{ color: 'var(--text-secondary)' }}>
                    You clicked too early. Click to try again.
                  </p>
                </motion.div>
              )}

              {phase === 'result' && reactionTime !== null && (
                <motion.div
                  key="result"
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="text-center"
                >
                  <motion.p
                    className="text-5xl md:text-7xl font-bold font-mono"
                    style={{ color: getTimeColor(reactionTime) }}
                    initial={{ scale: 1.3 }}
                    animate={{ scale: 1 }}
                    transition={{ type: 'spring', stiffness: 300 }}
                  >
                    {reactionTime}ms
                  </motion.p>
                  <p className="text-lg font-bold font-mono mt-2" style={{ color: getTimeColor(reactionTime) }}>
                    {getTimeLabel(reactionTime)}
                  </p>

                  {bestTime !== null && attempts > 1 && (
                    <p className="text-sm font-mono mt-1" style={{ color: 'var(--text-secondary)' }}>
                      Personal best: {bestTime}ms
                    </p>
                  )}

                  {showNameEntry ? (
                    <div className="flex gap-2 items-center justify-center mt-4" onClick={e => e.stopPropagation()}>
                      <input
                        type="text"
                        value={playerName}
                        onChange={e => setPlayerName(e.target.value)}
                        onKeyDown={e => e.key === 'Enter' && handleSubmitScore()}
                        placeholder="Your name"
                        maxLength={15}
                        className="px-3 py-2 bg-white/10 border border-white/30 rounded text-sm font-mono focus:outline-none focus:border-[#e10600]"
                        style={{ color: 'var(--text-primary)' }}
                        autoFocus
                      />
                      <button
                        onClick={(e) => { e.stopPropagation(); handleSubmitScore() }}
                        className="px-4 py-2 bg-[#e10600] text-white font-mono text-sm rounded hover:bg-red-700"
                      >
                        SAVE
                      </button>
                    </div>
                  ) : (
                    <p className="text-xs font-mono mt-3" style={{ color: 'var(--text-secondary)' }}>
                      Click or press Space to try again
                    </p>
                  )}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* Leaderboard sidebar */}
        <div
          className="w-full lg:w-56 rounded-xl border-2 p-4 shrink-0"
          style={{
            borderColor: 'var(--border-color)',
            backgroundColor: isDark ? 'rgba(255,255,255,0.03)' : 'rgba(0,0,0,0.03)',
          }}
        >
          <h3 className="font-bold font-mono text-sm mb-3 text-center" style={{ color: 'var(--text-primary)' }}>
            🏆 FASTEST REACTIONS
          </h3>
          {leaderboard.length === 0 ? (
            <p className="text-xs font-mono text-center" style={{ color: 'var(--text-secondary)' }}>
              No times yet. Be the first!
            </p>
          ) : (
            <div className="space-y-1.5">
              {leaderboard.map((entry, i) => (
                <div
                  key={`${entry.name}-${entry.time}-${i}`}
                  className="flex items-center gap-2 text-xs font-mono"
                  style={{ color: 'var(--text-primary)' }}
                >
                  <span className={`w-5 text-right font-bold ${i === 0 ? 'text-[#e10600]' : ''}`}>
                    {i === 0 ? '🥇' : i === 1 ? '🥈' : i === 2 ? '🥉' : `${i + 1}.`}
                  </span>
                  <span className="flex-1 truncate">{entry.name}</span>
                  <span
                    className="text-right tabular-nums"
                    style={{ color: i === 0 ? '#e10600' : 'var(--text-secondary)' }}
                  >
                    {entry.time}ms
                  </span>
                </div>
              ))}
            </div>
          )}

          {/* Fun facts */}
          <div className="mt-4 pt-3 border-t" style={{ borderColor: 'var(--border-color)' }}>
            <p className="text-[10px] font-mono" style={{ color: 'var(--text-secondary)' }}>
              Average F1 driver: ~200ms
            </p>
            <p className="text-[10px] font-mono" style={{ color: 'var(--text-secondary)' }}>
              Human average: ~250ms
            </p>
          </div>
        </div>
      </div>
    </motion.div>
  )
}
