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
      whileHover={{ y: -4 }}
      className={`bg-black border border-white/20 p-6 ${className}`}
    >
      {children}
    </motion.div>
  )
}

