import { useState } from 'react';
import type { FeedItem, FeedCategory } from '../../types/feed';

interface CardActionsProps {
  item: FeedItem;
  onLearned: (itemId: string) => void;
  onDismissed: (itemId: string, category: FeedCategory) => void;
}

export function CardActions({ item, onLearned, onDismissed }: CardActionsProps) {
  const [learning, setLearning] = useState(false);
  const [dismissing, setDismissing] = useState(false);

  const handleLearned = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (learning) return;
    setLearning(true);
    setTimeout(() => onLearned(item.id), 380);
  };

  const handleDismissed = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (dismissing) return;
    setDismissing(true);
    setTimeout(() => onDismissed(item.id, item.category), 280);
  };

  return (
    <div className="flex items-center gap-0.5">
      <button
        onClick={handleLearned}
        className={`p-1.5 rounded-full transition-all duration-300 ${
          learning
            ? 'text-accent bg-accent/20 scale-125 animate-learned-flash'
            : 'text-text-muted hover:text-accent hover:bg-card-bg-hover'
        }`}
        title="Already learned"
        aria-label="学んだ"
      >
        <svg className="w-4 h-4" fill={learning ? 'currentColor' : 'none'} viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
        </svg>
      </button>
      <button
        onClick={handleDismissed}
        className={`p-1.5 rounded-full transition-all duration-200 ${
          dismissing
            ? 'text-badge-live bg-badge-live/15 scale-110'
            : 'text-text-muted hover:text-badge-live hover:bg-card-bg-hover'
        }`}
        title="Not interested"
        aria-label="興味なし"
      >
        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>
    </div>
  );
}
