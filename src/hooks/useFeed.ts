import { useState, useEffect, useCallback } from 'react';
import type { FeedItem, FeedCardLayout } from '../types/feed';
import type { UserPreferences } from '../types/user';
import { fetchNews, enrichWithJapaneseTitles, enrichWithOgImages, clearNewsCache } from '../services/newsApi';
import { fetchEdgarFilings } from '../services/edgarApi';
import { ARCHIVE_ITEMS } from '../data/archive';
import { buildFeed } from '../services/feedBuilder';

export function useFeed(prefs: UserPreferences) {
  const [allItems, setAllItems] = useState<FeedItem[]>(ARCHIVE_ITEMS);
  const [feed, setFeed] = useState<FeedCardLayout[]>([]);
  const [page, setPage] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [refreshKey, setRefreshKey] = useState(0);

  // Fetch live data sources, then translate titles, then enrich images
  useEffect(() => {
    let cancelled = false;
    setIsLoading(true);

    Promise.all([fetchNews(), fetchEdgarFilings()])
      .then(async ([news, edgar]) => {
        if (cancelled) return;

        // Phase 1: Translate titles to Japanese first (most visible change)
        const translatedNews = await enrichWithJapaneseTitles(news);
        if (cancelled) return;
        setAllItems([...translatedNews, ...edgar, ...ARCHIVE_ITEMS]);

        // Phase 2: Enrich with OGP images (background)
        const enrichedNews = await enrichWithOgImages(translatedNews);
        if (cancelled) return;
        if (enrichedNews.some((item) => item.imageUrl !== null)) {
          setAllItems([...enrichedNews, ...edgar, ...ARCHIVE_ITEMS]);
        }
      })
      .finally(() => {
        if (!cancelled) setIsLoading(false);
      });

    return () => { cancelled = true; };
  }, [refreshKey]);

  // Rebuild feed whenever items, prefs, or page changes
  useEffect(() => {
    const layouts = buildFeed(allItems, prefs, page);
    setFeed(layouts);
  }, [allItems, prefs, page]);

  const loadMore = useCallback(() => {
    setPage((p) => p + 1);
  }, []);

  const refresh = useCallback(() => {
    clearNewsCache();
    setAllItems(ARCHIVE_ITEMS);
    setPage(0);
    setRefreshKey((k) => k + 1);
  }, []);

  return { feed, isLoading, loadMore, allItems, refresh };
}
