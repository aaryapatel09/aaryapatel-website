import type { Metadata } from 'next'
import BlogIndexClient from '@/components/pages/BlogIndexClient'

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? 'http://localhost:3000'

export const metadata: Metadata = {
  title: 'Poetry | Aarya Patel',
  description: 'Poetry exploring the intersection of humanity and technology.',
  alternates: {
    canonical: `${siteUrl}/blog`,
  },
  openGraph: {
    type: 'website',
    url: `${siteUrl}/blog`,
    title: 'Poetry | Aarya Patel',
    description: 'Poetry exploring the intersection of humanity and technology.',
    images: [
      {
        url: `${siteUrl}/images/poetry-book-icon.png`,
        alt: 'Poetry',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Poetry | Aarya Patel',
    description: 'Poetry exploring the intersection of humanity and technology.',
    images: [`${siteUrl}/images/poetry-book-icon.png`],
  },
}

export default function BlogPage() {
  return <BlogIndexClient />
}

