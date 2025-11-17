'use client'

import { motion } from 'framer-motion'
import { useStore } from '@/store/useStore'

export default function ThemeToggle() {
  const { theme, toggleTheme } = useStore()

  return (
    <motion.button
      onClick={toggleTheme}
      className="relative w-14 h-8 rounded-full p-1 focus:outline-none focus:ring-2 focus:ring-white/50 focus:ring-offset-2 transition-colors interactive-element"
      style={{
        backgroundColor: theme === 'dark' ? 'rgba(55, 65, 81, 0.8)' : 'rgba(209, 213, 219, 0.8)',
      }}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
    >
      <motion.div
        className="w-6 h-6 rounded-full shadow-lg flex items-center justify-center"
        style={{
          backgroundColor: theme === 'dark' ? '#FFFFFF' : '#FCD34D',
        }}
        animate={{
          x: theme === 'dark' ? 0 : 24,
        }}
        transition={{
          type: 'spring',
          stiffness: 500,
          damping: 30,
        }}
      >
        {theme === 'dark' ? (
          <motion.svg
            className="w-4 h-4"
            style={{ color: '#1F2937' }}
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            initial={{ rotate: 0 }}
            animate={{ rotate: 360 }}
            transition={{ duration: 0.5 }}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
            />
          </motion.svg>
        ) : (
          <motion.svg
            className="w-4 h-4"
            style={{ color: '#78350F' }}
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            initial={{ rotate: 0 }}
            animate={{ rotate: 360 }}
            transition={{ duration: 0.5 }}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"
            />
          </motion.svg>
        )}
      </motion.div>
    </motion.button>
  )
}

