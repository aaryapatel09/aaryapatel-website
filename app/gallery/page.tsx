'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Image from 'next/image'
import DashboardCard from '@/components/ui/DashboardCard'
import { useStore } from '@/store/useStore'
import { sanityClient, galleryItemsQuery } from '@/lib/sanity'

interface GalleryItem {
  _id: string
  title: string
  image?: any
  category?: string
  tags?: string[]
  metadata?: {
    fastestLap?: string
    projectType?: string
  }
  _createdAt: string
}

export default function GalleryPage() {
  const { setCurrentSection, gallerySortBy, setGallerySort, galleryFilter, setGalleryFilter } = useStore()
  const [items, setItems] = useState<GalleryItem[]>([])
  const [loading, setLoading] = useState(true)
  const [selectedItem, setSelectedItem] = useState<GalleryItem | null>(null)

  useEffect(() => {
    setCurrentSection('gallery')
  }, [setCurrentSection])

  useEffect(() => {
    const fetchItems = async () => {
      try {
        if (sanityClient) {
          const data = await sanityClient.fetch(galleryItemsQuery)
          setItems(data)
        } else {
          // Gallery photos
          setItems([
            { 
              _id: '1', 
              title: 'Golden Gate Bridge', 
              category: 'travel', 
              image: '/images/golden-gate-bridge.jpg',
              tags: ['travel', 'landscape', 'sunset'],
              _createdAt: new Date().toISOString() 
            },
            { 
              _id: '2', 
              title: 'Sweet 16', 
              category: 'life', 
              image: '/images/birthday-celebration.png',
              tags: ['life', 'celebration'],
              _createdAt: new Date(Date.now() - 86400000).toISOString() 
            },
            { 
              _id: '3', 
              title: 'Agnews Staircase', 
              category: 'adventure', 
              image: '/images/staircase-scene.jpg',
              tags: ['adventure', 'mystery'],
              _createdAt: new Date(Date.now() - 172800000).toISOString() 
            },
            { 
              _id: '4', 
              title: 'Marin Headlands Sunset', 
              category: 'travel', 
              image: '/images/sunset-clouds.png',
              tags: ['travel', 'landscape', 'sunset', 'nature'],
              _createdAt: new Date(Date.now() - 259200000).toISOString() 
            },
          ])
        }
      } catch (error) {
        console.error('Error fetching gallery items:', error)
        setItems([])
      } finally {
        setLoading(false)
      }
    }

    fetchItems()
  }, [])

  const sortedAndFilteredItems = [...items]
    .filter((item) => {
      if (galleryFilter === null) return true
      if (galleryFilter === 'travel') {
        return item.category === 'travel' || item.tags?.includes('travel')
      }
      if (galleryFilter === 'adventure') {
        return item.category === 'adventure' || item.tags?.includes('adventure')
      }
      if (galleryFilter === 'life') {
        return item.category === 'life' || item.tags?.includes('life')
      }
      return true
    })
    .sort((a, b) => {
      if (gallerySortBy === 'date') {
        return new Date(b._createdAt).getTime() - new Date(a._createdAt).getTime()
      }
      return 0
    })

  const filters = [
    { id: null, label: 'ALL' },
    { id: 'travel', label: 'TRAVEL' },
    { id: 'adventure', label: 'ADVENTURE' },
    { id: 'life', label: 'LIFE' },
  ]

  return (
    <div className="pt-24 pb-12 min-h-screen bg-black text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-12"
        >
          <h1 className="text-5xl md:text-7xl font-racing tracking-wider text-white mb-6">
            GALLERY
          </h1>
          <p className="text-lg font-mono text-gray-300 max-w-3xl">
            Photos from my travels, adventures, and life experiences.
          </p>
        </motion.section>

        {/* Filters */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="flex flex-wrap gap-4 mb-8"
        >
          {filters.map((filter, index) => (
            <motion.button
              key={filter.id || 'all'}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 + index * 0.1, type: 'spring', stiffness: 200 }}
              onClick={() => setGalleryFilter(filter.id)}
              whileHover={{ scale: 1.1, y: -2 }}
              whileTap={{ scale: 0.95 }}
              className={`px-4 py-2 font-racing text-sm border-2 transition-colors ${
                galleryFilter === filter.id
                  ? 'border-white text-white bg-white/10'
                  : 'border-white/30 text-white/70 hover:border-white hover:text-white'
              }`}
            >
              {filter.label}
            </motion.button>
          ))}
        </motion.div>

        {/* Sort */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="flex items-center gap-4 mb-12"
        >
          <span className="text-sm font-mono text-gray-300">SORT BY:</span>
          <button
            onClick={() => setGallerySort('date')}
            className={`px-4 py-2 font-racing text-sm border-2 transition-colors ${
              gallerySortBy === 'date'
                ? 'border-white text-white bg-white/10'
                : 'border-white/30 text-white/70 hover:border-white hover:text-white'
            }`}
          >
            DATE
          </button>
        </motion.div>

        {/* Gallery Grid - Masonry Layout */}
        {loading ? (
          <div className="flex items-center justify-center py-20">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
              className="w-8 h-8 border-2 border-f1-red border-t-transparent rounded-full"
            />
          </div>
        ) : (
          <div className="columns-1 md:columns-2 lg:columns-3 xl:columns-4 gap-6">
            <AnimatePresence mode="wait">
              {sortedAndFilteredItems.map((item, index) => (
                <motion.div
                  key={item._id}
                  initial={{ opacity: 0, scale: 0.8, rotateY: -20 }}
                  animate={{ opacity: 1, scale: 1, rotateY: 0 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  transition={{ delay: index * 0.1, type: 'spring', stiffness: 100 }}
                  whileHover={{ y: -12, scale: 1.03, rotateY: 5 }}
                  whileTap={{ scale: 0.95 }}
                  style={{ perspective: 1000 }}
                  onClick={() => setSelectedItem(item)}
                  className="cursor-pointer break-inside-avoid mb-6"
                >
                  <DashboardCard className="interactive-element overflow-hidden p-0">
                    {item.image ? (
                      <motion.div
                        className="relative w-full bg-black border-2 border-white/20 overflow-hidden"
                        whileHover={{ scale: 1.02 }}
                        transition={{ duration: 0.3 }}
                      >
                        <motion.div
                          initial={{ scale: 1.1, opacity: 0 }}
                          animate={{ scale: 1, opacity: 1 }}
                          transition={{ duration: 0.5, delay: index * 0.1 }}
                          className="relative w-full"
                        >
                          <Image
                            src={item.image}
                            alt={item.title}
                            width={1000}
                            height={1500}
                            className="w-full h-auto object-contain"
                            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                            unoptimized
                          />
                        </motion.div>
                      </motion.div>
                    ) : (
                      <motion.div
                        className="aspect-video bg-white flex items-center justify-center border-2 border-white/20"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: index * 0.1 + 0.2 }}
                      >
                        <div className="text-black/30 text-sm font-mono">
                          {item.title}
                        </div>
                      </motion.div>
                    )}
                    <div className="p-4">
                      <motion.h3
                        className="text-lg font-racing text-white mb-2"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 + 0.2 }}
                        whileHover={{ scale: 1.05, x: 5 }}
                      >
                        {item.title}
                      </motion.h3>
                      {item.tags && item.tags.length > 0 && (
                        <motion.div
                          className="flex flex-wrap gap-2"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          transition={{ delay: index * 0.1 + 0.3 }}
                        >
                          {item.tags.map((tag, tagIndex) => (
                            <motion.span
                              key={tag}
                              className="px-2 py-1 text-xs font-mono bg-white/20 text-white rounded"
                              initial={{ opacity: 0, scale: 0.8 }}
                              animate={{ opacity: 1, scale: 1 }}
                              transition={{ delay: index * 0.1 + 0.3 + tagIndex * 0.05, type: 'spring', stiffness: 200 }}
                              whileHover={{ scale: 1.1, y: -2 }}
                            >
                              {tag}
                            </motion.span>
                          ))}
                        </motion.div>
                      )}
                    </div>
                  </DashboardCard>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        )}
      </div>

      {/* Modal for selected item - Full Size Image */}
      <AnimatePresence>
        {selectedItem && selectedItem.image && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 bg-black z-50 flex items-center justify-center p-4 overflow-auto"
            onClick={() => setSelectedItem(null)}
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0, y: 50 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.8, opacity: 0, y: 50 }}
              transition={{ type: 'spring', stiffness: 100, damping: 15 }}
              onClick={(e) => e.stopPropagation()}
              className="relative w-full h-full flex flex-col items-center justify-center"
            >
              {/* Close button */}
              <motion.button
                onClick={() => setSelectedItem(null)}
                className="absolute top-4 right-4 z-10 w-12 h-12 bg-white/20 hover:bg-white/30 text-white font-racing text-2xl rounded-full flex items-center justify-center backdrop-blur-sm border border-white/30"
                whileHover={{ scale: 1.1, rotate: 90 }}
                whileTap={{ scale: 0.95 }}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
              >
                ×
              </motion.button>
              
              {/* Full size image - maintains aspect ratio */}
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.1 }}
                className="relative flex items-center justify-center w-full h-full"
              >
                <div className="relative max-w-full max-h-[90vh] w-auto h-auto">
                  <Image
                    src={selectedItem.image}
                    alt={selectedItem.title}
                    width={2000}
                    height={3000}
                    className="max-w-full max-h-[90vh] w-auto h-auto object-contain"
                    sizes="100vw"
                    unoptimized
                    priority
                  />
                </div>
              </motion.div>
              
              {/* Title and tags - fixed at bottom */}
              <motion.div
                className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/90 via-black/70 to-transparent p-6 text-center"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
              >
                <h2 className="text-2xl md:text-3xl font-racing text-white mb-3">
                  {selectedItem.title}
                </h2>
                {selectedItem.tags && selectedItem.tags.length > 0 && (
                  <div className="flex flex-wrap gap-2 justify-center">
                    {selectedItem.tags.map((tag) => (
                      <motion.span
                        key={tag}
                        className="px-3 py-1 text-xs font-mono bg-white/20 text-white rounded border border-white/30"
                        whileHover={{ scale: 1.1 }}
                      >
                        {tag}
                      </motion.span>
                    ))}
                  </div>
                )}
              </motion.div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

