'use client'

import { useState } from 'react'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import { useStore } from '@/store/useStore'
import RacingLineSVG from '@/components/ui/RacingLineSVG'
import ThemeToggle from '@/components/ui/ThemeToggle'

const navItems = [
  { name: 'Home', path: '/', id: 'home' },
  { name: 'About', path: '/about', id: 'about' },
  { name: 'Portfolio', path: '/portfolio', id: 'portfolio' },
  { name: 'Poetry', path: '/blog', id: 'blog' },
  { name: 'Gallery', path: '/gallery', id: 'gallery' },
  { name: 'Awards', path: '/awards', id: 'awards' },
]

export default function Header() {
  const { currentSection, setCurrentSection, isMenuOpen, toggleMenu } = useStore()

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-dashboard-bg/80 backdrop-blur-sm border-b border-f1-gray/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link
            href="/"
            onClick={() => setCurrentSection('home')}
            className="flex items-center space-x-2 interactive-element"
          >
            <div className="relative">
              <div className="w-8 h-8 border-2 border-f1-red rounded-sm flex items-center justify-center">
                <div className="w-2 h-2 bg-f1-red rounded-full telemetry-pulse" />
              </div>
              <RacingLineSVG className="absolute -bottom-1 -right-1 w-4 h-4 text-f1-red" />
            </div>
            <span className="text-sm font-racing tracking-wider text-f1-light">
              AP
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-1">
            {navItems.map((item, index) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1, type: 'spring', stiffness: 200 }}
              >
                <Link
                  href={item.path}
                  onClick={() => setCurrentSection(item.id)}
                  className="relative px-4 py-2 text-sm font-mono interactive-element"
                >
                  <motion.span
                    className={
                      currentSection === item.id
                        ? 'text-f1-red dashboard-glow'
                        : 'text-f1-light hover:text-f1-red'
                    }
                    whileHover={{ scale: 1.1, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    {item.name}
                  </motion.span>
                  {currentSection === item.id && (
                    <motion.div
                      layoutId="activeSection"
                      className="absolute bottom-0 left-0 right-0 h-0.5 bg-f1-red"
                      initial={false}
                      transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                    />
                  )}
                </Link>
              </motion.div>
            ))}
          </nav>

          {/* Theme Toggle */}
          <div className="hidden md:block">
            <ThemeToggle />
          </div>

          {/* Mobile Menu Button and Theme Toggle */}
          <div className="md:hidden flex items-center gap-3">
            <ThemeToggle />
            <button
              onClick={toggleMenu}
              className="p-2 interactive-element"
              aria-label="Toggle menu"
            >
              <div className="w-6 h-6 flex flex-col justify-center space-y-1.5">
                <motion.span
                  animate={isMenuOpen ? { rotate: 45, y: 6 } : { rotate: 0, y: 0 }}
                  className="block h-0.5 w-full bg-f1-light"
                />
                <motion.span
                  animate={isMenuOpen ? { opacity: 0 } : { opacity: 1 }}
                  className="block h-0.5 w-full bg-f1-light"
                />
                <motion.span
                  animate={isMenuOpen ? { rotate: -45, y: -6 } : { rotate: 0, y: 0 }}
                  className="block h-0.5 w-full bg-f1-light"
                />
              </div>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.nav
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-dashboard-bg border-t border-f1-gray/30"
          >
            <div className="px-4 py-4 space-y-2">
              {navItems.map((item, index) => (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Link
                    href={item.path}
                    onClick={() => {
                      setCurrentSection(item.id)
                      toggleMenu()
                    }}
                    className="block px-4 py-2 text-f1-light hover:text-f1-red interactive-element"
                  >
                    {item.name}
                  </Link>
                </motion.div>
              ))}
            </div>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  )
}

