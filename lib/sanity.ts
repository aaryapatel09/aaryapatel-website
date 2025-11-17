import { createClient } from '@sanity/client'

// Only create client if projectId is provided
const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID

export const sanityClient = projectId
  ? createClient({
      projectId,
      dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
      useCdn: true,
      apiVersion: '2023-12-01',
    })
  : null

// Blog post query
export const blogPostsQuery = `*[_type == "post"] | order(publishedAt desc) {
  _id,
  title,
  slug,
  publishedAt,
  excerpt,
  mainImage,
  categories,
  author->{name, image}
}`

// Gallery item query
export const galleryItemsQuery = `*[_type == "galleryItem"] | order(_createdAt desc) {
  _id,
  title,
  image,
  category,
  tags,
  metadata,
  _createdAt
}`

// Single post query
export const postBySlugQuery = `*[_type == "post" && slug.current == $slug][0] {
  _id,
  title,
  slug,
  publishedAt,
  body,
  mainImage,
  categories,
  author->{name, image}
}`

