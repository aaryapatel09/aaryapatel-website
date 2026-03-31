import { NextResponse } from 'next/server'
import Redis from 'ioredis'

interface LeaderboardEntry {
  name: string
  time: number
  date: string
}

const LB_KEY = 'f1-lights-out-leaderboard'
const MAX_ENTRIES = 20

// Connect using the KV_REDIS_URL env var from Vercel Redis integration
let redis: Redis | null = null

function getRedis(): Redis | null {
  if (redis) return redis
  const url = process.env.KV_REDIS_URL
  if (!url) {
    console.error('Missing KV_REDIS_URL environment variable')
    return null
  }
  redis = new Redis(url, { lazyConnect: true, maxRetriesPerRequest: 1 })
  return redis
}

async function getEntries(): Promise<LeaderboardEntry[]> {
  const client = getRedis()
  if (!client) return []
  try {
    const data = await client.get(LB_KEY)
    if (!data) return []
    return JSON.parse(data) as LeaderboardEntry[]
  } catch (err) {
    console.error('Redis get error:', err)
    return []
  }
}

async function setEntries(entries: LeaderboardEntry[]): Promise<void> {
  const client = getRedis()
  if (!client) return
  try {
    await client.set(LB_KEY, JSON.stringify(entries))
  } catch (err) {
    console.error('Redis set error:', err)
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
