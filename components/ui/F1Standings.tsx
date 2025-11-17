'use client'

import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

interface DriverStanding {
  position: number
  driver: string
  team: string
  points: number
  change: number // -1, 0, or 1 for down, same, up
}

interface ConstructorStanding {
  position: number
  team: string
  points: number
  change: number
}

// F1 data is fetched via Next.js API route at /api/f1-standings
// This bypasses CORS issues by making server-side requests

// Map Ergast team names to display names
const teamNameMap: Record<string, string> = {
  'Red Bull': 'Red Bull Racing',
  'Red Bull Racing': 'Red Bull Racing',
  'Red Bull Racing Honda RBPT': 'Red Bull Racing',
  'Ferrari': 'Ferrari',
  'Mercedes': 'Mercedes',
  'McLaren': 'McLaren',
  'Aston Martin': 'Aston Martin',
  'Alpine F1 Team': 'Alpine',
  'Alpine': 'Alpine',
  'Williams': 'Williams',
  'Haas F1 Team': 'Haas',
  'Haas': 'Haas',
  'AlphaTauri': 'AlphaTauri',
  'RB': 'RB',
  'Sauber': 'Sauber',
  'Kick Sauber': 'Sauber',
  'Stake F1 Team Kick Sauber': 'Sauber',
}

