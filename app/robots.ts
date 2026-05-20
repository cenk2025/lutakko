import type { MetadataRoute } from 'next';
import { SITE_URL } from '@/lib/jsonld';

/**
 * robots.txt — explicit Allow for all major web + AI crawlers, Disallow for
 * the private dashboard and auth-callback areas.
 *
 * AI bots listed:
 * - Anthropic     (ClaudeBot, anthropic-ai)
 * - OpenAI        (GPTBot, OAI-SearchBot, ChatGPT-User)
 * - Google AI     (Google-Extended)
 * - Perplexity    (PerplexityBot)
 * - Common Crawl  (CCBot)  — used as training data by many models
 * - Bing AI       (Bingbot)
 * - You.com       (YouBot)
 * - Apple         (Applebot-Extended)
 */
export default function robots(): MetadataRoute.Robots {
  const aiBots = [
    'GPTBot',
    'OAI-SearchBot',
    'ChatGPT-User',
    'ClaudeBot',
    'anthropic-ai',
    'Claude-Web',
    'Google-Extended',
    'PerplexityBot',
    'Perplexity-User',
    'CCBot',
    'YouBot',
    'Applebot',
    'Applebot-Extended',
    'Bingbot',
    'cohere-ai',
    'DuckAssistBot',
    'Diffbot',
    'FacebookBot',
    'Bytespider',
  ];

  return {
    rules: [
      // General rule for everyone — index everything except private areas.
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/dashboard/', '/auth/'],
      },
      // Explicit, named permission for AI / LLM crawlers (some respect only
      // their own User-agent block, not the wildcard).
      ...aiBots.map((ua) => ({
        userAgent: ua,
        allow: '/',
        disallow: ['/dashboard/', '/auth/'],
      })),
    ],
    sitemap: `${SITE_URL}/sitemap.xml`,
    host: SITE_URL,
  };
}
