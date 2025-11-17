'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
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
          // Empty placeholder squares for future photos
          setItems([
            { _id: '1', title: 'Travel Photo', category: 'travel', _createdAt: new Date().toISOString() },
            { _id: '2', title: 'Adventure Photo', category: 'adventure', _createdAt: new Date(Date.now() - 86400000).toISOString() },
            { _id: '3', title: 'Life Moment', category: 'life', _createdAt: new Date(Date.now() - 172800000).toISOString() },
            { _id: '4', title: 'Travel Photo', category: 'travel', _createdAt: new Date(Date.now() - 259200000).toISOString() },
            { _id: '5', title: 'Adventure Photo', category: 'adventure', _createdAt: new Date(Date.now() - 345600000).toISOString() },
            { _id: '6', title: 'Life Moment', category: 'life', _createdAt: new Date(Date.now() - 432000000).toISOString() },
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
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="flex flex-wrap gap-4 mb-8"
        >
          {filters.map((filter) => (
            <button
              key={filter.id || 'all'}
              onClick={() => setGalleryFilter(filter.id)}
              className={`px-4 py-2 font-racing text-sm border-2 transition-colors ${
                galleryFilter === filter.id
                  ? 'border-white text-white bg-white/10'
                  : 'border-white/30 text-white/70 hover:border-white hover:text-white'
              }`}
            >
              {filter.label}
            </button>
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

        {/* Gallery Grid */}
        {loading ? (
          <div className="flex items-center justify-center py-20">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
              className="w-8 h-8 border-2 border-f1-red border-t-transparent rounded-full"
            />
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <AnimatePresence>
              {sortedAndFilteredItems.map((item, index) => (
                <motion.div
                  key={item._id}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ y: -8 }}
                  onClick={() => setSelectedItem(item)}
                  className="cursor-pointer"
                >
                  <DashboardCard className="h-full interactive-element">
                    <div className="aspect-video bg-white mb-4 flex items-center justify-center border-2 border-white/20">
                      {item.image ? (
                        <img
                          src={item.image}
                          alt={item.title}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div className="text-black/30 text-sm font-mono">
                          {item.title}
                        </div>
                      )}
                    </div>
                    <h3 className="text-lg font-racing text-white mb-2">
                      {item.title}
                    </h3>
                    {item.tags && item.tags.length > 0 && (
                      <div className="flex flex-wrap gap-2">
                        {item.tags.map((tag) => (
                          <span
                            key={tag}
                            className="px-2 py-1 text-xs font-mono bg-white/20 text-white rounded"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    )}
                  </DashboardCard>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        )}
      </div>

      {/* Modal for selected item */}
      <AnimatePresence>
        {selectedItem && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/95 z-50 flex items-center justify-center p-4"
            onClick={() => setSelectedItem(null)}
          >
            <motion.div
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.9 }}
              onClick={(e) => e.stopPropagation()}
              className="max-w-4xl w-full bg-black border border-white p-8"
            >
              <h2 className="text-3xl font-racing text-white mb-4">
                {selectedItem.title}
              </h2>
              <button
                onClick={() => setSelectedItem(null)}
                className="mt-4 px-4 py-2 bg-white text-black font-racing hover:bg-gray-200"
              >
                CLOSE
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

