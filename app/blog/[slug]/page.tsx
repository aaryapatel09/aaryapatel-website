'use client'

import { useEffect, useState } from 'react'
import { useParams } from 'next/navigation'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { sanityClient, postBySlugQuery } from '@/lib/sanity'
import { format } from 'date-fns'
import { poetryContent } from '@/lib/poetry'
import FloatingParticles from '@/components/ui/FloatingParticles'

interface BlogPost {
  _id: string
  title: string
  slug: { current: string }
  publishedAt: string
  body?: any
  mainImage?: any
  categories?: string[]
  author?: {
    name: string
    image?: any
  }
}

export default function BlogPostPage() {
  const params = useParams()
  const [post, setPost] = useState<BlogPost | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchPost = async () => {
      try {
        if (sanityClient && params.slug) {
          const data = await sanityClient.fetch(postBySlugQuery, {
            slug: params.slug,
          })
          setPost(data)
        } else {
          // Get poetry content from local file
          const slug = params.slug as string
          const poemText = poetryContent[slug] || 'Poetry content will be displayed here.'
          
          const titles: Record<string, string> = {
            'how-to-live-inside-a-wire': 'How to Live Inside a Wire',
            'the-clock-eats-its-own-hands': 'The Clock Eats Its Own Hands',
            'the-last-human-poet': 'The Last Human Poet',
            'the-music-teachers-final-lesson': 'The Music Teacher&apos;s Final Lesson',
            'gallery-opening-humans-not-included': 'Gallery Opening: Humans Not Included',
            'archaeology-of-creativity': 'Archaeology of Creativity',
            'the-curator-of-extinct-emotions': 'The Curator of Extinct Emotions',
            'the-last-brushstroke': 'The Last Brushstroke',
          }
          
          setPost({
            _id: slug,
            title: titles[slug] || 'Poem',
            slug: { current: slug },
            publishedAt: new Date().toISOString(),
            body: poemText,
            categories: ['Ghost in the Machine'],
            author: { name: 'Aarya Patel' },
          })
        }
      } catch (error) {
        console.error('Error fetching post:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchPost()
  }, [params.slug])

  if (loading) {
    return (
      <div className="pt-24 pb-12 min-h-screen flex items-center justify-center">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
          className="w-8 h-8 border-2 border-f1-red border-t-transparent rounded-full"
        />
      </div>
    )
  }

  if (!post) {
    return (
      <div className="pt-24 pb-12 min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-3xl font-racing text-white mb-4">Poem Not Found</h1>
          <Link href="/blog" className="text-white hover:underline">
            ← Back to Poetry
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="pt-24 pb-12 min-h-screen bg-black text-white relative overflow-hidden">
      <FloatingParticles count={30} />
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <Link
          href="/blog"
          className="inline-flex items-center text-sm font-mono text-gray-300 hover:text-white mb-8 interactive-element"
        >
          <span className="mr-2">←</span> BACK TO POETRY
        </Link>

        <motion.article
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <h1 className="text-4xl md:text-6xl font-racing tracking-wider text-white mb-6">
            {post.title}
          </h1>

          <div className="flex flex-wrap items-center gap-4 mb-8 text-sm font-mono text-gray-300">
            <span>{format(new Date(post.publishedAt), 'MMM dd, yyyy')}</span>
            {post.author && <span>by {post.author.name}</span>}
            {post.categories && post.categories.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {post.categories.map((category) => (
                  <span
                    key={category}
                    className="px-2 py-1 bg-white/20 text-white border border-white/30 rounded"
                  >
                    {category}
                  </span>
                ))}
              </div>
            )}
          </div>

          {post.mainImage && (
            <div className="mb-8 aspect-video bg-white/10">
              <img
                src={post.mainImage}
                alt={post.title}
                className="w-full h-full object-cover"
              />
            </div>
          )}

          <div className="prose prose-invert max-w-none">
            {post.body && typeof post.body === 'string' ? (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
                className="text-base font-mono text-gray-300 leading-relaxed whitespace-pre-line"
              >
                {post.body.split('\n\n').map((paragraph, idx) => (
                  <motion.p
                    key={idx}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: idx * 0.1, duration: 0.5 }}
                    className="mb-4"
                  >
                    {paragraph}
                  </motion.p>
                ))}
              </motion.div>
            ) : (
              <div className="text-base font-mono text-gray-300 leading-relaxed space-y-4">
                <p className="italic">
                  Poetry content will be displayed here. Your poems will appear in this space.
                </p>
              </div>
            )}
          </div>
        </motion.article>
      </div>
    </div>
  )
}

