import type { Metadata } from 'next'
import AwardsClient from '@/components/pages/AwardsClient'
import { awards } from '@/lib/awards'

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? 'http://localhost:3000'

export const metadata: Metadata = {
  title: 'Awards | Aarya Patel',
  description:
    "Aarya Patel's awards: USACO Platinum, U.S. Physics Olympiad (USAPhO) qualifier, FBLA California State 1st place in Computer Problem Solving, Scholastic Art & Writing Silver Key, NFSPS Manningham Honorable Mention, and more.",
  alternates: {
    canonical: `${siteUrl}/awards`,
  },
  openGraph: {
    type: 'website',
    url: `${siteUrl}/awards`,
    title: 'Awards | Aarya Patel',
    description:
      "Aarya Patel's awards in competitive programming, physics, business leadership, and poetry.",
    images: [
      {
        url: `${siteUrl}/images/trophy-icon.png`,
        alt: "Aarya Patel's awards",
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Awards | Aarya Patel',
    description:
      "Aarya Patel's awards in competitive programming, physics, business leadership, and poetry.",
    images: [`${siteUrl}/images/trophy-icon.png`],
  },
}

const breadcrumbJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: `${siteUrl}/` },
    { '@type': 'ListItem', position: 2, name: 'Awards', item: `${siteUrl}/awards` },
  ],
}

const itemListJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'ItemList',
  name: "Aarya Patel's Awards",
  description:
    "Complete list of awards and honors earned by Aarya Patel in competitive programming, physics, business leadership, and poetry.",
  numberOfItems: awards.length,
  itemListOrder: 'https://schema.org/ItemListOrderDescending',
  itemListElement: awards.map((a, i) => ({
    '@type': 'ListItem',
    position: i + 1,
    item: {
      '@type': 'Award',
      name: a.title,
      description: a.description,
      dateAwarded: a.date,
      awardedBy: a.issuer.replace(/^Issued by\s*/i, ''),
      recipient: { '@type': 'Person', name: 'Aarya Patel', url: siteUrl },
    },
  })),
}

export default function AwardsPage() {
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
      <AwardsClient />
    </>
  )
}
