'use client'

import { useEffect, useState } from 'react'
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion'
import Link from 'next/link'
import { useStore } from '@/store/useStore'
import { sanityClient, blogPostsQuery } from '@/lib/sanity'
import { format } from 'date-fns'
import FloatingParticles from '@/components/ui/FloatingParticles'
import PretextText from '@/components/ui/PretextText'

interface BlogPost {
  _id: string
  title: string
  slug: { current: string }
  publishedAt: string
  excerpt?: string
  mainImage?: any
  categories?: string[]
}

export default function BlogIndexClient() {
  const { setCurrentSection } = useStore()
  const [posts, setPosts] = useState<BlogPost[]>([])
  const [loading, setLoading] = useState(true)
  const [sortBy, setSortBy] = useState<'date' | 'title'>('date')
  const shouldReduceMotion = useReducedMotion()
  const titleFont = '400 24px "Courier New"'
  const excerptFont = '400 14px "Courier New"'

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
              excerpt:
                'in the city, i learned how to breathe around metal: exhale the hum of fluorescent lights...',
            },
            {
              _id: '2',
              title: 'The Clock Eats Its Own Hands',
              slug: { current: 'the-clock-eats-its-own-hands' },
              publishedAt: new Date(Date.now() - 86400000).toISOString(),
              excerpt:
                'in the corner, the clock chews minutes— swallows whole what was never mine...',
            },
            {
              _id: '3',
              title: 'The Last Human Poet',
              slug: { current: 'the-last-human-poet' },
              publishedAt: new Date(Date.now() - 172800000).toISOString(),
              excerpt:
                'They taught the machine to write sonnets in 0.003 seconds, perfect iambic pentameter...',
              categories: ['Ghost in the Machine'],
            },
            {
              _id: '4',
              title: 'The Music Teachers Final Lesson',
              slug: { current: 'the-music-teachers-final-lesson' },
              publishedAt: new Date(Date.now() - 259200000).toISOString(),
              excerpt:
                'The replacement doesnt sweat when Rachmaninoffs thirds stretch beyond what ten fingers...',
              categories: ['Ghost in the Machine'],
            },
            {
              _id: '5',
              title: 'Gallery Opening: Humans Not Included',
              slug: { current: 'gallery-opening-humans-not-included' },
              publishedAt: new Date(Date.now() - 345600000).toISOString(),
              excerpt:
                'The walls exhale algorithms in perfect gradients, but no one here has ever sobbed...',
              categories: ['Ghost in the Machine'],
            },
            {
              _id: '6',
              title: 'Archaeology of Creativity',
              slug: { current: 'archaeology-of-creativity' },
              publishedAt: new Date(Date.now() - 432000000).toISOString(),
              excerpt:
                'In the Museum of Extinct Human Practices, behind bulletproof glass, a child stares...',
              categories: ['Ghost in the Machine'],
            },
            {
              _id: '7',
              title: 'The Curator of Extinct Emotions',
              slug: { current: 'the-curator-of-extinct-emotions' },
              publishedAt: new Date(Date.now() - 518400000).toISOString(),
              excerpt:
                'I catalog feelings the way paleontologists reconstruct dinosaur bones...',
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
  const featuredPost = sortedPosts[0]
  const archivePosts = sortedPosts.slice(1)

  return (
    <div className="pt-24 pb-12 min-h-screen bg-black text-white relative overflow-hidden">
      <FloatingParticles count={40} />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.section initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-16">
          <p className="mb-6 text-xs uppercase tracking-[0.35em] text-gray-500">
            Poetry system 01 // ghost in the machine
          </p>

          <div className="relative overflow-hidden border border-white/10 bg-white/[0.02] px-6 py-8 sm:px-8 sm:py-10 lg:px-12 lg:py-14">
            <div className="pointer-events-none absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-orange-400/60 to-transparent" />
            <div className="pointer-events-none absolute bottom-6 left-6 h-28 w-28 rounded-full bg-orange-500/10 blur-3xl" />

            <div className="mb-10 max-w-5xl">
              <p className="mb-6 text-xs uppercase tracking-[0.4em] text-gray-500">
                A poetry collection about circuitry, memory, and human residue
              </p>
              <h1 className="font-racing text-[3rem] leading-none tracking-tight text-white sm:text-[4.5rem] lg:text-[6rem]">
                GHOST IN THE
              </h1>
              <h2 className="font-racing text-[3.1rem] italic leading-none tracking-tight text-orange-300/90 drop-shadow-[0_0_18px_rgba(251,146,60,0.25)] sm:text-[4.75rem] lg:text-[6.4rem]">
                MACHINE
              </h2>
            </div>

            <div className="grid gap-6 text-sm leading-7 text-gray-300 md:grid-cols-3">
              <p>
                These poems sit between interface language and private thought. They treat software like weather:
                ambient, invasive, and impossible to ignore.
              </p>
              <p>
                Pretext fits here when it stays invisible. The goal is not a widget. It is tighter pacing, more
                deliberate line breaks, and a page that feels typeset instead of boxed in.
              </p>
              <p>
                The visual direction is editorial and cinematic: thin rules, dense columns, sharp titles, and a warm
                accent that feels closer to taillights than to generic UI chrome.
              </p>
            </div>
          </div>
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
            className={`px-4 py-2 font-racing text-sm border transition-colors ${
              sortBy === 'date'
                ? 'border-white text-white bg-white/10'
                : 'border-white/20 text-white/60 hover:border-white/50 hover:text-white'
            }`}
          >
            DATE
          </button>
          <button
            onClick={() => setSortBy('title')}
            className={`px-4 py-2 font-racing text-sm border transition-colors ${
              sortBy === 'title'
                ? 'border-white text-white bg-white/10'
                : 'border-white/20 text-white/60 hover:border-white/50 hover:text-white'
            }`}
          >
            TITLE
          </button>
        </motion.div>

        {/* Posts List */}
        {loading ? (
          <div className="flex items-center justify-center py-20">
            {shouldReduceMotion ? (
              <div className="w-8 h-8 border-2 border-f1-red border-t-transparent rounded-full" />
            ) : (
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                className="w-8 h-8 border-2 border-f1-red border-t-transparent rounded-full"
              />
            )}
          </div>
        ) : (
          <div>
            {featuredPost && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="mb-12 border-t border-white/20 pt-8"
              >
                <Link href={`/blog/${featuredPost.slug.current}`} className="block interactive-element">
                  <div className="grid gap-8 lg:grid-cols-[minmax(0,1.3fr)_minmax(320px,0.7fr)] lg:items-end">
                    <div>
                      <p className="mb-4 text-xs uppercase tracking-[0.35em] text-gray-500">Featured transmission</p>
                      <PretextText
                        as="h2"
                        text={featuredPost.title}
                        font={'400 56px "Courier New"'}
                        lineHeight={60}
                        fit="balance"
                        className="max-w-4xl font-racing text-4xl leading-none tracking-tight text-white sm:text-5xl lg:text-6xl"
                      />
                    </div>

                    <div className="space-y-5 border-l border-white/10 pl-0 lg:pl-8">
                      <p className="text-xs uppercase tracking-[0.35em] text-gray-500">
                        {format(new Date(featuredPost.publishedAt), 'MMM dd, yyyy')}
                      </p>
                      {featuredPost.excerpt && (
                        <PretextText
                          as="p"
                          text={featuredPost.excerpt}
                          font={'400 18px "Courier New"'}
                          lineHeight={30}
                          className="font-mono text-base italic text-gray-300"
                        />
                      )}
                      <div className="flex items-center gap-3 text-xs uppercase tracking-[0.28em] text-orange-300/80">
                        <span>Open poem</span>
                        <span className="text-white/50">/</span>
                        <span>Read sequence</span>
                      </div>
                    </div>
                  </div>
                </Link>
              </motion.div>
            )}

            <div className="border-t border-white/10">
              <AnimatePresence>
                {archivePosts.map((post, index) => (
                  <motion.div
                    key={post._id}
                    initial={{ opacity: 0, y: 18 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -18 }}
                    transition={{ delay: index * 0.06 }}
                    className="border-b border-white/10"
                  >
                    <Link href={`/blog/${post.slug.current}`} className="group block interactive-element">
                      <div className="grid gap-6 px-2 py-6 transition-colors duration-300 group-hover:bg-white/[0.03] md:grid-cols-[minmax(0,1.2fr)_minmax(0,0.8fr)_auto] md:items-start">
                        <PretextText
                          as="h3"
                          text={post.title}
                          font={titleFont}
                          lineHeight={32}
                          fit="balance"
                          className="font-racing text-2xl leading-tight text-white"
                        />

                        <div className="space-y-3">
                          {post.excerpt && (
                            <PretextText
                              as="p"
                              text={post.excerpt}
                              font={excerptFont}
                              lineHeight={24}
                              className="font-mono text-sm italic text-gray-400"
                            />
                          )}
                          {post.categories && post.categories.length > 0 && (
                            <div className="flex flex-wrap gap-2">
                              {post.categories.map((category) => (
                                <span
                                  key={category}
                                  className="border border-white/15 px-2 py-1 text-[10px] uppercase tracking-[0.25em] text-gray-400"
                                >
                                  {category}
                                </span>
                              ))}
                            </div>
                          )}
                        </div>

                        <div className="flex flex-col items-start gap-3 text-xs uppercase tracking-[0.3em] text-gray-500 md:items-end">
                          <span>{format(new Date(post.publishedAt), 'MMM dd, yyyy')}</span>
                          <span className="text-orange-300/80 transition-colors group-hover:text-orange-200">Read</span>
                        </div>
                      </div>
                    </Link>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

