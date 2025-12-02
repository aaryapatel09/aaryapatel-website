'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import Image from 'next/image'
import { useState } from 'react'
import { useStore } from '@/store/useStore'

export default function SocialLinks() {
  const [imageErrors, setImageErrors] = useState<Record<string, boolean>>({})
  const theme = useStore((state) => state.theme)
  const isDark = theme === 'dark'

  const socialLinks = [
    {
      name: 'Instagram',
      url: 'https://www.instagram.com/aaryapatel_1/',
      icon: '/images/instagram-icon.png',
      emoji: '📷',
      color: 'hover:bg-gradient-to-br hover:from-purple-500 hover:via-pink-500 hover:to-orange-500',
    },
    {
      name: 'LinkedIn',
      url: 'https://www.linkedin.com/in/aaryapatel1/',
      icon: '/images/linkedin-icon.png',
      emoji: '💼',
      color: 'hover:bg-blue-600',
    },
    {
      name: 'GitHub',
      url: 'https://github.com/aaryapatel09',
      icon: '/images/github-icon.png',
      emoji: '💻',
      color: 'hover:bg-gray-800',
    },
  ]

  const handleImageError = (name: string) => {
    setImageErrors((prev) => ({ ...prev, [name]: true }))
  }

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: 0.5 }}
      className="fixed bottom-4 right-4 md:bottom-6 md:right-6 z-50 flex flex-col gap-3 md:gap-4"
    >
      {socialLinks.map((social, index) => (
        <motion.div
          key={social.name}
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.7 + index * 0.1, type: 'spring', stiffness: 200 }}
          whileHover={{ scale: 1.1, y: -2 }}
          whileTap={{ scale: 0.95 }}
        >
          <Link
            href={social.url}
            target="_blank"
            rel="noopener noreferrer"
            className="block interactive-element"
            aria-label={social.name}
          >
            <motion.div
              className={`w-12 h-12 md:w-24 md:h-24 rounded-full ${
                isDark ? 'bg-black border-white/30' : 'bg-white border-black/30'
              } border-2 flex items-center justify-center transition-all duration-300 ${social.color} backdrop-blur-sm`}
              whileHover={{
                borderColor: isDark ? 'rgba(255, 255, 255, 1)' : 'rgba(0, 0, 0, 1)',
                boxShadow: isDark 
                  ? '0 0 40px rgba(255, 255, 255, 0.7)' 
                  : '0 0 40px rgba(0, 0, 0, 0.7)',
              }}
            >
              {imageErrors[social.name] ? (
                <span className="text-2xl md:text-5xl">{social.emoji}</span>
              ) : (
                <div className="w-6 h-6 md:w-14 md:h-14 flex items-center justify-center p-1">
                  <Image
                    src={social.icon}
                    alt={social.name}
                    width={56}
                    height={56}
                    className="object-contain w-full h-full max-w-full max-h-full"
                    sizes="(max-width: 768px) 24px, 56px"
                    onError={() => handleImageError(social.name)}
                  />
                </div>
              )}
            </motion.div>
          </Link>
        </motion.div>
      ))}
    </motion.div>
  )
}

