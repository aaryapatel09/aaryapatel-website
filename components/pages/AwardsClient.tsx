'use client'

import { useState, useEffect } from 'react'
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

export default function AwardsClient() {
  const { setCurrentSection } = useStore()

  useEffect(() => {
    setCurrentSection('awards')
  }, [setCurrentSection])

  const awards: Award[] = [
    {
      id: 'usapho-2026',
      title: 'U.S. Physics Olympiad (USAPhO) Qualifier',
      issuer: 'Issued by American Association of Physics Teachers (AAPT)',
      date: 'Mar 2026',
      description:
        'Qualified for the 2026 U.S. Physics Olympiad (USAPhO) exam by scoring above the national cutoff (16) on the F=ma contest, placing among the top 440 of 6,682 high school participants nationwide (~top 7%).',
      category: 'other',
    },
    {
      id: 'fbla-states-1st-place',
      title: '1st Place – FBLA California State, Computer Problem Solving',
      issuer: 'Issued by Future Business Leaders of America',
      date: 'Apr 2026',
      description:
        'Associated with Homestead High School. Ranked 1st among competitors at the 2026 FBLA California State Leadership Conference in the Computer Problem Solving event, an objective test on operating systems, networking, hardware, and security. Qualified to represent California at the FBLA National Leadership Conference.',
      category: 'programming',
    },
    {
      id: 'fbla-1st-place',
      title: '1st Place – FBLA Bay Section, Computer Problem Solving',
      issuer: 'Issued by Future Business Leaders of America',
      date: 'Feb 2026',
      description:
        'Associated with Homestead High School. Ranked 1st among competitors at the 2026 FBLA Bay Section Leadership Conference in the Computer Problem Solving event, an objective test on operating systems, networking, hardware, and security.',
      category: 'programming',
    },
    {
      id: '1',
      title: 'USACO Platinum',
      issuer: 'Issued by USA Computing Olympiad (USACO)',
      date: 'Feb 2026',
      description:
        'USACO Platinum contestant in the top competitive programming division, reached by only a few hundred students out of thousands worldwide each season. I consistently solve advanced algorithmic problems under time pressure, including dynamic programming, graph algorithms, and data structures. This reflects strong problem-solving, speed, and resilience on hard unseen problems.',
      category: 'programming',
    },
    {
      id: '2',
      title: 'Silver Key in Poetry – Scholastic Art & Writing Awards',
      issuer: 'Issued by The Alliance for Young Artists & Writers',
      date: 'Jan 2026',
      description:
        'Awarded the Silver Key in the 2026 Scholastic Art & Writing Awards for my poem The Ghost In The Gallery. Recognized for originality, technical skill, and personal voice in creative writing.',
      category: 'poetry',
    },
    {
      id: '3',
      title: 'Honorable Mention in Personal Essay & Memoir - Scholastic Art & Writing Awards',
      issuer: 'Issued by The Alliance for Young Artists & Writers',
      date: 'Dec 2025',
      description:
        'Awarded an Honorable Mention in the 2026 Scholastic Art & Writing Awards for my essay "The Year Everyone Else Moved On". Recognized for originality, technical skill, and personal voice in creative writing.',
      category: 'poetry',
    },
    {
      id: '4',
      title: 'Honorable Mention – NFSPS Manningham Poetry Contest (Senior Division)',
      issuer: 'Issued by National Federation of State Poetry Societies',
      date: 'Mar 2025',
      description:
        'Earned an Honorable Mention in one of the nation\'s most competitive high school poetry contests, ranking among the top entries nationwide. My poem, How to Live Inside a Wire, will be published in the 2025 NFSPS Student Prize Winners book, and I received a cash award.',
      category: 'poetry',
    },
    {
      id: 'topical-2024',
      title: 'Topical Winner – American High School Poets Holiday Special',
      issuer: 'Live Poets Society of New Jersey',
      date: 'Dec 2024',
      description:
        'Recognized as a Topical Winner for my poem, which was published in the American High School Poets - Holiday Special 2024 anthology. This printed collection features selected works from high school poets across the nation.',
      category: 'poetry',
    },
    {
      id: '6',
      title: 'Gold President\'s Volunteer Service Award',
      issuer: 'The President\'s Council on Service and Civic Participation',
      date: 'Jul 2024',
      description: 'Recognized for 100+ hours of community service.',
      category: 'service',
    },
  ]

  const categories = ['all', 'poetry', 'programming', 'service', 'other']

  const [selectedCategory, setSelectedCategory] = useState<string>('all')

  const filteredAwards = selectedCategory === 'all' ? awards : awards.filter((a) => a.category === selectedCategory)

  return (
    <div className="pt-24 pb-12 min-h-screen bg-black text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.section initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-12">
          <h1 className="text-5xl md:text-7xl font-racing tracking-wider text-white mb-6">AWARDS</h1>
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