export default function F1Standings() {
  const [drivers, setDrivers] = useState<DriverStanding[]>([])
  const [constructors, setConstructors] = useState<ConstructorStanding[]>([])
  const [activeTab, setActiveTab] = useState<'drivers' | 'constructors'>('drivers')
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const previousDriversRef = useRef<DriverStanding[]>([])
  const previousConstructorsRef = useRef<ConstructorStanding[]>([])

  // Fetch real F1 data from Ergast API via Next.js API route (bypasses CORS)
  useEffect(() => {
    const fetchF1Data = async () => {
      try {
        setLoading(true)
        setError(null)

        // Get current year
        const currentYear = new Date().getFullYear()

        // Fetch driver standings via API route
        const driversResponse = await fetch(
          `/api/f1-standings?type=drivers&year=${currentYear}`
        )
        if (!driversResponse.ok) {
          throw new Error('Failed to fetch driver standings')
        }
        const driversData = await driversResponse.json()

        // Fetch constructor standings via API route
        const constructorsResponse = await fetch(
          `/api/f1-standings?type=constructors&year=${currentYear}`
        )
        if (!constructorsResponse.ok) {
          throw new Error('Failed to fetch constructor standings')
        }
        const constructorsData = await constructorsResponse.json()

        // Process driver standings
        if (driversData.MRData?.StandingsTable?.StandingsLists?.[0]?.DriverStandings) {
          const driverStandings = driversData.MRData.StandingsTable.StandingsLists[0].DriverStandings
          const processedDrivers: DriverStanding[] = driverStandings.map((standing: any, index: number) => {
            const driver = standing.Driver
            const constructor = standing.Constructors[0]
            const driverName = `${driver.givenName} ${driver.familyName}`
            const teamName = teamNameMap[constructor.name] || constructor.name

            // Calculate position change
            const prevDriver = previousDriversRef.current.find(
              (d) => d.driver === driverName
            )
            let change = 0
            if (prevDriver) {
              if (standing.position < prevDriver.position) change = 1 // Moved up
              else if (standing.position > prevDriver.position) change = -1 // Moved down
            }

            return {
              position: parseInt(standing.position),
              driver: driverName,
              team: teamName,
              points: parseFloat(standing.points),
              change,
            }
          })

          previousDriversRef.current = processedDrivers
          setDrivers(processedDrivers)
        }

        // Process constructor standings
        if (constructorsData.MRData?.StandingsTable?.StandingsLists?.[0]?.ConstructorStandings) {
          const constructorStandings =
            constructorsData.MRData.StandingsTable.StandingsLists[0].ConstructorStandings
          const processedConstructors: ConstructorStanding[] = constructorStandings.map(
            (standing: any) => {
              const constructor = standing.Constructor
              const teamName = teamNameMap[constructor.name] || constructor.name

              // Calculate position change
              const prevConstructor = previousConstructorsRef.current.find(
                (c) => c.team === teamName
              )
              let change = 0
              if (prevConstructor) {
                if (standing.position < prevConstructor.position) change = 1 // Moved up
                else if (standing.position > prevConstructor.position) change = -1 // Moved down
              }

              return {
                position: parseInt(standing.position),
                team: teamName,
                points: parseFloat(standing.points),
                change,
              }
            }
          )

          previousConstructorsRef.current = processedConstructors
          setConstructors(processedConstructors)
        }

        setLoading(false)
      } catch (err) {
        console.error('Error fetching F1 data:', err)
        setError('Failed to load F1 standings')
        setLoading(false)
      }
    }

    // Initial fetch
    fetchF1Data()

    // Update every 30 seconds (Ergast API has rate limits, so don't spam it)
    const interval = setInterval(fetchF1Data, 30000)

    return () => clearInterval(interval)
  }, [])

  const getTeamColor = (team: string): string => {
    const colors: Record<string, string> = {
      'Red Bull Racing': '#1E41FF',
      'Ferrari': '#DC143C',
      'Mercedes': '#00D2BE',
      'McLaren': '#FF8700',
      'Aston Martin': '#00665E',
      'Alpine': '#0090FF',
      'Williams': '#005AFF',
      'Haas': '#FFFFFF',
      'AlphaTauri': '#2B4562',
      'Sauber': '#52C41A',
    }
    return colors[team] || '#FFFFFF'
  }

  return (
    <div className="w-full max-w-sm">
      <motion.div 
        className="p-6 rounded-lg border backdrop-blur-sm"
        style={{ 
          backgroundColor: 'var(--bg-secondary)', 
          borderColor: 'var(--border-color)',
          boxShadow: '0 4px 20px rgba(0, 0, 0, 0.3)',
        }}
        whileHover={{ scale: 1.02, y: -4 }}
        transition={{ type: 'spring', stiffness: 300 }}
      >
        {/* Header */}
        <div className="mb-6">
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center gap-2 mb-4"
          >
            <div className="w-3 h-3 rounded-full bg-red-500 animate-pulse" />
            <h2 className="text-xl font-racing tracking-wider" style={{ color: 'var(--text-primary)' }}>
              LIVE STANDINGS
            </h2>
          </motion.div>

          {/* Tabs */}
          <div className="flex gap-2 border-b" style={{ borderColor: 'var(--border-color)' }}>
            <button
              onClick={() => setActiveTab('drivers')}
              className={`px-4 py-2 text-sm font-racing transition-all ${
                activeTab === 'drivers'
                  ? 'border-b-2'
                  : 'opacity-60 hover:opacity-100'
              }`}
              style={{
                color: 'var(--text-primary)',
                borderBottomColor: activeTab === 'drivers' ? '#E10600' : 'transparent',
              }}
            >
              DRIVERS
            </button>
            <button
              onClick={() => setActiveTab('constructors')}
              className={`px-4 py-2 text-sm font-racing transition-all ${
                activeTab === 'constructors'
                  ? 'border-b-2'
                  : 'opacity-60 hover:opacity-100'
              }`}
              style={{
                color: 'var(--text-primary)',
                borderBottomColor: activeTab === 'constructors' ? '#E10600' : 'transparent',
              }}
            >
              CONSTRUCTORS
            </button>
          </div>
        </div>

        {/* Standings List */}
        <div className="space-y-2 max-h-96 overflow-y-auto">
          {loading && (
            <div className="flex items-center justify-center py-8">
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                className="w-6 h-6 border-2 border-red-500 border-t-transparent rounded-full"
              />
            </div>
          )}
          {error && (
            <div className="text-center py-4 text-red-500 text-sm font-mono">{error}</div>
          )}
          {!loading && !error && (
            <AnimatePresence mode="wait">
              {activeTab === 'drivers' ? (
              <motion.div
                key="drivers"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                transition={{ duration: 0.3 }}
                className="space-y-2"
              >
                {drivers.map((driver, index) => (
                  <motion.div
                    key={`${driver.driver}-${driver.position}`}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.05 }}
                    className="flex items-center gap-3 p-3 rounded-lg border transition-all hover:scale-105"
                    style={{
                      backgroundColor: 'var(--bg-primary)',
                      borderColor: 'var(--border-color)',
                    }}
                  >
                    {/* Position */}
                    <div className="flex-shrink-0 w-8 text-center">
                      <motion.span
                        key={driver.position}
                        initial={{ scale: 1.5, color: '#E10600' }}
                        animate={{ scale: 1, color: 'var(--text-primary)' }}
                        className="text-lg font-bold font-racing"
                      >
                        {driver.position}
                      </motion.span>
                    </div>

                    {/* Team Color Bar */}
                    <div
                      className="w-1 h-12 rounded-full"
                      style={{ backgroundColor: getTeamColor(driver.team) }}
                    />

                    {/* Driver Info */}
                    <div className="flex-1 min-w-0">
                      <div className="font-bold text-sm truncate" style={{ color: 'var(--text-primary)' }}>
                        {driver.driver}
                      </div>
                      <div className="text-xs truncate" style={{ color: 'var(--text-secondary)' }}>
                        {driver.team}
                      </div>
                    </div>

                    {/* Points & Change */}
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-bold font-racing" style={{ color: 'var(--text-primary)' }}>
                        {driver.points}
                      </span>
                      {driver.change !== 0 && (
                        <motion.div
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          className={`w-4 h-4 flex items-center justify-center ${
                            driver.change > 0 ? 'text-green-500' : 'text-red-500'
                          }`}
                        >
                          {driver.change > 0 ? '↑' : '↓'}
                        </motion.div>
                      )}
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            ) : (
              <motion.div
                key="constructors"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                transition={{ duration: 0.3 }}
                className="space-y-2"
              >
                {constructors.map((constructor, index) => (
                  <motion.div
                    key={`${constructor.team}-${constructor.position}`}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.05 }}
                    className="flex items-center gap-3 p-3 rounded-lg border transition-all hover:scale-105"
                    style={{
                      backgroundColor: 'var(--bg-primary)',
                      borderColor: 'var(--border-color)',
                    }}
                  >
                    {/* Position */}
                    <div className="flex-shrink-0 w-8 text-center">
                      <motion.span
                        key={constructor.position}
                        initial={{ scale: 1.5, color: '#E10600' }}
                        animate={{ scale: 1, color: 'var(--text-primary)' }}
                        className="text-lg font-bold font-racing"
                      >
                        {constructor.position}
                      </motion.span>
                    </div>

                    {/* Team Color Bar */}
                    <div
                      className="w-1 h-12 rounded-full"
                      style={{ backgroundColor: getTeamColor(constructor.team) }}
                    />

                    {/* Team Info */}
                    <div className="flex-1 min-w-0">
                      <div className="font-bold text-sm truncate" style={{ color: 'var(--text-primary)' }}>
                        {constructor.team}
                      </div>
                    </div>

                    {/* Points & Change */}
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-bold font-racing" style={{ color: 'var(--text-primary)' }}>
                        {constructor.points}
                      </span>
                      {constructor.change !== 0 && (
                        <motion.div
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          className={`w-4 h-4 flex items-center justify-center ${
                            constructor.change > 0 ? 'text-green-500' : 'text-red-500'
                          }`}
                        >
                          {constructor.change > 0 ? '↑' : '↓'}
                        </motion.div>
                      )}
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            )}
            </AnimatePresence>
          )}
        </div>

        {/* Footer */}
        <div className="mt-4 pt-4 border-t text-xs text-center" style={{ borderColor: 'var(--border-color)', color: 'var(--text-secondary)' }}>
          <motion.div
            animate={{ opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="flex items-center justify-center gap-2"
          >
            <div className="w-2 h-2 rounded-full bg-red-500" />
            <span>LIVE UPDATES</span>
          </motion.div>
        </div>
      </motion.div>
    </div>
  )
}

