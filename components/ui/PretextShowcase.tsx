'use client'

import { useMemo, useState } from 'react'
import { motion } from 'framer-motion'
import DashboardCard from '@/components/ui/DashboardCard'
import { usePretextLayout } from '@/hooks/usePretextLayout'

const SAMPLE_TEXT = `Ghost in the Machine traces the line between circuitry and memory,\nwhere language still feels human even after the interface starts writing back.`

export default function PretextShowcase() {
  const [panelWidth, setPanelWidth] = useState(360)
  const maxPanelWidth = 560
  const minPanelWidth = 220

  const font = '400 18px "Courier New"'
  const lineHeight = 30

  const { containerRef, lines, lineCount, height, isReady } = usePretextLayout({
    text: SAMPLE_TEXT,
    font,
    lineHeight,
    whiteSpace: 'pre-wrap',
    fit: 'container',
    maxWidth: panelWidth,
  })

  const stats = useMemo(
    () => [
      { label: 'Panel Width', value: `${panelWidth}px` },
      { label: 'Line Count', value: isReady ? `${lineCount}` : '...' },
      { label: 'Layout Height', value: isReady ? `${height}px` : '...' },
    ],
    [height, isReady, lineCount, panelWidth],
  )

  return (
    <DashboardCard className="mb-12">
      <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
        <div className="max-w-2xl">
          <p className="mb-2 text-xs font-mono uppercase tracking-[0.3em] text-gray-400">Pretext Live Demo</p>
          <h2 className="mb-3 text-3xl font-racing tracking-wider text-white">DRAG THE WIDTH, KEEP THE RHYTHM</h2>
          <p className="text-sm font-mono leading-relaxed text-gray-300">
            This preview uses Pretext to recompute line breaks as the available width changes, without relying on DOM
            text measurements. It gives your poetry section a more intentional editorial feel.
          </p>
        </div>

        <div className="w-full max-w-xl">
          <div className="mb-4 flex items-center justify-between gap-4 text-xs font-mono uppercase tracking-[0.25em] text-gray-400">
            <span>Compact</span>
            <span>Roomy</span>
          </div>
          <input
            aria-label="Adjust Pretext showcase width"
            className="mb-6 w-full accent-white"
            max={maxPanelWidth}
            min={minPanelWidth}
            onChange={(event) => setPanelWidth(Number(event.target.value))}
            type="range"
            value={panelWidth}
          />

          <div className="mb-4 grid grid-cols-1 gap-3 sm:grid-cols-3">
            {stats.map((stat) => (
              <div key={stat.label} className="border border-white/15 bg-white/5 px-3 py-2">
                <p className="text-[10px] font-mono uppercase tracking-[0.25em] text-gray-500">{stat.label}</p>
                <p className="mt-2 text-sm font-mono text-white">{stat.value}</p>
              </div>
            ))}
          </div>

          <div ref={containerRef} className="w-full">
            <motion.div
              animate={{ width: panelWidth }}
              className="border border-white/30 bg-black/70 p-5"
              transition={{ type: 'spring', stiffness: 220, damping: 24 }}
            >
              {isReady ? (
                <div
                  className="font-mono text-[18px] text-gray-200"
                  style={{ lineHeight: `${lineHeight}px`, whiteSpace: 'pre' }}
                >
                  {lines.map((line, index) => (
                    <span key={`${line.text}-${index}`} className="block">
                      {line.text || '\u00A0'}
                    </span>
                  ))}
                </div>
              ) : (
                <p className="font-mono text-[18px] leading-[30px] text-gray-200">{SAMPLE_TEXT}</p>
              )}
            </motion.div>
          </div>
        </div>
      </div>
    </DashboardCard>
  )
}
