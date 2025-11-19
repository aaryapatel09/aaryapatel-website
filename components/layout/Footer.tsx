'use client'

import { motion } from 'framer-motion'
import TrackMapSVG from '@/components/ui/TrackMapSVG'

const navLinks = [
  { name: 'About', href: '/about' },
  { name: 'Portfolio', href: '/portfolio' },
  { name: 'Poetry', href: '/blog' },
  { name: 'Gallery', href: '/gallery' },
  { name: 'Awards', href: '/awards' },
]

const socialLinks = [
  { name: 'GitHub', href: 'https://github.com' },
  { name: 'LinkedIn', href: 'https://linkedin.com' },
  { name: 'Email', href: 'mailto:contact@example.com' },
]

export default function Footer() {
  return (
    <motion.footer
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true, margin: '-100px' }}
      transition={{ duration: 0.6 }}
      className="relative mt-20 border-t border-f1-gray/30 bg-dashboard-bg/50"
    >
      {/* Animated track map background */}
      <motion.div
        className="absolute inset-0 opacity-10 pointer-events-none"
        animate={{ opacity: [0.1, 0.15, 0.1] }}
        transition={{ duration: 4, repeat: Infinity }}
      >
        <TrackMapSVG className="w-full h-full" />
      </motion.div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Brand Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
          >
            <motion.h3
              className="text-sm font-racing tracking-wider text-f1-red mb-4"
              whileHover={{ scale: 1.05 }}
            >
              AARYA PATEL
            </motion.h3>
            <p className="text-xs text-f1-gray font-mono">
              F1 Engineering & Software Development
            </p>
          </motion.div>

          {/* Links Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            <h4 className="text-xs font-racing tracking-wider text-f1-light mb-4">
              NAVIGATION
            </h4>
            <ul className="space-y-2 text-xs font-mono text-f1-gray">
              {navLinks.map((link, index) => (
                <motion.li
                  key={link.name}
                  initial={{ opacity: 0, x: -10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.2 + index * 0.05 }}
                >
                  <motion.a
                    href={link.href}
                    className="hover:text-f1-red interactive-element inline-block"
                    whileHover={{ x: 5, scale: 1.05 }}
                  >
                    {link.name}
                  </motion.a>
                </motion.li>
              ))}
            </ul>
          </motion.div>

          {/* Contact Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
          >
            <h4 className="text-xs font-racing tracking-wider text-f1-light mb-4">
              CONNECT
            </h4>
            <ul className="space-y-2 text-xs font-mono text-f1-gray">
              {socialLinks.map((link, index) => (
                <motion.li
                  key={link.name}
                  initial={{ opacity: 0, x: -10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.3 + index * 0.05 }}
                >
                  <motion.a
                    href={link.href}
                    target={link.href.startsWith('http') ? '_blank' : undefined}
                    rel={link.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                    className="hover:text-f1-red interactive-element inline-block"
                    whileHover={{ x: 5, scale: 1.05 }}
                  >
                    {link.name}
                  </motion.a>
                </motion.li>
              ))}
            </ul>
          </motion.div>
        </div>

        {/* Bottom Bar */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
          className="mt-8 pt-8 border-t border-f1-gray/20 flex flex-col md:flex-row justify-between items-center"
        >
          <motion.p
            className="text-xs text-f1-gray font-mono"
            whileHover={{ scale: 1.05 }}
          >
            © {new Date().getFullYear()} Aarya Patel. Built with Next.js & React Three Fiber.
          </motion.p>
          <motion.div
            className="mt-4 md:mt-0 flex items-center space-x-2"
            whileHover={{ scale: 1.1 }}
          >
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
              className="w-3 h-3 border border-f1-red rounded-full"
            />
            <motion.span
              className="text-xs text-f1-gray font-mono"
              animate={{ opacity: [1, 0.5, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              SYSTEM ACTIVE
            </motion.span>
          </motion.div>
        </motion.div>
      </div>
    </motion.footer>
  )
}

