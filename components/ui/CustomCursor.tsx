'use client'

import { useEffect, useState, useRef } from 'react'
import { motion, useMotionValue, useSpring } from 'framer-motion'
import Image from 'next/image'

export default function CustomCursor() {
  const [isVisible, setIsVisible] = useState(false)
  const [isMobile, setIsMobile] = useState(false)
  const hasMovedRef = useRef(false)
  const [hasMoved, setHasMoved] = useState(false)
  const [isHovering, setIsHovering] = useState(false)
  const cursorX = useMotionValue(-100)
  const cursorY = useMotionValue(-100)

  const springConfig = { damping: 25, stiffness: 700 }
  const cursorXSpring = useSpring(cursorX, springConfig)
  const cursorYSpring = useSpring(cursorY, springConfig)

  useEffect(() => {
    // Check if device is actually touch-primary (not just touch-capable).
    // Windows 11 laptops often have touchscreens but are used with a mouse —
    // those report maxTouchPoints > 0 but still have hover: hover and pointer: fine.
    const checkMobile = () => {
      const isTouchPrimary = window.matchMedia('(hover: none) and (pointer: coarse)').matches
      const isSmallScreen = window.innerWidth < 768
      setIsMobile(isTouchPrimary || isSmallScreen)
    }

    checkMobile()
    window.addEventListener('resize', checkMobile)

    const moveCursor = (e: MouseEvent) => {
      cursorX.set(e.clientX - 20) // Offset by half the cursor size (40px / 2)
      cursorY.set(e.clientY - 20)
      if (!hasMovedRef.current) {
        hasMovedRef.current = true
        setHasMoved(true)
      }
      setIsVisible(true)
    }

    const handleMouseEnter = () => setIsVisible(true)
    const handleMouseLeave = () => setIsVisible(false)

    // Check for interactive elements
    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement
      if (
        target.tagName === 'A' ||
        target.tagName === 'BUTTON' ||
        target.closest('a') ||
        target.closest('button') ||
        target.closest('.interactive-element')
      ) {
        setIsHovering(true)
      } else {
        setIsHovering(false)
      }
    }

    // Only add mouse event listeners on non-mobile devices
    if (!isMobile) {
      window.addEventListener('mousemove', moveCursor)
      window.addEventListener('mouseenter', handleMouseEnter)
      window.addEventListener('mouseleave', handleMouseLeave)
      window.addEventListener('mouseover', handleMouseOver)
    }

    return () => {
      window.removeEventListener('resize', checkMobile)
      if (!isMobile) {
        window.removeEventListener('mousemove', moveCursor)
        window.removeEventListener('mouseenter', handleMouseEnter)
        window.removeEventListener('mouseleave', handleMouseLeave)
        window.removeEventListener('mouseover', handleMouseOver)
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
        x: cursorXSpring,
        y: cursorYSpring,
        opacity: isVisible && hasMoved ? 1 : 0,
      }}
    >
      <motion.div
        animate={{
          scale: isHovering ? 1.5 : 1,
          rotate: isHovering ? 180 : 0,
        }}
        transition={{ type: 'spring', stiffness: 500, damping: 25 }}
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

