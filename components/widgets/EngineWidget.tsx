'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { useStore } from '@/store/useStore'
import Engine3D from '@/components/3d/Engine3D'
import DashboardCard from '@/components/ui/DashboardCard'

export default function EngineWidget() {
  const { engineParams, updateEngineParams } = useStore()
  const [isDragging, setIsDragging] = useState(false)

  return (
    <div className="max-w-6xl mx-auto">
      <DashboardCard className="p-8">
        <h2 className="text-2xl font-racing tracking-wider text-f1-red mb-6">
          ENGINE PARAMETERS
        </h2>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* 3D Visualization */}
          <div className="h-96 bg-dashboard-bg border border-f1-gray/30 rounded">
            <Engine3D params={engineParams} />
          </div>

          {/* Controls */}
          <div className="space-y-6">
            {/* RPM Slider */}
            <div>
              <div className="flex justify-between mb-2">
                <label className="text-sm font-mono text-f1-light">RPM</label>
                <span className="text-sm font-racing text-dashboard-text">
                  {engineParams.rpm.toLocaleString()}
                </span>
              </div>
              <input
                type="range"
                min="0"
                max="15000"
                step="100"
                value={engineParams.rpm}
                onChange={(e) =>
                  updateEngineParams({ rpm: parseInt(e.target.value) })
                }
                onMouseDown={() => setIsDragging(true)}
                onMouseUp={() => setIsDragging(false)}
                className="w-full h-2 bg-f1-gray rounded-lg appearance-none cursor-pointer accent-f1-red"
                style={{
                  background: `linear-gradient(to right, #E10600 0%, #E10600 ${(engineParams.rpm / 15000) * 100}%, #38383F ${(engineParams.rpm / 15000) * 100}%, #38383F 100%)`,
                }}
              />
              <div className="flex justify-between text-xs text-f1-gray font-mono mt-1">
                <span>IDLE</span>
                <span>MAX</span>
              </div>
            </div>

            {/* Fuel Mix Slider */}
            <div>
              <div className="flex justify-between mb-2">
                <label className="text-sm font-mono text-f1-light">FUEL MIX</label>
                <span className="text-sm font-racing text-dashboard-text">
                  {engineParams.fuelMix}%
                </span>
              </div>
              <input
                type="range"
                min="0"
                max="100"
                step="1"
                value={engineParams.fuelMix}
                onChange={(e) =>
                  updateEngineParams({ fuelMix: parseInt(e.target.value) })
                }
                className="w-full h-2 bg-f1-gray rounded-lg appearance-none cursor-pointer accent-dashboard-text"
                style={{
                  background: `linear-gradient(to right, #00FF88 0%, #00FF88 ${engineParams.fuelMix}%, #38383F ${engineParams.fuelMix}%, #38383F 100%)`,
                }}
              />
              <div className="flex justify-between text-xs text-f1-gray font-mono mt-1">
                <span>LEAN</span>
                <span>RICH</span>
              </div>
            </div>

            {/* DRS Toggle */}
            <div>
              <div className="flex justify-between items-center mb-4">
                <label className="text-sm font-mono text-f1-light">DRS</label>
                <button
                  onClick={() => updateEngineParams({ drs: !engineParams.drs })}
                  className={`relative w-16 h-8 rounded-full transition-colors ${
                    engineParams.drs ? 'bg-dashboard-text' : 'bg-f1-gray'
                  }`}
                >
                  <motion.div
                    className="absolute top-1 left-1 w-6 h-6 bg-f1-light rounded-full"
                    animate={{
                      x: engineParams.drs ? 28 : 0,
                    }}
                    transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                  />
                </button>
              </div>
            </div>

            {/* Boost Slider */}
            <div>
              <div className="flex justify-between mb-2">
                <label className="text-sm font-mono text-f1-light">BOOST</label>
                <span className="text-sm font-racing text-dashboard-text">
                  {engineParams.boost.toFixed(1)} BAR
                </span>
              </div>
              <input
                type="range"
                min="0"
                max="100"
                step="1"
                value={engineParams.boost}
                onChange={(e) =>
                  updateEngineParams({ boost: parseInt(e.target.value) })
                }
                className="w-full h-2 bg-f1-gray rounded-lg appearance-none cursor-pointer accent-f1-red"
                style={{
                  background: `linear-gradient(to right, #E10600 0%, #E10600 ${engineParams.boost}%, #38383F ${engineParams.boost}%, #38383F 100%)`,
                }}
              />
              <div className="flex justify-between text-xs text-f1-gray font-mono mt-1">
                <span>0 BAR</span>
                <span>2.0 BAR</span>
              </div>
            </div>

            {/* Telemetry Display */}
            <div className="mt-6 p-4 bg-dashboard-bg border border-f1-gray/30 rounded">
              <div className="grid grid-cols-2 gap-4 text-xs font-mono">
                <div>
                  <div className="text-f1-gray mb-1">POWER</div>
                  <div className="text-dashboard-text">
                    {Math.round((engineParams.rpm / 15000) * 1000)} HP
                  </div>
                </div>
                <div>
                  <div className="text-f1-gray mb-1">EFFICIENCY</div>
                  <div className="text-dashboard-text">
                    {Math.round((engineParams.fuelMix / 100) * 95)}%
                  </div>
                </div>
                <div>
                  <div className="text-f1-gray mb-1">DRAG</div>
                  <div className="text-dashboard-text">
                    {engineParams.drs ? 'LOW' : 'HIGH'}
                  </div>
                </div>
                <div>
                  <div className="text-f1-gray mb-1">PRESSURE</div>
                  <div className="text-dashboard-text">
                    {(engineParams.boost / 50).toFixed(2)} BAR
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </DashboardCard>
    </div>
  )
}

