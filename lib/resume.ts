export interface ResumeAward {
  title: string
  detail: string
}

export interface ResumeEducation {
  school: string
  location: string
  coursework: string
  period: string
}

export interface ResumeExperience {
  org: string
  orgUrl?: string
  role: string
  location: string
  period: string
  bullets: string[]
}

export interface ResumeProject {
  name: string
  stack: string
  description: string
}

export interface ResumeSkills {
  languages: string[]
  ml: string[]
  infrastructure: string[]
  leadership: string[]
}

export interface Resume {
  name: string
  location: string
  email: string
  website: { label: string; url: string }
  github: { label: string; url: string }
  linkedin: { label: string; url: string }
  lastUpdated: string
  pdfUrl: string
  awards: ResumeAward[]
  education: ResumeEducation[]
  experience: ResumeExperience[]
  projects: ResumeProject[]
  skills: ResumeSkills
}

export const resume: Resume = {
  name: 'Aarya Patel',
  location: 'Sunnyvale, CA',
  email: 'aarya.niraj007@gmail.com',
  website: { label: 'aaryapatel.site', url: 'https://www.aaryapatel.site' },
  github: { label: 'github.com/aaryapatel09', url: 'https://github.com/aaryapatel09' },
  linkedin: { label: 'linkedin.com/in/aaryapatel1', url: 'https://www.linkedin.com/in/aaryapatel1/' },
  lastUpdated: 'April 2026',
  pdfUrl: '/aarya-patel-resume.pdf',

  awards: [
    { title: 'USACO Platinum', detail: 'Top <1% of participants' },
    { title: 'USAPHO Qualifier', detail: 'Top ~400 nationally out of 6,000+ competitors' },
    {
      title: '1st Place, FBLA States',
      detail: 'Computer Problem Solving; #1 CA (prev. #1 Bay Sections)',
    },
    {
      title: 'Scholastic Art & Writing Awards',
      detail: '2× Silver Key in Poetry (330,000+ submissions)',
    },
  ],

  education: [
    {
      school: 'Homestead High School',
      location: 'Sunnyvale, CA',
      coursework:
        'Relevant Coursework: Advanced Mathematics, Computer Science, Physics, Engineering Design',
      period: 'Aug. 2023 – Jun. 2027',
    },
  ],

  experience: [
    {
      org: 'Vytus',
      orgUrl: 'https://vytus.health',
      role: 'Co-Founder & CEO',
      location: 'Sunnyvale, CA',
      period: 'Feb. 2026 – Present',
      bullets: [
        'Architected a multimodal ML inference system in Rust — user-specific LoRA adapters across daily/weekly/monthly horizons — producing individual-level risk predictions from wearables, labs, vitals, nutrition, and behavioral signals.',
        'Built a counterfactual prediction engine (/what-if) for causal outcome estimates under hypothetical input perturbations, applying causal ML and decision theory to a production system.',
        'Designed a Temporal-orchestrated nightly personalization pipeline: per-user feature extraction, model inference, and intervention generation — not population averages.',
        'Scaled to 300+ person waitlist; incorporated as a Delaware C-Corp with HIPAA-compliant Postgres/Redis infrastructure from day one.',
      ],
    },
    {
      org: 'Finance & Investments (FAI)',
      role: 'State President (prev. State Vice President)',
      location: 'California',
      period: 'Oct. 2024 – Present',
      bullets: [
        'Lead 6,000+ members across 126+ chapters in 30+ states and 4 countries delivering financial literacy and investment education.',
        '$50,000+ fundraised with Chipotle and Intertwined; Stock Market Competition awarding scholarships to 50+ participants; 3+ guest lectures from industry leaders incl. Wells Fargo VP.',
      ],
    },
    {
      org: 'Code4Cause',
      role: 'Co-Founder & Chief Operations Officer',
      location: '',
      period: 'May 2025 – Present',
      bullets: [
        'Co-founded student-led nonprofit; grew program to serve 20+ middle schoolers across 4 weeks of structured ML curriculum.',
        'Designed GreenSight: guided students from 0 coding experience through a full ML pipeline — Python fundamentals to predictive modeling to civic advocacy; students built a model identifying 15+ Bay Area high-CO₂ locations submitted to Sunnyvale city government; in talks with Mercury News for a feature.',
      ],
    },
    {
      org: 'Natalie Brunell (500K+ subscriber Fintech YouTuber)',
      role: 'Data Analytics Intern | Independent Contractor',
      location: '',
      period: 'May 2025 – Present',
      bullets: [
        'Built analytics platform integrating YouTube & Twitter (X) APIs, monitoring 10+ channel metrics and competitor benchmarks in real time.',
        'Created 5+ interactive Streamlit/Plotly dashboards; integrated Google Gemini AI for natural language querying, reducing manual reporting by ~60%.',
      ],
    },
    {
      org: 'Automotive Restoration & Resale',
      role: 'Founder — Self-Employed',
      location: '',
      period: 'Jun. – Aug. 2025',
      bullets: [
        'Bought, restored, and resold 10+ damaged vehicles and motorcycles; engine rebuilds, electrical troubleshooting, bodywork, and welding. Generated $10K revenue in 3 months.',
      ],
    },
  ],

  projects: [
    {
      name: 'sigint',
      stack: 'Python, Claude API, DuckDB, Open Source',
      description:
        'Quant pipeline extracting timestamped trading signals from SEC filings (10-K, 10-Q, 8-K) via LLMs — grounded in Cohen, Malloy & Nguyen (2020); 4 engines: supply chain graph, risk factor diff, M&A detector, tone tracker; outputs to Parquet/DuckDB with FastAPI + webhook support.',
    },
    {
      name: 'neurosim',
      stack: 'Python, JAX, Open Source',
      description:
        'Differentiable physics library (classical mechanics, FDTD EM, quantum, statistical mechanics) — fully differentiable end-to-end; enables inverse problem solving via autodiff.',
    },
  ],

  skills: {
    languages: ['Python', 'Rust', 'Java', 'C++', 'TypeScript', 'JavaScript', 'MATLAB'],
    ml: [
      'Multimodal inference',
      'LoRA fine-tuning',
      'Causal modeling',
      'GPU systems',
      'CNNs',
      'LSTMs',
      'Computer vision',
    ],
    infrastructure: [
      'AWS',
      'GCP',
      'Docker',
      'Temporal',
      'Postgres',
      'Redis',
      'HIPAA pipelines',
      'Prometheus',
      'Grafana',
    ],
    leadership: [
      'Founded & scaled 2 orgs',
      'Led 6,000+ member national org',
      'Curriculum design',
      'Technical mentorship',
      'Public speaking',
      'C-Corp incorporation',
    ],
  },
}
