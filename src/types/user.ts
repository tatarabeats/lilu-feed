import type { FeedCategory } from './feed';

export interface UserPreferences {
  version: number;
  learnedItemIds: string[];
  dismissedItemIds: string[];
  categoryWeights: Record<FeedCategory, number>;
  lastVisitedAt: string;
  feedScrollPosition: number;
}
