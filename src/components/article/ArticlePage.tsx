import { useEffect, useState } from 'react';
import { useFeedContext } from '../../store/feedContext';
import { fetchSummary } from '../../services/summaryApi';

export function ArticlePage() {
  const { selectedArticle, clearArticle, onLearned } = useFeedContext();
  const [body, setBody] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!selectedArticle) return;

    setLoading(true);
    setBody(null);

    fetchSummary(selectedArticle).then((text) => {
      setBody(text);
      setLoading(false);
    });
  }, [selectedArticle]);

  if (!selectedArticle) return null;

  const item = selectedArticle;

  const handleBack = () => {
    if (history.state?.articleId) {
      history.back();
    } else {
      clearArticle();
    }
  };

  const handleLearned = () => {
    onLearned(item.id);
    handleBack();
  };

  return (
    <div className="article-page fixed inset-0 z-50 bg-page-bg overflow-y-auto">
      {/* Fixed header */}
      <header className="sticky top-0 z-10 bg-page-bg/90 backdrop-blur-md border-b border-white/5">
        <div className="max-w-[640px] mx-auto px-4 h-12 flex items-center justify-between">
          <button
            onClick={handleBack}
            className="flex items-center gap-1.5 text-text-secondary hover:text-text-primary transition-colors"
          >
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path d="M12.5 15L7.5 10L12.5 5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            <span className="text-sm">Feed</span>
          </button>
          <div className="flex items-center gap-2">
            {item.badge === 'LIVE' && (
              <span className="px-2 py-0.5 text-[10px] font-medium bg-badge-live/20 text-badge-live rounded-full">
                LIVE
              </span>
            )}
            {item.badge === 'ARCHIVE' && item.archiveDate && (
              <span className="px-2 py-0.5 text-[10px] font-medium bg-badge-archive/20 text-badge-archive rounded-full">
                ARCHIVE: {item.archiveDate}
              </span>
            )}
          </div>
        </div>
      </header>

      {/* Article content */}
      <article className="max-w-[640px] mx-auto px-4 pt-6 pb-32">
        {/* Category */}
        <div className="mb-3">
          <span className="text-[11px] font-medium text-accent uppercase tracking-wider">
            {getCategoryLabel(item.category)}
          </span>
        </div>

        {/* Title */}
        <h1 className="font-serif text-[22px] md:text-[28px] font-normal leading-[1.35] tracking-[-0.5px] text-text-primary mb-3">
          {item.title}
        </h1>

        {/* Meta */}
        <div className="flex items-center gap-2 text-[12px] text-text-muted mb-1.5">
          <span>{item.sourceName}</span>
          <span>·</span>
          <span>{formatDate(item.publishedAt)}</span>
          {item.author && (
            <>
              <span>·</span>
              <span>{item.author}</span>
            </>
          )}
        </div>

        {/* Tickers */}
        {item.tickers.length > 0 && (
          <div className="flex gap-1.5 mb-5">
            {item.tickers.map((t) => (
              <span
                key={t}
                className="px-2 py-0.5 text-[11px] font-medium bg-white/5 text-text-secondary rounded-md"
              >
                ${t}
              </span>
            ))}
          </div>
        )}

        {/* Divider */}
        <div className="h-px bg-white/8 my-5" />

        {/* Body */}
        {loading ? (
          <div className="space-y-4">
            <div className="h-4 bg-white/5 rounded animate-pulse w-full" />
            <div className="h-4 bg-white/5 rounded animate-pulse w-[90%]" />
            <div className="h-4 bg-white/5 rounded animate-pulse w-[95%]" />
            <div className="h-4 bg-white/5 rounded animate-pulse w-[80%]" />
            <div className="h-8" />
            <div className="h-4 bg-white/5 rounded animate-pulse w-full" />
            <div className="h-4 bg-white/5 rounded animate-pulse w-[85%]" />
            <div className="h-4 bg-white/5 rounded animate-pulse w-[92%]" />
          </div>
        ) : (
          <div className="article-body text-[15px] text-text-primary leading-[1.8]">
            {body?.split('\n').filter(Boolean).map((paragraph, i) => (
              <p key={i} className="mb-4 last:mb-0">
                {paragraph}
              </p>
            ))}
          </div>
        )}

        {/* Divider */}
        <div className="h-px bg-white/8 my-8" />

        {/* Source link */}
        {item.sourceUrl && (
          <a
            href={item.sourceUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 text-[13px] text-accent hover:text-accent/80 transition-colors mb-6"
          >
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path d="M6 8.5L7.5 10C8.33 10.83 9.67 10.83 10.5 10L12.5 8C13.33 7.17 13.33 5.83 12.5 5L12 4.5" strokeLinecap="round" />
              <path d="M10 7.5L8.5 6C7.67 5.17 6.33 5.17 5.5 6L3.5 8C2.67 8.83 2.67 10.17 3.5 11L4 11.5" strokeLinecap="round" />
            </svg>
            View original source
          </a>
        )}

        {/* Actions */}
        <button
          onClick={handleLearned}
          className="w-full py-3 rounded-xl bg-accent/10 text-accent text-[14px] font-medium hover:bg-accent/20 active:scale-[0.98] transition-all"
        >
          ✓ Learned — remove from feed
        </button>
      </article>
    </div>
  );
}

function getCategoryLabel(cat: string): string {
  const labels: Record<string, string> = {
    portfolio_moves: 'Portfolio',
    holdings_performance: 'Holdings',
    lilu_news: 'News',
    philosophy: 'Philosophy',
    company_deep_dive: 'Deep Dive',
    market_context: 'Market',
  };
  return labels[cat] || cat;
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
