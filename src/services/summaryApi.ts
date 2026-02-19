import type { FeedItem } from '../types/feed';

const CACHE_PREFIX = 'summary-';
const CACHE_TTL = 7 * 24 * 60 * 60 * 1000; // 7 days

interface CachedSummary {
  text: string;
  timestamp: number;
}

function getCached(itemId: string): string | null {
  try {
    const raw = localStorage.getItem(CACHE_PREFIX + itemId);
    if (!raw) return null;
    const cached: CachedSummary = JSON.parse(raw);
    if (Date.now() - cached.timestamp > CACHE_TTL) {
      localStorage.removeItem(CACHE_PREFIX + itemId);
      return null;
    }
    return cached.text;
  } catch {
    return null;
  }
}

function setCached(itemId: string, text: string): void {
  try {
    const entry: CachedSummary = { text, timestamp: Date.now() };
    localStorage.setItem(CACHE_PREFIX + itemId, JSON.stringify(entry));
  } catch {
    // localStorage full or unavailable
  }
}

export async function fetchSummary(item: FeedItem): Promise<string> {
  // 1. Check localStorage cache
  const cached = getCached(item.id);
  if (cached) return cached;

  // 2. If item has articleBody (archive items), use it directly
  if (item.articleBody) {
    setCached(item.id, item.articleBody);
    return item.articleBody;
  }

  // 3. If item has sourceUrl, call /api/summarize
  if (item.sourceUrl) {
    try {
      const res = await fetch('/api/summarize', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          url: item.sourceUrl,
          title: item.title,
          category: item.category,
        }),
      });

      if (res.ok) {
        const data = await res.json() as { summary: string | null };
        if (data.summary) {
          setCached(item.id, data.summary);
          return data.summary;
        }
      }
    } catch {
      // API call failed
    }
  }

  // 4. Fallback: use item.summary
  return item.summary;
}
