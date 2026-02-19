import { createContext, useCallback, useContext, useEffect, useState, type ReactNode } from 'react';
import type { FeedCardLayout, FeedCategory, FeedItem } from '../types/feed';
import type { MarketSnapshot } from '../types/market';
import { useUserPrefs } from '../hooks/useUserPrefs';
import { useMarketData } from '../hooks/useMarketData';
import { useFeed } from '../hooks/useFeed';
import { filterByCategory } from '../services/feedBuilder';

interface FeedContextValue {
  feed: FeedCardLayout[];
  isLoading: boolean;
  loadMore: () => void;
  onLearned: (itemId: string) => void;
  onDismissed: (itemId: string, category: FeedCategory) => void;
  marketData: MarketSnapshot | null;
  marketLoading: boolean;
  selectedCategory: string | null;
  setSelectedCategory: (cat: string | null) => void;
  selectedArticle: FeedItem | null;
  selectArticle: (item: FeedItem) => void;
  clearArticle: () => void;
}

const FeedContext = createContext<FeedContextValue | null>(null);

export function FeedProvider({ children }: { children: ReactNode }) {
  const { prefs, onLearned, onDismissed } = useUserPrefs();
  const { marketData, isLoading: marketLoading } = useMarketData();
  const { feed: rawFeed, isLoading, loadMore } = useFeed(prefs);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedArticle, setSelectedArticle] = useState<FeedItem | null>(null);

  const selectArticle = useCallback((item: FeedItem) => {
    setSelectedArticle(item);
    history.pushState({ articleId: item.id }, '', `#article-${item.id}`);
    window.scrollTo(0, 0);
  }, []);

  const clearArticle = useCallback(() => {
    setSelectedArticle(null);
  }, []);

  // Handle browser back button
  useEffect(() => {
    const onPopState = () => {
      setSelectedArticle(null);
    };
    window.addEventListener('popstate', onPopState);
    return () => window.removeEventListener('popstate', onPopState);
  }, []);

  const feed = filterByCategory(rawFeed, selectedCategory);

  return (
    <FeedContext.Provider
      value={{
        feed,
        isLoading,
        loadMore,
        onLearned,
        onDismissed,
        marketData,
        marketLoading,
        selectedCategory,
        setSelectedCategory,
        selectedArticle,
        selectArticle,
        clearArticle,
      }}
    >
      {children}
    </FeedContext.Provider>
  );
}

export function useFeedContext() {
  const ctx = useContext(FeedContext);
  if (!ctx) throw new Error('useFeedContext must be used within FeedProvider');
  return ctx;
}
