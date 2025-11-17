'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import Image from 'next/image'
import { useStore } from '@/store/useStore'
import ThemeToggle from '@/components/ui/ThemeToggle'
import F1Standings from '@/components/ui/F1Standings'

interface HubIcon {
  id: string
  title: string
  path: string
  emoji?: string
  image?: string
  color: string
  description: string
}

export default function MainHub() {
  const { setCurrentSection } = useStore()
  const [hoveredIcon, setHoveredIcon] = useState<string | null>(null)
  const [imageErrors, setImageErrors] = useState<Record<string, boolean>>({})

  const handleImageError = (iconId: string) => {
    setImageErrors((prev) => ({ ...prev, [iconId]: true }))
  }

  const icons: HubIcon[] = [
    {
      id: 'portfolio',
      title: 'Portfolio',
      path: '/portfolio',
      image: '/images/portfolio-car.png',
      emoji: '🏎️',
      color: 'from-white to-gray-300',
      description: 'My Projects',
    },
    {
      id: 'blog',
      title: 'Poetry',
      path: '/blog',
      image: '/images/poetry-book-icon.png',
      emoji: '📝',
      color: 'from-white to-gray-300',
      description: 'My Poems',
    },
    {
      id: 'awards',
      title: 'Awards',
      path: '/awards',
      image: '/images/trophy-icon.png',
      emoji: '🏆',
      color: 'from-white to-gray-300',
      description: 'Achievements',
    },
    {
      id: 'gallery',
      title: 'Gallery',
      path: '/gallery',
      image: '/images/camera-icon.png',
      emoji: '📸',
      color: 'from-white to-gray-300',
      description: 'Travels & Life',
    },
    {
      id: 'about',
      title: 'About',
      path: '/about',
      image: '/images/about-portrait.png',
      emoji: '👤',
      color: 'from-white to-gray-300',
      description: 'Who I Am',
    },
  ]

  return (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="min-h-screen pt-24 pb-12 relative overflow-hidden"
          style={{ backgroundColor: 'var(--bg-primary)', color: 'var(--text-primary)' }}
        >
          {/* Theme Toggle - Top Right */}
          <div className="absolute top-6 right-6 z-30">
            <ThemeToggle />
          </div>
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Floating particles */}
        {[...Array(30)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-white rounded-full"
            initial={{
              x: Math.random() * 100 + '%',
              y: Math.random() * 100 + '%',
              opacity: 0.1,
            }}
            animate={{
              y: [null, Math.random() * 100 + '%'],
              opacity: [0.1, 0.5, 0.1],
            }}
            transition={{
              duration: Math.random() * 10 + 10,
              repeat: Infinity,
              delay: Math.random() * 5,
            }}
          />
        ))}
        
        {/* Grid lines */}
        <div
          className="absolute inset-0 opacity-5"
          style={{
            backgroundImage: `
              linear-gradient(rgba(255, 255, 255, 0.1) 1px, transparent 1px),
              linear-gradient(90deg, rgba(255, 255, 255, 0.1) 1px, transparent 1px)
            `,
            backgroundSize: '50px 50px',
          }}
        />
        
        {/* Corner accent lines */}
        <div className="absolute top-0 left-0 w-32 h-32 border-t-2 border-l-2 border-white/10" />
        <div className="absolute top-0 right-0 w-32 h-32 border-t-2 border-r-2 border-white/10" />
        <div className="absolute bottom-0 left-0 w-32 h-32 border-b-2 border-l-2 border-white/10" />
        <div className="absolute bottom-0 right-0 w-32 h-32 border-b-2 border-r-2 border-white/10" />
      </div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="flex flex-col lg:flex-row gap-8 lg:gap-12">
          {/* Main Content - Icon Grid */}
          <div className="flex-1">
            {/* Title */}
            <motion.div
              initial={{ y: -20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              className="text-center mb-16"
            >
              <h1 className="text-7xl md:text-9xl lg:text-[12rem] font-bold mb-6 tracking-tight" style={{ color: 'var(--text-primary)' }}>
                WELCOME
              </h1>
              <p className="text-2xl md:text-3xl lg:text-4xl font-mono" style={{ color: 'var(--text-secondary)' }}>
                Explore my work
              </p>
            </motion.div>

            {/* Icon Grid */}
            <div className="grid grid-cols-2 md:grid-cols-5 gap-8 md:gap-12">
          {icons.map((icon, index) => (
            <motion.div
              key={icon.id}
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{
                type: 'spring',
                stiffness: 200,
                damping: 15,
                delay: index * 0.1,
              }}
              whileHover={{ scale: 1.1, rotate: 5 }}
              whileTap={{ scale: 0.95 }}
              onHoverStart={() => setHoveredIcon(icon.id)}
              onHoverEnd={() => setHoveredIcon(null)}
            >
              <Link
                href={icon.path}
                onClick={() => setCurrentSection(icon.id)}
                className="block"
              >
                <div className="relative group">
                  {/* Icon Container */}
                  <motion.div
                    className="relative h-72 md:h-96 lg:h-[28rem] rounded-2xl p-6 md:p-8 flex flex-col items-center justify-between border-4 overflow-hidden cursor-pointer"
                    style={{
                      backgroundColor: 'var(--bg-secondary)',
                      borderColor: hoveredIcon === icon.id 
                        ? 'var(--text-primary)' 
                        : 'var(--border-color)',
                    }}
                    animate={{
                      boxShadow: hoveredIcon === icon.id
                        ? '0 0 60px rgba(255, 255, 255, 0.8), 0 0 100px rgba(255, 255, 255, 0.4), inset 0 0 50px rgba(255, 255, 255, 0.1)'
                        : '0 0 0px rgba(255, 255, 255, 0)',
                    }}
                  >
                    {/* Animated grid pattern */}
                    <motion.div
                      className="absolute inset-0 opacity-5"
                      animate={{
                        backgroundPosition: ['0% 0%', '100% 100%'],
                      }}
                      transition={{
                        duration: 20,
                        repeat: Infinity,
                        repeatType: 'reverse',
                      }}
                      style={{
                        backgroundImage: `
                          linear-gradient(rgba(255, 255, 255, 0.1) 1px, transparent 1px),
                          linear-gradient(90deg, rgba(255, 255, 255, 0.1) 1px, transparent 1px)
                        `,
                        backgroundSize: '20px 20px',
                      }}
                    />
                    
                    {/* Animated corner accents */}
                    {hoveredIcon === icon.id && (
                      <>
                        <motion.div
                          initial={{ opacity: 0, scale: 0 }}
                          animate={{ opacity: 1, scale: 1 }}
                          className="absolute top-3 left-3 w-5 h-5 border-t-2 border-l-2 border-white"
                        />
                        <motion.div
                          initial={{ opacity: 0, scale: 0 }}
                          animate={{ opacity: 1, scale: 1 }}
                          className="absolute top-3 right-3 w-5 h-5 border-t-2 border-r-2 border-white"
                        />
                        <motion.div
                          initial={{ opacity: 0, scale: 0 }}
                          animate={{ opacity: 1, scale: 1 }}
                          className="absolute bottom-3 left-3 w-5 h-5 border-b-2 border-l-2 border-white"
                        />
                        <motion.div
                          initial={{ opacity: 0, scale: 0 }}
                          animate={{ opacity: 1, scale: 1 }}
                          className="absolute bottom-3 right-3 w-5 h-5 border-b-2 border-r-2 border-white"
                        />
                      </>
                    )}

                    {/* Top section - Icon */}
                    <div className="flex-1 flex items-center justify-center relative z-10 w-full">
                      <motion.div
                        className="flex items-center justify-center"
                        animate={{
                          rotate: hoveredIcon === icon.id ? [0, 15, -15, 10, -10, 0] : 0,
                          scale: hoveredIcon === icon.id ? 1.2 : 1,
                          y: hoveredIcon === icon.id ? [-8, 8, -8, 0] : 0,
                        }}
                        transition={{ duration: 0.6, type: 'spring' }}
                      >
                        {icon.image && !imageErrors[icon.id] ? (
                          <Image
                            src={icon.image}
                            alt={icon.title}
                            width={288}
                            height={288}
                            className="w-36 h-36 md:w-56 md:h-56 lg:w-72 lg:h-72 object-contain"
                            onError={() => handleImageError(icon.id)}
                            sizes="(max-width: 768px) 144px, (max-width: 1024px) 224px, 288px"
                          />
                        ) : icon.emoji ? (
                          <span className="text-7xl md:text-[8rem] lg:text-[10rem]">{icon.emoji}</span>
                        ) : null}
                      </motion.div>
                    </div>

                    {/* Bottom section - Text (always visible) */}
                    <div className="relative z-10 w-full flex flex-col items-center justify-center space-y-2 px-4">
                      {/* Title */}
                      <motion.h2
                        className="text-2xl md:text-3xl lg:text-4xl font-bold text-center"
                        style={{ 
                          color: 'var(--text-primary)',
                          textAlign: 'center',
                          width: '100%',
                        }}
                        animate={{
                          scale: hoveredIcon === icon.id ? 1.05 : 1,
                        }}
                      >
                        {icon.title}
                      </motion.h2>

                      {/* Description */}
                      <motion.p
                        className="text-sm md:text-base lg:text-lg font-mono text-center"
                        style={{ 
                          color: 'var(--text-secondary)',
                          textAlign: 'center',
                          width: '100%',
                        }}
                        animate={{
                          opacity: hoveredIcon === icon.id ? 1 : 0.8,
                        }}
                      >
                        {icon.description}
                      </motion.p>
                    </div>

                    {/* Hover glow effect */}
                    {hoveredIcon === icon.id && (
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="absolute inset-0 bg-white/20 blur-xl"
                      />
                    )}

                    {/* Interactive pulse effect on hover */}
                    {hoveredIcon === icon.id && (
                      <motion.div
                        initial={{ scale: 0.8, opacity: 0 }}
                        animate={{ scale: 1.1, opacity: [0, 0.3, 0] }}
                        transition={{ duration: 1.5, repeat: Infinity }}
                        className="absolute inset-0 border-4 border-white rounded-2xl"
                      />
                    )}
                  </motion.div>

                  {/* Arrow indicator */}
                  <motion.div
                    className="absolute -bottom-6 left-1/2 transform -translate-x-1/2"
                    animate={{
                      y: hoveredIcon === icon.id ? [0, 8, 0] : [0, 4, 0],
                      opacity: hoveredIcon === icon.id ? 1 : 0.6,
                    }}
                    transition={{ duration: 1, repeat: Infinity }}
                  >
                    <span className="text-3xl">↓</span>
                  </motion.div>
                </div>
              </Link>
            </motion.div>
          ))}
            </div>

            {/* Fun interactive elements */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 }}
              className="mt-16 text-center"
            >
              <p className="text-sm font-mono" style={{ color: 'var(--text-secondary)' }}>
                Hover and click to explore
              </p>
            </motion.div>
          </div>

          {/* F1 Standings Sidebar */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.5 }}
            className="lg:sticky lg:top-24 h-fit"
          >
            <F1Standings />
          </motion.div>
        </div>
      </div>
    </motion.div>
  )
}

