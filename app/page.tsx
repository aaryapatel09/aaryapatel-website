'use client'

import { useState } from 'react'
import { AnimatePresence } from 'framer-motion'
import CarLanding from '@/components/home/CarLanding'
import MainHub from '@/components/home/MainHub'

export default function Home() {
  const [showHub, setShowHub] = useState(false)

  return (
    <div className="relative min-h-screen overflow-hidden bg-black">
      <AnimatePresence mode="wait">
        {!showHub ? (
          <CarLanding key="car" onEnter={() => setShowHub(true)} />
        ) : (
          <MainHub key="hub" />
        )}
      </AnimatePresence>
    </div>
  )
}

