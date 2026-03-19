import type { Metadata } from 'next'
import GalleryClient from '@/components/pages/GalleryClient'

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? 'http://localhost:3000'

export const metadata: Metadata = {
  title: 'Gallery | Aarya Patel',
  description: 'Photos from travels, adventures, and life experiences.',
  alternates: {
    canonical: `${siteUrl}/gallery`,
  },
  openGraph: {
    type: 'website',
    url: `${siteUrl}/gallery`,
    title: 'Gallery | Aarya Patel',
    description: 'Photos from travels, adventures, and life experiences.',
    images: [
      {
        url: `${siteUrl}/images/camera-icon.png`,
        alt: 'Gallery',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Gallery | Aarya Patel',
    description: 'Photos from travels, adventures, and life experiences.',
    images: [`${siteUrl}/images/camera-icon.png`],
  },
}

export default function GalleryPage() {
  return <GalleryClient />
}