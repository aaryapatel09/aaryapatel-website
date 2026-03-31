'use client'

import { useEffect, useState, useRef } from 'react'
import { motion, useMotionValue } from 'framer-motion'
import Image from 'next/image'

export default function CustomCursor() {
  const [isVisible, setIsVisible] = useState(false)
  const [isMobile, setIsMobile] = useState(false)
  const hasMovedRef = useRef(false)
  const isHoveringRef = useRef(false)
  const [hasMoved, setHasMoved] = useState(false)
  const [isHovering, setIsHovering] = useState(false)
  const cursorX = useMotionValue(-100)
  const cursorY = useMotionValue(-100)

  useEffect(() => {
    // Check if device is mobile/touch device
    const checkMobile = () => {
      const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0
      const isSmallScreen = window.innerWidth < 768
      setIsMobile(isTouchDevice || isSmallScreen)
    }

    checkMobile()
    window.addEventListener('resize', checkMobile)

    const moveCursor = (e: PointerEvent) => {
      cursorX.set(e.clientX - 20) // Offset by half the cursor size (40px / 2)
      cursorY.set(e.clientY - 20)
      if (!hasMovedRef.current) {
        hasMovedRef.current = true
        setHasMoved(true)
      }
    }

    const handleMouseEnter = () => setIsVisible(true)
    const handleMouseLeave = () => setIsVisible(false)

    const updateHoverState = (e: PointerEvent) => {
      const target = e.target as HTMLElement
      const nextHovering = Boolean(
        target.tagName === 'A' ||
        target.tagName === 'BUTTON' ||
        target.tagName === 'INPUT' ||
        target.closest('a') ||
        target.closest('button') ||
        target.closest('input') ||
        target.closest('.interactive-element')
      )

      if (nextHovering !== isHoveringRef.current) {
        isHoveringRef.current = nextHovering
        setIsHovering(nextHovering)
      }
    }

    // Only add mouse event listeners on non-mobile devices
    if (!isMobile) {
      window.addEventListener('pointermove', moveCursor, { passive: true })
      window.addEventListener('pointerenter', handleMouseEnter)
      window.addEventListener('pointerleave', handleMouseLeave)
      window.addEventListener('pointerover', updateHoverState)
    }

    return () => {
      window.removeEventListener('resize', checkMobile)
      if (!isMobile) {
        window.removeEventListener('pointermove', moveCursor)
        window.removeEventListener('pointerenter', handleMouseEnter)
        window.removeEventListener('pointerleave', handleMouseLeave)
        window.removeEventListener('pointerover', updateHoverState)
      }
    }
  }, [cursorX, cursorY, isMobile])

  useEffect(() => {
    // Hide the native cursor only when the custom cursor is active.
    if (typeof document === 'undefined') return

    if (isMobile) {
      document.body.classList.remove('cursor-none')
      return
    }

    document.body.classList.add('cursor-none')
    return () => {
      document.body.classList.remove('cursor-none')
    }
  }, [isMobile])

  // Don't render cursor on mobile
  if (isMobile) {
    return null
  }

  return (
    <motion.div
      className="fixed top-0 left-0 pointer-events-none z-[9999] mix-blend-difference"
      aria-hidden="true"
      style={{
        x: cursorX,
        y: cursorY,
        opacity: isVisible && hasMoved ? 1 : 0,
      }}
    >
      <motion.div
        animate={{
          scale: isHovering ? 1.15 : 1,
        }}
        transition={{ duration: 0.12, ease: 'easeOut' }}
        className="w-10 h-10 relative"
      >
        <Image
          src="/images/cursor.png"
          alt=""
          width={40}
          height={40}
          className="object-contain"
        />
      </motion.div>
    </motion.div>
  )
}

