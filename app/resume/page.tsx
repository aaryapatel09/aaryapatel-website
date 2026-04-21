import type { Metadata } from 'next'
import ResumeClient from '@/components/pages/ResumeClient'
import { resume } from '@/lib/resume'

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? 'http://localhost:3000'

export const metadata: Metadata = {
  title: 'Resume',
  description:
    "Aarya Patel's resume — Homestead High School (Sunnyvale, CA), USACO Platinum, USAPHO Qualifier, FBLA California State 1st place in Computer Problem Solving, Scholastic Art & Writing Silver Keys. Co-Founder & CEO of Vytus, FBLA FAI State President, Co-Founder & COO of Code4Cause. View the resume or download the PDF.",
  alternates: {
    canonical: `${siteUrl}/resume`,
  },
  openGraph: {
    type: 'profile',
    url: `${siteUrl}/resume`,
    title: 'Resume | Aarya Patel',
    description:
      "Aarya Patel — high school student at Homestead HS. Co-Founder/CEO Vytus, USACO Platinum, USAPHO Qualifier, FBLA CA 1st Place CPS, Scholastic Silver Keys.",
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
      "Aarya Patel — Homestead HS, USACO Platinum, USAPHO, FBLA CA 1st, Scholastic Silver Keys.",
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

const personRef = { '@type': 'Person', name: resume.name, url: siteUrl } as const

const profilePageJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'ProfilePage',
  url: `${siteUrl}/resume`,
  name: `${resume.name} — Resume`,
  description: `Resume of ${resume.name}, ${resume.education[0].school} (${resume.education[0].location}).`,
  mainEntity: {
    '@type': 'Person',
    name: resume.name,
    url: siteUrl,
    email: `mailto:${resume.email}`,
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Sunnyvale',
      addressRegion: 'CA',
      addressCountry: 'US',
    },
    alumniOf: resume.education.map((e) => ({
      '@type': 'EducationalOrganization',
      name: e.school,
      address: {
        '@type': 'PostalAddress',
        addressLocality: e.location.split(',')[0]?.trim(),
        addressRegion: e.location.split(',')[1]?.trim() ?? 'CA',
        addressCountry: 'US',
      },
    })),
    award: resume.awards.map((a) => `${a.title} — ${a.detail}`),
    hasOccupation: resume.experience.map((x) => ({
      '@type': 'Occupation',
      name: x.role,
      occupationLocation: x.location ? { '@type': 'Place', name: x.location } : undefined,
      estimatedSalary: undefined,
      responsibilities: x.bullets.join(' '),
      educationRequirements: undefined,
      employer: x.orgUrl
        ? { '@type': 'Organization', name: x.org, url: x.orgUrl }
        : { '@type': 'Organization', name: x.org },
    })),
    workExample: resume.projects.map((p) => ({
      '@type': 'SoftwareSourceCode',
      name: p.name,
      description: p.description,
      programmingLanguage: p.stack,
      author: personRef,
    })),
    knowsLanguage: resume.skills.languages,
    knowsAbout: [
      ...resume.skills.ml,
      ...resume.skills.infrastructure,
      ...resume.skills.leadership,
    ],
    sameAs: [resume.website.url, resume.github.url, resume.linkedin.url],
  },
}

const resumeDocumentJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'DigitalDocument',
  '@id': `${siteUrl}${resume.pdfUrl}`,
  name: `${resume.name}'s Resume`,
  description: `Resume of ${resume.name}. Last updated ${resume.lastUpdated}.`,
  encodingFormat: 'application/pdf',
  url: `${siteUrl}${resume.pdfUrl}`,
  author: personRef,
  creator: personRef,
  about: personRef,
  inLanguage: 'en-US',
  dateModified: resume.lastUpdated,
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
        dangerouslySetInnerHTML={{ __html: JSON.stringify(profilePageJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(resumeDocumentJsonLd) }}
      />
      <ResumeClient />
    </>
  )
}
