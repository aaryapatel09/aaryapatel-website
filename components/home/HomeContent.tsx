'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { useStore } from '@/store/useStore'
import EngineWidget from '@/components/widgets/EngineWidget'
import DashboardCard from '@/components/ui/DashboardCard'

export default function HomeContent() {
  const { toggleEngineWidget, isEngineWidgetOpen } = useStore()

  const sections = [
    {
      title: 'About',
      description: 'Engineering background & F1 passion',
      path: '/about',
      color: 'f1-red',
    },
    {
      title: 'Portfolio',
      description: 'Projects & engineering work',
      path: '/portfolio',
      color: 'dashboard-text',
    },
    {
      title: 'Blog',
      description: 'Technical insights & updates',
      path: '/blog',
      color: 'f1-red',
    },
    {
      title: 'Gallery',
      description: 'Visual showcase & experiments',
      path: '/gallery',
      color: 'dashboard-text',
    },
  ]

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="pt-24 pb-12 min-h-screen"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Hero Section */}
        <section className="mb-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-center mb-12"
          >
            <h1 className="text-5xl md:text-7xl font-racing tracking-wider text-f1-light mb-6">
              ENGINEERING EXCELLENCE
            </h1>
            <p className="text-lg md:text-xl font-mono text-f1-gray max-w-2xl mx-auto">
              Exploring the intersection of Formula 1 engineering, software development,
              and powertrain design through interactive experiences.
            </p>
          </motion.div>

          {/* Interactive Engine Widget Toggle */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.4 }}
            className="flex justify-center mb-12"
          >
            <button
              onClick={toggleEngineWidget}
              className="px-6 py-3 bg-dashboard-bg border-2 border-f1-red text-f1-red font-racing tracking-wider interactive-element hover:bg-f1-red hover:text-f1-light transition-colors"
            >
              {isEngineWidgetOpen ? 'CLOSE ENGINE' : 'OPEN ENGINE WIDGET'}
            </button>
          </motion.div>

          {/* Engine Widget */}
          {isEngineWidgetOpen && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
            >
              <EngineWidget />
            </motion.div>
          )}
        </section>

        {/* Navigation Cards */}
        <section className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-20">
          {sections.map((section, index) => (
            <motion.div
              key={section.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 + index * 0.1 }}
            >
              <Link href={section.path}>
                <DashboardCard className="h-full interactive-element">
                  <h2
                    className={`text-2xl font-racing tracking-wider mb-3 ${
                      section.color === 'f1-red' ? 'text-f1-red' : 'text-dashboard-text'
                    }`}
                  >
                    {section.title}
                  </h2>
                  <p className="text-sm font-mono text-f1-gray">
                    {section.description}
                  </p>
                  <div className="mt-4 flex items-center text-xs font-mono text-f1-gray">
                    <span>EXPLORE</span>
                    <motion.span
                      className="ml-2"
                      animate={{ x: [0, 5, 0] }}
                      transition={{ duration: 1.5, repeat: Infinity }}
                    >
                      →
                    </motion.span>
                  </div>
                </DashboardCard>
              </Link>
            </motion.div>
          ))}
        </section>

        {/* Quick Stats */}
        <section className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { label: 'Projects', value: '12+' },
            { label: 'Blog Posts', value: '8+' },
            { label: 'Years Experience', value: '5+' },
            { label: 'Technologies', value: '15+' },
          ].map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 1 + index * 0.1 }}
            >
              <DashboardCard className="text-center">
                <div className="text-3xl font-racing text-f1-red mb-2">
                  {stat.value}
                </div>
                <div className="text-xs font-mono text-f1-gray">
                  {stat.label}
                </div>
              </DashboardCard>
            </motion.div>
          ))}
        </section>
      </div>
    </motion.div>
  )
}

