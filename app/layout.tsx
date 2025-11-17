import type { Metadata } from 'next'
import './globals.css'
import CustomCursor from '@/components/ui/CustomCursor'
import SocialLinks from '@/components/layout/SocialLinks'

export const metadata: Metadata = {
  title: 'Aarya Patel | F1 Engineering & Software',
  description: 'Interactive portfolio showcasing Formula 1 engineering, software development, and powertrain design',
  icons: {
    icon: '/favicon.ico',
    shortcut: '/favicon.ico',
    apple: '/favicon.ico',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className="antialiased bg-black text-white cursor-none">
        <CustomCursor />
        <SocialLinks />
        <main className="min-h-screen">
          {children}
        </main>
      </body>
    </html>
  )
}

