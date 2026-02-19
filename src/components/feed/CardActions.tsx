import type { FeedItem, FeedCategory } from '../../types/feed';

interface CardActionsProps {
  item: FeedItem;
  onLearned: (itemId: string) => void;
  onDismissed: (itemId: string, category: FeedCategory) => void;
}

export function CardActions({ item, onLearned, onDismissed }: CardActionsProps) {
  return (
    <div className="flex items-center gap-0.5">
      <button
        onClick={(e) => {
          e.preventDefault();
          e.stopPropagation();
          onLearned(item.id);
        }}
        className="p-1.5 rounded-full text-text-muted hover:text-accent hover:bg-card-bg-hover transition-colors"
        title="Already learned"
      >
        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
        </svg>
      </button>
      <button
        onClick={(e) => {
          e.preventDefault();
          e.stopPropagation();
          onDismissed(item.id, item.category);
        }}
        className="p-1.5 rounded-full text-text-muted hover:text-badge-live hover:bg-card-bg-hover transition-colors"
        title="Not interested"
      >
        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>
    </div>
  );
}
