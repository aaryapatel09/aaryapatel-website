'use client'

import { useState, useEffect } from 'react'
import { AnimatePresence } from 'framer-motion'
import CarLanding from '@/components/home/CarLanding'
import MainHub from '@/components/home/MainHub'

const SESSION_KEY = 'hasVisitedHub'

export default function HomeClient() {
  const [showHub, setShowHub] = useState(false)
  const [checked, setChecked] = useState(false)

  useEffect(() => {
    if (sessionStorage.getItem(SESSION_KEY)) {
      setShowHub(true)
    }
    setChecked(true)
  }, [])

  const handleEnter = () => {
    sessionStorage.setItem(SESSION_KEY, '1')
    setShowHub(true)
  }

  if (!checked) return null

  return (
    <div className="relative min-h-screen overflow-hidden bg-black">
      <AnimatePresence mode="wait">
        {!showHub ? (
          <CarLanding key="car" onEnter={handleEnter} />
        ) : (
          <MainHub key="hub" />
        )}
      </AnimatePresence>
    </div>
  )
}

