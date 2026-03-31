// Leaderboard persistence for the F1 Lights Out reaction game

export interface LeaderboardEntry {
  name: string
  time: number   // ms (reaction time)
  date: string
}

const LB_KEY = 'f1-lights-out-leaderboard'
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
