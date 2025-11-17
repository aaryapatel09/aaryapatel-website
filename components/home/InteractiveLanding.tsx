'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import EngineSchematicSVG from '@/components/ui/EngineSchematicSVG'

interface InteractiveLandingProps {
  onStart: () => void
}

export default function InteractiveLanding({ onStart }: InteractiveLandingProps) {
  const [isReady, setIsReady] = useState(false)
  const [hoveredPart, setHoveredPart] = useState<string | null>(null)

  useEffect(() => {
    // Simulate system initialization
    const timer = setTimeout(() => setIsReady(true), 1500)
    return () => clearTimeout(timer)
  }, [])

  const engineParts = [
    { id: 'turbo', label: 'Turbo', x: 20, y: 30 },
    { id: 'engine', label: 'V6 Engine', x: 50, y: 50 },
    { id: 'exhaust', label: 'Exhaust', x: 80, y: 70 },
  ]

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="relative w-full h-screen flex items-center justify-center bg-dashboard-bg overflow-hidden"
    >
      {/* Animated background grid */}
      <div className="absolute inset-0 opacity-5">
        <div className="w-full h-full" style={{
          backgroundImage: `
            linear-gradient(rgba(225, 6, 0, 0.1) 1px, transparent 1px),
            linear-gradient(90deg, rgba(225, 6, 0, 0.1) 1px, transparent 1px)
          `,
          backgroundSize: '50px 50px',
        }} />
      </div>

      {/* Main content */}
      <div className="relative z-10 flex flex-col items-center space-y-12">
        {/* Engine Schematic */}
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 1, delay: 0.3 }}
          className="relative w-64 h-64 md:w-96 md:h-96"
        >
          <EngineSchematicSVG
            hoveredPart={hoveredPart}
            onPartHover={setHoveredPart}
          />
          
          {/* Interactive part labels */}
          {engineParts.map((part) => (
            <motion.div
              key={part.id}
              className="absolute"
              style={{
                left: `${part.x}%`,
                top: `${part.y}%`,
              }}
              onHoverStart={() => setHoveredPart(part.id)}
              onHoverEnd={() => setHoveredPart(null)}
            >
              <AnimatePresence>
                {hoveredPart === part.id && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    className="px-3 py-1 bg-dashboard-bg border border-f1-red rounded text-xs font-mono text-f1-red whitespace-nowrap"
                  >
                    {part.label}
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </motion.div>

        {/* Title */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="text-center"
        >
          <h1 className="text-4xl md:text-6xl font-racing tracking-wider text-f1-light mb-4">
            AARYA PATEL
          </h1>
          <p className="text-sm md:text-base font-mono text-f1-gray">
            F1 Engineering • Software • Powertrains
          </p>
        </motion.div>

        {/* Start Button */}
        <AnimatePresence>
          {isReady && (
            <motion.button
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0, opacity: 0 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={onStart}
              className="relative px-8 py-4 bg-f1-red text-f1-light font-racing tracking-wider text-lg border-2 border-f1-red interactive-element group"
            >
              <span className="relative z-10">CLICK TO START</span>
              <motion.div
                className="absolute inset-0 bg-f1-red opacity-0 group-hover:opacity-20"
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
              />
            </motion.button>
          )}
        </AnimatePresence>

        {/* Loading indicator */}
        {!isReady && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex items-center space-x-2 text-f1-gray text-xs font-mono"
          >
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
              className="w-4 h-4 border-2 border-f1-red border-t-transparent rounded-full"
            />
            <span>INITIALIZING SYSTEMS...</span>
          </motion.div>
        )}
      </div>

      {/* Telemetry data overlay */}
      <div className="absolute bottom-4 left-4 right-4 md:left-auto md:right-8 md:w-64">
        <div className="bg-dashboard-bg/80 border border-f1-gray/30 p-4 font-mono text-xs">
          <div className="flex justify-between mb-2">
            <span className="text-f1-gray">RPM</span>
            <span className="text-dashboard-text telemetry-pulse">8500</span>
          </div>
          <div className="flex justify-between mb-2">
            <span className="text-f1-gray">BOOST</span>
            <span className="text-dashboard-text">1.2 BAR</span>
          </div>
          <div className="flex justify-between">
            <span className="text-f1-gray">TEMP</span>
            <span className="text-dashboard-text">95°C</span>
          </div>
        </div>
      </div>
    </motion.div>
  )
}

