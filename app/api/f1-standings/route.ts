import { NextResponse } from 'next/server'

const ERGAST_API = 'https://ergast.com/api/f1'

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const type = searchParams.get('type') || 'drivers' // 'drivers' or 'constructors'
    const year = searchParams.get('year') || new Date().getFullYear().toString()

    const endpoint = type === 'drivers' ? 'driverStandings' : 'constructorStandings'
    const url = `${ERGAST_API}/${year}/${endpoint}.json?limit=20`

    const response = await fetch(url, {
      headers: {
        'Accept': 'application/json',
      },
      next: { revalidate: 30 }, // Cache for 30 seconds
    })

    if (!response.ok) {
      throw new Error(`Ergast API error: ${response.status}`)
    }

    const data = await response.json()
    return NextResponse.json(data, {
      headers: {
        'Cache-Control': 'public, s-maxage=30, stale-while-revalidate=60',
      },
    })
  } catch (error) {
    console.error('Error fetching F1 standings:', error)
    return NextResponse.json(
      { error: 'Failed to fetch F1 standings' },
      { status: 500 }
    )
  }
}

