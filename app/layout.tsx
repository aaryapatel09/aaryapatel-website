import type { Metadata } from 'next'
import './globals.css'
import CustomCursor from '@/components/ui/CustomCursor'
import ConsoleGreeting from '@/components/ui/ConsoleGreeting'
import EasterEggs from '@/components/ui/EasterEggs'
import SocialLinks from '@/components/layout/SocialLinks'
import GlobalNav from '@/components/layout/GlobalNav'
import ThemeProvider from '@/components/ui/ThemeProvider'

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? 'http://localhost:3000'

const siteDescription =
  'Aarya Patel — builder, competitive programmer, and poet. Co-Founder & CEO of Vytus (multimodal ML for health). Official portfolio of Aarya Patel featuring USACO Platinum programming, USAPHO physics olympiad, FBLA California State 1st Place in Computer Problem Solving, Scholastic Art & Writing poetry, and open-source ML infrastructure projects (sigint, neurosim).'

export const metadata: Metadata = {
  title: {
    default: 'Aarya Patel',
    template: '%s | Aarya Patel',
  },
  description: siteDescription,
  metadataBase: new URL(siteUrl),
  manifest: '/site.webmanifest',
  applicationName: 'Aarya Patel',
  authors: [{ name: 'Aarya Patel', url: siteUrl }],
  creator: 'Aarya Patel',
  publisher: 'Aarya Patel',
  keywords: [
    'Aarya',
    'Aarya Patel',
    'aarya patel',
    'aaryapatel',
    'Aarya Patel portfolio',
    'Aarya Patel website',
    'Aarya Patel Homestead',
    'Aarya Patel USACO',
    'Aarya Patel FBLA',
    'Aarya Patel poet',
    'Aarya Patel engineer',
    'Aarya Patel software',
    'Aarya Patel F1',
  ],
  category: 'personal website',
  alternates: {
    canonical: '/',
  },
  icons: {
    icon: '/images/favicon.ico',
    shortcut: '/images/favicon.ico',
    apple: '/images/favicon.ico',
  },
  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      'max-snippet': -1,
      'max-image-preview': 'large',
      'max-video-preview': -1,
    },
  },
  openGraph: {
    type: 'website',
    url: siteUrl,
    siteName: 'Aarya Patel',
    title: 'Aarya Patel',
    description: siteDescription,
    locale: 'en_US',
    images: [
      {
        url: '/images/portfolio-car.png',
        alt: 'Aarya Patel',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Aarya Patel',
    description: siteDescription,
    creator: '@AaryaPatel63558',
    images: ['/images/portfolio-car.png'],
  },
  verification: {
    google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION,
  },
}

const personJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Person',
  name: 'Aarya Patel',
  alternateName: ['Aarya', 'aarya patel', 'aaryapatel'],
  url: siteUrl,
  mainEntityOfPage: siteUrl,
  image: `${siteUrl}/images/about-portrait.png`,
  description:
    'Aarya Patel graduated high school early from Homestead High School (Sunnyvale, California). He is Co-Founder & CEO of Vytus (vytus.health), a multimodal ML health platform built in Rust with user-specific LoRA adapters, causal counterfactual inference, and HIPAA-compliant infrastructure. He is a USACO Platinum competitive programmer, U.S. Physics Olympiad (USAPHO) qualifier, 1st place winner at FBLA California State in Computer Problem Solving (and #1 Bay Sections), and a Scholastic Art & Writing Awards Silver Key poet. He co-founded Code4Cause, serves as FBLA Finance & Investments State President, and builds open-source ML infrastructure (sigint, neurosim).',
  jobTitle: 'Student, software engineer, and poet',
  nationality: 'American',
  gender: 'Male',
  alumniOf: {
    '@type': 'EducationalOrganization',
    name: 'Homestead High School',
    sameAs: 'https://en.wikipedia.org/wiki/Homestead_High_School_(Cupertino,_California)',
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Cupertino',
      addressRegion: 'CA',
      addressCountry: 'US',
    },
  },
  worksFor: {
    '@type': 'Organization',
    name: 'Vytus',
    url: 'https://vytus.health',
    description:
      'Multimodal ML health platform. Delaware C-Corp with HIPAA-compliant infrastructure.',
  },
  memberOf: [
    { '@type': 'Organization', name: 'Future Business Leaders of America (FBLA)' },
    { '@type': 'Organization', name: 'USA Computing Olympiad (USACO)' },
    { '@type': 'Organization', name: 'Code4Cause' },
  ],
  knowsAbout: [
    'Multimodal machine learning inference',
    'LoRA fine-tuning',
    'Causal machine learning',
    'Counterfactual prediction',
    'Decision theory',
    'GPU systems',
    'HIPAA-compliant infrastructure',
    'Rust systems programming',
    'Differentiable physics simulation',
    'Quantitative trading signals',
    'LLM information extraction',
    'Computer science',
    'Software engineering',
    'Machine learning',
    'Artificial intelligence',
    'Data analytics',
    'Competitive programming',
    'USACO Platinum algorithms',
    'Dynamic programming',
    'Graph algorithms',
    'Physics',
    'Physics olympiad',
    'FBLA Computer Problem Solving',
    'Operating systems',
    'Computer networking',
    'Poetry',
    'Creative writing',
    'C-Corp incorporation and startup operations',
  ],
  knowsLanguage: ['English', 'Python', 'Rust', 'Java', 'C++', 'TypeScript', 'JavaScript', 'MATLAB'],
  hasOccupation: {
    '@type': 'Occupation',
    name: 'Co-Founder & CEO of Vytus; software and ML engineer',
    skills: [
      'Python',
      'Rust',
      'TypeScript',
      'Multimodal ML inference',
      'LoRA fine-tuning',
      'Causal modeling',
      'GPU systems',
      'Postgres',
      'Redis',
      'Docker',
      'Temporal',
      'AWS',
      'GCP',
      'HIPAA pipelines',
      'Competitive programming',
      'Data analytics',
      'Public speaking',
      'C-Corp incorporation',
    ],
  },
  award: [
    '1st Place, FBLA California State Leadership Conference, Computer Problem Solving (2026)',
    '1st Place, FBLA Bay Section Leadership Conference, Computer Problem Solving (2026)',
    'USACO Platinum Division contestant (2026)',
    'U.S. Physics Olympiad (USAPhO) Qualifier (2026)',
    'Silver Key in Poetry, Scholastic Art & Writing Awards (2026)',
    'Honorable Mention in Personal Essay & Memoir, Scholastic Art & Writing Awards (2026)',
    'Honorable Mention, NFSPS Manningham Poetry Contest, Senior Division (2025)',
    'Topical Winner, American High School Poets Holiday Special (2024)',
    "Gold President's Volunteer Service Award (2024)",
  ],
  sameAs: [
    'https://www.instagram.com/aaryapatel_1/',
    'https://www.linkedin.com/in/aaryapatel1/',
    'https://github.com/aaryapatel09',
    'https://x.com/AaryaPatel63558',
  ],
  subjectOf: [
    { '@type': 'WebPage', name: 'About Aarya Patel', url: `${siteUrl}/about` },
    { '@type': 'CollectionPage', name: "Aarya Patel's Awards", url: `${siteUrl}/awards` },
    { '@type': 'CollectionPage', name: "Aarya Patel's Portfolio", url: `${siteUrl}/portfolio` },
    { '@type': 'Blog', name: "Aarya Patel's Poetry", url: `${siteUrl}/blog` },
  ],
}

const websiteJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  name: 'Aarya Patel',
  alternateName: 'Aarya Patel Portfolio',
  url: siteUrl,
  inLanguage: 'en-US',
  author: { '@type': 'Person', name: 'Aarya Patel' },
  potentialAction: {
    '@type': 'SearchAction',
    target: `${siteUrl}/blog?q={search_term_string}`,
    'query-input': 'required name=search_term_string',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteJsonLd) }}
        />
      </head>
      <body className="antialiased" style={{ backgroundColor: 'var(--bg-primary)', color: 'var(--text-primary)' }}>
        <ThemeProvider />
        <CustomCursor />
        <ConsoleGreeting />
        <EasterEggs />
        <SocialLinks />
        <GlobalNav />
        <main className="min-h-screen">
          {children}
        </main>
      </body>
    </html>
  )
}

