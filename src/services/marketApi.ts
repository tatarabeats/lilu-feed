import type { MarketSnapshot } from '../types/market';

let cached: { data: MarketSnapshot; timestamp: number } | null = null;
const CACHE_TTL = 5 * 60 * 1000;

export async function fetchMarketData(): Promise<MarketSnapshot> {
  if (cached && Date.now() - cached.timestamp < CACHE_TTL) {
    return cached.data;
  }

  try {
    const res = await fetch('/api/market');
    if (!res.ok) throw new Error('Market API error');
    const data = await res.json() as MarketSnapshot;
    cached = { data, timestamp: Date.now() };
    return data;
  } catch {
    return {
      holdings: {},
      fetchedAt: new Date().toISOString(),
    };
  }
}
