import type { FeedItem, FeedCategory } from '../../types/feed';
import { CardBadge } from './CardBadge';
import { CardActions } from './CardActions';
import { getPlaceholderClass } from '../../utils/placeholder';

interface HeroCardProps {
  item: FeedItem;
  onLearned: (itemId: string) => void;
  onDismissed: (itemId: string, category: FeedCategory) => void;
  onSelect: (item: FeedItem) => void;
}

export function HeroCard({ item, onLearned, onDismissed, onSelect }: HeroCardProps) {
  return (
    <div
      className="feed-card bg-card-bg p-4 md:p-0 md:bg-transparent cursor-pointer"
      onClick={() => onSelect(item)}
    >
      {/* Mobile: stacked layout */}
      <div className="md:hidden">
        <div className="relative aspect-[2/1] overflow-hidden rounded-xl mb-3">
          <CardBadge badge={item.badge} archiveDate={item.archiveDate} />
          <PlaceholderOrImage item={item} />
        </div>
        <h2 className="card-title font-serif text-lg font-normal leading-snug tracking-[-0.3px] mb-1.5">
          {item.title}
        </h2>
        <p className="text-[11px] text-text-muted mb-2">{formatDate(item.publishedAt)}</p>
        <p className="text-[13px] text-text-secondary leading-[20px] line-clamp-2 mb-3">
          {item.summary}
        </p>
        <div className="flex items-center justify-between">
          <span className="text-[11px] text-text-muted">{item.sourceName}</span>
          <CardActions item={item} onLearned={onLearned} onDismissed={onDismissed} />
        </div>
      </div>

      {/* Desktop: side-by-side layout */}
      <div className="hidden md:flex gap-6">
        <div className="flex-1 flex flex-col justify-between py-1">
          <div>
            <h2 className="card-title font-serif text-[26px] font-normal leading-[34px] tracking-[-0.5px] mb-2">
              {item.title}
            </h2>
            <p className="text-[12px] text-text-muted mb-3">{formatDate(item.publishedAt)}</p>
            <p className="text-[14px] text-text-secondary leading-[22px] line-clamp-3">
              {item.summary}
            </p>
          </div>
          <div className="mt-4 flex items-center justify-between">
            <span className="text-[11px] text-text-muted">{item.sourceName}</span>
            <CardActions item={item} onLearned={onLearned} onDismissed={onDismissed} />
          </div>
        </div>
        <div className="relative w-[280px] h-[186px] shrink-0 overflow-hidden rounded-xl">
          <CardBadge badge={item.badge} archiveDate={item.archiveDate} />
          <PlaceholderOrImage item={item} />
        </div>
      </div>
    </div>
  );
}

function PlaceholderOrImage({ item }: { item: FeedItem }) {
  if (item.imageUrl) {
    return <img src={item.imageUrl} alt="" className="card-image w-full h-full object-cover" />;
  }
  const icon = item.category === 'philosophy' ? '🏛' :
    item.category === 'company_deep_dive' ? '📊' :
    item.category === 'portfolio_moves' ? '💼' :
    item.category === 'lilu_news' ? '📰' :
    item.category === 'market_context' ? '🌍' : '📈';

  return (
    <div className={`w-full h-full ${getPlaceholderClass(item.id)} flex items-center justify-center`}>
      <span className="text-[48px] opacity-30 select-none">{icon}</span>
    </div>
  );
}

function formatDate(iso: string): string {
  const date = new Date(iso);
  const now = new Date();
  const diffMs = now.getTime() - date.getTime();
  const diffHours = diffMs / (1000 * 60 * 60);

  if (diffHours < 1) return `${Math.floor(diffMs / (1000 * 60))}m ago`;
  if (diffHours < 24) return `${Math.floor(diffHours)}h ago`;
  if (diffHours < 48) return 'Yesterday';

  return date.toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });
}
