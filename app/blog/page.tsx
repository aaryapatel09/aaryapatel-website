import type { Metadata } from 'next'
import BlogIndexClient from '@/components/pages/BlogIndexClient'

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? 'http://localhost:3000'

export const metadata: Metadata = {
  title: 'Poetry | Aarya Patel',
  description:
    "Poetry by Aarya Patel, including Scholastic Art & Writing Silver Key winner 'The Ghost In The Gallery', NFSPS-recognized 'How to Live Inside a Wire', and more.",
  alternates: {
    canonical: `${siteUrl}/blog`,
  },
  openGraph: {
    type: 'website',
    url: `${siteUrl}/blog`,
    title: 'Poetry | Aarya Patel',
    description:
      "Poetry by Aarya Patel — nationally recognized work from Scholastic Art & Writing Awards and NFSPS.",
    images: [
      {
        url: `${siteUrl}/images/poetry-book-icon.png`,
        alt: "Aarya Patel's poetry",
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Poetry | Aarya Patel',
    description:
      "Poetry by Aarya Patel — nationally recognized work from Scholastic Art & Writing Awards and NFSPS.",
    images: [`${siteUrl}/images/poetry-book-icon.png`],
  },
}

const breadcrumbJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: `${siteUrl}/` },
    { '@type': 'ListItem', position: 2, name: 'Poetry', item: `${siteUrl}/blog` },
  ],
}

const blogJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Blog',
  name: "Aarya Patel's Poetry",
  url: `${siteUrl}/blog`,
  description:
    "Poetry by Aarya Patel exploring the intersection of humanity, memory, and technology. Includes Scholastic Silver Key and NFSPS-recognized work.",
  author: { '@type': 'Person', name: 'Aarya Patel', url: siteUrl },
  publisher: { '@type': 'Person', name: 'Aarya Patel', url: siteUrl },
  inLanguage: 'en-US',
}

export default function BlogPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(blogJsonLd) }}
      />
      <BlogIndexClient />
    </>
  )
}
