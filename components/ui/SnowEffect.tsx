'use client'

import { useEffect, useRef, useState, useCallback } from 'react'
import { motion } from 'framer-motion'
import Image from 'next/image'

interface Snowflake {
  id: number
  x: number
  y: number
  size: number
  speed: number
  sway: number
  swaySpeed: number
  opacity: number
}

interface SnowPile {
  x: number
  height: number
}

export default function SnowEffect() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const [isHoveringSnow, setIsHoveringSnow] = useState(false)
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 })
  const [isShoveling, setIsShoveling] = useState(false)
  const snowflakesRef = useRef<Snowflake[]>([])
  const snowPileRef = useRef<SnowPile[]>([])
  const animationFrameRef = useRef<number>()
  const lastTimeRef = useRef<number>(0)

  // Initialize snowflakes
  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    const initSnow = () => {
      const width = container.offsetWidth
      const height = container.offsetHeight
      const flakes: Snowflake[] = []

      for (let i = 0; i < 150; i++) {
        flakes.push({
          id: i,
          x: Math.random() * width,
          y: Math.random() * height - height, // Start above screen
          size: Math.random() * 4 + 2,
          speed: Math.random() * 2 + 1,
          sway: Math.random() * Math.PI * 2,
          swaySpeed: Math.random() * 0.02 + 0.01,
          opacity: Math.random() * 0.5 + 0.5,
        })
      }

      snowflakesRef.current = flakes

      // Initialize snow pile (array of heights at each x position)
      const pileWidth = width
      const pile: SnowPile[] = []
      for (let i = 0; i < pileWidth; i += 2) {
        pile.push({ x: i, height: 0 })
      }
      snowPileRef.current = pile
    }

    initSnow()
    window.addEventListener('resize', initSnow)
    return () => window.removeEventListener('resize', initSnow)
  }, [])

  // Animation loop
  useEffect(() => {
    const canvas = canvasRef.current
    const container = containerRef.current
    if (!canvas || !container) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const animate = (currentTime: number) => {
      const deltaTime = currentTime - lastTimeRef.current
      lastTimeRef.current = currentTime

      const width = container.offsetWidth
      const height = container.offsetHeight

      canvas.width = width
      canvas.height = height

      ctx.clearRect(0, 0, width, height)

      // Update and draw snowflakes
      snowflakesRef.current.forEach((flake) => {
        // Update position
        flake.y += flake.speed * (deltaTime / 16) // Normalize to 60fps
        flake.x += Math.sin(flake.sway) * 0.5
        flake.sway += flake.swaySpeed

        // Check if hit bottom or snow pile
        const pileIndex = Math.floor(flake.x)
        const pileHeight = snowPileRef.current[pileIndex]?.height || 0
        const groundY = height - 100 - pileHeight // 100px from bottom for pile area

        if (flake.y >= groundY) {
          // Add to snow pile
          if (snowPileRef.current[pileIndex]) {
            snowPileRef.current[pileIndex].height += 0.5
          }
          // Reset flake
          flake.y = -10
          flake.x = Math.random() * width
        }

        // Wrap around horizontally
        if (flake.x < 0) flake.x = width
        if (flake.x > width) flake.x = 0

        // Draw snowflake
        ctx.beginPath()
        ctx.arc(flake.x, flake.y, flake.size, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(255, 255, 255, ${flake.opacity})`
        ctx.fill()
      })

      // Draw and update snow pile
      ctx.fillStyle = 'rgba(255, 255, 255, 0.9)'
      snowPileRef.current.forEach((pile, index) => {
        if (pile.height > 0) {
          const x = pile.x
          const y = height - 100 - pile.height
          ctx.fillRect(x, y, 2, pile.height)
        }
      })

      // Shoveling interaction
      if (isShoveling && mousePos.y > height - 150) {
        const shovelX = mousePos.x
        const shovelWidth = 100
        const shovelStart = Math.max(0, shovelX - shovelWidth / 2)
        const shovelEnd = Math.min(width, shovelX + shovelWidth / 2)

        // Remove snow from shovel area
        for (let i = Math.floor(shovelStart); i < Math.floor(shovelEnd); i += 2) {
          if (snowPileRef.current[i]) {
            snowPileRef.current[i].height = Math.max(0, snowPileRef.current[i].height - 2)
          }
        }

        // Create snow particles when shoveling
        for (let i = 0; i < 5; i++) {
          const particleX = shovelX + (Math.random() - 0.5) * shovelWidth
          const particleY = height - 100 - (snowPileRef.current[Math.floor(particleX)]?.height || 0)
          
          ctx.beginPath()
          ctx.arc(particleX, particleY, 3, 0, Math.PI * 2)
          ctx.fillStyle = 'rgba(255, 255, 255, 0.8)'
          ctx.fill()
        }
      }

      animationFrameRef.current = requestAnimationFrame(animate)
    }

    lastTimeRef.current = performance.now()
    animationFrameRef.current = requestAnimationFrame(animate)

    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current)
      }
    }
  }, [isShoveling, mousePos])


  const handleMouseDown = useCallback(() => {
    if (isHoveringSnow) {
      setIsShoveling(true)
    }
  }, [isHoveringSnow])

  const handleMouseUp = useCallback(() => {
    setIsShoveling(false)
  }, [])

  return (
    <>
      <div
        ref={containerRef}
        className="fixed inset-0 pointer-events-none z-0"
        style={{ cursor: 'none' }}
      >
        <canvas
          ref={canvasRef}
          className="absolute inset-0"
          style={{ pointerEvents: 'auto' }}
          onMouseMove={(e) => {
            const container = containerRef.current
            if (!container) return
            const rect = container.getBoundingClientRect()
            const x = e.clientX - rect.left
            const y = e.clientY - rect.top
            const height = container.offsetHeight
            setMousePos({ x, y })
            setIsHoveringSnow(y > height - 150)
          }}
          onMouseDown={handleMouseDown}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseUp}
        />
      </div>
      {/* Shovel Cursor - Temporarily commented out */}
      {/* {isHoveringSnow && (
        <motion.div
          className="fixed pointer-events-none z-50"
          style={{
            left: mousePos.x - 30,
            top: mousePos.y - 30,
            mixBlendMode: 'normal',
          }}
          animate={{
            rotate: isShoveling ? [0, 15, -15, 0] : 0,
            scale: isShoveling ? 1.2 : 1,
          }}
          transition={{ duration: 0.3 }}
        >
          <Image
            src="/images/shovel-cursor.png"
            alt="Shovel"
            width={60}
            height={60}
            className="drop-shadow-lg"
            style={{ filter: 'drop-shadow(0 4px 8px rgba(0, 0, 0, 0.5))' }}
          />
        </motion.div>
      )} */}
    </>
  )
}

