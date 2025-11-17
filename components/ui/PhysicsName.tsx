'use client'

import { useState, useEffect, useRef } from 'react'
import PhysicsLetter from './PhysicsLetter'

interface PhysicsNameProps {
  carBounds?: { x: number; y: number; width: number; height: number }
}

interface LetterPosition {
  x: number
  y: number
  index: number
}

export default function PhysicsName({ carBounds }: PhysicsNameProps) {
  const [containerSize, setContainerSize] = useState({ width: 1920, height: 1080 })
  const [letterPositions, setLetterPositions] = useState<LetterPosition[]>([])
  const containerRef = useRef<HTMLDivElement>(null)
  
  const name = 'AARYA PATEL'
  // Split into letters, but keep track of spaces for positioning
  const letters: Array<{ char: string; index: number }> = []
  name.split('').forEach((char, i) => {
    if (char !== ' ') {
      letters.push({ char, index: letters.length })
    }
  })
  
  useEffect(() => {
    const updateSize = () => {
      if (containerRef.current) {
        setContainerSize({
          width: containerRef.current.offsetWidth,
          height: containerRef.current.offsetHeight,
        })
      }
    }
    
    updateSize()
    window.addEventListener('resize', updateSize)
    
    return () => window.removeEventListener('resize', updateSize)
  }, [])
  
  const handlePositionUpdate = (index: number, x: number, y: number) => {
    setLetterPositions((prev) => {
      const updated = [...prev]
      const existingIndex = updated.findIndex((p) => p.index === index)
      if (existingIndex >= 0) {
        updated[existingIndex] = { x, y, index }
      } else {
        updated.push({ x, y, index })
      }
      return updated
    })
  }
  
  return (
    <div
      ref={containerRef}
      className="absolute inset-0"
      style={{ zIndex: 5, pointerEvents: 'none' }}
    >
      {letters.map((letterObj) => (
        <div key={`${letterObj.char}-${letterObj.index}`} style={{ pointerEvents: 'auto' }}>
          <PhysicsLetter
            letter={letterObj.char}
            index={letterObj.index}
            totalLetters={letters.length}
            containerWidth={containerSize.width}
            containerHeight={containerSize.height}
            carBounds={carBounds}
            otherLetters={letterPositions.filter((p) => p.index !== letterObj.index)}
            onPositionUpdate={handlePositionUpdate}
          />
        </div>
      ))}
    </div>
  )
}

