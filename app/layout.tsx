import type { Metadata } from 'next'
import './globals.css'
import CustomCursor from '@/components/ui/CustomCursor'
import ConsoleGreeting from '@/components/ui/ConsoleGreeting'
import EasterEggs from '@/components/ui/EasterEggs'
import SocialLinks from '@/components/layout/SocialLinks'
import ThemeProvider from '@/components/ui/ThemeProvider'

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? 'http://localhost:3000'

export const metadata: Metadata = {
  title: 'Aarya Patel | F1 Engineering & Software',
  description: 'Interactive portfolio showcasing Formula 1 engineering, software development, and powertrain design',
  metadataBase: new URL(siteUrl),
  manifest: '/site.webmanifest',
  icons: {
    icon: '/images/favicon.ico',
    shortcut: '/images/favicon.ico',
    apple: '/images/favicon.ico',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className="antialiased" style={{ backgroundColor: 'var(--bg-primary)', color: 'var(--text-primary)' }}>
        <ThemeProvider />
        <CustomCursor />
        <ConsoleGreeting />
        <EasterEggs />
        <SocialLinks />
        <main className="min-h-screen">
          {children}
        </main>
      </body>
    </html>
  )
}

