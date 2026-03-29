import type { Metadata } from 'next'
import AboutClient from '@/components/pages/AboutClient'

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? 'http://localhost:3000'

export const metadata: Metadata = {
  title: 'About | Aarya Patel',
  description:
    'High school dropout, constantly building and learning. Open to interesting opportunities.',
  alternates: {
    canonical: `${siteUrl}/about`,
  },
  openGraph: {
    type: 'website',
    url: `${siteUrl}/about`,
    title: 'About | Aarya Patel',
    description:
      'High school dropout, constantly building and learning. Open to interesting opportunities.',
    images: [
      {
        url: `${siteUrl}/images/about-portrait.png`,
        alt: 'About Aarya Patel',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'About | Aarya Patel',
    description:
      'High school dropout, constantly building and learning. Open to interesting opportunities.',
    images: [`${siteUrl}/images/about-portrait.png`],
  },
}

export default function AboutPage() {
  return <AboutClient />
}

