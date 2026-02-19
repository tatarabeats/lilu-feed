export type FeedCategory =
  | 'portfolio_moves'
  | 'holdings_performance'
  | 'lilu_news'
  | 'philosophy'
  | 'company_deep_dive'
  | 'market_context';

export type BadgeType = 'LIVE' | 'ARCHIVE';

export interface FeedItem {
  id: string;
  category: FeedCategory;
  title: string;
  summary: string;
  imageUrl: string | null;
  sourceUrl: string | null;
  sourceName: string;
  sourceFaviconUrl: string | null;
  badge: BadgeType;
  archiveDate: string | null;
  publishedAt: string;
  tickers: string[];
  contentType?: 'speech' | 'book' | 'podcast' | 'quote' | 'book_recommendation';
  fullText?: string | null;
  author?: string;
}

export type CardSize = 'hero' | 'small';

export interface FeedCardLayout {
  item: FeedItem;
  size: CardSize;
  index: number;
}

export const FEED_CATEGORIES: { id: FeedCategory; label: string; labelJa: string }[] = [
  { id: 'portfolio_moves', label: 'Portfolio', labelJa: 'ポートフォリオ' },
  { id: 'holdings_performance', label: 'Holdings', labelJa: '保有銘柄' },
  { id: 'lilu_news', label: 'News', labelJa: 'ニュース' },
  { id: 'philosophy', label: 'Philosophy', labelJa: '投資哲学' },
  { id: 'company_deep_dive', label: 'Deep Dive', labelJa: '企業分析' },
  { id: 'market_context', label: 'Market', labelJa: '市場' },
];
