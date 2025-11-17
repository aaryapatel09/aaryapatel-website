import type { Metadata } from 'next'
import './globals.css'
import CustomCursor from '@/components/ui/CustomCursor'
import SocialLinks from '@/components/layout/SocialLinks'
import ThemeProvider from '@/components/ui/ThemeProvider'

export const metadata: Metadata = {
  title: 'Aarya Patel | F1 Engineering & Software',
  description: 'Interactive portfolio showcasing Formula 1 engineering, software development, and powertrain design',
  icons: {
    icon: '/icon.ico',
    shortcut: '/icon.ico',
    apple: '/icon.ico',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className="antialiased cursor-none" style={{ backgroundColor: 'var(--bg-primary)', color: 'var(--text-primary)' }}>
        <ThemeProvider />
        <CustomCursor />
        <SocialLinks />
        <main className="min-h-screen">
          {children}
        </main>
      </body>
    </html>
  )
}

