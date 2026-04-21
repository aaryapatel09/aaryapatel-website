import type { Metadata } from 'next'
import HomeClient from '@/components/pages/HomeClient'

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? 'http://localhost:3000'

export const metadata: Metadata = {
  title: { absolute: 'Aarya Patel — Student, Programmer, Poet' },
  description: 'Interactive portfolio showcasing Formula 1 engineering, software development, and powertrain design.',
  alternates: {
    canonical: `${siteUrl}/`,
  },
  openGraph: {
    type: 'website',
    url: `${siteUrl}/`,
    title: 'Home | Aarya Patel',
    description:
      'Interactive portfolio showcasing Formula 1 engineering, software development, and powertrain design.',
    images: [
      {
        url: `${siteUrl}/images/portfolio-car.png`,
        alt: 'Aarya Patel portfolio',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Home | Aarya Patel',
    description:
      'Interactive portfolio showcasing Formula 1 engineering, software development, and powertrain design.',
    images: [`${siteUrl}/images/portfolio-car.png`],
  },
}

export default function HomePage() {
  return <HomeClient />
}

