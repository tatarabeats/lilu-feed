import { FEED_CATEGORIES } from '../../types/feed';
import { useFeedContext } from '../../store/feedContext';

export function TopicTabs() {
  const { selectedCategory, setSelectedCategory } = useFeedContext();

  return (
    <div className="flex gap-1.5 overflow-x-auto pb-1 scrollbar-none -mx-1 px-1">
      <TabButton
        active={selectedCategory === null}
        onClick={() => setSelectedCategory(null)}
      >
        All
      </TabButton>
      {FEED_CATEGORIES.map((cat) => (
        <TabButton
          key={cat.id}
          active={selectedCategory === cat.id}
          onClick={() =>
            setSelectedCategory(selectedCategory === cat.id ? null : cat.id)
          }
        >
          {cat.label}
        </TabButton>
      ))}
    </div>
  );
}

function TabButton({
  active,
  onClick,
  children,
}: {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      onClick={onClick}
      className={`shrink-0 px-3 py-1 rounded-full text-[13px] font-medium transition-all ${
        active
          ? 'bg-accent text-page-bg'
          : 'bg-transparent text-text-muted border border-border hover:text-text-secondary'
      }`}
    >
      {children}
    </button>
  );
}
