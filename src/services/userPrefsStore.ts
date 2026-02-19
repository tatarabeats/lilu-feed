import type { UserPreferences } from '../types/user';
import type { FeedCategory } from '../types/feed';

const STORAGE_KEY = 'lilu_feed_prefs';
const CURRENT_VERSION = 2;

const DEFAULT_WEIGHTS: Record<FeedCategory, number> = {
  portfolio_moves: 1.0,
  holdings_performance: 1.0,
  lilu_news: 1.0,
  philosophy: 1.0,
  company_deep_dive: 1.0,
  market_context: 1.0,
};

export function createDefaultPrefs(): UserPreferences {
  return {
    version: CURRENT_VERSION,
    learnedItemIds: [],
    dismissedItemIds: [],
    categoryWeights: { ...DEFAULT_WEIGHTS },
    lastVisitedAt: new Date().toISOString(),
    feedScrollPosition: 0,
  };
}

export function loadPrefs(): UserPreferences {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) {
      const prefs = JSON.parse(raw) as UserPreferences;
      // Migration: ensure all category weights exist
      for (const key of Object.keys(DEFAULT_WEIGHTS) as FeedCategory[]) {
        if (prefs.categoryWeights[key] === undefined) {
          prefs.categoryWeights[key] = DEFAULT_WEIGHTS[key];
        }
      }
      prefs.version = CURRENT_VERSION;
      return prefs;
    }
  } catch {
    // corrupted
  }
  return createDefaultPrefs();
}

export function savePrefs(prefs: UserPreferences): void {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(prefs));
}

export function markLearned(prefs: UserPreferences, itemId: string): UserPreferences {
  if (prefs.learnedItemIds.includes(itemId)) return prefs;
  return {
    ...prefs,
    learnedItemIds: [...prefs.learnedItemIds, itemId],
  };
}

export function markDismissed(
  prefs: UserPreferences,
  itemId: string,
  category: FeedCategory,
): UserPreferences {
  const newWeight = Math.max(0, (prefs.categoryWeights[category] ?? 1) - 0.2);
  return {
    ...prefs,
    dismissedItemIds: prefs.dismissedItemIds.includes(itemId)
      ? prefs.dismissedItemIds
      : [...prefs.dismissedItemIds, itemId],
    categoryWeights: {
      ...prefs.categoryWeights,
      [category]: Math.round(newWeight * 100) / 100,
    },
  };
}
