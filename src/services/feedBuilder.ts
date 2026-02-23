import type { FeedItem, FeedCardLayout } from "../types/feed";
import type { UserPreferences } from "../types/user";

export function buildFeed(
  allItems: FeedItem[],
  prefs: UserPreferences,
  page: number,
  pageSize = 20,
): FeedCardLayout[] {
  // Filter out learned and dismissed items
  const filtered = allItems.filter(
    (item) =>
      !prefs.learnedItemIds.includes(item.id) &&
      !prefs.dismissedItemIds.includes(item.id),
  );

  // Score and sort
  const scored = filtered
    .map((item) => ({
      item,
      score: computeScore(item, prefs),
    }))
    .sort((a, b) => b.score - a.score);

  // Paginate
  const end = (page + 1) * pageSize;
  const pageItems = scored.slice(0, end);

  // Assign card sizes: pattern is Hero, Small, Small, Small, Hero, Small, Small, Small...
  return pageItems.map(({ item }, index) => ({
    item,
    size: index % 4 === 0 ? ("hero" as const) : ("small" as const),
    index,
  }));
}

// Stable seeded pseudo-random based on item ID (FNV-1a hash)
function seededRandom(seed: string): number {
  let h = 2166136261;
  for (let i = 0; i < seed.length; i++) {
    h ^= seed.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return (h >>> 0) / 0xffffffff;
}

function computeScore(item: FeedItem, prefs: UserPreferences): number {
  let score = 0;

  // Recency: LIVE items get big boost
  if (item.badge === "LIVE") {
    const ageMs = Date.now() - new Date(item.publishedAt).getTime();
    const ageHours = ageMs / (1000 * 60 * 60);
    score += Math.max(0, 200 - ageHours); // Newer = higher score
  } else {
    // Archive items: stable randomization so feed order doesn't change on reload
    score += seededRandom(item.id) * 30;
  }

  // Category weight multiplier
  const weight = prefs.categoryWeights[item.category] ?? 1;
  score *= weight;

  return score;
}

export function filterByCategory(
  items: FeedCardLayout[],
  category: string | null,
): FeedCardLayout[] {
  if (!category) return items;
  const filtered = items.filter((layout) => layout.item.category === category);
  // Re-assign card sizes after filtering
  return filtered.map((layout, index) => ({
    ...layout,
    size: index % 4 === 0 ? ("hero" as const) : ("small" as const),
    index,
  }));
}
