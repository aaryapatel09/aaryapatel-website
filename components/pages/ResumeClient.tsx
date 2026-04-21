'use client'

import { useEffect } from 'react'
import { motion } from 'framer-motion'
import { useStore } from '@/store/useStore'
import { resume } from '@/lib/resume'

const RESUME_DOWNLOAD_NAME = 'Aarya-Patel-Resume.pdf'

function SectionHeader({ children }: { children: React.ReactNode }) {
  return (
    <h2 className="font-racing tracking-[0.2em] text-sm text-white/80 uppercase border-b border-white/15 pb-2 mb-4">
      {children}
    </h2>
  )
}

function RoleBlock({
  primary,
  secondary,
  trailingTop,
  trailingBottom,
  children,
}: {
  primary: React.ReactNode
  secondary?: React.ReactNode
  trailingTop?: React.ReactNode
  trailingBottom?: React.ReactNode
  children?: React.ReactNode
}) {
  return (
    <div className="mb-6 last:mb-0">
      <div className="flex flex-col md:flex-row md:items-baseline md:justify-between gap-1 md:gap-4">
        <div className="font-mono text-white">{primary}</div>
        {trailingTop && (
          <div className="font-mono text-xs text-white/60 shrink-0">{trailingTop}</div>
        )}
      </div>
      {(secondary || trailingBottom) && (
        <div className="flex flex-col md:flex-row md:items-baseline md:justify-between gap-1 md:gap-4 mt-0.5">
          {secondary ? (
            <div className="font-mono italic text-sm text-white/70">{secondary}</div>
          ) : (
            <div />
          )}
          {trailingBottom && (
            <div className="font-mono italic text-xs text-white/50 shrink-0">{trailingBottom}</div>
          )}
        </div>
      )}
      {children && (
        <ul className="mt-2 space-y-1.5 font-mono text-sm text-white/80 list-disc pl-5 marker:text-white/40">
          {children}
        </ul>
      )}
    </div>
  )
}

