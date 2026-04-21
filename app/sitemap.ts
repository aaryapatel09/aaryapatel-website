import { sanityClient, blogPostSlugsQuery } from '@/lib/sanity'
import { poetryContent } from '@/lib/poetry'

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? 'http://localhost:3000'

export default async function sitemap() {
  let blogSlugs: string[] = []

  try {
    if (sanityClient) {
      const data = await sanityClient.fetch(blogPostSlugsQuery)
      blogSlugs = (data ?? [])
        .map((d: any) => {
          const slug = d?.slug
          if (!slug) return null
          if (typeof slug === 'string') return slug
          return slug.current ?? null
        })
        .filter(Boolean)
    }
  } catch (e) {
    console.error('Failed to build blog slugs for sitemap:', e)
  }

  if (blogSlugs.length === 0) {
    blogSlugs = Object.keys(poetryContent)
  }

  const now = new Date()

  return [
    { url: `${siteUrl}/`, lastModified: now, changeFrequency: 'weekly' as const, priority: 1.0 },
    { url: `${siteUrl}/about`, lastModified: now, changeFrequency: 'monthly' as const, priority: 0.9 },
    { url: `${siteUrl}/resume`, lastModified: now, changeFrequency: 'monthly' as const, priority: 0.9 },
    { url: `${siteUrl}/awards`, lastModified: now, changeFrequency: 'monthly' as const, priority: 0.9 },
    { url: `${siteUrl}/portfolio`, lastModified: now, changeFrequency: 'monthly' as const, priority: 0.8 },
    { url: `${siteUrl}/blog`, lastModified: now, changeFrequency: 'weekly' as const, priority: 0.8 },
    { url: `${siteUrl}/gallery`, lastModified: now, changeFrequency: 'monthly' as const, priority: 0.6 },
    ...blogSlugs.map((slug) => ({
      url: `${siteUrl}/blog/${slug}`,
      lastModified: now,
      changeFrequency: 'monthly' as const,
      priority: 0.7,
    })),
  ]
}

