import { useState, useEffect, useCallback } from 'react';
import type { MarketSnapshot } from '../types/market';
import { fetchMarketData } from '../services/marketApi';

export function useMarketData() {
  const [marketData, setMarketData] = useState<MarketSnapshot | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const refresh = useCallback(async () => {
    setIsLoading(true);
    try {
      const data = await fetchMarketData();
      setMarketData(data);
    } catch {
      // silently fail
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    refresh();
    const interval = setInterval(refresh, 5 * 60 * 1000);
    return () => clearInterval(interval);
  }, [refresh]);

  return { marketData, isLoading, refresh };
}
