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
    { url: `${siteUrl}/`, lastModified: now },
    { url: `${siteUrl}/about`, lastModified: now },
    { url: `${siteUrl}/portfolio`, lastModified: now },
    { url: `${siteUrl}/awards`, lastModified: now },
    { url: `${siteUrl}/gallery`, lastModified: now },
    { url: `${siteUrl}/blog`, lastModified: now },
    ...blogSlugs.map((slug) => ({
      url: `${siteUrl}/blog/${slug}`,
      lastModified: now,
    })),
  ]
}

