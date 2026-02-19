import { useFeedContext } from '../../store/feedContext';
import { PORTFOLIO, PORTFOLIO_TOTAL_VALUE, PORTFOLIO_FILING_DATE } from '../../data/portfolio';

export function MarketWidget() {
  const { marketData, marketLoading } = useFeedContext();

  // Calculate weighted daily change
  let dayChange: number | null = null;
  if (marketData) {
    let totalWeight = 0;
    let weightedChange = 0;
    for (const h of PORTFOLIO) {
      const quote = marketData.holdings[h.symbol];
      if (quote) {
        weightedChange += quote.changePercent * h.weight;
        totalWeight += h.weight;
      }
    }
    if (totalWeight > 0) {
      dayChange = weightedChange / totalWeight;
    }
  }

  const isUp = dayChange !== null && dayChange >= 0;

  return (
    <div className="bg-card-bg rounded-xl p-4">
      <h3 className="text-sm font-medium text-text-secondary mb-3">
        Himalaya Capital Portfolio
      </h3>

      <div className="flex items-baseline gap-2 mb-1">
        <span className="text-2xl font-serif text-text-primary">
          ${(PORTFOLIO_TOTAL_VALUE / 1_000_000_000).toFixed(2)}B
        </span>
        <span className="text-xs text-text-muted">{PORTFOLIO_FILING_DATE}</span>
      </div>

      {marketLoading ? (
        <div className="text-xs text-text-muted">Loading market data...</div>
      ) : dayChange !== null ? (
        <div className={`text-sm font-medium ${isUp ? 'text-gain' : 'text-loss'}`}>
          {isUp ? '+' : ''}{dayChange.toFixed(2)}% today
        </div>
      ) : (
        <div className="text-xs text-text-muted">Market data unavailable</div>
      )}

      <div className="mt-4 space-y-2">
        {PORTFOLIO.slice(0, 5).map((h) => {
          const quote = marketData?.holdings[h.symbol];
          const changeColor = quote
            ? quote.changePercent >= 0 ? 'text-gain' : 'text-loss'
            : 'text-text-muted';

          return (
            <div key={h.symbol} className="flex items-center justify-between text-xs">
              <div className="flex items-center gap-2">
                <span className="font-medium text-text-primary w-12">{h.symbol}</span>
                <span className="text-text-muted">{h.weight}%</span>
              </div>
              {quote ? (
                <span className={changeColor}>
                  {quote.changePercent >= 0 ? '+' : ''}{quote.changePercent.toFixed(2)}%
                </span>
              ) : (
                <span className="text-text-muted">--</span>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
