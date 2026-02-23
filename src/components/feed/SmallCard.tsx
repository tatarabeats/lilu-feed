import type { FeedItem, FeedCategory } from '../../types/feed';
import { CardBadge } from './CardBadge';
import { CardActions } from './CardActions';
import { getPlaceholderClass } from '../../utils/placeholder';

interface SmallCardProps {
  item: FeedItem;
  onLearned: (itemId: string) => void;
  onDismissed: (itemId: string, category: FeedCategory) => void;
  onSelect: (item: FeedItem) => void;
}

export function SmallCard({ item, onLearned, onDismissed, onSelect }: SmallCardProps) {
  return (
    <div
      className="feed-card bg-card-bg h-full flex flex-col cursor-pointer"
      onClick={() => onSelect(item)}
    >
      {/* Image */}
      <div className="relative aspect-[3/2] overflow-hidden">
        <CardBadge badge={item.badge} archiveDate={item.archiveDate} />
        {item.imageUrl ? (
          <img
            src={item.imageUrl}
            alt=""
            className="card-image w-full h-full object-cover"
          />
        ) : (
          <div className={`w-full h-full ${getPlaceholderClass(item.id)} flex items-center justify-center`}>
            <span className="text-[40px] opacity-30 select-none">
              {getCategoryIcon(item.category)}
            </span>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-4 flex flex-col flex-1">
        <h3 className="card-title text-[17px] font-normal leading-[25px] tracking-[-0.3px] line-clamp-3 mb-auto">
          {item.title}
        </h3>

        <div className="mt-3 flex items-center justify-between gap-1">
          <span className="text-[13px] text-text-muted truncate">{item.sourceName}</span>
          <CardActions
            item={item}
            onLearned={onLearned}
            onDismissed={onDismissed}
          />
        </div>
      </div>
    </div>
  );
}

function getCategoryIcon(cat: string): string {
  switch (cat) {
    case 'philosophy': return '🏛';
    case 'company_deep_dive': return '📊';
    case 'portfolio_moves': return '💼';
    case 'lilu_news': return '📰';
    case 'market_context': return '🌍';
    default: return '📈';
  }
}
