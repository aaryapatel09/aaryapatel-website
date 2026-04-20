const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? 'http://localhost:3000'

const aiAndSearchBots = [
  'Googlebot',
  'Googlebot-Image',
  'Googlebot-News',
  'Google-Extended',
  'Bingbot',
  'DuckDuckBot',
  'Applebot',
  'Applebot-Extended',
  'GPTBot',
  'ChatGPT-User',
  'OAI-SearchBot',
  'ClaudeBot',
  'Claude-Web',
  'Claude-SearchBot',
  'Claude-User',
  'anthropic-ai',
  'PerplexityBot',
  'Perplexity-User',
  'CCBot',
  'cohere-ai',
  'YouBot',
  'Amazonbot',
  'Meta-ExternalAgent',
  'Meta-ExternalFetcher',
  'FacebookBot',
  'facebookexternalhit',
  'Twitterbot',
  'LinkedInBot',
  'Bytespider',
  'DiffBot',
  'Omgilibot',
  'Omgili',
]

export default function robots() {
  return {
    rules: [
      { userAgent: '*', allow: '/' },
      ...aiAndSearchBots.map((userAgent) => ({ userAgent, allow: '/' })),
    ],
    sitemap: `${siteUrl}/sitemap.xml`,
    host: siteUrl,
  }
}

