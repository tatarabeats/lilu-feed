export interface PortfolioHolding {
  symbol: string;
  name: string;
  weight: number;
  shares: number;
  avgCostBasis: number;
  firstFilingYear: string;
}

export interface StockQuote {
  price: number;
  changePercent: number;
}

export interface MarketSnapshot {
  holdings: Record<string, StockQuote | null>;
  fetchedAt: string;
}
