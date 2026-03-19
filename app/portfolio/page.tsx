import type { Metadata } from 'next'
import PortfolioClient from '@/components/pages/PortfolioClient'

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? 'http://localhost:3000'

export const metadata: Metadata = {
  title: 'Portfolio | Aarya Patel',
  description: 'Projects spanning software engineering, AI, and Formula 1 systems design.',
  alternates: {
    canonical: `${siteUrl}/portfolio`,
  },
  openGraph: {
    type: 'website',
    url: `${siteUrl}/portfolio`,
    title: 'Portfolio | Aarya Patel',
    description: 'Projects spanning software engineering, AI, and Formula 1 systems design.',
    images: [
      {
        url: `${siteUrl}/images/portfolio-car.png`,
        alt: 'Portfolio',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Portfolio | Aarya Patel',
    description: 'Projects spanning software engineering, AI, and Formula 1 systems design.',
    images: [`${siteUrl}/images/portfolio-car.png`],
  },
}

export default function PortfolioPage() {
  return <PortfolioClient />
}

