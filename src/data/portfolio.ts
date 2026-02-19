import type { PortfolioHolding } from '../types/market';

export const PORTFOLIO: PortfolioHolding[] = [
  { symbol: 'GOOG',  name: 'Alphabet Inc.',          weight: 43.86, shares: 8_400_000 },
  { symbol: 'BAC',   name: 'Bank of America',        weight: 16.08, shares: 12_500_000 },
  { symbol: 'PDD',   name: 'PDD Holdings',           weight: 14.64, shares: 4_200_000 },
  { symbol: 'BRK-B', name: 'Berkshire Hathaway B',   weight: 12.64, shares: 950_000 },
  { symbol: 'EWBC',  name: 'East West Bancorp',      weight: 8.74,  shares: 3_100_000 },
  { symbol: 'OXY',   name: 'Occidental Petroleum',   weight: 1.69,  shares: 1_000_000 },
  { symbol: 'CROX',  name: 'Crocs Inc.',             weight: 1.51,  shares: 450_000 },
  { symbol: 'AAPL',  name: 'Apple Inc.',             weight: 0.84,  shares: 130_000 },
];

export const PORTFOLIO_TOTAL_VALUE = 3_570_000_000;
export const PORTFOLIO_FILING_DATE = '2025-Q4';
export const SEC_CIK = '0001709323';
