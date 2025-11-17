'use client'

import { useState, useEffect, useRef } from 'react'
import { motion, useMotionValue, useSpring } from 'framer-motion'

interface PhysicsLetterProps {
  letter: string
  index: number
  totalLetters: number
  containerWidth: number
  containerHeight: number
  carBounds?: { x: number; y: number; width: number; height: number }
  otherLetters?: Array<{ x: number; y: number; index: number }>
  onPositionUpdate?: (index: number, x: number, y: number) => void
}

export default function PhysicsLetter({
  letter,
  index,
  totalLetters,
  containerWidth,
  containerHeight,
  carBounds,
  otherLetters = [],
  onPositionUpdate,
}: PhysicsLetterProps) {
  const letterRef = useRef<HTMLDivElement>(null)
  const [isDragging, setIsDragging] = useState(false)
  const [velocity, setVelocity] = useState({ x: 0, y: 0 })
  const [isMobile, setIsMobile] = useState(false)
  
  // Check if mobile on mount
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(typeof window !== 'undefined' && window.innerWidth < 768)
    }
    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])
  
  const letterSize = isMobile ? 40 : 100
  const spacing = isMobile ? 8 : 15
  const spaceWidth = isMobile ? 20 : 40 // Width of space between words
  
  // Calculate initial positions accounting for space in "AARYA PATEL"
  // "AARYA" = 5 letters, then space, then "PATEL" = 5 letters
  let initialX: number
  if (index < 5) {
    // First word "AARYA" (indices 0-4)
    const firstWordWidth = 5 * (letterSize + spacing) - spacing
    initialX = containerWidth / 2 - (firstWordWidth + spaceWidth + 5 * (letterSize + spacing) - spacing) / 2 + index * (letterSize + spacing)
  } else {
    // Second word "PATEL" (indices 5-9)
    const firstWordWidth = 5 * (letterSize + spacing) - spacing
    const offset = firstWordWidth + spaceWidth
    initialX = containerWidth / 2 - (firstWordWidth + spaceWidth + 5 * (letterSize + spacing) - spacing) / 2 + offset + (index - 5) * (letterSize + spacing)
  }
  // Better vertical positioning on mobile (centered) vs desktop (top)
  const initialY = typeof window !== 'undefined' && window.innerWidth < 768 
    ? containerHeight * 0.15 
    : containerHeight * 0.1
  
  const x = useMotionValue(initialX)
  const y = useMotionValue(initialY)
  
  const springConfig = { damping: 25, stiffness: 400 }
  const xSpring = useSpring(x, springConfig)
  const ySpring = useSpring(y, springConfig)
  
  // Reset to initial position on mount and when container size changes
  useEffect(() => {
    let resetX: number
    if (index < 5) {
      const firstWordWidth = 5 * (letterSize + spacing) - spacing
      resetX = containerWidth / 2 - (firstWordWidth + spaceWidth + 5 * (letterSize + spacing) - spacing) / 2 + index * (letterSize + spacing)
    } else {
      const firstWordWidth = 5 * (letterSize + spacing) - spacing
      const offset = firstWordWidth + spaceWidth
      resetX = containerWidth / 2 - (firstWordWidth + spaceWidth + 5 * (letterSize + spacing) - spacing) / 2 + offset + (index - 5) * (letterSize + spacing)
    }
    const resetY = containerHeight * 0.1
    
    x.set(resetX)
    y.set(resetY)
    setVelocity({ x: 0, y: 0 })
  }, [containerWidth, containerHeight, index, x, y]) // Reset when container size changes
  
  // Jiggle animation when not dragging (disabled on mobile to keep letters in order)
  useEffect(() => {
    if (isDragging || isMobile) return // Disable jiggle on mobile
    
    const jiggleAmount = 4
    const jiggleInterval = 2000 + Math.random() * 2000
    
    const interval = setInterval(() => {
      const jiggleX = (Math.random() - 0.5) * jiggleAmount
      const jiggleY = (Math.random() - 0.5) * jiggleAmount
      
      x.set(x.get() + jiggleX)
      y.set(y.get() + jiggleY)
    }, jiggleInterval)
    
    return () => clearInterval(interval)
  }, [isDragging, isMobile, x, y])
  
  // Physics simulation (disabled on mobile to keep letters in order)
  useEffect(() => {
    if (isDragging || isMobile) return // Disable physics on mobile
    
    let animationFrame: number
    let lastTime = Date.now()
    
    const update = () => {
      const currentTime = Date.now()
      const deltaTime = (currentTime - lastTime) / 1000
      lastTime = currentTime
      
      if (deltaTime > 0.1) {
        animationFrame = requestAnimationFrame(update)
        return
      }
      
      let currentX = x.get()
      let currentY = y.get()
      let vx = velocity.x
      let vy = velocity.y
      
      // Apply friction
      vx *= 0.96
      vy *= 0.96
      
      // Boundary collision
      if (currentX < 0) {
        currentX = 0
        vx = -vx * 0.7
      }
      if (currentX + letterSize > containerWidth) {
        currentX = containerWidth - letterSize
        vx = -vx * 0.7
      }
      if (currentY < 0) {
        currentY = 0
        vy = -vy * 0.7
      }
      if (currentY + letterSize > containerHeight) {
        currentY = containerHeight - letterSize
        vy = -vy * 0.7
      }
      
      // Letter-to-letter collision
      otherLetters.forEach((other) => {
        if (other.index === index) return
        
        const dx = currentX - other.x
        const dy = currentY - other.y
        const distance = Math.sqrt(dx * dx + dy * dy)
        const minDistance = letterSize * 1.2
        
        if (distance < minDistance && distance > 0) {
          const overlap = minDistance - distance
          const pushX = (dx / distance) * overlap * 0.5
          const pushY = (dy / distance) * overlap * 0.5
          
          currentX += pushX
          currentY += pushY
          
          // Add bounce velocity
          const bounceForce = 2
          vx += (dx / distance) * bounceForce
          vy += (dy / distance) * bounceForce
        }
      })
      
      // Car collision
      if (carBounds) {
        const letterCenterX = currentX + letterSize / 2
        const letterCenterY = currentY + letterSize / 2
        
        if (
          letterCenterX > carBounds.x &&
          letterCenterX < carBounds.x + carBounds.width &&
          letterCenterY > carBounds.y &&
          letterCenterY < carBounds.y + carBounds.height
        ) {
          // Bounce off car
          const carCenterX = carBounds.x + carBounds.width / 2
          const carCenterY = carBounds.y + carBounds.height / 2
          
          const dx = letterCenterX - carCenterX
          const dy = letterCenterY - carCenterY
          const distance = Math.sqrt(dx * dx + dy * dy)
          
          if (distance > 0) {
            const pushForce = 8
            vx += (dx / distance) * pushForce
            vy += (dy / distance) * pushForce
          }
        }
      }
      
      // Update position
      currentX += vx * deltaTime * 60
      currentY += vy * deltaTime * 60
      
      x.set(currentX)
      y.set(currentY)
      setVelocity({ x: vx, y: vy })
      
      if (onPositionUpdate) {
        onPositionUpdate(index, currentX, currentY)
      }
      
      animationFrame = requestAnimationFrame(update)
    }
    
    animationFrame = requestAnimationFrame(update)
    
    return () => {
      if (animationFrame) cancelAnimationFrame(animationFrame)
    }
  }, [isDragging, isMobile, x, y, velocity, containerWidth, containerHeight, carBounds, letterSize, otherLetters, index, onPositionUpdate])
  
  const handleDragStart = () => {
    if (isMobile) return // Disable dragging on mobile
    setIsDragging(true)
    setVelocity({ x: 0, y: 0 })
  }
  
  const handleDrag = (_: any, info: any) => {
    if (isMobile) return
    setVelocity({ x: info.velocity.x, y: info.velocity.y })
  }
  
  const handleDragEnd = () => {
    if (isMobile) return
    setIsDragging(false)
  }
  
  return (
    <motion.div
      ref={letterRef}
      drag={!isMobile} // Disable drag on mobile
      dragMomentum={true}
      dragElastic={0.2}
      onDragStart={handleDragStart}
      onDrag={handleDrag}
      onDragEnd={handleDragEnd}
      style={{
        x: xSpring,
        y: ySpring,
        width: letterSize,
        height: letterSize,
      }}
      className={`absolute select-none z-20 ${isMobile ? '' : 'cursor-grab active:cursor-grabbing'}`}
      whileHover={isMobile ? {} : { scale: 1.1 }}
      whileTap={isMobile ? {} : { scale: 0.95 }}
    >
      <motion.div
        className={`text-white font-bold select-none ${
          isMobile 
            ? 'text-3xl md:text-5xl lg:text-7xl' 
            : 'text-7xl md:text-9xl lg:text-[10rem]'
        }`}
        style={{
          fontFamily: 'system-ui, -apple-system, sans-serif',
          textShadow: isMobile 
            ? '0 0 15px rgba(255, 255, 255, 0.6), 0 0 30px rgba(255, 255, 255, 0.3)'
            : '0 0 30px rgba(255, 255, 255, 0.6), 0 0 60px rgba(255, 255, 255, 0.3)',
          WebkitTextStroke: isMobile ? '2px white' : '3px white',
          WebkitTextFillColor: 'transparent',
          filter: 'drop-shadow(0 0 10px rgba(255, 255, 255, 0.8))',
        }}
        animate={isDragging || isMobile ? {} : {
          rotate: [0, 3, -3, 2, -2, 0],
        }}
        transition={{
          duration: 3 + Math.random() * 2,
          repeat: Infinity,
          repeatType: 'reverse',
        }}
      >
        {letter}
      </motion.div>
    </motion.div>
  )
}

