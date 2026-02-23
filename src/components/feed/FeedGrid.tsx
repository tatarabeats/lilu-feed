import { useRef, useState } from "react";
import { useFeedContext } from "../../store/feedContext";
import { FEED_CATEGORIES } from "../../types/feed";
import { FeedItemComponent } from "./FeedItem";
import { InfiniteScroll } from "./InfiniteScroll";
import { CardSkeleton } from "../common/Skeleton";
import { HoldingsGrid } from "../market/HoldingsGrid";

// タブバーと同じ順番 (null = All)
const SWIPE_ORDER: (string | null)[] = [
  null,
  ...FEED_CATEGORIES.map((c) => c.id),
];

type SwipeDir = "left" | "right" | null;

export function FeedGrid() {
  const {
    feed,
    isLoading,
    loadMore,
    onLearned,
    onDismissed,
    selectArticle,
    selectedCategory,
    setSelectedCategory,
  } = useFeedContext();

  const startXRef = useRef<number | null>(null);
  const [swipeDir, setSwipeDir] = useState<SwipeDir>(null);
  const [animKey, setAnimKey] = useState(0);

  const handlePointerDown = (e: React.PointerEvent) => {
    startXRef.current = e.clientX;
  };

  const handlePointerUp = (e: React.PointerEvent) => {
    if (startXRef.current === null) return;
    const dx = e.clientX - startXRef.current;
    startXRef.current = null;

    if (Math.abs(dx) < 60) return;

    const currentIdx = SWIPE_ORDER.indexOf(selectedCategory);
    if (dx < 0) {
      // 左スワイプ → 次のカテゴリ（コンテンツが右から入る）
      const next =
        SWIPE_ORDER[Math.min(currentIdx + 1, SWIPE_ORDER.length - 1)];
      if (next !== selectedCategory) {
        setSwipeDir("left");
        setAnimKey((k) => k + 1);
        setSelectedCategory(next);
      }
    } else {
      // 右スワイプ → 前のカテゴリ（コンテンツが左から入る）
      const prev = SWIPE_ORDER[Math.max(currentIdx - 1, 0)];
      if (prev !== selectedCategory) {
        setSwipeDir("right");
        setAnimKey((k) => k + 1);
        setSelectedCategory(prev);
      }
    }
  };

  if (isLoading && feed.length === 0) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3 md:gap-5">
        <div className="md:col-span-3">
          <CardSkeleton hero />
        </div>
        <CardSkeleton />
        <CardSkeleton />
        <CardSkeleton />
      </div>
    );
  }

  const animClass =
    swipeDir === "left"
      ? "animate-slide-from-right"
      : swipeDir === "right"
        ? "animate-slide-from-left"
        : "";

  return (
    <div
      onPointerDown={handlePointerDown}
      onPointerUp={handlePointerUp}
      style={{ touchAction: "pan-y" }}
    >
      <div key={animKey} className={animClass}>
        {/* ポートフォリオタブ: 保有銘柄グリッドをフィードの上に表示 */}
        {selectedCategory === "portfolio_moves" && (
          <div className="mb-5">
            <HoldingsGrid />
          </div>
        )}

        {feed.length === 0 && selectedCategory !== "portfolio_moves" ? (
          <div className="text-center py-20 text-text-muted">
            <p className="text-lg">No feed items</p>
            <p className="text-sm mt-2">Check back later for new content</p>
          </div>
        ) : feed.length === 0 ? null : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3 md:gap-x-4 md:gap-y-6">
            {feed.map((layout) => (
              <FeedItemComponent
                key={layout.item.id}
                layout={layout}
                onLearned={onLearned}
                onDismissed={onDismissed}
                onSelect={selectArticle}
              />
            ))}
            <div className="md:col-span-3">
              <InfiniteScroll
                onLoadMore={loadMore}
                hasMore={feed.length >= 20}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
