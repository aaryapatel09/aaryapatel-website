import type { Metadata } from 'next'
import PortfolioClient from '@/components/pages/PortfolioClient'
import { projects } from '@/lib/projects'

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? 'http://localhost:3000'

export const metadata: Metadata = {
  title: 'Portfolio',
  description:
    "Aarya Patel's projects in software engineering, machine learning, AI, and Formula 1 systems design, including the F1 Predictor, an ASL translator, DrunkTester2.0, and AI healthcare research at NYAS.",
  alternates: {
    canonical: `${siteUrl}/portfolio`,
  },
  openGraph: {
    type: 'website',
    url: `${siteUrl}/portfolio`,
    title: 'Portfolio | Aarya Patel',
    description:
      "Aarya Patel's projects in machine learning, computer vision, AI, and Formula 1 systems.",
    images: [
      {
        url: `${siteUrl}/images/portfolio-car.png`,
        alt: "Aarya Patel's portfolio",
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Portfolio | Aarya Patel',
    description:
      "Aarya Patel's projects in machine learning, computer vision, AI, and Formula 1 systems.",
    images: [`${siteUrl}/images/portfolio-car.png`],
  },
}

const breadcrumbJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: `${siteUrl}/` },
    { '@type': 'ListItem', position: 2, name: 'Portfolio', item: `${siteUrl}/portfolio` },
  ],
}

const itemListJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'ItemList',
  name: "Aarya Patel's Projects",
  description:
    "Software, machine learning, computer vision, and F1 engineering projects built by Aarya Patel.",
  numberOfItems: projects.length,
  itemListElement: projects.map((p, i) => ({
    '@type': 'ListItem',
    position: i + 1,
    item: {
      '@type': 'SoftwareApplication',
      '@id': p.githubUrl ?? `${siteUrl}/portfolio#${p.id}`,
      name: p.title,
      description: p.description,
      applicationCategory: 'DeveloperApplication',
      operatingSystem: 'Any',
      author: { '@type': 'Person', name: 'Aarya Patel', url: siteUrl },
      creator: { '@type': 'Person', name: 'Aarya Patel', url: siteUrl },
      keywords: p.technologies.join(', '),
      codeRepository: p.githubUrl,
      url: p.githubUrl ?? `${siteUrl}/portfolio`,
    },
  })),
}

export default function PortfolioPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListJsonLd) }}
      />
      <PortfolioClient />
    </>
  )
}
