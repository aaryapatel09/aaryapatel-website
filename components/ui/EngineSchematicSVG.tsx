'use client'

import { motion } from 'framer-motion'

interface EngineSchematicSVGProps {
  hoveredPart: string | null
  onPartHover: (part: string | null) => void
}

export default function EngineSchematicSVG({
  hoveredPart,
  onPartHover,
}: EngineSchematicSVGProps) {
  const parts = [
    {
      id: 'turbo',
      path: 'M50 30 L70 30 L75 40 L70 50 L50 50 L45 40 Z',
      color: '#E10600',
    },
    {
      id: 'engine',
      path: 'M30 50 L70 50 L75 70 L70 90 L30 90 L25 70 Z',
      color: '#38383F',
    },
    {
      id: 'exhaust',
      path: 'M70 70 L90 70 L95 80 L90 90 L70 90 L65 80 Z',
      color: '#00FF88',
    },
  ]

  return (
    <svg
      viewBox="0 0 120 120"
      className="w-full h-full"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      {parts.map((part) => (
        <motion.path
          key={part.id}
          d={part.path}
          fill={part.color}
          stroke={hoveredPart === part.id ? '#F4F4F4' : 'transparent'}
          strokeWidth="2"
          initial={{ opacity: 0.7 }}
          animate={{
            opacity: hoveredPart === part.id ? 1 : 0.7,
            scale: hoveredPart === part.id ? 1.05 : 1,
          }}
          transition={{ duration: 0.2 }}
          onMouseEnter={() => onPartHover(part.id)}
          onMouseLeave={() => onPartHover(null)}
          className="cursor-pointer"
        />
      ))}
      
      {/* Connecting lines */}
      <line
        x1="70"
        y1="50"
        x2="70"
        y2="70"
        stroke="#F4F4F4"
        strokeWidth="2"
        opacity="0.3"
      />
      <line
        x1="50"
        y1="40"
        x2="30"
        y2="50"
        stroke="#F4F4F4"
        strokeWidth="2"
        opacity="0.3"
      />
    </svg>
  )
}

