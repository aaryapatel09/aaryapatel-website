'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import DashboardCard from './DashboardCard'

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

// Mock F1 data - in production, you'd fetch from an F1 API
const mockDrivers: DriverStanding[] = [
  { position: 1, driver: 'Max Verstappen', team: 'Red Bull Racing', points: 575, change: 0 },
  { position: 2, driver: 'Lewis Hamilton', team: 'Mercedes', points: 285, change: 1 },
  { position: 3, driver: 'Charles Leclerc', team: 'Ferrari', points: 270, change: -1 },
  { position: 4, driver: 'Lando Norris', team: 'McLaren', points: 205, change: 0 },
  { position: 5, driver: 'Carlos Sainz', team: 'Ferrari', points: 200, change: 0 },
  { position: 6, driver: 'George Russell', team: 'Mercedes', points: 175, change: 1 },
  { position: 7, driver: 'Oscar Piastri', team: 'McLaren', points: 150, change: -1 },
  { position: 8, driver: 'Fernando Alonso', team: 'Aston Martin', points: 120, change: 0 },
]

const mockConstructors: ConstructorStanding[] = [
  { position: 1, team: 'Red Bull Racing', points: 860, change: 0 },
  { position: 2, team: 'Ferrari', points: 406, change: 0 },
  { position: 3, team: 'McLaren', points: 302, change: 1 },
  { position: 4, team: 'Mercedes', points: 285, change: -1 },
  { position: 5, team: 'Aston Martin', points: 155, change: 0 },
]

export default function F1Standings() {
  const [drivers, setDrivers] = useState<DriverStanding[]>(mockDrivers)
  const [constructors, setConstructors] = useState<ConstructorStanding[]>(mockConstructors)
  const [activeTab, setActiveTab] = useState<'drivers' | 'constructors'>('drivers')

  // Simulate live updates
  useEffect(() => {
    const interval = setInterval(() => {
      // Randomly update positions and points
      setDrivers((prev) => {
        const updated = prev.map((driver) => {
          const randomChange = Math.random()
          let change = 0
          let newPosition = driver.position
          let newPoints = driver.points

          // Occasionally change positions
          if (randomChange > 0.7) {
            change = Math.random() > 0.5 ? 1 : -1
            newPosition = Math.max(1, Math.min(8, driver.position + change))
            newPoints = driver.points + Math.floor(Math.random() * 10) - 5
          }

          return {
            ...driver,
            position: newPosition,
            points: Math.max(0, newPoints),
            change,
          }
        })
        return updated.sort((a, b) => b.points - a.points).map((d, i) => ({ ...d, position: i + 1 }))
      })

      setConstructors((prev) => {
        const updated = prev.map((constructor) => {
          const randomChange = Math.random()
          let change = 0
          let newPosition = constructor.position
          let newPoints = constructor.points

          if (randomChange > 0.7) {
            change = Math.random() > 0.5 ? 1 : -1
            newPosition = Math.max(1, Math.min(5, constructor.position + change))
            newPoints = constructor.points + Math.floor(Math.random() * 15) - 7
          }

          return {
            ...constructor,
            position: newPosition,
            points: Math.max(0, newPoints),
            change,
          }
        })
        return updated.sort((a, b) => b.points - a.points).map((c, i) => ({ ...c, position: i + 1 }))
      })
    }, 3000) // Update every 3 seconds

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

