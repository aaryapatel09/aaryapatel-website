'use client'

import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import DashboardCard from '@/components/ui/DashboardCard'
import { useStore } from '@/store/useStore'

interface Award {
  id: string
  title: string
  issuer: string
  date: string
  description: string
  category: 'poetry' | 'programming' | 'service' | 'other'
}

export default function AwardsPage() {
  const { setCurrentSection } = useStore()

  useEffect(() => {
    setCurrentSection('awards')
  }, [setCurrentSection])

  const awards: Award[] = [
    {
      id: '1',
      title: 'Honorable Mention – NFSPS Manningham Poetry Contest',
      issuer: 'National Federation of State Poetry Societies',
      date: 'Mar 2025',
      description: 'Earned an Honorable Mention in one of the nation&apos;s most competitive high school poetry contests, ranking among the top entries nationwide. My poem, "How to Live Inside a Wire," will be published in the 2025 NFSPS Student Prize Winners book, and I received a cash award.',
      category: 'poetry',
    },
    {
      id: '2',
      title: 'USACO Gold',
      issuer: 'USA Computing Olympiad (USACO)',
      date: 'Feb 2025',
      description: 'Achieved a perfect score of 1000/1000 and ranked 1st among all pre-college participants in my division on my first attempt at the USACO Silver Division. This accomplishment highlights my strong algorithmic problem-solving skills, efficiency in coding, and deep understanding of competitive programming concepts.',
      category: 'programming',
    },
    {
      id: '3',
      title: 'Silver Key in Poetry – Scholastic Art & Writing Awards',
      issuer: 'The Alliance for Young Artists & Writers',
      date: 'Jan 2025',
      description: 'Awarded the Silver Key in the 2025 Scholastic Art & Writing Awards for my poem "The Geography of Us." Recognized for originality, technical skill, and personal voice in creative writing.',
      category: 'poetry',
    },
    {
      id: '4',
      title: 'Topical Winner – American High School Poets Holiday Special',
      issuer: 'Live Poets Society of New Jersey',
      date: 'Dec 2024',
      description: 'Recognized as a Topical Winner for my poem, which was published in the American High School Poets - Holiday Special 2024 anthology. This printed collection features selected works from high school poets across the nation.',
      category: 'poetry',
    },
    {
      id: '5',
      title: 'USACO Silver',
      issuer: 'USA Computing Olympiad (USACO)',
      date: 'Dec 2024',
      description: 'Successfully advanced from the Bronze division in the USA Computing Olympiad (USACO), a prestigious competitive programming contest for pre-college students. Demonstrated strong problem-solving skills by solving algorithmic problems involving complete search, simulation, and basic sorting techniques under timed conditions.',
      category: 'programming',
    },
    {
      id: '6',
      title: 'Gold President&apos;s Volunteer Service Award',
      issuer: 'The President&apos;s Council on Service and Civic Participation',
      date: 'Jul 2024',
      description: 'Recognized for 100+ hours of community service.',
      category: 'service',
    },
  ]

  const categories = ['all', 'poetry', 'programming', 'service']

  const [selectedCategory, setSelectedCategory] = useState<string>('all')

  const filteredAwards =
    selectedCategory === 'all'
      ? awards
      : awards.filter((a) => a.category === selectedCategory)

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
            AWARDS
          </h1>
          <p className="text-lg font-mono text-gray-300 max-w-3xl">
            Recognition for achievements in poetry, competitive programming, and community service.
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
              className={`relative px-6 py-2 font-racing tracking-wider text-sm border-2 transition-colors overflow-hidden ${
                selectedCategory === category
                  ? 'border-white text-white bg-white/10'
                  : 'border-white/30 text-white/70 hover:border-white hover:text-white'
              }`}
            >
              {/* Gradient background on active */}
              {selectedCategory === category && (
                <motion.div
                  layoutId="filterBackground"
                  className="absolute inset-0 bg-gradient-to-r from-white/20 via-white/10 to-white/20"
                  initial={false}
                  transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                />
              )}
              <span className="relative z-10">{category.toUpperCase()}</span>
            </motion.button>
          ))}
        </motion.div>

        {/* Awards List */}
        <div className="space-y-6">
          <AnimatePresence mode="wait">
            {filteredAwards.map((award, index) => (
              <motion.div
                key={award.id}
                initial={{ opacity: 0, y: 30, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -20, scale: 0.95 }}
                transition={{ delay: index * 0.1, type: 'spring', stiffness: 100 }}
                whileHover={{ scale: 1.02, y: -5 }}
              >
                <DashboardCard className="interactive-element h-full relative overflow-hidden">
                  {/* Gradient background on hover */}
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-br from-white/10 via-transparent to-white/5 opacity-0"
                    whileHover={{ opacity: 1 }}
                    transition={{ duration: 0.3 }}
                  />
                  <div className="relative z-10">
                    <div className="flex flex-col md:flex-row md:items-start md:justify-between mb-4">
                      <div className="flex-1">
                        <motion.h3
                          className="text-xl font-racing text-white mb-2"
                          whileHover={{ scale: 1.05, x: 5 }}
                        >
                          {award.title}
                        </motion.h3>
                        <motion.p
                          className="text-sm font-mono text-gray-300 mb-1"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          transition={{ delay: index * 0.1 + 0.2 }}
                        >
                          {award.issuer}
                        </motion.p>
                        <motion.p
                          className="text-xs font-mono text-gray-400"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          transition={{ delay: index * 0.1 + 0.3 }}
                        >
                          {award.date}
                        </motion.p>
                      </div>
                      <motion.span
                        className="px-3 py-1 text-xs font-racing bg-white/20 text-white border border-white/30 rounded mt-2 md:mt-0"
                        whileHover={{ scale: 1.1, rotate: 2 }}
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: index * 0.1 + 0.4 }}
                      >
                        {award.category.toUpperCase()}
                      </motion.span>
                    </div>
                    <motion.p
                      className="text-sm font-mono text-gray-300 leading-relaxed"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: index * 0.1 + 0.5 }}
                    >
                      {award.description}
                    </motion.p>
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

