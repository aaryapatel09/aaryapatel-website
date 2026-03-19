import type { Metadata } from 'next'
import AwardsClient from '@/components/pages/AwardsClient'

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? 'http://localhost:3000'

export const metadata: Metadata = {
  title: 'Awards | Aarya Patel',
  description: 'Recognition and achievements in poetry, competitive programming, and service.',
  alternates: {
    canonical: `${siteUrl}/awards`,
  },
  openGraph: {
    type: 'website',
    url: `${siteUrl}/awards`,
    title: 'Awards | Aarya Patel',
    description: 'Recognition and achievements in poetry, competitive programming, and service.',
    images: [
      {
        url: `${siteUrl}/images/trophy-icon.png`,
        alt: 'Awards',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Awards | Aarya Patel',
    description: 'Recognition and achievements in poetry, competitive programming, and service.',
    images: [`${siteUrl}/images/trophy-icon.png`],
  },
}

export default function AwardsPage() {
  return <AwardsClient />
}

