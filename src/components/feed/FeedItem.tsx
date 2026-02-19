import type { FeedCardLayout, FeedCategory, FeedItem } from '../../types/feed';
import { HeroCard } from './HeroCard';
import { SmallCard } from './SmallCard';

interface FeedItemProps {
  layout: FeedCardLayout;
  onLearned: (itemId: string) => void;
  onDismissed: (itemId: string, category: FeedCategory) => void;
  onSelect: (item: FeedItem) => void;
}

export function FeedItemComponent({ layout, onLearned, onDismissed, onSelect }: FeedItemProps) {
  const { item, size } = layout;

  if (size === 'hero') {
    return (
      <div className="col-span-1 md:col-span-3 animate-slide-up">
        <HeroCard item={item} onLearned={onLearned} onDismissed={onDismissed} onSelect={onSelect} />
      </div>
    );
  }

  return (
    <div className="animate-slide-up">
      <SmallCard item={item} onLearned={onLearned} onDismissed={onDismissed} onSelect={onSelect} />
    </div>
  );
}
