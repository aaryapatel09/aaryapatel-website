// F1 Lap Attack — track geometry and car physics (pure logic, no React)

/** A point on the track centerline */
export interface TrackPoint {
  x: number
  y: number
}

/** Build a closed oval-ish F1 circuit scaled to the canvas */
export function buildTrackPoints(w: number, h: number): TrackPoint[] {
  const cx = w / 2
  const cy = h / 2
  const rx = w * 0.4     // horizontal radius
  const ry = h * 0.35    // vertical radius
  const points: TrackPoint[] = []
  const segments = 200

  for (let i = 0; i < segments; i++) {
    const t = (i / segments) * Math.PI * 2
    // Slightly squished oval with chicane bumps for interest
    const wobble = Math.sin(t * 3) * 12 + Math.cos(t * 5) * 8
    points.push({
      x: cx + Math.cos(t) * (rx + wobble),
      y: cy + Math.sin(t) * (ry + wobble * 0.6),
    })
  }
  return points
}

/** Track half-width (distance from centerline to edge) — wide & forgiving */
export const TRACK_HALF_WIDTH = 55

/** Check if a point is on the track surface */
export function isOnTrack(
  px: number,
  py: number,
  trackPoints: TrackPoint[],
): boolean {
  let minDist = Infinity
  for (let i = 0; i < trackPoints.length; i++) {
    const p = trackPoints[i]
    const dx = px - p.x
    const dy = py - p.y
    const d = dx * dx + dy * dy
    if (d < minDist) minDist = d
  }
  return Math.sqrt(minDist) <= TRACK_HALF_WIDTH
}

/** Find the nearest track point index to (px, py) */
export function nearestTrackIndex(
  px: number,
  py: number,
  trackPoints: TrackPoint[],
): number {
  let minDist = Infinity
  let idx = 0
  for (let i = 0; i < trackPoints.length; i++) {
    const p = trackPoints[i]
    const dx = px - p.x
    const dy = py - p.y
    const d = dx * dx + dy * dy
    if (d < minDist) {
      minDist = d
      idx = i
    }
  }
  return idx
}

// ---- DRS Zone ----
/** DRS zone is a range of track point indices where speed boost is available */
export interface DRSZone {
  start: number
  end: number
}

export function buildDRSZones(trackLen: number): DRSZone[] {
  // One DRS zone on the main straight
  return [
    { start: Math.floor(trackLen * 0.0), end: Math.floor(trackLen * 0.15) },
  ]
}

export function isInDRS(idx: number, zones: DRSZone[]): boolean {
  return zones.some(z => {
    if (z.start <= z.end) return idx >= z.start && idx <= z.end
    // Wraps around
    return idx >= z.start || idx <= z.end
  })
}

// ---- Car State ----
export interface CarState {
  x: number
  y: number
  angle: number     // radians
  speed: number     // px/frame
  lapProgress: number // track index (fractional)
  lap: number
  lapStartTime: number
  bestLap: number | null
  lastLapTime: number | null
  offTrack: boolean
  drsActive: boolean
}

export function createCar(trackPoints: TrackPoint[]): CarState {
  const start = trackPoints[0]
  const next = trackPoints[1]
  return {
    x: start.x,
    y: start.y,
    angle: Math.atan2(next.y - start.y, next.x - start.x),
    speed: 0,
    lapProgress: 0,
    lap: 0,
    lapStartTime: 0,
    bestLap: null,
    lastLapTime: null,
    offTrack: false,
    drsActive: false,
  }
}

export interface InputState {
  up: boolean
  down: boolean
  left: boolean
  right: boolean
}

const MAX_SPEED = 8
const MAX_SPEED_DRS = 10.5
const ACCELERATION = 0.22
const BRAKE = 0.3
const FRICTION = 0.015
const OFF_TRACK_FRICTION = 0.04
const TURN_SPEED = 0.06
const TURN_SPEED_AT_SPEED = 0.045

