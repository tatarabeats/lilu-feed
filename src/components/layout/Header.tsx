import { TopicTabs } from '../common/TopicTabs';
import { useFeedContext } from '../../store/feedContext';

interface HeaderProps {
  onOpenNotes?: () => void;
}

export function Header({ onOpenNotes }: HeaderProps) {
  const { refresh, isRefreshing, notesCount } = useFeedContext();

  return (
    <header className="sticky top-0 z-20 bg-page-bg/95 backdrop-blur-sm border-b border-border/10 pb-2.5 md:pb-3">
      <div className="flex items-center justify-between mb-2 md:mb-3 pt-3 md:pt-4">
        <h1 className="text-xl md:text-2xl text-gold-gradient font-medium tracking-[-0.5px]">
          Li Lu Feed
        </h1>
        <div className="flex items-center gap-2">
          {/* Refresh button */}
          <button
            onClick={refresh}
            disabled={isRefreshing}
            className="p-1.5 rounded-full text-text-muted hover:text-accent hover:bg-card-bg transition-colors disabled:opacity-40"
            title="フィードを更新"
            aria-label="更新"
          >
            <svg
              className={`w-4 h-4 ${isRefreshing ? 'animate-spin-refresh' : ''}`}
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={1.8}
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
            </svg>
          </button>

          {/* Notes button with badge */}
          {onOpenNotes && (
            <button
              onClick={onOpenNotes}
              className="relative flex items-center gap-1.5 text-[13px] text-text-muted hover:text-accent transition-colors"
              title="学びノート"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M12 20h9" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M16.5 3.5a2.121 2.121 0 013 3L7 19l-4 1 1-4L16.5 3.5z" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              {notesCount > 0 && (
                <span className="absolute -top-1 -right-1 min-w-[16px] h-4 px-1 rounded-full bg-accent text-[10px] font-bold text-white flex items-center justify-center leading-none">
                  {notesCount > 99 ? '99+' : notesCount}
                </span>
              )}
              <span className="hidden md:inline">ノート</span>
            </button>
          )}

          <span className="text-[12px] md:text-[13px] text-text-muted tracking-wide uppercase">
            Himalaya Capital
          </span>
        </div>
      </div>
      <TopicTabs />
    </header>
  );
}
