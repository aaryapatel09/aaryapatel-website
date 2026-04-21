import type { Metadata } from 'next'
import AboutClient from '@/components/pages/AboutClient'

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? 'http://localhost:3000'

export const metadata: Metadata = {
  title: 'About',
  description:
    'About Aarya Patel: high school student at Homestead High School (Cupertino, CA), USACO Platinum programmer, USAPhO qualifier, FBLA California State 1st place in Computer Problem Solving, Scholastic Art & Writing Silver Key poet, co-founder of Code4Cause.',
  alternates: {
    canonical: `${siteUrl}/about`,
  },
  openGraph: {
    type: 'profile',
    url: `${siteUrl}/about`,
    title: 'About Aarya Patel',
    description:
      'About Aarya Patel: Homestead High School student, USACO Platinum programmer, USAPhO qualifier, FBLA California State 1st place, Scholastic-recognized poet.',
    images: [
      {
        url: `${siteUrl}/images/about-portrait.png`,
        alt: 'Aarya Patel',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'About Aarya Patel',
    description:
      'About Aarya Patel: Homestead High School student, USACO Platinum programmer, USAPhO qualifier, FBLA California State 1st place, Scholastic-recognized poet.',
    images: [`${siteUrl}/images/about-portrait.png`],
  },
}

const breadcrumbJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: `${siteUrl}/` },
    { '@type': 'ListItem', position: 2, name: 'About', item: `${siteUrl}/about` },
  ],
}

const profilePageJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'ProfilePage',
  url: `${siteUrl}/about`,
  name: 'About Aarya Patel',
  mainEntity: {
    '@type': 'Person',
    name: 'Aarya Patel',
    url: siteUrl,
    sameAs: [
      'https://www.instagram.com/aaryapatel_1/',
      'https://www.linkedin.com/in/aaryapatel1/',
      'https://github.com/aaryapatel09',
      'https://x.com/AaryaPatel63558',
    ],
  },
}

const faqJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'Who is Aarya Patel?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Aarya Patel is a high school student at Homestead High School in Cupertino, California. He is a USACO Platinum competitive programmer, U.S. Physics Olympiad (USAPhO) qualifier, FBLA California State 1st place winner in Computer Problem Solving, and a nationally recognized poet (Scholastic Art & Writing Silver Key, NFSPS Manningham Honorable Mention). He builds software, machine learning, and Formula 1 engineering projects.',
      },
    },
    {
      '@type': 'Question',
      name: 'What school does Aarya Patel attend?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Aarya Patel attends Homestead High School in Cupertino, California.',
      },
    },
    {
      '@type': 'Question',
      name: 'What awards has Aarya Patel won?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: "Aarya Patel's awards include: 1st Place at the 2026 FBLA California State Leadership Conference in Computer Problem Solving, 1st Place at the 2026 FBLA Bay Section Leadership Conference in Computer Problem Solving, USACO Platinum Division standing (2026), U.S. Physics Olympiad (USAPhO) Qualifier (2026), Silver Key in Poetry at the 2026 Scholastic Art & Writing Awards, Honorable Mention in Personal Essay & Memoir at the 2026 Scholastic Art & Writing Awards, Honorable Mention in the 2025 NFSPS Manningham Poetry Contest (Senior Division), Topical Winner in the 2024 American High School Poets Holiday Special, and the Gold President's Volunteer Service Award (2024).",
      },
    },
    {
      '@type': 'Question',
      name: 'What does Aarya Patel do in competitive programming?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Aarya Patel competes in the USACO Platinum Division, the highest tier of the USA Computing Olympiad, reached by only a few hundred students worldwide each season. He also won 1st place at the 2026 FBLA California State Leadership Conference in the Computer Problem Solving event, which tests operating systems, networking, hardware, and security.',
      },
    },
    {
      '@type': 'Question',
      name: 'What has Aarya Patel published as a poet?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Aarya Patel earned a Silver Key in the 2026 Scholastic Art & Writing Awards for his poem "The Ghost In The Gallery" and an Honorable Mention in Personal Essay & Memoir for "The Year Everyone Else Moved On". His poem "How to Live Inside a Wire" will be published in the 2025 NFSPS Student Prize Winners book after earning an Honorable Mention in the senior division of the NFSPS Manningham Poetry Contest. Additional work appears in the 2024 American High School Poets Holiday Special anthology.',
      },
    },
    {
      '@type': 'Question',
      name: 'What projects has Aarya Patel built?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Aarya Patel has built an F1 race-winner predictor using machine learning on 70+ years of data, a real-time American Sign Language translator using CNNs and TensorFlow, DrunkTester2.0 for sobriety assessment via computer vision and speech analysis, a Smart Health Assistant, a YouTube/Twitter data analytics platform with Google Gemini integration, and an AI healthcare bias-mitigation tool built at the New York Academy of Sciences.',
      },
    },
    {
      '@type': 'Question',
      name: 'What roles does Aarya Patel hold in FBLA?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Aarya Patel is the FBLA State President for Finance and Investments (FAI), leading a team of officers who support 6,000+ members across 126+ chapters in 30+ states and 4 countries. He has also won 1st place at both the 2026 Bay Section and 2026 California State FBLA conferences in the Computer Problem Solving event.',
      },
    },
    {
      '@type': 'Question',
      name: 'What programming languages does Aarya Patel use?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Aarya Patel works primarily in Python, Java, C++, TypeScript, and JavaScript, with applied work in machine learning (TensorFlow, CNNs), data engineering (Streamlit, Plotly, REST APIs), and full-stack web development.',
      },
    },
    {
      '@type': 'Question',
      name: 'How can I contact Aarya Patel?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'You can reach Aarya Patel through his verified social profiles: LinkedIn (linkedin.com/in/aaryapatel1), GitHub (github.com/aaryapatel09), Instagram (@aaryapatel_1), and X (@AaryaPatel63558).',
      },
    },
  ],
}

export default function AboutPage() {
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
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      <AboutClient />
    </>
  )
}
