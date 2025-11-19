'use client'

import { ReactNode } from 'react'
import { motion } from 'framer-motion'

interface DashboardCardProps {
  children: ReactNode
  className?: string
}

export default function DashboardCard({ children, className = '' }: DashboardCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ 
        type: 'spring', 
        stiffness: 100, 
        damping: 15,
        duration: 0.5
      }}
      whileHover={{ 
        y: -8, 
        scale: 1.02,
        transition: { type: 'spring', stiffness: 400, damping: 17 }
      }}
      className={`bg-black border border-white/20 p-6 relative overflow-hidden ${className}`}
    >
      {/* Gradient background on hover */}
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

