'use client'

import { useEffect, useRef, useState, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useStore } from '@/store/useStore'
import {
  buildTrackPoints,
  buildDRSZones,
  createCar,
  updateCar,
  TRACK_HALF_WIDTH,
  formatLapTime,
  saveToLeaderboard,
  loadLeaderboard,
  type TrackPoint,
  type DRSZone,
  type CarState,
  type InputState,
  type LeaderboardEntry,
} from '@/lib/gameTrack'

const CANVAS_W = 800
const CANVAS_H = 500

type GamePhase = 'idle' | 'countdown' | 'racing' | 'finished'

export default function F1LapAttack() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const carRef = useRef<CarState | null>(null)
  const trackRef = useRef<TrackPoint[]>([])
  const drsRef = useRef<DRSZone[]>([])
  const inputRef = useRef<InputState>({ up: false, down: false, left: false, right: false })
  const rafRef = useRef(0)
  const startTimeRef = useRef(0)

  const [phase, setPhase] = useState<GamePhase>('idle')
  const [countdown, setCountdown] = useState(3)
  const [currentLapTime, setCurrentLapTime] = useState(0)
  const [bestLap, setBestLap] = useState<number | null>(null)
  const [lastLap, setLastLap] = useState<number | null>(null)
  const [lapCount, setLapCount] = useState(0)
  const [speed, setSpeed] = useState(0)
  const [drsActive, setDrsActive] = useState(false)
  const [showNameEntry, setShowNameEntry] = useState(false)
  const [playerName, setPlayerName] = useState('')
  const [leaderboard, setLeaderboard] = useState<LeaderboardEntry[]>([])
  const [finishedTime, setFinishedTime] = useState<number | null>(null)

  const theme = useStore(s => s.theme)
  const isDark = theme === 'dark'

  const TARGET_LAPS = 3

  // Load leaderboard on mount
  useEffect(() => {
    setLeaderboard(loadLeaderboard())
  }, [])

  // Initialize track
  useEffect(() => {
    trackRef.current = buildTrackPoints(CANVAS_W, CANVAS_H)
    drsRef.current = buildDRSZones(trackRef.current.length)
    carRef.current = createCar(trackRef.current)
  }, [])

  // Keyboard input
  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      const inp = inputRef.current
      if (e.key === 'ArrowUp' || e.key === 'w' || e.key === 'W') inp.up = true
      if (e.key === 'ArrowDown' || e.key === 's' || e.key === 'S') inp.down = true
      if (e.key === 'ArrowLeft' || e.key === 'a' || e.key === 'A') inp.left = true
      if (e.key === 'ArrowRight' || e.key === 'd' || e.key === 'D') inp.right = true
    }
    const onKeyUp = (e: KeyboardEvent) => {
      const inp = inputRef.current
      if (e.key === 'ArrowUp' || e.key === 'w' || e.key === 'W') inp.up = false
      if (e.key === 'ArrowDown' || e.key === 's' || e.key === 'S') inp.down = false
      if (e.key === 'ArrowLeft' || e.key === 'a' || e.key === 'A') inp.left = false
      if (e.key === 'ArrowRight' || e.key === 'd' || e.key === 'D') inp.right = false
    }
    window.addEventListener('keydown', onKeyDown)
    window.addEventListener('keyup', onKeyUp)
    return () => {
      window.removeEventListener('keydown', onKeyDown)
      window.removeEventListener('keyup', onKeyUp)
    }
  }, [])

  const startRace = useCallback(() => {
    trackRef.current = buildTrackPoints(CANVAS_W, CANVAS_H)
    drsRef.current = buildDRSZones(trackRef.current.length)
    carRef.current = createCar(trackRef.current)
    setPhase('countdown')
    setCountdown(3)
    setBestLap(null)
    setLastLap(null)
    setLapCount(0)
    setSpeed(0)
    setDrsActive(false)
    setShowNameEntry(false)
    setFinishedTime(null)

    let count = 3
    const interval = setInterval(() => {
      count--
      setCountdown(count)
      if (count === 0) {
        clearInterval(interval)
        setTimeout(() => {
          startTimeRef.current = performance.now()
          if (carRef.current) {
            carRef.current.lapStartTime = performance.now()
            carRef.current.lap = 1
          }
          setPhase('racing')
          setLapCount(1)
        }, 400)
      }
    }, 800)
  }, [])

  // Game loop
  const gameLoop = useCallback(() => {
    const canvas = canvasRef.current
    const car = carRef.current
    const track = trackRef.current
    if (!canvas || !car || track.length === 0) {
      rafRef.current = requestAnimationFrame(gameLoop)
      return
    }
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const now = performance.now()

    // Update physics
    if (phase === 'racing') {
      const result = updateCar(car, inputRef.current, track, drsRef.current, now)
      setSpeed(Math.round(car.speed * 30)) // Convert to "km/h"-ish
      setDrsActive(car.drsActive)

      // Update current lap timer
      setCurrentLapTime(now - car.lapStartTime)

      if (result.crossed) {
        setLapCount(car.lap)
        if (result.lapTime !== null) {
          setLastLap(result.lapTime)
          if (car.bestLap !== null) setBestLap(car.bestLap)
        }
        // Check if race is finished
        if (car.lap > TARGET_LAPS) {
          setPhase('finished')
          setFinishedTime(car.bestLap)
          setShowNameEntry(true)
        }
      }
    }

    // ---- Draw ----
    ctx.clearRect(0, 0, CANVAS_W, CANVAS_H)

    // Background
    ctx.fillStyle = isDark ? '#0a0a0f' : '#f0f0f0'
    ctx.fillRect(0, 0, CANVAS_W, CANVAS_H)

    // Draw track surface
    ctx.strokeStyle = isDark ? '#2a2a35' : '#cccccc'
    ctx.lineWidth = TRACK_HALF_WIDTH * 2
    ctx.lineCap = 'round'
    ctx.lineJoin = 'round'
    ctx.beginPath()
    ctx.moveTo(track[0].x, track[0].y)
    for (let i = 1; i < track.length; i++) {
      ctx.lineTo(track[i].x, track[i].y)
    }
    ctx.closePath()
    ctx.stroke()

    // Track edges
    ctx.strokeStyle = isDark ? '#444455' : '#999999'
    ctx.lineWidth = TRACK_HALF_WIDTH * 2 + 4
    ctx.beginPath()
    ctx.moveTo(track[0].x, track[0].y)
    for (let i = 1; i < track.length; i++) {
      ctx.lineTo(track[i].x, track[i].y)
    }
    ctx.closePath()
    ctx.stroke()

    // Redraw track surface on top of edges
    ctx.strokeStyle = isDark ? '#2a2a35' : '#cccccc'
    ctx.lineWidth = TRACK_HALF_WIDTH * 2 - 4
    ctx.beginPath()
    ctx.moveTo(track[0].x, track[0].y)
    for (let i = 1; i < track.length; i++) {
      ctx.lineTo(track[i].x, track[i].y)
    }
    ctx.closePath()
    ctx.stroke()

    // Center line dashes
    ctx.strokeStyle = isDark ? '#555566' : '#aaaaaa'
    ctx.lineWidth = 1
    ctx.setLineDash([8, 6])
    ctx.beginPath()
    ctx.moveTo(track[0].x, track[0].y)
    for (let i = 1; i < track.length; i++) {
      ctx.lineTo(track[i].x, track[i].y)
    }
    ctx.closePath()
    ctx.stroke()
    ctx.setLineDash([])

    // DRS zone highlight
    const drsZones = drsRef.current
    for (const zone of drsZones) {
      ctx.strokeStyle = isDark ? 'rgba(0, 255, 100, 0.3)' : 'rgba(0, 180, 70, 0.3)'
      ctx.lineWidth = TRACK_HALF_WIDTH * 2 - 8
      ctx.beginPath()
      ctx.moveTo(track[zone.start].x, track[zone.start].y)
      for (let i = zone.start; i <= zone.end; i++) {
        ctx.lineTo(track[i].x, track[i].y)
      }
      ctx.stroke()

      // DRS text
      const midIdx = Math.floor((zone.start + zone.end) / 2)
      const mp = track[midIdx]
      ctx.fillStyle = isDark ? 'rgba(0, 255, 100, 0.6)' : 'rgba(0, 150, 60, 0.6)'
      ctx.font = 'bold 10px monospace'
      ctx.textAlign = 'center'
      ctx.fillText('DRS', mp.x, mp.y - 8)
    }

    // Start/finish line
    const s = track[0]
    const s1 = track[1]
    const angle = Math.atan2(s1.y - s.y, s1.x - s.x) + Math.PI / 2
    ctx.strokeStyle = '#e10600'
    ctx.lineWidth = 3
    ctx.beginPath()
    ctx.moveTo(s.x + Math.cos(angle) * TRACK_HALF_WIDTH, s.y + Math.sin(angle) * TRACK_HALF_WIDTH)
    ctx.lineTo(s.x - Math.cos(angle) * TRACK_HALF_WIDTH, s.y - Math.sin(angle) * TRACK_HALF_WIDTH)
    ctx.stroke()

    // Draw car
    ctx.save()
    ctx.translate(car.x, car.y)
    ctx.rotate(car.angle)

    // Car body
    const carLen = 18
    const carWid = 8
    ctx.fillStyle = '#e10600'
    ctx.fillRect(-carLen / 2, -carWid / 2, carLen, carWid)

    // Front wing
    ctx.fillStyle = '#cc0000'
    ctx.fillRect(carLen / 2 - 3, -carWid / 2 - 2, 3, carWid + 4)

    // Rear wing
    ctx.fillStyle = '#990000'
    ctx.fillRect(-carLen / 2, -carWid / 2 - 1, 3, carWid + 2)

    // Cockpit
    ctx.fillStyle = isDark ? '#111' : '#333'
    ctx.fillRect(-2, -2, 6, 4)

    // DRS indicator on car
    if (car.drsActive) {
      ctx.strokeStyle = '#00ff64'
      ctx.lineWidth = 1.5
      ctx.strokeRect(-carLen / 2 - 1, -carWid / 2 - 3, carLen + 2, carWid + 6)
    }

    ctx.restore()

    // Off-track warning
    if (car.offTrack && phase === 'racing') {
      ctx.fillStyle = 'rgba(225, 6, 0, 0.15)'
      ctx.fillRect(0, 0, CANVAS_W, CANVAS_H)
      ctx.fillStyle = '#e10600'
      ctx.font = 'bold 14px monospace'
      ctx.textAlign = 'center'
      ctx.fillText('⚠ OFF TRACK', CANVAS_W / 2, 30)
    }

    rafRef.current = requestAnimationFrame(gameLoop)
  }, [phase, isDark])

  // Start/stop game loop
  useEffect(() => {
    rafRef.current = requestAnimationFrame(gameLoop)
    return () => cancelAnimationFrame(rafRef.current)
  }, [gameLoop])

  const handleSubmitScore = () => {
    if (!finishedTime || !playerName.trim()) return
    const lb = saveToLeaderboard({
      name: playerName.trim().slice(0, 15),
      time: finishedTime,
      date: new Date().toISOString().slice(0, 10),
    })
    setLeaderboard(lb)
    setShowNameEntry(false)
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
          F1 LAP ATTACK
        </h2>
        <p className="font-mono text-sm" style={{ color: 'var(--text-secondary)' }}>
          {TARGET_LAPS} laps &middot; Arrow keys or WASD to drive &middot; Hit the DRS zone for a speed boost
        </p>
      </div>

      <div className="flex flex-col lg:flex-row gap-4">
        {/* Game canvas */}
        <div className="relative rounded-xl overflow-hidden border-2" style={{ borderColor: 'var(--border-color)' }}>
          <canvas
            ref={canvasRef}
            width={CANVAS_W}
            height={CANVAS_H}
            className="block w-full max-w-[800px]"
            style={{ aspectRatio: `${CANVAS_W}/${CANVAS_H}` }}
          />

          {/* HUD overlay */}
          {phase === 'racing' && (
            <div className="absolute top-3 left-3 right-3 flex justify-between pointer-events-none">
              <div className="font-mono text-xs space-y-1" style={{ color: 'var(--text-primary)' }}>
                <div className="bg-black/60 px-2 py-1 rounded">
                  LAP {Math.min(lapCount, TARGET_LAPS)}/{TARGET_LAPS}
                </div>
                <div className="bg-black/60 px-2 py-1 rounded">
                  {formatLapTime(currentLapTime)}
                </div>
              </div>
              <div className="font-mono text-xs space-y-1 text-right" style={{ color: 'var(--text-primary)' }}>
                <div className="bg-black/60 px-2 py-1 rounded">
                  {speed} KPH
                </div>
                {drsActive && (
                  <div className="bg-green-600/80 px-2 py-1 rounded text-white font-bold">
                    DRS
                  </div>
                )}
                {bestLap !== null && (
                  <div className="bg-purple-600/80 px-2 py-1 rounded text-white">
                    BEST: {formatLapTime(bestLap)}
                  </div>
                )}
                {lastLap !== null && (
                  <div className="bg-black/60 px-2 py-1 rounded">
                    LAST: {formatLapTime(lastLap)}
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Countdown overlay */}
          <AnimatePresence>
            {phase === 'countdown' && (
              <motion.div
                className="absolute inset-0 flex items-center justify-center bg-black/70"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                <motion.span
                  key={countdown}
                  initial={{ scale: 2, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0.5, opacity: 0 }}
                  className="text-7xl font-bold text-white font-mono"
                >
                  {countdown > 0 ? countdown : 'GO!'}
                </motion.span>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Idle overlay */}
          {phase === 'idle' && (
            <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/50">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={startRace}
                className="px-8 py-3 bg-[#e10600] text-white font-bold font-mono text-lg rounded-lg hover:bg-red-700 transition-colors"
              >
                START RACE
              </motion.button>
              <p className="text-white/60 text-xs font-mono mt-3">
                Complete {TARGET_LAPS} laps as fast as you can
              </p>
            </div>
          )}

          {/* Finished overlay */}
          <AnimatePresence>
            {phase === 'finished' && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="absolute inset-0 flex flex-col items-center justify-center bg-black/70 gap-3"
              >
                <div className="text-center">
                  <p className="text-2xl font-bold text-white font-mono">CHEQUERED FLAG!</p>
                  {finishedTime && (
                    <p className="text-lg text-[#e10600] font-mono mt-1">
                      Best Lap: {formatLapTime(finishedTime)}
                    </p>
                  )}
                </div>

                {showNameEntry ? (
                  <div className="flex gap-2 items-center">
                    <input
                      type="text"
                      value={playerName}
                      onChange={e => setPlayerName(e.target.value)}
                      onKeyDown={e => e.key === 'Enter' && handleSubmitScore()}
                      placeholder="Your name"
                      maxLength={15}
                      className="px-3 py-2 bg-white/10 border border-white/30 rounded text-white font-mono text-sm focus:outline-none focus:border-[#e10600]"
                      autoFocus
                    />
                    <button
                      onClick={handleSubmitScore}
                      className="px-4 py-2 bg-[#e10600] text-white font-mono text-sm rounded hover:bg-red-700"
                    >
                      SAVE
                    </button>
                  </div>
                ) : (
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={startRace}
                    className="px-6 py-2 bg-[#e10600] text-white font-bold font-mono rounded-lg hover:bg-red-700"
                  >
                    RACE AGAIN
                  </motion.button>
                )}
              </motion.div>
            )}
          </AnimatePresence>
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
            🏆 LEADERBOARD
          </h3>
          {leaderboard.length === 0 ? (
            <p className="text-xs font-mono text-center" style={{ color: 'var(--text-secondary)' }}>
              No times yet.{'\n'}Be the first!
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
                  <span className="text-right tabular-nums" style={{ color: i === 0 ? '#e10600' : 'var(--text-secondary)' }}>
                    {formatLapTime(entry.time)}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Mobile controls */}
      <div className="flex justify-center gap-2 mt-4 lg:hidden">
        <button
          onTouchStart={() => { inputRef.current.left = true }}
          onTouchEnd={() => { inputRef.current.left = false }}
          className="w-14 h-14 bg-white/10 border border-white/20 rounded-lg flex items-center justify-center text-xl active:bg-white/20"
        >
          ←
        </button>
        <div className="flex flex-col gap-2">
          <button
            onTouchStart={() => { inputRef.current.up = true }}
            onTouchEnd={() => { inputRef.current.up = false }}
            className="w-14 h-14 bg-white/10 border border-white/20 rounded-lg flex items-center justify-center text-xl active:bg-[#e10600]/50"
          >
            ↑
          </button>
          <button
            onTouchStart={() => { inputRef.current.down = true }}
            onTouchEnd={() => { inputRef.current.down = false }}
            className="w-14 h-14 bg-white/10 border border-white/20 rounded-lg flex items-center justify-center text-xl active:bg-white/20"
          >
            ↓
          </button>
        </div>
        <button
          onTouchStart={() => { inputRef.current.right = true }}
          onTouchEnd={() => { inputRef.current.right = false }}
          className="w-14 h-14 bg-white/10 border border-white/20 rounded-lg flex items-center justify-center text-xl active:bg-white/20"
        >
          →
        </button>
      </div>
    </motion.div>
  )
}
