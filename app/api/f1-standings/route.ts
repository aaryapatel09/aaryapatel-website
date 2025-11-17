import { NextRequest, NextResponse } from 'next/server'

const ERGAST_API = 'https://ergast.com/api/f1'
const FETCH_TIMEOUT = 10000 // 10 seconds

// Helper function to fetch with timeout
async function fetchWithTimeout(url: string, options: RequestInit = {}, timeout: number = FETCH_TIMEOUT) {
  const controller = new AbortController()
  const timeoutId = setTimeout(() => controller.abort(), timeout)

  try {
    const response = await fetch(url, {
      ...options,
      signal: controller.signal,
    })
    clearTimeout(timeoutId)
    return response
  } catch (error) {
    clearTimeout(timeoutId)
    throw error
  }
}

// Force dynamic rendering
export const dynamic = 'force-dynamic'

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams
    const type = searchParams.get('type') || 'drivers' // 'drivers' or 'constructors'
    let year = searchParams.get('year') || new Date().getFullYear().toString()

    const endpoint = type === 'drivers' ? 'driverStandings' : 'constructorStandings'
    
    // Try previous year first (2024) since 2025 might not have data yet
    // and it's more reliable
    const currentYearInt = parseInt(year)
    const yearsToTry = currentYearInt >= 2024 ? [currentYearInt, currentYearInt - 1, 2024] : [currentYearInt, 2024]
    
    let lastError: Error | null = null
    
    for (const tryYear of yearsToTry) {
      try {
        const url = `${ERGAST_API}/${tryYear}/${endpoint}.json?limit=20`
        const response = await fetchWithTimeout(
          url,
          {
            headers: {
              'Accept': 'application/json',
            },
            cache: 'no-store',
          },
          FETCH_TIMEOUT
        )

        if (response.ok) {
          const data = await response.json()
          
          // Check if we got valid data
          if (data.MRData?.StandingsTable?.StandingsLists?.[0]) {
            return NextResponse.json(data, {
              headers: {
                'Cache-Control': 'public, s-maxage=30, stale-while-revalidate=60',
              },
            })
          }
        }
      } catch (error) {
        lastError = error instanceof Error ? error : new Error('Unknown fetch error')
        console.warn(`Failed to fetch ${tryYear} standings:`, lastError.message)
        // Continue to next year
        continue
      }
    }

    // If all years failed, return error
    throw lastError || new Error('Failed to fetch F1 standings from all available years')
  } catch (error) {
    console.error('Error fetching F1 standings:', error)
    return NextResponse.json(
      { 
        error: 'Failed to fetch F1 standings',
        details: error instanceof Error ? error.message : 'Unknown error',
        message: 'Unable to connect to F1 API. Please try again later.'
      },
      { status: 500 }
    )
  }
}

