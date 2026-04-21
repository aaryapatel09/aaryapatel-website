'use client'

import { useEffect } from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import DashboardCard from '@/components/ui/DashboardCard'
import { useStore } from '@/store/useStore'

export default function AboutClient() {
  const { setCurrentSection } = useStore()
  const shouldReduceMotion = useReducedMotion()

  useEffect(() => {
    setCurrentSection('about')
  }, [setCurrentSection])

  const skills = [
    { name: 'Python', level: 95 },
    { name: 'Machine Learning', level: 92 },
    { name: 'Rust', level: 85 },
    { name: 'TypeScript / JavaScript', level: 85 },
    { name: 'Cloud & Infra (AWS, GCP, Docker, Postgres)', level: 85 },
  ]

  const experiences = [
    {
      title: 'Co-Founder & CEO — Vytus',
      period: 'Feb 2026 – Present',
      description:
        'Building a multimodal ML inference system in Rust with user-specific LoRA adapters across daily/weekly/monthly horizons — producing individual-level risk predictions from wearables, labs, vitals, nutrition, and behavioral signals. Built a counterfactual prediction engine (/what-if) grounded in causal ML, a Temporal-orchestrated nightly personalization pipeline, and scaled to a 300+ person waitlist. Incorporated as a Delaware C-Corp with HIPAA-compliant Postgres/Redis infrastructure from day one.',
    },
    {
      title: 'State President — Finance & Investments (FAI), FBLA',
      period: 'Oct 2024 – Present',
      description:
        'Lead 6,000+ members across 126+ chapters in 30+ states and 4 countries delivering financial literacy and investment education. Raised $50,000+ with partners including Chipotle and Intertwined, ran a Stock Market Competition awarding scholarships to 50+ participants, and organized 3+ guest lectures from industry leaders including a Wells Fargo VP. Previously served as State Vice President.',
    },
    {
      title: 'Co-Founder & Chief Operations Officer — Code4Cause',
      period: 'May 2025 – Present',
      description:
        'Co-founded a student-led nonprofit; grew the program to serve 20+ middle schoolers across 4 weeks of structured ML curriculum. Designed GreenSight, guiding students from 0 coding experience through a full ML pipeline. Students shipped a model identifying 15+ Bay Area high-CO₂ locations and submitted it to Sunnyvale city government; in talks with Mercury News for a feature.',
    },
    {
      title: 'Data Analytics Intern — Natalie Brunell (500K+ sub Fintech YouTuber)',
      period: 'May 2025 – Present',
      description:
        'Independent contractor. Built an analytics platform integrating YouTube and Twitter (X) APIs, monitoring 10+ channel metrics and competitor benchmarks in real time. Shipped 5+ interactive Streamlit/Plotly dashboards and integrated Google Gemini AI for natural language querying — reducing manual reporting by ~60%.',
    },
    {
      title: 'Founder — Automotive Restoration & Resale',
      period: 'Jun – Aug 2025',
      description:
        'Bought, restored, and resold 10+ damaged vehicles and motorcycles — engine rebuilds, electrical troubleshooting, bodywork, and welding. Generated $10K revenue in 3 months.',
    },
  ]

  return (
    <div className="pt-24 pb-12 min-h-screen bg-black text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Hero Section */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-20"
        >
          <h1 className="text-5xl md:text-7xl font-racing tracking-wider text-white mb-6">
            ABOUT
          </h1>
          <p className="text-lg font-mono text-gray-300 max-w-3xl leading-relaxed">
            Graduated high school early. Co-Founder &amp; CEO of Vytus. Constantly building and learning — and open to interesting opportunities.
          </p>
        </motion.section>

        {/* Skills Section */}
        <motion.section
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.6 }}
          className="mb-20"
        >
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-8"
          >
            <h2 className="text-3xl font-racing tracking-wider text-white mb-2">SKILLS & EXPERTISE</h2>
            <p className="text-sm font-mono text-gray-400 italic">
              Percentages represent expertise level from beginner to expert
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {skills.map((skill, index) => (
              <motion.div
                key={skill.name}
                initial={{ opacity: 0, x: -20, scale: 0.9 }}
                whileInView={{ opacity: 1, x: 0, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, type: 'spring', stiffness: 100 }}
                whileHover={{ scale: 1.05, y: -5 }}
              >
                <DashboardCard>
                  <div className="flex justify-between mb-2">
                    <motion.span className="text-sm font-mono text-white" whileHover={{ scale: 1.1 }}>
                      {skill.name}
                    </motion.span>
                    <motion.span
                      className="text-sm font-racing text-white"
                      initial={{ opacity: 0 }}
                      whileInView={{ opacity: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: index * 0.1 + 0.5 }}
                    >
                      {skill.level}%
                    </motion.span>
                  </div>
                  <div className="w-full h-2 bg-gray-800 rounded-full overflow-hidden relative">
                    <motion.div
                      initial={{ width: 0 }}
                      whileInView={{ width: `${skill.level}%` }}
                      viewport={{ once: true }}
                      transition={{ duration: 1.2, delay: index * 0.1, ease: 'easeOut' }}
                      className="h-full bg-gradient-to-r from-white to-gray-300 relative"
                    >
                      {/* Shimmer effect */}
                      {shouldReduceMotion ? (
                        <div className="absolute inset-0 bg-white/30" />
                      ) : (
                        <motion.div
                          className="absolute inset-0 bg-white/30"
                          animate={{ x: ['-100%', '100%'] }}
                          transition={{
                            duration: 2,
                            repeat: Infinity,
                            delay: index * 0.1 + 1,
                            ease: 'linear',
                          }}
                        />
                      )}
                    </motion.div>
                  </div>
                </DashboardCard>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* Experience Section */}
        <motion.section
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.6 }}
          className="mb-20"
        >
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl font-racing tracking-wider text-white mb-8"
          >
            EXPERIENCE
          </motion.h2>
          <div className="space-y-6">
            {experiences.map((exp, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30, scale: 0.95 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ delay: index * 0.15, type: 'spring', stiffness: 100 }}
                whileHover={{ scale: 1.02, y: -5 }}
              >
                <DashboardCard className="interactive-element h-full">
                  <motion.div
                    className="flex flex-col md:flex-row md:items-center md:justify-between mb-4"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.15 + 0.2 }}
                  >
                    <motion.h3
                      className="text-xl font-racing text-white mb-2 md:mb-0"
                      whileHover={{ scale: 1.05, x: 5 }}
                    >
                      {exp.title}
                    </motion.h3>
                    <motion.span className="text-sm font-mono text-gray-300" whileHover={{ scale: 1.1 }}>
                      {exp.period}
                    </motion.span>
                  </motion.div>
                  <motion.p
                    className="text-sm font-mono text-gray-300"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.15 + 0.3 }}
                  >
                    {exp.description}
                  </motion.p>
                </DashboardCard>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* Philosophy Section */}
        <motion.section
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.6 }}
        >
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl font-racing tracking-wider text-white mb-8"
          >
            HOW I WORK
          </motion.h2>
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            whileHover={{ scale: 1.02, y: -5 }}
            transition={{ type: 'spring', stiffness: 100 }}
          >
            <DashboardCard>
              <motion.p
                className="text-base font-mono text-gray-300 leading-relaxed"
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
              >
                I learn by building: shipping, debugging, and digging in until the system makes sense. If you&apos;re
                working on something ambitious or unusual and need someone who picks things up fast, reach out.
              </motion.p>
            </DashboardCard>
          </motion.div>
        </motion.section>
      </div>
    </div>
  )
}

