import { NextResponse } from 'next/server'
import { kv } from '@vercel/kv'

interface LeaderboardEntry {
  name: string
  time: number
  date: string
}

const LB_KEY = 'f1-lights-out-leaderboard'
const MAX_ENTRIES = 20

async function getEntries(): Promise<LeaderboardEntry[]> {
  try {
    const data = await kv.get<LeaderboardEntry[]>(LB_KEY)
    return data ?? []
  } catch (err) {
    console.error('KV get error:', err)
    return []
  }
}

async function setEntries(entries: LeaderboardEntry[]): Promise<void> {
  try {
    await kv.set(LB_KEY, entries)
  } catch (err) {
    console.error('KV set error:', err)
  }
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
  } catch (err) {
    console.error('Leaderboard POST error:', err)
    return NextResponse.json({ error: 'Server error' }, { status: 500 })
  }
}