/** Update car physics for one frame */
export function updateCar(
  car: CarState,
  input: InputState,
  trackPoints: TrackPoint[],
  drsZones: DRSZone[],
  now: number,
): { crossed: boolean; lapTime: number | null } {
  // Steering
  const turnRate = car.speed > 3 ? TURN_SPEED_AT_SPEED : TURN_SPEED
  if (input.left) car.angle -= turnRate * Math.min(1, car.speed / 2)
  if (input.right) car.angle += turnRate * Math.min(1, car.speed / 2)

  // Steering assist — gently nudge toward the track center when near edges
  const nearIdx = nearestTrackIndex(car.x, car.y, trackPoints)
  const nearPt = trackPoints[nearIdx]
  const distToCenter = Math.sqrt((car.x - nearPt.x) ** 2 + (car.y - nearPt.y) ** 2)
  if (distToCenter > TRACK_HALF_WIDTH * 0.6 && car.speed > 1) {
    const toCenter = Math.atan2(nearPt.y - car.y, nearPt.x - car.x)
    let angleDiff = toCenter - car.angle
    // Normalize to [-PI, PI]
    while (angleDiff > Math.PI) angleDiff -= Math.PI * 2
    while (angleDiff < -Math.PI) angleDiff += Math.PI * 2
    const assistStrength = 0.015 * Math.min(1, (distToCenter - TRACK_HALF_WIDTH * 0.6) / 20)
    car.angle += angleDiff * assistStrength
  }

  // DRS check
  car.drsActive = isInDRS(nearIdx, drsZones) && car.speed > 3
  const maxSpd = car.drsActive ? MAX_SPEED_DRS : MAX_SPEED

  // Acceleration / braking
  if (input.up) {
    car.speed = Math.min(car.speed + ACCELERATION, maxSpd)
  } else if (input.down) {
    car.speed = Math.max(car.speed - BRAKE, -1)
  }

  // Friction
  const onTrack = isOnTrack(car.x, car.y, trackPoints)
  car.offTrack = !onTrack
  const friction = onTrack ? FRICTION : OFF_TRACK_FRICTION
  if (!input.up && !input.down) {
    car.speed *= (1 - friction)
    if (Math.abs(car.speed) < 0.05) car.speed = 0
  } else {
    car.speed *= (1 - friction * 0.3)
  }

  // Move
  car.x += Math.cos(car.angle) * car.speed
  car.y += Math.sin(car.angle) * car.speed

  // Lap progress tracking
  const prevProgress = car.lapProgress
  car.lapProgress = nearIdx

  // Lap crossing detection (crossing index 0 from high index)
  let crossed = false
  let lapTime: number | null = null
  const len = trackPoints.length
  if (prevProgress > len * 0.8 && car.lapProgress < len * 0.2 && car.speed > 1) {
    crossed = true
    if (car.lap > 0) {
      lapTime = now - car.lapStartTime
      car.lastLapTime = lapTime
      if (car.bestLap === null || lapTime < car.bestLap) {
        car.bestLap = lapTime
      }
    }
    car.lap++
    car.lapStartTime = now
  }

  return { crossed, lapTime }
}

// ---- Leaderboard ----
export interface LeaderboardEntry {
  name: string
  time: number   // ms
  date: string
}

const LB_KEY = 'f1-lap-attack-leaderboard'
const MAX_ENTRIES = 10

export function loadLeaderboard(): LeaderboardEntry[] {
  if (typeof window === 'undefined') return []
  try {
    const raw = localStorage.getItem(LB_KEY)
    if (!raw) return []
    return JSON.parse(raw) as LeaderboardEntry[]
  } catch {
    return []
  }
}

export function saveToLeaderboard(entry: LeaderboardEntry): LeaderboardEntry[] {
  const lb = loadLeaderboard()
  lb.push(entry)
  lb.sort((a, b) => a.time - b.time)
  const trimmed = lb.slice(0, MAX_ENTRIES)
  localStorage.setItem(LB_KEY, JSON.stringify(trimmed))
  return trimmed
}

export function formatLapTime(ms: number): string {
  const totalSec = ms / 1000
  const mins = Math.floor(totalSec / 60)
  const secs = totalSec % 60
  return `${mins}:${secs.toFixed(3).padStart(6, '0')}`
}
