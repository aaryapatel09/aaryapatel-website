'use client'

import { ReactNode, useRef, useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import CodeRain from '@/components/ui/CodeRain'

interface CodeRainCardProps {
  children: ReactNode
  className?: string
}

export default function CodeRainCard({ children, className = '' }: CodeRainCardProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const [size, setSize] = useState({ w: 0, h: 0 })

  useEffect(() => {
    const el = containerRef.current
    if (!el) return
    const ro = new ResizeObserver((entries) => {
      const { width, height } = entries[0].contentRect
      setSize({ w: Math.round(width), h: Math.round(height) })
    })
    ro.observe(el)
    return () => ro.disconnect()
  }, [])

  return (
    <motion.div
      ref={containerRef}
      initial={{ opacity: 0, y: 20, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{
        type: 'spring',
        stiffness: 100,
        damping: 15,
        duration: 0.5,
      }}
      whileHover={{
        y: -8,
        scale: 1.02,
        transition: { type: 'spring', stiffness: 400, damping: 17 },
      }}
      className={`bg-black border border-white/20 p-6 relative overflow-hidden ${className}`}
    >
      {/* Code rain background */}
      {size.w > 0 && size.h > 0 && (
        <CodeRain width={size.w} height={size.h} />
      )}

      {/* Gradient overlay on hover */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0"
        whileHover={{ opacity: 1 }}
        transition={{ duration: 0.3 }}
      />

      <div className="relative z-10">
        {children}
      </div>
    </motion.div>
  )
}
