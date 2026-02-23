import { createContext, useCallback, useContext, useEffect, useState, type ReactNode } from 'react';
import type { FeedCardLayout, FeedCategory, FeedItem } from '../types/feed';
import type { MarketSnapshot } from '../types/market';
import { useUserPrefs } from '../hooks/useUserPrefs';
import { useMarketData } from '../hooks/useMarketData';
import { useFeed } from '../hooks/useFeed';
import { filterByCategory } from '../services/feedBuilder';
import { saveLearnedItem, loadNotes } from '../services/notesStore';

interface FeedContextValue {
  feed: FeedCardLayout[];
  isLoading: boolean;
  isRefreshing: boolean;
  loadMore: () => void;
  refresh: () => void;
  onLearned: (itemId: string) => void;
  onDismissed: (itemId: string, category: FeedCategory) => void;
  marketData: MarketSnapshot | null;
  marketLoading: boolean;
  selectedCategory: string | null;
  setSelectedCategory: (cat: string | null) => void;
  selectedArticle: FeedItem | null;
  selectArticle: (item: FeedItem) => void;
  clearArticle: () => void;
  notesCount: number;
  refreshNotesCount: () => void;
}

const FeedContext = createContext<FeedContextValue | null>(null);

export function FeedProvider({ children }: { children: ReactNode }) {
  const { prefs, onLearned: prefOnLearned, onDismissed } = useUserPrefs();
  const { marketData, isLoading: marketLoading } = useMarketData();
  const { feed: rawFeed, isLoading, loadMore, allItems, refresh: feedRefresh } = useFeed(prefs);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedArticle, setSelectedArticle] = useState<FeedItem | null>(null);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [notesCount, setNotesCount] = useState(() => loadNotes().length);

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

  const onLearned = useCallback((itemId: string) => {
    const item = allItems.find((i) => i.id === itemId);
    if (item) {
      saveLearnedItem({
        id: itemId,
        title: item.title,
        category: item.category,
        sourceUrl: item.sourceUrl,
        learnedAt: new Date().toISOString(),
      });
    }
    prefOnLearned(itemId);
  }, [allItems, prefOnLearned]);

  const refresh = useCallback(() => {
    setIsRefreshing(true);
    feedRefresh();
    setTimeout(() => setIsRefreshing(false), 2000);
  }, [feedRefresh]);

  const refreshNotesCount = useCallback(() => {
    setNotesCount(loadNotes().length);
  }, []);

  const feed = filterByCategory(rawFeed, selectedCategory);

  return (
    <FeedContext.Provider
      value={{
        feed,
        isLoading,
        isRefreshing,
        loadMore,
        refresh,
        onLearned,
        onDismissed,
        marketData,
        marketLoading,
        selectedCategory,
        setSelectedCategory,
        selectedArticle,
        selectArticle,
        clearArticle,
        notesCount,
        refreshNotesCount,
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
