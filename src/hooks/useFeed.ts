import { useState, useEffect, useCallback } from 'react';
import type { FeedItem, FeedCardLayout } from '../types/feed';
import type { UserPreferences } from '../types/user';
import { fetchNews } from '../services/newsApi';
import { fetchEdgarFilings } from '../services/edgarApi';
import { ARCHIVE_ITEMS } from '../data/archive';
import { buildFeed } from '../services/feedBuilder';

export function useFeed(prefs: UserPreferences) {
  const [allItems, setAllItems] = useState<FeedItem[]>(ARCHIVE_ITEMS);
  const [feed, setFeed] = useState<FeedCardLayout[]>([]);
  const [page, setPage] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  // Fetch live data sources on mount
  useEffect(() => {
    let cancelled = false;
    setIsLoading(true);

    Promise.all([fetchNews(), fetchEdgarFilings()])
      .then(([news, edgar]) => {
        if (cancelled) return;
        setAllItems([...news, ...edgar, ...ARCHIVE_ITEMS]);
      })
      .finally(() => {
        if (!cancelled) setIsLoading(false);
      });

    return () => { cancelled = true; };
  }, []);

  // Rebuild feed whenever items, prefs, or page changes
  useEffect(() => {
    const layouts = buildFeed(allItems, prefs, page);
    setFeed(layouts);
  }, [allItems, prefs, page]);

  const loadMore = useCallback(() => {
    setPage((p) => p + 1);
  }, []);

  return { feed, isLoading, loadMore };
}
