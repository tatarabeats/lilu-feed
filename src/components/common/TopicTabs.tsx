import { useRef, useEffect, forwardRef } from "react";
import { FEED_CATEGORIES } from "../../types/feed";
import { useFeedContext } from "../../store/feedContext";

export function TopicTabs() {
  const { selectedCategory, setSelectedCategory } = useFeedContext();
  const containerRef = useRef<HTMLDivElement>(null);
  const buttonRefs = useRef<(HTMLButtonElement | null)[]>([]);

  // アクティブタブが変わったら自動スクロールして見えるようにする
  useEffect(() => {
    const idx =
      selectedCategory === null
        ? 0
        : FEED_CATEGORIES.findIndex((c) => c.id === selectedCategory) + 1;
    const btn = buttonRefs.current[idx];
    if (btn) {
      btn.scrollIntoView({
        inline: "nearest",
        behavior: "smooth",
        block: "nearest",
      });
    }
  }, [selectedCategory]);

  const allTabs = [
    { id: null, labelJa: "All" },
    ...FEED_CATEGORIES.map((c) => ({
      id: c.id as string | null,
      labelJa: c.labelJa,
    })),
  ];

  return (
    <div
      ref={containerRef}
      className="flex gap-2 overflow-x-auto pb-1 scrollbar-none -mx-1 px-1"
    >
      {allTabs.map((tab, idx) => (
        <TabButton
          key={tab.id ?? "__all__"}
          ref={(el) => {
            buttonRefs.current[idx] = el;
          }}
          active={selectedCategory === tab.id}
          onClick={() =>
            setSelectedCategory(selectedCategory === tab.id ? null : tab.id)
          }
        >
          {tab.labelJa}
        </TabButton>
      ))}
    </div>
  );
}

const TabButton = forwardRef<
  HTMLButtonElement,
  { active: boolean; onClick: () => void; children: React.ReactNode }
>(function TabButton({ active, onClick, children }, ref) {
  return (
    <button
      ref={ref}
      onClick={onClick}
      className={`shrink-0 px-3.5 py-1.5 rounded-full text-[14px] font-medium transition-all ${
        active
          ? "bg-accent/20 text-accent border border-accent/30"
          : "bg-transparent text-text-muted border border-border hover:text-text-secondary hover:border-text-muted/30"
      }`}
    >
      {children}
    </button>
  );
});
