'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import Image from 'next/image'
import { format } from 'date-fns'
import FloatingParticles from '@/components/ui/FloatingParticles'

export interface BlogPost {
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

export default function BlogPostClient({ post }: { post: BlogPost }) {
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

        <motion.article initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <h1 className="text-4xl md:text-6xl font-racing tracking-wider text-white mb-6">{post.title}</h1>

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
            <div className="mb-8 aspect-video bg-white/10 relative">
              <Image
                src={post.mainImage}
                alt={post.title}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 1200px"
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
                <p className="italic">Poetry content will be displayed here. Your poems will appear in this space.</p>
              </div>
            )}
          </div>
        </motion.article>
      </div>
    </div>
  )
}

