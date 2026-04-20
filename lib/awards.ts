export type AwardCategory = 'poetry' | 'programming' | 'service' | 'other'

export interface Award {
  id: string
  title: string
  issuer: string
  date: string
  description: string
  category: AwardCategory
}

export const awards: Award[] = [
  {
    id: 'usapho-2026',
    title: 'U.S. Physics Olympiad (USAPhO) Qualifier',
    issuer: 'Issued by American Association of Physics Teachers (AAPT)',
    date: 'Mar 2026',
    description:
      'Qualified for the 2026 U.S. Physics Olympiad (USAPhO) exam by scoring above the national cutoff (16) on the F=ma contest, placing among the top 440 of 6,682 high school participants nationwide (~top 7%).',
    category: 'other',
  },
  {
    id: 'fbla-states-1st-place',
    title: '1st Place – FBLA California State, Computer Problem Solving',
    issuer: 'Issued by Future Business Leaders of America',
    date: 'Apr 2026',
    description:
      'Associated with Homestead High School. Ranked 1st among competitors at the 2026 FBLA California State Leadership Conference in the Computer Problem Solving event, an objective test on operating systems, networking, hardware, and security. Qualified to represent California at the FBLA National Leadership Conference.',
    category: 'programming',
  },
  {
    id: 'fbla-1st-place',
    title: '1st Place – FBLA Bay Section, Computer Problem Solving',
    issuer: 'Issued by Future Business Leaders of America',
    date: 'Feb 2026',
    description:
      'Associated with Homestead High School. Ranked 1st among competitors at the 2026 FBLA Bay Section Leadership Conference in the Computer Problem Solving event, an objective test on operating systems, networking, hardware, and security.',
    category: 'programming',
  },
  {
    id: '1',
    title: 'USACO Platinum',
    issuer: 'Issued by USA Computing Olympiad (USACO)',
    date: 'Feb 2026',
    description:
      'USACO Platinum contestant in the top competitive programming division, reached by only a few hundred students out of thousands worldwide each season. I consistently solve advanced algorithmic problems under time pressure, including dynamic programming, graph algorithms, and data structures. This reflects strong problem-solving, speed, and resilience on hard unseen problems.',
    category: 'programming',
  },
  {
    id: '2',
    title: 'Silver Key in Poetry – Scholastic Art & Writing Awards',
    issuer: 'Issued by The Alliance for Young Artists & Writers',
    date: 'Jan 2026',
    description:
      'Awarded the Silver Key in the 2026 Scholastic Art & Writing Awards for my poem The Ghost In The Gallery. Recognized for originality, technical skill, and personal voice in creative writing.',
    category: 'poetry',
  },
  {
    id: '3',
    title: 'Honorable Mention in Personal Essay & Memoir - Scholastic Art & Writing Awards',
    issuer: 'Issued by The Alliance for Young Artists & Writers',
    date: 'Dec 2025',
    description:
      'Awarded an Honorable Mention in the 2026 Scholastic Art & Writing Awards for my essay "The Year Everyone Else Moved On". Recognized for originality, technical skill, and personal voice in creative writing.',
    category: 'poetry',
  },
  {
    id: '4',
    title: 'Honorable Mention – NFSPS Manningham Poetry Contest (Senior Division)',
    issuer: 'Issued by National Federation of State Poetry Societies',
    date: 'Mar 2025',
    description:
      "Earned an Honorable Mention in one of the nation's most competitive high school poetry contests, ranking among the top entries nationwide. My poem, How to Live Inside a Wire, will be published in the 2025 NFSPS Student Prize Winners book, and I received a cash award.",
    category: 'poetry',
  },
  {
    id: 'topical-2024',
    title: 'Topical Winner – American High School Poets Holiday Special',
    issuer: 'Live Poets Society of New Jersey',
    date: 'Dec 2024',
    description:
      'Recognized as a Topical Winner for my poem, which was published in the American High School Poets - Holiday Special 2024 anthology. This printed collection features selected works from high school poets across the nation.',
    category: 'poetry',
  },
  {
    id: '6',
    title: "Gold President's Volunteer Service Award",
    issuer: "The President's Council on Service and Civic Participation",
    date: 'Jul 2024',
    description: 'Recognized for 100+ hours of community service.',
    category: 'service',
  },
]
