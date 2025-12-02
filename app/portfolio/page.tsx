'use client'

import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import DashboardCard from '@/components/ui/DashboardCard'
import { useStore } from '@/store/useStore'

interface Project {
  id: string
  title: string
  category: string
  description: string
  technologies: string[]
  featured: boolean
  githubUrl?: string
}

export default function PortfolioPage() {
  const { setCurrentSection } = useStore()
  const [selectedCategory, setSelectedCategory] = useState<string>('all')
  const [draggedIndex, setDraggedIndex] = useState<number | null>(null)
  const [isScrolling, setIsScrolling] = useState(false)
  const [isMobile, setIsMobile] = useState(false)
  const scrollTimeoutRef = useRef<NodeJS.Timeout | null>(null)
  const lastTouchY = useRef<number>(0)

  useEffect(() => {
    setCurrentSection('portfolio')
  }, [setCurrentSection])

  // Detect mobile device
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(typeof window !== 'undefined' && window.innerWidth < 768)
    }
    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  // Prevent clicks during scroll on mobile
  useEffect(() => {
    let scrollTimer: NodeJS.Timeout | null = null

    const handleScroll = () => {
      setIsScrolling(true)
      if (scrollTimer) clearTimeout(scrollTimer)
      scrollTimer = setTimeout(() => {
        setIsScrolling(false)
      }, 150) // Wait 150ms after scrolling stops
    }

    const handleTouchStart = (e: TouchEvent) => {
      lastTouchY.current = e.touches[0].clientY
    }

    const handleTouchMove = (e: TouchEvent) => {
      const currentY = e.touches[0].clientY
      const deltaY = Math.abs(currentY - lastTouchY.current)
      
      if (deltaY > 10) {
        // User is scrolling (increased threshold for better detection)
        setIsScrolling(true)
        if (scrollTimer) clearTimeout(scrollTimer)
        scrollTimer = setTimeout(() => {
          setIsScrolling(false)
        }, 200) // Increased timeout for better scroll detection
      }
      
      lastTouchY.current = currentY
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    window.addEventListener('touchstart', handleTouchStart, { passive: true })
    window.addEventListener('touchmove', handleTouchMove, { passive: true })

    return () => {
      window.removeEventListener('scroll', handleScroll)
      window.removeEventListener('touchstart', handleTouchStart)
      window.removeEventListener('touchmove', handleTouchMove)
      if (scrollTimer) clearTimeout(scrollTimer)
    }
  }, [])

  const projects: Project[] = [
    {
      id: '1',
      title: 'F1 Predictor',
      category: 'software',
      description: 'A predictive F1 race winner app using 70+ years of historical data and advanced machine learning models for 85% prediction accuracy. Processes 1,000+ data points per race, analyzing factors like driver form, car performance, and track familiarity. Deploys on AWS/GCP with 99.9% uptime.',
      technologies: ['Python', 'Machine Learning', 'Streamlit', 'AWS', 'GCP', 'F1 API'],
      featured: true,
      githubUrl: 'https://github.com/aaryapatel09/f1-race-winner-predictor',
    },
    {
      id: '2',
      title: 'American Sign Language (ASL) Translator',
      category: 'software',
      description: 'A real-time ASL translator built with Convolutional Neural Networks (CNNs) for gesture recognition and TensorFlow for model training. Processes webcam inputs to detect and translate ASL alphabet signs (A-Z) into text with high accuracy.',
      technologies: ['Python', 'TensorFlow', 'CNN', 'OpenCV', 'Flask', 'Computer Vision'],
      featured: true,
      githubUrl: 'https://github.com/aaryapatel09/sign-language-translator',
    },
    {
      id: '3',
      title: 'DrunkTester2.0',
      category: 'software',
      description: 'An advanced web application utilizing CNNs for facial recognition and spectrogram analysis combined with the Levenshtein distance algorithm for speech pattern detection. Designed to assess sobriety in real-time to prevent drunk driving through ML-powered evaluation.',
      technologies: ['Python', 'Machine Learning', 'CNN', 'Computer Vision', 'Web Development'],
      featured: true,
      githubUrl: 'https://github.com/aaryapatel09/DrunkTester2.0',
    },
    {
      id: '4',
      title: 'Smart Health Assistant',
      category: 'software',
      description: 'A lightweight, web-based application offering quick health insights and personalized recommendations based on user-provided metrics like BMI, blood pressure, and cholesterol levels. Features clean, responsive design powered by Material Design principles.',
      technologies: ['HTML5', 'CSS3', 'JavaScript', 'Material Design', 'Responsive Web Design'],
      featured: false,
      githubUrl: 'https://github.com/aaryapatel09/smart-health-assistant',
    },
    {
      id: '5',
      title: 'Data Analytics Platform',
      category: 'software',
      description: 'Analytics platform integrating YouTube and Twitter data via APIs to track performance and competitive intelligence. Features interactive dashboards, Google Gemini AI for natural language querying, and automated social listening tools.',
      technologies: ['Python', 'Streamlit', 'Plotly', 'Google Gemini AI', 'REST APIs', 'ETL', 'NLP'],
      featured: false,
      githubUrl: 'https://github.com/aaryapatel09',
    },
    {
      id: '6',
      title: 'AI Healthcare Tool - NYAS',
      category: 'software',
      description: 'AI-driven healthcare tool developed at The New York Academy of Sciences to address biases in medical diagnosis and treatment. Features ethical AI filters, user interfaces for healthcare professionals, and unbiased data processing.',
      technologies: ['Python', 'Machine Learning', 'AI', 'Healthcare Technology', 'Ethical AI'],
      featured: false,
      githubUrl: 'https://github.com/aaryapatel09',
    },
  ]

  const categories = ['all', 'software', 'engineering']

  const filteredProjects =
    selectedCategory === 'all'
      ? projects
      : projects.filter((p) => p.category === selectedCategory)

  return (
    <div className="pt-24 pb-12 min-h-screen bg-black text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-12"
        >
          <h1 className="text-5xl md:text-7xl font-racing tracking-wider text-white mb-6">
            PORTFOLIO
          </h1>
          <p className="text-lg font-mono text-gray-300 max-w-3xl">
            A collection of projects spanning software engineering, F1 systems design,
            and powertrain development.
          </p>
        </motion.section>

        {/* Category Filter */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="flex flex-wrap gap-4 mb-12"
        >
          {categories.map((category, index) => (
            <motion.button
              key={category}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 + index * 0.1, type: 'spring', stiffness: 200 }}
              onClick={() => setSelectedCategory(category)}
              whileHover={{ scale: 1.1, y: -2 }}
              whileTap={{ scale: 0.95 }}
              className={`px-6 py-2 font-racing tracking-wider text-sm border-2 transition-colors ${
                selectedCategory === category
                  ? 'border-white text-white bg-white/10'
                  : 'border-white/30 text-white/70 hover:border-white hover:text-white'
              }`}
            >
              {category.toUpperCase()}
            </motion.button>
          ))}
        </motion.div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <AnimatePresence mode="wait">
            {filteredProjects.map((project, index) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 30, scale: 0.9, rotateY: -15 }}
                animate={{ opacity: 1, y: 0, scale: 1, rotateY: 0 }}
                exit={{ opacity: 0, y: -20, scale: 0.9 }}
                transition={{ delay: index * 0.1, type: 'spring', stiffness: 100 }}
                drag={!isMobile} // Disable drag on mobile to allow smooth scrolling
                dragConstraints={{ left: 0, right: 0, top: 0, bottom: 0 }}
                dragElastic={0.2}
                dragTransition={{ bounceStiffness: 300, bounceDamping: 20 }}
                onDragStart={() => !isMobile && setDraggedIndex(index)}
                onDragEnd={() => !isMobile && setDraggedIndex(null)}
                whileHover={{ y: -12, scale: 1.03, rotateY: 5 }}
                whileTap={{ scale: 0.95 }}
                style={{ perspective: 1000 }}
                className={isMobile ? '' : 'cursor-grab active:cursor-grabbing'}
                onClick={(e) => {
                  // Prevent click if user was just scrolling
                  if (isScrolling) {
                    e.preventDefault()
                    e.stopPropagation()
                    return
                  }
                  
                  // Open project GitHub repository
                  const project = filteredProjects[index]
                  if (project.githubUrl) {
                    window.open(project.githubUrl, '_blank')
                  } else {
                    window.open('https://github.com/aaryapatel09', '_blank')
                  }
                }}
              >
                <DashboardCard
                  className={`h-full interactive-element cursor-pointer relative ${
                    project.featured ? 'border-white' : ''
                  }`}
                >
                  {project.featured && (
                    <motion.div
                      className="absolute top-3 left-3 px-2 py-1 bg-white text-black text-xs font-racing z-10"
                      initial={{ opacity: 0, scale: 0 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: index * 0.1 + 0.3 }}
                      whileHover={{ scale: 1.1, rotate: 5 }}
                    >
                      FEATURED
                    </motion.div>
                  )}
                  <motion.h3
                    className={`text-xl font-racing text-white mb-3 ${project.featured ? 'pr-20' : ''}`}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 + 0.2 }}
                    whileHover={{ scale: 1.05, x: 5 }}
                  >
                    {project.title}
                  </motion.h3>
                  <motion.p
                    className="text-sm font-mono text-gray-300 mb-4"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: index * 0.1 + 0.3 }}
                  >
                    {project.description}
                  </motion.p>
                  <motion.div
                    className="flex flex-wrap gap-2 mb-4"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: index * 0.1 + 0.4 }}
                  >
                    {project.technologies.map((tech, techIndex) => (
                      <motion.span
                        key={tech}
                        className="px-2 py-1 text-xs font-mono bg-white/20 text-white rounded"
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: index * 0.1 + 0.4 + techIndex * 0.05, type: 'spring', stiffness: 200 }}
                        whileHover={{ scale: 1.1, y: -2 }}
                      >
                        {tech}
                      </motion.span>
                    ))}
                  </motion.div>
                  <motion.div
                    className="flex items-center text-xs font-mono text-gray-300"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: index * 0.1 + 0.5 }}
                    whileHover={{ x: 5 }}
                  >
                    <span>VIEW DETAILS</span>
                    <motion.span
                      className="ml-2"
                      animate={{ x: [0, 5, 0] }}
                      transition={{ duration: 1.5, repeat: Infinity }}
                    >
                      →
                    </motion.span>
                  </motion.div>
                </DashboardCard>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>
    </div>
  )
}

