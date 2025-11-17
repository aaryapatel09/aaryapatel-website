'use client'

import { motion } from 'framer-motion'
import TrackMapSVG from '@/components/ui/TrackMapSVG'

export default function Footer() {
  return (
    <footer className="relative mt-20 border-t border-f1-gray/30 bg-dashboard-bg/50">
      {/* Animated track map background */}
      <div className="absolute inset-0 opacity-10 pointer-events-none">
        <TrackMapSVG className="w-full h-full" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Brand Section */}
          <div>
            <h3 className="text-sm font-racing tracking-wider text-f1-red mb-4">
              AARYA PATEL
            </h3>
            <p className="text-xs text-f1-gray font-mono">
              F1 Engineering & Software Development
            </p>
          </div>

          {/* Links Section */}
          <div>
            <h4 className="text-xs font-racing tracking-wider text-f1-light mb-4">
              NAVIGATION
            </h4>
            <ul className="space-y-2 text-xs font-mono text-f1-gray">
              <li>
                <a href="/about" className="hover:text-f1-red interactive-element">
                  About
                </a>
              </li>
              <li>
                <a href="/portfolio" className="hover:text-f1-red interactive-element">
                  Portfolio
                </a>
              </li>
              <li>
                <a href="/blog" className="hover:text-f1-red interactive-element">
                  Poetry
                </a>
              </li>
              <li>
                <a href="/gallery" className="hover:text-f1-red interactive-element">
                  Gallery
                </a>
              </li>
              <li>
                <a href="/awards" className="hover:text-f1-red interactive-element">
                  Awards
                </a>
              </li>
            </ul>
          </div>

          {/* Contact Section */}
          <div>
            <h4 className="text-xs font-racing tracking-wider text-f1-light mb-4">
              CONNECT
            </h4>
            <ul className="space-y-2 text-xs font-mono text-f1-gray">
              <li>
                <a
                  href="https://github.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-f1-red interactive-element"
                >
                  GitHub
                </a>
              </li>
              <li>
                <a
                  href="https://linkedin.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-f1-red interactive-element"
                >
                  LinkedIn
                </a>
              </li>
              <li>
                <a
                  href="mailto:contact@example.com"
                  className="hover:text-f1-red interactive-element"
                >
                  Email
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-8 pt-8 border-t border-f1-gray/20 flex flex-col md:flex-row justify-between items-center">
          <p className="text-xs text-f1-gray font-mono">
            © {new Date().getFullYear()} Aarya Patel. Built with Next.js & React Three Fiber.
          </p>
          <div className="mt-4 md:mt-0 flex items-center space-x-2">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
              className="w-3 h-3 border border-f1-red rounded-full"
            />
            <span className="text-xs text-f1-gray font-mono">SYSTEM ACTIVE</span>
          </div>
        </div>
      </div>
    </footer>
  )
}

