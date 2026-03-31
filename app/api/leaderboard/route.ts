import { NextResponse } from 'next/server'

// Try to use Vercel KV if available, otherwise fall back to in-memory
let kv: { get: (key: string) => Promise<unknown>; set: (key: string, value: unknown) => Promise<unknown> } | null = null

async function getKV() {
  if (kv) return kv
  try {
    const mod = await import('@vercel/kv')
    kv = mod.kv
    return kv
  } catch {
    return null
  }
}

interface LeaderboardEntry {
  name: string
  time: number
  date: string
}

const LB_KEY = 'f1-lights-out-leaderboard'
const MAX_ENTRIES = 20

// In-memory fallback (resets on cold start, but works without KV setup)
let memoryFallback: LeaderboardEntry[] = []

async function getEntries(): Promise<LeaderboardEntry[]> {
  const store = await getKV()
  if (store) {
    try {
      const data = await store.get(LB_KEY)
      return (data as LeaderboardEntry[]) ?? []
    } catch {
      return memoryFallback
    }
  }
  return memoryFallback
}

async function setEntries(entries: LeaderboardEntry[]): Promise<void> {
  const store = await getKV()
  if (store) {
    try {
      await store.set(LB_KEY, entries)
      return
    } catch {
      // fall through to memory
    }
  }
  memoryFallback = entries
}

export async function GET() {
  const entries = await getEntries()
  return NextResponse.json(entries)
}

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { name, time } = body as { name?: string; time?: number }

    if (!name || typeof time !== 'number' || time < 0 || time > 5000) {
      return NextResponse.json({ error: 'Invalid entry' }, { status: 400 })
    }

    const sanitizedName = String(name).trim().slice(0, 15)
    if (!sanitizedName) {
      return NextResponse.json({ error: 'Name required' }, { status: 400 })
    }

    const entries = await getEntries()
    entries.push({
      name: sanitizedName,
      time: Math.round(time),
      date: new Date().toISOString().slice(0, 10),
    })
    entries.sort((a, b) => a.time - b.time)
    const trimmed = entries.slice(0, MAX_ENTRIES)

    await setEntries(trimmed)

    return NextResponse.json(trimmed)
  } catch {
    return NextResponse.json({ error: 'Server error' }, { status: 500 })
  }
}