export default function ResumeClient() {
  const { setCurrentSection } = useStore()

  useEffect(() => {
    setCurrentSection('resume')
  }, [setCurrentSection])

  return (
    <div className="pt-24 pb-16 min-h-screen bg-black text-white">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header bar — title + subtitle on left, actions on right */}
        <motion.section
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-10 pb-6 border-b border-white/10"
        >
          <div>
            <h1 className="text-5xl md:text-6xl font-racing tracking-wider text-white mb-2">
              RESUME
            </h1>
            <p className="font-mono text-sm text-white/60">
              Last updated {resume.lastUpdated} · {resume.education[0].school},{' '}
              {resume.education[0].location}
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            <motion.a
              href={resume.pdfUrl}
              download={RESUME_DOWNLOAD_NAME}
              whileHover={{ scale: 1.04, y: -2 }}
              whileTap={{ scale: 0.96 }}
              className="interactive-element inline-flex items-center gap-2 px-4 py-2 font-racing tracking-wider text-xs border-2 border-white text-white bg-white/10 hover:bg-white/20 transition-colors"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-3.5 h-3.5"
                viewBox="0 0 20 20"
                fill="currentColor"
                aria-hidden="true"
              >
                <path
                  fillRule="evenodd"
                  d="M10 3a1 1 0 011 1v7.586l2.293-2.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 111.414-1.414L9 11.586V4a1 1 0 011-1zm-6 12a1 1 0 011-1h10a1 1 0 110 2H5a1 1 0 01-1-1z"
                  clipRule="evenodd"
                />
              </svg>
              DOWNLOAD PDF
            </motion.a>
            <motion.a
              href={resume.pdfUrl}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.04, y: -2 }}
              whileTap={{ scale: 0.96 }}
              className="interactive-element inline-flex items-center gap-2 px-4 py-2 font-racing tracking-wider text-xs border-2 border-white/30 text-white/80 hover:border-white hover:text-white transition-colors"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-3.5 h-3.5"
                viewBox="0 0 20 20"
                fill="currentColor"
                aria-hidden="true"
              >
                <path d="M11 3a1 1 0 100 2h2.586l-6.293 6.293a1 1 0 101.414 1.414L15 6.414V9a1 1 0 102 0V4a1 1 0 00-1-1h-5z" />
                <path d="M5 5a2 2 0 00-2 2v8a2 2 0 002 2h8a2 2 0 002-2v-3a1 1 0 10-2 0v3H5V7h3a1 1 0 000-2H5z" />
              </svg>
              OPEN PDF IN NEW TAB
            </motion.a>
          </div>
        </motion.section>

        {/* Resume body */}
        <motion.article
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15 }}
          className="space-y-10"
        >
          {/* Name and contact line */}
          <header className="text-center">
            <h2 className="text-3xl md:text-4xl font-racing tracking-wider text-white mb-3">
              {resume.name}
            </h2>
            <p className="font-mono text-sm text-white/70 flex flex-wrap justify-center gap-x-2 gap-y-1">
              <span>{resume.location}</span>
              <span className="text-white/30">|</span>
              <a href={`mailto:${resume.email}`} className="underline hover:text-white">
                {resume.email}
              </a>
              <span className="text-white/30">|</span>
              <a href={resume.website.url} className="underline hover:text-white">
                {resume.website.label}
              </a>
              <span className="text-white/30">|</span>
              <a
                href={resume.github.url}
                target="_blank"
                rel="noopener noreferrer"
                className="underline hover:text-white"
              >
                {resume.github.label}
              </a>
              <span className="text-white/30">|</span>
              <a
                href={resume.linkedin.url}
                target="_blank"
                rel="noopener noreferrer"
                className="underline hover:text-white"
              >
                {resume.linkedin.label}
              </a>
            </p>
          </header>

          {/* Honors & Awards */}
          <section>
            <SectionHeader>Honors &amp; Awards</SectionHeader>
            <ul className="space-y-1 font-mono text-sm text-white/85">
              {resume.awards.map((a) => (
                <li key={a.title}>
                  <span className="font-semibold text-white">{a.title}</span>
                  <span className="text-white/70"> — {a.detail}</span>
                </li>
              ))}
            </ul>
          </section>

          {/* Education */}
          <section>
            <SectionHeader>Education</SectionHeader>
            {resume.education.map((e) => (
              <RoleBlock
                key={e.school}
                primary={<span className="font-semibold">{e.school}</span>}
                secondary={e.coursework}
                trailingTop={e.location}
                trailingBottom={e.period}
              />
            ))}
          </section>

          {/* Experience */}
          <section>
            <SectionHeader>Experience</SectionHeader>
            {resume.experience.map((x) => (
              <RoleBlock
                key={`${x.org}-${x.period}`}
                primary={
                  x.orgUrl ? (
                    <a
                      href={x.orgUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="font-semibold underline decoration-white/20 hover:decoration-white"
                    >
                      {x.org}
                    </a>
                  ) : (
                    <span className="font-semibold">{x.org}</span>
                  )
                }
                secondary={x.role}
                trailingTop={x.period}
                trailingBottom={x.location || undefined}
              >
                {x.bullets.map((b, i) => (
                  <li key={i}>{b}</li>
                ))}
              </RoleBlock>
            ))}
          </section>

          {/* Projects */}
          <section>
            <SectionHeader>Projects</SectionHeader>
            {resume.projects.map((p) => (
              <div key={p.name} className="mb-4 last:mb-0">
                <div className="font-mono text-white">
                  <span className="font-semibold">{p.name}</span>
                  <span className="text-white/50"> | </span>
                  <span className="italic text-white/70 text-sm">{p.stack}</span>
                </div>
                <p className="font-mono text-sm text-white/80 mt-1 pl-5">{p.description}</p>
              </div>
            ))}
          </section>

          {/* Technical Skills */}
          <section>
            <SectionHeader>Technical Skills</SectionHeader>
            <dl className="space-y-2 font-mono text-sm">
              {[
                { label: 'Languages', items: resume.skills.languages },
                { label: 'ML', items: resume.skills.ml },
                { label: 'Infrastructure', items: resume.skills.infrastructure },
                { label: 'Leadership', items: resume.skills.leadership },
              ].map((row) => (
                <div key={row.label} className="flex flex-col md:flex-row gap-1 md:gap-3">
                  <dt className="font-semibold text-white md:w-40 shrink-0">{row.label}:</dt>
                  <dd className="text-white/80">{row.items.join(', ')}</dd>
                </div>
              ))}
            </dl>
          </section>
        </motion.article>
      </div>
    </div>
  )
}
