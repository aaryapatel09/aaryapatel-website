'use client'

import { useEffect } from 'react'

export default function ConsoleGreeting() {
  useEffect(() => {
    console.log(
      '%c Hey, I see you looking! 👀',
      'color: #e10600; font-size: 24px; font-weight: bold; font-family: monospace; padding: 8px 0;',
    )
    console.log(
      '%c Check out my GitHub → https://github.com/aaryapatel09',
      'color: #ffffff; background: #161b22; font-size: 14px; font-family: monospace; padding: 6px 12px; border-radius: 4px;',
    )
  }, [])

  return null
}
