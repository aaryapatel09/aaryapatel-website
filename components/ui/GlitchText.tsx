'use client'

import { motion } from 'framer-motion'
import { useState, useEffect } from 'react'

interface GlitchTextProps {
  text: string
  className?: string
  trigger?: boolean
}

export default function GlitchText({ text, className = '', trigger = false }: GlitchTextProps) {
  const [isGlitching, setIsGlitching] = useState(false)

  useEffect(() => {
    if (trigger) {
      setIsGlitching(true)
      const timer = setTimeout(() => setIsGlitching(false), 200)
      return () => clearTimeout(timer)
    }
  }, [trigger])

  return (
    <motion.span
      className={`relative inline-block ${className}`}
      animate={isGlitching ? {
        x: [0, -2, 2, -2, 2, 0],
        textShadow: [
          '0 0 0 currentColor',
          '2px 0 0 #ff00ff, -2px 0 0 #00ffff',
          '2px 0 0 #ff00ff, -2px 0 0 #00ffff',
          '0 0 0 currentColor',
        ],
      } : {}}
      transition={{ duration: 0.3 }}
    >
      {text}
    </motion.span>
  )
}

