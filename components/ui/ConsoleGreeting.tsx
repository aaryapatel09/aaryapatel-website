'use client'

import { useEffect, useRef } from 'react'

export default function ConsoleGreeting() {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    // Also log to console for those who check there
    console.log(
      '%c Hey, I see you looking! 👀',
      'color: #e10600; font-size: 24px; font-weight: bold; font-family: monospace; padding: 8px 0;',
    )
    console.log(
      '%c Check out my GitHub → https://github.com/aaryapatel09',
      'color: #ffffff; background: #161b22; font-size: 14px; font-family: monospace; padding: 6px 12px; border-radius: 4px;',
    )

    // Inject HTML comments visible in Elements inspector
    if (ref.current) {
      const lines = [
        '',
        '╔══════════════════════════════════════════════════╗',
        '║                                                  ║',
        '║   👀  Hey, I see you looking!                    ║',
        '║                                                  ║',
        '║   Check out my GitHub:                           ║',
        '║   https://github.com/aaryapatel09                ║',
        '║                                                  ║',
        '║   Built by Aarya Patel                           ║',
        '║   Next.js · Framer Motion · Three.js             ║',
        '║                                                  ║',
        '╚══════════════════════════════════════════════════╝',
        '',
      ]
      lines.forEach(line => {
        ref.current!.appendChild(document.createComment(` ${line} `))
      })
    }
  }, [])

  return <div ref={ref} data-greeting="hey-inspector" style={{ display: 'none' }} />
}
