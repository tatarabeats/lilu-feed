import type { FeedCardLayout, FeedCategory } from '../../types/feed';
import { HeroCard } from './HeroCard';
import { SmallCard } from './SmallCard';

interface FeedItemProps {
  layout: FeedCardLayout;
  onLearned: (itemId: string) => void;
  onDismissed: (itemId: string, category: FeedCategory) => void;
}

export function FeedItemComponent({ layout, onLearned, onDismissed }: FeedItemProps) {
  const { item, size } = layout;

  if (size === 'hero') {
    return (
      <div className="col-span-1 md:col-span-3 animate-slide-up">
        <HeroCard item={item} onLearned={onLearned} onDismissed={onDismissed} />
      </div>
    );
  }

  return (
    <div className="animate-slide-up">
      <SmallCard item={item} onLearned={onLearned} onDismissed={onDismissed} />
    </div>
  );
}
