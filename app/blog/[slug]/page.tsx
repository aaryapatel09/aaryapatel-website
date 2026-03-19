import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { sanityClient, postBySlugQuery } from '@/lib/sanity'
import { poetryContent } from '@/lib/poetry'
import BlogPostClient, { BlogPost } from '@/components/pages/BlogPostClient'

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? 'http://localhost:3000'
const defaultOgImage = `${siteUrl}/images/poetry-book-icon.png`

function toAbsoluteUrl(url: string) {
  if (url.startsWith('http://') || url.startsWith('https://')) return url
  if (url.startsWith('/')) return `${siteUrl}${url}`
  return `${siteUrl}/${url}`
}

async function getPost(slug: string): Promise<BlogPost | null> {
  try {
    if (sanityClient) {
      const data = await sanityClient.fetch(postBySlugQuery, { slug })
      if (data?.title) return data
    }
  } catch (e) {
    console.error('Error fetching Sanity post:', e)
  }

  const poemText = poetryContent[slug]
  if (!poemText) return null

  const titles: Record<string, string> = {
    'how-to-live-inside-a-wire': 'How to Live Inside a Wire',
    'the-clock-eats-its-own-hands': 'The Clock Eats Its Own Hands',
    'the-last-human-poet': 'The Last Human Poet',
    'the-music-teachers-final-lesson': "The Music Teacher's Final Lesson",
    'gallery-opening-humans-not-included': 'Gallery Opening: Humans Not Included',
    'archaeology-of-creativity': 'Archaeology of Creativity',
    'the-curator-of-extinct-emotions': 'The Curator of Extinct Emotions',
    'the-last-brushstroke': 'The Last Brushstroke',
  }

  const title = titles[slug] || 'Poem'
  return {
    _id: slug,
    title,
    slug: { current: slug },
    publishedAt: new Date().toISOString(),
    body: poemText,
    categories: ['Ghost in the Machine'],
    author: { name: 'Aarya Patel' },
  }
}

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const post = await getPost(params.slug)
  const canonical = `${siteUrl}/blog/${params.slug}`

  if (!post) {
    return {
      title: 'Poetry | Aarya Patel',
      description: 'Poetry exploring the intersection of humanity and technology.',
      alternates: {
        canonical,
      },
    }
  }

  const description =
    typeof post.body === 'string'
      ? post.body.split('\n\n')[0].replace(/\s+/g, ' ').slice(0, 160)
      : `Poetry by ${post.author?.name ?? 'Aarya Patel'}.`

  const ogImageUrl =
    post.mainImage ? toAbsoluteUrl(String(post.mainImage)) : defaultOgImage

  return {
    title: `${post.title} | Poetry | Aarya Patel`,
    description,
    alternates: {
      canonical,
    },
    openGraph: {
      title: `${post.title} | Poetry | Aarya Patel`,
      description,
      url: canonical,
      type: 'article',
      images: [
        {
          url: ogImageUrl,
          alt: post.title,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: `${post.title} | Poetry | Aarya Patel`,
      description,
      images: [ogImageUrl],
    },
  }
}

export default async function BlogPostPage({ params }: { params: { slug: string } }) {
  const post = await getPost(params.slug)
  if (!post) notFound()

  return <BlogPostClient post={post} />
}

