import type { FeedItem } from "../types/feed";

interface RawNewsItem {
  title: string;
  link: string;
  pubDate: string;
  source: string;
  description: string;
}

const CACHE_TTL = 30 * 60 * 1000;
const NEWS_STORAGE_KEY = "lilu_feed_news_v1";
const TRANSLATE_CACHE_KEY = "lilu_feed_title_cache";

let cached: { data: FeedItem[]; timestamp: number } | null = null;

// FNV-1a hash for stable IDs
function fnv1a(str: string): string {
  let h = 2166136261;
  for (let i = 0; i < str.length; i++) {
    h ^= str.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return (h >>> 0).toString(36);
}

// Stable ID based on URL + pubDate (not index-based)
function stableId(url: string, pubDate: string): string {
  return `news-${fnv1a(url + pubDate)}`;
}

// Load/save translation cache from localStorage
function loadTranslateCache(): Map<string, string> {
  try {
    const raw = localStorage.getItem(TRANSLATE_CACHE_KEY);
    if (raw)
      return new Map(Object.entries(JSON.parse(raw) as Record<string, string>));
  } catch {}
  return new Map();
}

function saveTranslateCache(map: Map<string, string>): void {
  try {
    localStorage.setItem(
      TRANSLATE_CACHE_KEY,
      JSON.stringify(Object.fromEntries(map)),
    );
  } catch {}
}

const ogImageCache = new Map<string, string | null>();
const titleTranslationCache: Map<string, string> = loadTranslateCache();

export function clearNewsCache(): void {
  cached = null;
  titleTranslationCache.clear();
  try {
    localStorage.removeItem(NEWS_STORAGE_KEY);
    localStorage.removeItem(TRANSLATE_CACHE_KEY);
  } catch {}
}

export async function fetchNews(): Promise<FeedItem[]> {
  // 1. In-memory cache
  if (cached && Date.now() - cached.timestamp < CACHE_TTL) {
    return cached.data;
  }

  // 2. localStorage cache
  try {
    const stored = localStorage.getItem(NEWS_STORAGE_KEY);
    if (stored) {
      const parsed = JSON.parse(stored) as {
        data: FeedItem[];
        timestamp: number;
      };
      if (Date.now() - parsed.timestamp < CACHE_TTL) {
        cached = parsed;
        return cached.data;
      }
    }
  } catch {}

  // 3. Network fetch
  try {
    const res = await fetch("/api/news");
    if (!res.ok) throw new Error("News API error");
    const json = (await res.json()) as { items: RawNewsItem[] };

    const items: FeedItem[] = json.items.map((raw) => {
      const publishedAt = new Date(raw.pubDate).toISOString();
      const ageMs = Date.now() - new Date(publishedAt).getTime();
      const isLive = ageMs < 7 * 24 * 60 * 60 * 1000;
      const pub = new Date(publishedAt);

      return {
        id: stableId(raw.link, raw.pubDate),
        category: "lilu_news" as const,
        title: raw.title,
        summary: raw.title,
        imageUrl: ogImageCache.get(raw.link) ?? null,
        sourceUrl: raw.link,
        sourceName: raw.source || "Google News",
        sourceFaviconUrl: null,
        badge: isLive ? ("LIVE" as const) : ("ARCHIVE" as const),
        archiveDate: isLive
          ? null
          : `${pub.getFullYear()}-${String(pub.getMonth() + 1).padStart(2, "0")}`,
        publishedAt,
        tickers: [],
        rssDescription: raw.description || undefined,
      };
    });

    cached = { data: items, timestamp: Date.now() };
    try {
      localStorage.setItem(NEWS_STORAGE_KEY, JSON.stringify(cached));
    } catch {}
    return items;
  } catch {
    return [];
  }
}

export async function enrichWithJapaneseTitles(
  items: FeedItem[],
): Promise<FeedItem[]> {
  // Use sourceUrl as stable key
  const targets = items.filter(
    (item) =>
      item.category === "lilu_news" &&
      item.sourceUrl &&
      !titleTranslationCache.has(item.sourceUrl),
  );

  if (targets.length > 0) {
    try {
      const titles = targets.map((item) => item.title);
      const res = await fetch("/api/translate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ titles }),
      });

      if (!res.ok) throw new Error("Translation API error");
      const json = (await res.json()) as { translations: string[] };

      for (let i = 0; i < targets.length; i++) {
        const translated = json.translations[i] || targets[i].title;
        titleTranslationCache.set(targets[i].sourceUrl!, translated);
      }
      saveTranslateCache(titleTranslationCache);
    } catch {
      return items;
    }
  }

  return items.map((item) => {
    if (item.sourceUrl && titleTranslationCache.has(item.sourceUrl)) {
      const ja = titleTranslationCache.get(item.sourceUrl)!;
      return { ...item, title: ja, summary: ja };
    }
    return item;
  });
}

export async function enrichWithOgImages(
  items: FeedItem[],
): Promise<FeedItem[]> {
  const targets = items.filter(
    (item) => item.category === "lilu_news" && !item.imageUrl && item.sourceUrl,
  );

  if (targets.length === 0) return items;

  const results = await Promise.allSettled(
    targets.map(async (item) => {
      const url = item.sourceUrl!;
      if (ogImageCache.has(url))
        return { url, imageUrl: ogImageCache.get(url)! };

      try {
        const res = await fetch(`/api/ogimage?url=${encodeURIComponent(url)}`);
        if (!res.ok) throw new Error("OGP fetch failed");
        const json = (await res.json()) as { imageUrl: string | null };
        ogImageCache.set(url, json.imageUrl);
        return { url, imageUrl: json.imageUrl };
      } catch {
        ogImageCache.set(url, null);
        return { url, imageUrl: null };
      }
    }),
  );

  const imageMap = new Map<string, string | null>();
  for (const result of results) {
    if (result.status === "fulfilled") {
      imageMap.set(result.value.url, result.value.imageUrl);
    }
  }

  return items.map((item) => {
    if (item.sourceUrl && imageMap.has(item.sourceUrl)) {
      return {
        ...item,
        imageUrl: imageMap.get(item.sourceUrl) ?? item.imageUrl,
      };
    }
    return item;
  });
}
