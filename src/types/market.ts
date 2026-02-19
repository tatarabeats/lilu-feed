export interface PortfolioHolding {
  symbol: string;
  name: string;
  weight: number;
  shares: number;
}

export interface StockQuote {
  price: number;
  changePercent: number;
}

export interface MarketSnapshot {
  holdings: Record<string, StockQuote | null>;
  fetchedAt: string;
}
