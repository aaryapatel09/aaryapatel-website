import type { Metadata } from 'next'
import ResumeClient from '@/components/pages/ResumeClient'

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? 'http://localhost:3000'

export const metadata: Metadata = {
  title: 'Resume',
  description:
    "Aarya Patel's resume — Homestead High School student, USACO Platinum programmer, USAPhO qualifier, FBLA California State 1st place in Computer Problem Solving, Scholastic Art & Writing Silver Key poet. View or download the PDF.",
  alternates: {
    canonical: `${siteUrl}/resume`,
  },
  openGraph: {
    type: 'profile',
    url: `${siteUrl}/resume`,
    title: 'Resume | Aarya Patel',
    description:
      "View or download Aarya Patel's resume. Competitive programming, physics, business leadership, software engineering, and poetry.",
    images: [
      {
        url: `${siteUrl}/images/about-portrait.png`,
        alt: "Aarya Patel's resume",
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Resume | Aarya Patel',
    description:
      "View or download Aarya Patel's resume.",
    images: [`${siteUrl}/images/about-portrait.png`],
  },
}

const breadcrumbJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: `${siteUrl}/` },
    { '@type': 'ListItem', position: 2, name: 'Resume', item: `${siteUrl}/resume` },
  ],
}

const resumeJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'DigitalDocument',
  '@id': `${siteUrl}/aarya-patel-resume.pdf`,
  name: "Aarya Patel's Resume",
  description:
    "Resume of Aarya Patel, high school student at Homestead High School in Cupertino, CA. Competitive programming (USACO Platinum), physics olympiad (USAPhO), FBLA California State 1st place, and published poetry.",
  encodingFormat: 'application/pdf',
  url: `${siteUrl}/aarya-patel-resume.pdf`,
  author: { '@type': 'Person', name: 'Aarya Patel', url: siteUrl },
  creator: { '@type': 'Person', name: 'Aarya Patel', url: siteUrl },
  about: { '@type': 'Person', name: 'Aarya Patel', url: siteUrl },
  inLanguage: 'en-US',
}

export default function ResumePage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(resumeJsonLd) }}
      />
      <ResumeClient />
    </>
  )
}
