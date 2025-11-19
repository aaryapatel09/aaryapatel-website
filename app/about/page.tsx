'use client'

import { useEffect } from 'react'
import { motion } from 'framer-motion'
import DashboardCard from '@/components/ui/DashboardCard'
import { useStore } from '@/store/useStore'

export default function AboutPage() {
  const { setCurrentSection } = useStore()

  useEffect(() => {
    setCurrentSection('about')
  }, [setCurrentSection])

  const skills = [
    { name: 'Machine Learning', level: 95 },
    { name: 'Python', level: 95 },
    { name: 'AI & Data Science', level: 90 },
    { name: 'Java & C++', level: 85 },
    { name: 'CAD Design', level: 80 },
  ]

  const experiences = [
    {
      title: 'Co-Founder & Chief Operations Officer',
      period: 'May 2025 - Present',
      description: 'Co-founded Code4Cause, a student-led organization teaching middle schoolers Python, data analysis, and machine learning. Led operations for the 4-week "Greensight" program, guiding students from zero coding experience to building ML models for environmental impact. Managed program logistics, curriculum planning, and helped students produce research shared with local city governments.',
    },
    {
      title: 'State President - Finance and Investments (FAI)',
      period: 'Apr 2025 - Present',
      description: 'Lead a team of officers to empower 6,000+ members across 126+ chapters in 30+ states and 4 countries through financial literacy and investment opportunities. Foster partnerships, enhance engagement, and provide resources to chapters worldwide. Contributed to $50,000+ fundraised with partners including Chipotle and Intertwined.',
    },
    {
      title: 'Data Analytics Intern',
      period: 'May 2025 - Present',
      description: 'Independently developed an analytics platform integrating YouTube and Twitter data via APIs. Built data pipelines, created interactive dashboards using Streamlit and Plotly, and integrated Google Gemini AI for natural language querying. Designed automated social listening tools and competitor analysis frameworks.',
    },
    {
      title: 'Researcher - The New York Academy of Sciences',
      period: 'Sep 2024 - Dec 2024',
      description: 'Led a team of 4 in developing an AI-driven healthcare tool to address biases in medical diagnosis and treatment. Spearheaded design and implementation of core algorithms using Python, developed ethical AI filters, and created user interfaces for healthcare professionals. Presented findings to a panel of experts at the NYAS Innovation Challenge.',
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
          <p className="text-lg font-mono text-gray-300 max-w-3xl">
            High schooler passionate about AI and machine learning with experience in Python, Java, C++, MATLAB, and CAD.
            Fascinated by how F1 teams use ML for everything from aerodynamics to race strategy. Equally passionate about
            AI safety, ensuring the technology I love develops responsibly. Love exploring where software meets mechanical
            engineering through CAD design and code that could one day help shave milliseconds off lap times.
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
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl font-racing tracking-wider text-white mb-8"
          >
            SKILLS & EXPERTISE
          </motion.h2>
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
                    <motion.span
                      className="text-sm font-mono text-white"
                      whileHover={{ scale: 1.1 }}
                    >
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
                      <motion.div
                        className="absolute inset-0 bg-white/30"
                        animate={{
                          x: ['-100%', '100%'],
                        }}
                        transition={{
                          duration: 2,
                          repeat: Infinity,
                          delay: index * 0.1 + 1,
                          ease: 'linear',
                        }}
                      />
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
                    <motion.span
                      className="text-sm font-mono text-gray-300"
                      whileHover={{ scale: 1.1 }}
                    >
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
            ENGINEERING PHILOSOPHY
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
                className="text-base font-mono text-gray-300 leading-relaxed mb-4"
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
              >
                I believe in writing clean, maintainable code and building systems that are both
                performant and elegant. Every project is an opportunity to learn, innovate, and
                push the boundaries of what&apos;s possible with technology.
              </motion.p>
              <motion.p
                className="text-base font-mono text-gray-300 leading-relaxed"
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3 }}
              >
                Whether it&apos;s crafting intuitive user interfaces, designing scalable architectures,
                or solving complex engineering challenges, I approach each problem with curiosity,
                attention to detail, and a focus on creating meaningful impact.
              </motion.p>
            </DashboardCard>
          </motion.div>
        </motion.section>
      </div>
    </div>
  )
}

