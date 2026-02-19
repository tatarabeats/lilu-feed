import { useFeedContext } from '../../store/feedContext';
import { FeedItemComponent } from './FeedItem';
import { InfiniteScroll } from './InfiniteScroll';
import { CardSkeleton } from '../common/Skeleton';

export function FeedGrid() {
  const { feed, isLoading, loadMore, onLearned, onDismissed } = useFeedContext();

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

  if (feed.length === 0) {
    return (
      <div className="text-center py-20 text-text-muted">
        <p className="text-lg">No feed items</p>
        <p className="text-sm mt-2">Check back later for new content</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-3 md:gap-x-4 md:gap-y-6">
      {feed.map((layout) => (
        <FeedItemComponent
          key={layout.item.id}
          layout={layout}
          onLearned={onLearned}
          onDismissed={onDismissed}
        />
      ))}
      <div className="md:col-span-3">
        <InfiniteScroll onLoadMore={loadMore} hasMore={feed.length >= 20} />
      </div>
    </div>
  );
}
