'use client'

import { useState, useEffect, useMemo, useRef } from 'react'
import PhysicsLetter from './PhysicsLetter'
import { computePretextLayout, measureCharacters } from '@/lib/pretext'
import type { LetterTarget } from '@/lib/dustParticle'

interface PhysicsNameProps {
  carBounds?: { x: number; y: number; width: number; height: number }
  /** Pre-computed letter positions from CarLanding (shared with DustCanvas). */
  letterTargets?: LetterTarget[]
}

interface LetterPosition {
  x: number
  y: number
  index: number
}

export default function PhysicsName({ carBounds, letterTargets }: PhysicsNameProps) {
  const [containerSize, setContainerSize] = useState({ width: 1920, height: 1080 })
  const [letterPositions, setLetterPositions] = useState<LetterPosition[]>([])
  const containerRef = useRef<HTMLDivElement>(null)
  const name = 'AARYA PATEL'
  const isMobile = containerSize.width < 768
  const letterSize = isMobile ? 40 : 100
  const font = isMobile ? '700 40px "Courier New"' : '700 100px "Courier New"'
  const lineHeight = isMobile ? 64 : 120

  // Split into letters, but keep track of spaces for positioning
  const letters: Array<{ char: string; index: number }> = []
  name.split('').forEach((char) => {
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

  // Use pre-computed positions from CarLanding when available, otherwise compute internally
  const targetPositions = useMemo(() => {
    if (letterTargets && letterTargets.length > 0) {
      return letterTargets.map(t => ({ x: t.x, y: t.y }))
    }

    if (containerSize.width <= 0 || containerSize.height <= 0) {
      return []
    }

    const { lines } = computePretextLayout({
      text: name,
      font,
      lineHeight,
      maxWidth: isMobile ? containerSize.width * 0.52 : containerSize.width * 0.9,
      fit: isMobile ? 'container' : 'balance',
    })

    const measuredTargets: Array<{ x: number; y: number }> = []
    const startY = containerSize.height * (isMobile ? 0.14 : 0.1)

    lines.forEach((line, lineIndex) => {
      const characterWidths = measureCharacters(line.text, font)
      let cursorX = containerSize.width / 2 - line.width / 2

      Array.from(line.text).forEach((character, characterIndex) => {
        const width = characterWidths[characterIndex] ?? letterSize

        if (character !== ' ') {
          measuredTargets.push({
            x: cursorX,
            y: startY + lineIndex * lineHeight,
          })
        }

        cursorX += width
      })
    })

    return measuredTargets
  }, [letterTargets, containerSize.height, containerSize.width, font, isMobile, letterSize, lineHeight, name])

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
            targetX={targetPositions[letterObj.index]?.x}
            targetY={targetPositions[letterObj.index]?.y}
            letterSize={letterSize}
            animateEntrance={!!letterTargets}
          />
        </div>
      ))}
    </div>
  )
}
