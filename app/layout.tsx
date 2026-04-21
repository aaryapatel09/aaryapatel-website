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
  'Aarya Patel — student, builder, and poet. Official portfolio of Aarya Patel featuring Formula 1 engineering projects, software, USACO Platinum programming, FBLA awards, and published poetry.'

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
    'Aarya Patel is a high school student at Homestead High School (Cupertino, California). He is a USACO Platinum competitive programmer, U.S. Physics Olympiad (USAPhO) qualifier, FBLA California State 1st place winner in Computer Problem Solving, and a nationally recognized poet (Scholastic Art & Writing Silver Key, NFSPS Manningham Honorable Mention). He builds software, machine learning, and F1 engineering projects, and co-founded Code4Cause.',
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
  memberOf: [
    { '@type': 'Organization', name: 'Future Business Leaders of America (FBLA)' },
    { '@type': 'Organization', name: 'USA Computing Olympiad (USACO)' },
    { '@type': 'Organization', name: 'Code4Cause', url: 'https://code4cause.org' },
  ],
  knowsAbout: [
    'Formula 1 engineering',
    'Powertrain design',
    'Computer science',
    'Software engineering',
    'Machine learning',
    'Artificial intelligence',
    'Data science',
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
  ],
  knowsLanguage: ['English', 'Python', 'Java', 'C++', 'JavaScript', 'TypeScript'],
  hasOccupation: {
    '@type': 'Occupation',
    name: 'Student and software engineer',
    skills: [
      'Python',
      'Java',
      'C++',
      'TypeScript',
      'Machine learning',
      'CAD design',
      'Competitive programming',
      'Data analytics',
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

