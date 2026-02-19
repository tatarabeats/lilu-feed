import type { FeedItem } from '../types/feed';

interface RawNewsItem {
  title: string;
  link: string;
  pubDate: string;
  source: string;
}

let cached: { data: FeedItem[]; timestamp: number } | null = null;
const CACHE_TTL = 30 * 60 * 1000;

export async function fetchNews(): Promise<FeedItem[]> {
  if (cached && Date.now() - cached.timestamp < CACHE_TTL) {
    return cached.data;
  }

  try {
    const res = await fetch('/api/news');
    if (!res.ok) throw new Error('News API error');
    const json = await res.json() as { items: RawNewsItem[] };

    const items: FeedItem[] = json.items.map((raw, i) => {
      const publishedAt = new Date(raw.pubDate).toISOString();
      const ageMs = Date.now() - new Date(publishedAt).getTime();
      const isLive = ageMs < 7 * 24 * 60 * 60 * 1000;
      const pub = new Date(publishedAt);

      return {
        id: `news-${i}-${pub.getTime()}`,
        category: 'lilu_news' as const,
        title: raw.title,
        summary: raw.title,
        imageUrl: null,
        sourceUrl: raw.link,
        sourceName: raw.source || 'Google News',
        sourceFaviconUrl: null,
        badge: isLive ? 'LIVE' as const : 'ARCHIVE' as const,
        archiveDate: isLive ? null : `${pub.getFullYear()}-${String(pub.getMonth() + 1).padStart(2, '0')}`,
        publishedAt,
        tickers: [],
      };
    });

    cached = { data: items, timestamp: Date.now() };
    return items;
  } catch {
    return [];
  }
}
