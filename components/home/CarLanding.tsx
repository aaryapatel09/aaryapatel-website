'use client'

import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Image from 'next/image'
import PhysicsName from '@/components/ui/PhysicsName'
import ThemeToggle from '@/components/ui/ThemeToggle'

interface CarLandingProps {
  onEnter: () => void
}

export default function CarLanding({ onEnter }: CarLandingProps) {
  const [isReady, setIsReady] = useState(false)
  const [isExiting, setIsExiting] = useState(false)
  const [isHovering, setIsHovering] = useState(false)
  const [isSettled, setIsSettled] = useState(false)
  const [windowSize, setWindowSize] = useState({ width: 1920, height: 1080 })
  const [carBounds, setCarBounds] = useState<{ x: number; y: number; width: number; height: number } | undefined>()
  const carRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    // Set window size and car bounds
    if (typeof window !== 'undefined') {
      setWindowSize({ width: window.innerWidth, height: window.innerHeight })
      
      const updateCarBounds = () => {
        if (carRef.current) {
          const rect = carRef.current.getBoundingClientRect()
          setCarBounds({
            x: rect.left,
            y: rect.top,
            width: rect.width,
            height: rect.height,
          })
        }
      }
      
      const handleResize = () => {
        setWindowSize({ width: window.innerWidth, height: window.innerHeight })
        setTimeout(updateCarBounds, 100)
      }
      
      // Initial car bounds after animation settles
      setTimeout(() => {
        updateCarBounds()
        setIsReady(true)
      }, 4000) // After driving animation completes (increased for smoother animation)
      
      window.addEventListener('resize', handleResize)
      return () => {
        window.removeEventListener('resize', handleResize)
      }
    }
  }, [])
  
  // Mark as settled after driving animation
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsSettled(true)
    }, 3500) // After 3.5 seconds, car has settled (matches animation duration)
    
    return () => clearTimeout(timer)
  }, [])

  const handleClick = () => {
    setIsExiting(true)
    // Smooth transition: zoom out and fade
    setTimeout(() => {
      onEnter()
    }, 800) // Longer transition for smoother effect
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: isExiting ? 0 : 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.8, ease: 'easeInOut' }}
      className="relative w-full h-screen flex items-center justify-center overflow-hidden cursor-none"
      style={{ backgroundColor: 'var(--bg-primary)' }}
      onClick={handleClick}
    >
      {/* Theme Toggle - Top Right */}
      <div className="absolute top-6 right-6 z-30" onClick={(e) => e.stopPropagation()}>
        <ThemeToggle />
      </div>
      {/* Animated background particles */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-white rounded-full"
            initial={{
              x: Math.random() * windowSize.width,
              y: Math.random() * windowSize.height,
              opacity: 0.3,
            }}
            animate={{
              y: [null, Math.random() * windowSize.height],
              opacity: [0.3, 0.8, 0.3],
            }}
            transition={{
              duration: Math.random() * 3 + 2,
              repeat: Infinity,
              delay: Math.random() * 2,
            }}
          />
        ))}
      </div>

      {/* Physics Name Letters */}
      {isReady && !isExiting && <PhysicsName carBounds={carBounds} />}

      {/* Main F1 Car */}
      <motion.div
        ref={carRef}
        className="relative z-10"
        initial={{
          x: -windowSize.width * 0.5, // Start off-screen left
          y: windowSize.height * 0.3,
          rotate: -45, // Angled for driving effect
        }}
        animate={{
          // Driving path animation
          x: isSettled 
            ? 0 // Center position
            : [
                -windowSize.width * 0.5, // Start: off-screen left
                windowSize.width * 0.3,  // Drive to right
                windowSize.width * 0.4,  // Continue right
                windowSize.width * 0.2,  // Turn back left
                -windowSize.width * 0.1, // Drive left
                0,                        // Settle in center
              ],
          y: isSettled
            ? 0 // Center position
            : [
                windowSize.height * 0.3, // Start: upper area
                windowSize.height * 0.2,  // Move up
                windowSize.height * 0.4,  // Move down
                windowSize.height * 0.25, // Move up
                0,                         // Move to center
                0,                         // Stay in center
              ],
          rotate: isSettled
            ? 0 // Straight
            : [
                -45,  // Start angled
                -30,  // Turn
                15,   // Turn more
                -15,  // Turn back
                5,    // Almost straight
                0,    // Straight (settled)
              ],
          scale: isExiting 
            ? 0.3 
            : isHovering && isSettled 
              ? 1.05 
              : isSettled 
                ? 1 
                : [
                    0.3,  // Start very small
                    0.4,  // Grow slightly
                    0.6,  // Continue growing
                    0.8,  // Almost full size
                    0.95, // Nearly there
                    1,    // Full size when settled
                  ],
          opacity: isExiting ? 0 : 1,
        }}
        transition={{
          x: {
            duration: isSettled ? 0 : 3.5,
            ease: isSettled ? 'easeOut' : [0.25, 0.1, 0.25, 1], // Smoother cubic bezier
            times: isSettled ? undefined : [0, 0.2, 0.4, 0.6, 0.8, 1],
          },
          y: {
            duration: isSettled ? 0 : 3.5,
            ease: isSettled ? 'easeOut' : [0.25, 0.1, 0.25, 1], // Smoother cubic bezier
            times: isSettled ? undefined : [0, 0.2, 0.4, 0.6, 0.8, 1],
          },
          rotate: {
            duration: isSettled ? 0 : 3.5,
            ease: isSettled ? 'easeOut' : [0.25, 0.1, 0.25, 1], // Smoother cubic bezier
            times: isSettled ? undefined : [0, 0.2, 0.4, 0.6, 0.8, 1],
          },
          scale: {
            duration: isExiting ? 0.8 : isSettled ? 0.3 : 3.5,
            ease: isExiting ? 'easeIn' : [0.25, 0.1, 0.25, 1], // Smooth zoom in
            times: isSettled ? undefined : [0, 0.2, 0.4, 0.6, 0.8, 1],
          },
          opacity: {
            duration: isExiting ? 0.8 : 0.3,
            ease: 'easeInOut',
          },
        }}
        onHoverStart={() => !isExiting && isSettled && setIsHovering(true)}
        onHoverEnd={() => setIsHovering(false)}
      >
        <motion.div
          className="relative w-[600px] h-[400px] md:w-[800px] md:h-[500px]"
          animate={{
            filter: isExiting ? 'blur(20px)' : 'blur(0px)',
          }}
          transition={{ duration: 0.8, ease: 'easeIn' }}
          style={{ backgroundColor: 'transparent' }}
        >
          <Image
            src="/images/f1-car.png"
            alt="Formula One Car"
            fill
            className="object-contain"
            priority
            style={{ 
              mixBlendMode: 'normal',
              backgroundColor: 'transparent'
            }}
          />

          {/* Click hint - only show after car has settled */}
          <AnimatePresence>
            {isSettled && isReady && !isExiting && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{ duration: 0.5, delay: 0.3 }}
                className="absolute -bottom-16 left-1/2 transform -translate-x-1/2 text-center"
              >
                <motion.p
                  animate={{ opacity: [0.5, 1, 0.5] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                  className="text-white text-xl md:text-2xl font-mono tracking-wider"
                >
                  CLICK TO ENTER
                </motion.p>
                <motion.div
                  animate={{ y: [0, 10, 0] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                  className="text-white text-4xl mt-2"
                >
                  ↓
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </motion.div>

      {/* Glow effect on hover */}
      {isHovering && !isExiting && (
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 0.3, scale: 1.2 }}
          exit={{ opacity: 0 }}
          className="absolute inset-0 bg-white blur-3xl pointer-events-none"
        />
      )}
      
      {/* Zoom out overlay effect */}
      {isExiting && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          className="absolute inset-0 bg-black pointer-events-none z-20"
        />
      )}
    </motion.div>
  )
}

