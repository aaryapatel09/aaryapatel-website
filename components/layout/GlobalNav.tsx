'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { useStore } from '@/store/useStore'
import ThemeToggle from '@/components/ui/ThemeToggle'

export default function GlobalNav() {
  const { setCurrentSection } = useStore()

  return (
    <div className="fixed top-4 right-4 md:top-6 md:right-6 z-50 flex items-center gap-2 md:gap-3">
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, type: 'spring', stiffness: 200 }}
      >
        <Link
          href="/resume"
          onClick={() => setCurrentSection('resume')}
          aria-label="View or download resume"
          className="interactive-element inline-flex items-center gap-1.5 px-3 py-1.5 font-racing tracking-wider text-xs rounded-full border backdrop-blur-sm"
          style={{
            color: 'var(--text-primary)',
            borderColor: 'var(--border-color)',
            backgroundColor: 'var(--bg-secondary)',
          }}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
            className="w-3.5 h-3.5"
            aria-hidden="true"
          >
            <path d="M4 4a2 2 0 012-2h5.586A2 2 0 0113 2.586L15.414 5A2 2 0 0116 6.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4z" />
          </svg>
          RESUME
        </Link>
      </motion.div>
      <ThemeToggle />
    </div>
  )
}
