import type { FeedCategory } from '../types/feed';

export const CATEGORY_CONFIG: Record<FeedCategory, {
  label: string;
  labelJa: string;
  color: string;
  defaultWeight: number;
}> = {
  portfolio_moves: {
    label: 'Portfolio Moves',
    labelJa: 'ポートフォリオ',
    color: '#60a7ae',
    defaultWeight: 1.0,
  },
  holdings_performance: {
    label: 'Holdings',
    labelJa: '保有銘柄',
    color: '#22c55e',
    defaultWeight: 1.0,
  },
  lilu_news: {
    label: 'News',
    labelJa: 'ニュース',
    color: '#ef4444',
    defaultWeight: 1.0,
  },
  philosophy: {
    label: 'Philosophy',
    labelJa: '投資哲学',
    color: '#a78bfa',
    defaultWeight: 1.0,
  },
  company_deep_dive: {
    label: 'Deep Dive',
    labelJa: '企業分析',
    color: '#f59e0b',
    defaultWeight: 1.0,
  },
  market_context: {
    label: 'Market',
    labelJa: '市場',
    color: '#6b7280',
    defaultWeight: 1.0,
  },
};
