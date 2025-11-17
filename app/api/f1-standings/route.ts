import { NextRequest, NextResponse } from 'next/server'

const ERGAST_API = 'https://ergast.com/api/f1'

// Force dynamic rendering
export const dynamic = 'force-dynamic'

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams
    const type = searchParams.get('type') || 'drivers' // 'drivers' or 'constructors'
    let year = searchParams.get('year') || new Date().getFullYear().toString()

    const endpoint = type === 'drivers' ? 'driverStandings' : 'constructorStandings'
    
    // Try current year first, fallback to previous year if no data
    let url = `${ERGAST_API}/${year}/${endpoint}.json?limit=20`
    let response = await fetch(url, {
      headers: {
        'Accept': 'application/json',
      },
      cache: 'no-store', // Always fetch fresh data
    })

    // If current year has no data (404 or empty), try previous year
    if (!response.ok || response.status === 404) {
      const previousYear = (parseInt(year) - 1).toString()
      url = `${ERGAST_API}/${previousYear}/${endpoint}.json?limit=20`
      response = await fetch(url, {
        headers: {
          'Accept': 'application/json',
        },
        cache: 'no-store',
      })
      year = previousYear // Update year for logging
    }

    if (!response.ok) {
      throw new Error(`Ergast API error: ${response.status}`)
    }

    const data = await response.json()
    
    // Check if we got valid data
    if (!data.MRData || !data.MRData.StandingsTable || !data.MRData.StandingsTable.StandingsLists || data.MRData.StandingsTable.StandingsLists.length === 0) {
      // Try previous year if current year has no standings
      const previousYear = (parseInt(year) - 1).toString()
      const fallbackUrl = `${ERGAST_API}/${previousYear}/${endpoint}.json?limit=20`
      const fallbackResponse = await fetch(fallbackUrl, {
        headers: {
          'Accept': 'application/json',
        },
        cache: 'no-store',
      })
      
      if (fallbackResponse.ok) {
        const fallbackData = await fallbackResponse.json()
        return NextResponse.json(fallbackData, {
          headers: {
            'Cache-Control': 'public, s-maxage=30, stale-while-revalidate=60',
          },
        })
      }
    }

    return NextResponse.json(data, {
      headers: {
        'Cache-Control': 'public, s-maxage=30, stale-while-revalidate=60',
      },
    })
  } catch (error) {
    console.error('Error fetching F1 standings:', error)
    return NextResponse.json(
      { error: 'Failed to fetch F1 standings', details: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    )
  }
}

