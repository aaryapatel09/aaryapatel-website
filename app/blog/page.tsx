'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Link from 'next/link'
import DashboardCard from '@/components/ui/DashboardCard'
import { useStore } from '@/store/useStore'
import { sanityClient, blogPostsQuery } from '@/lib/sanity'
import { format } from 'date-fns'
import FloatingParticles from '@/components/ui/FloatingParticles'
import AnimatedPoetryCard from '@/components/ui/AnimatedPoetryCard'

interface BlogPost {
  _id: string
  title: string
  slug: { current: string }
  publishedAt: string
  excerpt?: string
  mainImage?: any
  categories?: string[]
}

export default function BlogPage() {
  const { setCurrentSection } = useStore()
  const [posts, setPosts] = useState<BlogPost[]>([])
  const [loading, setLoading] = useState(true)
  const [sortBy, setSortBy] = useState<'date' | 'title'>('date')

  useEffect(() => {
    setCurrentSection('blog')
  }, [setCurrentSection])

  useEffect(() => {
    // Fetch posts from Sanity (fallback to mock data if not configured)
    const fetchPosts = async () => {
      try {
        if (sanityClient) {
          const data = await sanityClient.fetch(blogPostsQuery)
          setPosts(data)
        } else {
          // Ghost in the Machine poetry collection
          setPosts([
            {
              _id: '1',
              title: 'How to Live Inside a Wire',
              slug: { current: 'how-to-live-inside-a-wire' },
              publishedAt: new Date().toISOString(),
              excerpt: 'in the city, i learned how to breathe around metal: exhale the hum of fluorescent lights...',
            },
            {
              _id: '2',
              title: 'The Clock Eats Its Own Hands',
              slug: { current: 'the-clock-eats-its-own-hands' },
              publishedAt: new Date(Date.now() - 86400000).toISOString(),
              excerpt: 'in the corner, the clock chews minutes— swallows whole what was never mine...',
            },
            {
              _id: '3',
              title: 'The Last Human Poet',
              slug: { current: 'the-last-human-poet' },
              publishedAt: new Date(Date.now() - 172800000).toISOString(),
              excerpt: 'They taught the machine to write sonnets in 0.003 seconds, perfect iambic pentameter...',
              categories: ['Ghost in the Machine'],
            },
            {
              _id: '4',
              title: 'The Music Teachers Final Lesson',
              slug: { current: 'the-music-teachers-final-lesson' },
              publishedAt: new Date(Date.now() - 259200000).toISOString(),
              excerpt: 'The replacement doesnt sweat when Rachmaninoffs thirds stretch beyond what ten fingers...',
              categories: ['Ghost in the Machine'],
            },
            {
              _id: '5',
              title: 'Gallery Opening: Humans Not Included',
              slug: { current: 'gallery-opening-humans-not-included' },
              publishedAt: new Date(Date.now() - 345600000).toISOString(),
              excerpt: 'The walls exhale algorithms in perfect gradients, but no one here has ever sobbed...',
              categories: ['Ghost in the Machine'],
            },
            {
              _id: '6',
              title: 'Archaeology of Creativity',
              slug: { current: 'archaeology-of-creativity' },
              publishedAt: new Date(Date.now() - 432000000).toISOString(),
              excerpt: 'In the Museum of Extinct Human Practices, behind bulletproof glass, a child stares...',
              categories: ['Ghost in the Machine'],
            },
            {
              _id: '7',
              title: 'The Curator of Extinct Emotions',
              slug: { current: 'the-curator-of-extinct-emotions' },
              publishedAt: new Date(Date.now() - 518400000).toISOString(),
              excerpt: 'I catalog feelings the way paleontologists reconstruct dinosaur bones...',
              categories: ['Ghost in the Machine'],
            },
            {
              _id: '8',
              title: 'The Last Brushstroke',
              slug: { current: 'the-last-brushstroke' },
              publishedAt: new Date(Date.now() - 604800000).toISOString(),
              excerpt: 'My hand shakes not from age but from the weight of carrying 40,000 years...',
              categories: ['Ghost in the Machine'],
            },
          ])
        }
      } catch (error) {
        console.error('Error fetching posts:', error)
        setPosts([])
      } finally {
        setLoading(false)
      }
    }

    fetchPosts()
  }, [])

  const sortedPosts = [...posts].sort((a, b) => {
    if (sortBy === 'date') {
      return new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
    }
    return a.title.localeCompare(b.title)
  })

  return (
    <div className="pt-24 pb-12 min-h-screen bg-black text-white relative overflow-hidden">
      <FloatingParticles count={40} />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-12"
        >
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-6"
          >
            <h1 className="text-5xl md:text-7xl font-racing tracking-wider text-white mb-6">
              POETRY
            </h1>
            <p className="text-lg font-mono text-gray-300 max-w-3xl mb-4">
              <span className="text-white font-racing">Ghost in the Machine</span> — A collection exploring the intersection of humanity and technology.
            </p>
          </motion.div>
        </motion.section>

        {/* Sort Controls */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="flex items-center gap-4 mb-12"
        >
          <span className="text-sm font-mono text-gray-300">SORT BY:</span>
          <button
            onClick={() => setSortBy('date')}
            className={`px-4 py-2 font-racing text-sm border-2 transition-colors ${
              sortBy === 'date'
                ? 'border-white text-white bg-white/10'
                : 'border-white/30 text-white/70 hover:border-white hover:text-white'
            }`}
          >
            DATE
          </button>
          <button
            onClick={() => setSortBy('title')}
            className={`px-4 py-2 font-racing text-sm border-2 transition-colors ${
              sortBy === 'title'
                ? 'border-white text-white bg-white/10'
                : 'border-white/30 text-white/70 hover:border-white hover:text-white'
            }`}
          >
            TITLE
          </button>
        </motion.div>

        {/* Posts List */}
        {loading ? (
          <div className="flex items-center justify-center py-20">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
              className="w-8 h-8 border-2 border-f1-red border-t-transparent rounded-full"
            />
          </div>
        ) : (
          <div className="space-y-6">
            <AnimatePresence>
              {sortedPosts.map((post, index) => (
                <motion.div
                  key={post._id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Link href={`/blog/${post.slug.current}`}>
                    <motion.div
                      whileHover={{ scale: 1.02, y: -4 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <DashboardCard className="interactive-element relative overflow-hidden group">
                        {/* Animated background on hover */}
                        <motion.div
                          className="absolute inset-0 bg-white/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                          initial={false}
                        />
                        
                        <div className="relative z-10">
                          <div className="flex flex-col md:flex-row md:items-start md:justify-between mb-4">
                            <h2 className="text-2xl font-racing text-white mb-2 md:mb-0">
                              {post.title}
                            </h2>
                            <span className="text-xs font-mono text-gray-300 whitespace-nowrap">
                              {format(new Date(post.publishedAt), 'MMM dd, yyyy')}
                            </span>
                          </div>
                          {post.excerpt && (
                            <p className="text-sm font-mono text-gray-300 mb-4 italic leading-relaxed">
                              {post.excerpt}
                            </p>
                          )}
                          {post.categories && post.categories.length > 0 && (
                            <div className="flex flex-wrap gap-2 mb-4">
                              {post.categories.map((category) => (
                                <motion.span
                                  key={category}
                                  whileHover={{ scale: 1.1 }}
                                  className="px-2 py-1 text-xs font-mono bg-white/20 text-white border border-white/30 rounded"
                                >
                                  {category}
                                </motion.span>
                              ))}
                            </div>
                          )}
                          <div className="mt-4 flex items-center text-xs font-mono text-gray-300">
                            <span>READ MORE</span>
                            <motion.span
                              className="ml-2"
                              animate={{ x: [0, 5, 0] }}
                              transition={{ duration: 1.5, repeat: Infinity }}
                            >
                              →
                            </motion.span>
                          </div>
                        </div>
                      </DashboardCard>
                    </motion.div>
                  </Link>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        )}
      </div>
    </div>
  )
}

