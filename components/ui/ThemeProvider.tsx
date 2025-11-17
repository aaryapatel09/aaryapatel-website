'use client'

import { useEffect } from 'react'
import { useStore } from '@/store/useStore'

export default function ThemeProvider() {
  const { setTheme } = useStore()

  useEffect(() => {
    // Initialize theme from localStorage
    if (typeof window !== 'undefined') {
      const savedTheme = localStorage.getItem('theme') as 'dark' | 'light' | null
      const initialTheme = savedTheme || 'dark'
      setTheme(initialTheme)
    }
  }, [setTheme])

  return null
}

