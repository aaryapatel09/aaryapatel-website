'use client'

import { useState, useEffect } from 'react'
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

  useEffect(() => {
    setCurrentSection('portfolio')
  }, [setCurrentSection])

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
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="flex flex-wrap gap-4 mb-12"
        >
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-6 py-2 font-racing tracking-wider text-sm border-2 transition-colors ${
                selectedCategory === category
                  ? 'border-white text-white bg-white/10'
                  : 'border-white/30 text-white/70 hover:border-white hover:text-white'
              }`}
            >
              {category.toUpperCase()}
            </button>
          ))}
        </motion.div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <AnimatePresence mode="wait">
            {filteredProjects.map((project, index) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ delay: index * 0.1 }}
                drag
                dragConstraints={{ left: 0, right: 0, top: 0, bottom: 0 }}
                dragElastic={0.2}
                onDragStart={() => setDraggedIndex(index)}
                onDragEnd={() => setDraggedIndex(null)}
                whileHover={{ y: -8 }}
                whileTap={{ scale: 0.98 }}
                className="cursor-grab active:cursor-grabbing"
                onClick={() => {
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
                  className={`h-full interactive-element cursor-pointer ${
                    project.featured ? 'border-white' : ''
                  }`}
                >
                  {project.featured && (
                    <div className="absolute top-4 right-4 px-2 py-1 bg-white text-black text-xs font-racing">
                      FEATURED
                    </div>
                  )}
                  <h3 className="text-xl font-racing text-white mb-3">
                    {project.title}
                  </h3>
                  <p className="text-sm font-mono text-gray-300 mb-4">
                    {project.description}
                  </p>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.technologies.map((tech) => (
                      <span
                        key={tech}
                        className="px-2 py-1 text-xs font-mono bg-white/20 text-white rounded"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                  <div className="flex items-center text-xs font-mono text-gray-300">
                    <span>VIEW DETAILS</span>
                    <motion.span
                      className="ml-2"
                      animate={{ x: [0, 5, 0] }}
                      transition={{ duration: 1.5, repeat: Infinity }}
                    >
                      →
                    </motion.span>
                  </div>
                </DashboardCard>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>
    </div>
  )
}

