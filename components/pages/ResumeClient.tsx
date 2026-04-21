'use client'

import { useEffect } from 'react'
import { motion } from 'framer-motion'
import DashboardCard from '@/components/ui/DashboardCard'
import { useStore } from '@/store/useStore'

const RESUME_PATH = '/aarya-patel-resume.pdf'
const RESUME_DOWNLOAD_NAME = 'Aarya-Patel-Resume.pdf'

export default function ResumeClient() {
  const { setCurrentSection } = useStore()

  useEffect(() => {
    setCurrentSection('resume')
  }, [setCurrentSection])

  return (
    <div className="pt-24 pb-12 min-h-screen bg-black text-white">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-10"
        >
          <h1 className="text-5xl md:text-7xl font-racing tracking-wider text-white mb-6">
            RESUME
          </h1>
          <p className="text-lg font-mono text-gray-300 max-w-3xl">
            My latest resume. View it in the browser or download a copy.
          </p>
        </motion.section>

        {/* Actions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15 }}
          className="flex flex-wrap gap-3 mb-10"
        >
          <motion.a
            href={RESUME_PATH}
            download={RESUME_DOWNLOAD_NAME}
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.95 }}
            className="interactive-element inline-flex items-center gap-2 px-6 py-2 font-racing tracking-wider text-sm border-2 border-white text-white bg-white/10 hover:bg-white/20 transition-colors"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-4 h-4"
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
            href={RESUME_PATH}
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.95 }}
            className="interactive-element inline-flex items-center gap-2 px-6 py-2 font-racing tracking-wider text-sm border-2 border-white/30 text-white/80 hover:border-white hover:text-white transition-colors"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-4 h-4"
              viewBox="0 0 20 20"
              fill="currentColor"
              aria-hidden="true"
            >
              <path d="M11 3a1 1 0 100 2h2.586l-6.293 6.293a1 1 0 101.414 1.414L15 6.414V9a1 1 0 102 0V4a1 1 0 00-1-1h-5z" />
              <path d="M5 5a2 2 0 00-2 2v8a2 2 0 002 2h8a2 2 0 002-2v-3a1 1 0 10-2 0v3H5V7h3a1 1 0 000-2H5z" />
            </svg>
            OPEN IN NEW TAB
          </motion.a>
        </motion.div>

        {/* Embedded PDF viewer */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <DashboardCard className="p-0 overflow-hidden">
            <object
              data={`${RESUME_PATH}#view=FitH`}
              type="application/pdf"
              className="w-full h-[80vh] min-h-[600px] bg-white"
              aria-label="Aarya Patel resume PDF"
            >
              <div className="p-8 text-center font-mono text-gray-300">
                <p className="mb-4">
                  Your browser can&apos;t display this PDF inline.
                </p>
                <a
                  href={RESUME_PATH}
                  download={RESUME_DOWNLOAD_NAME}
                  className="underline text-white hover:text-f1-red"
                >
                  Download the PDF instead
                </a>
              </div>
            </object>
          </DashboardCard>
        </motion.div>
      </div>
    </div>
  )
}
