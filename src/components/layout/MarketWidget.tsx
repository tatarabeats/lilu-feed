import { useFeedContext } from "../../store/feedContext";
import {
  PORTFOLIO,
  PORTFOLIO_TOTAL_VALUE,
  PORTFOLIO_FILING_DATE,
} from "../../data/portfolio";

export function MarketWidget() {
  const { marketData, marketLoading } = useFeedContext();

  // Calculate weighted total return from cost basis
  let portfolioReturn: number | null = null;
  if (marketData) {
    let totalWeight = 0;
    let weightedReturn = 0;
    for (const h of PORTFOLIO) {
      const quote = marketData.holdings[h.symbol];
      if (quote) {
        const ret = ((quote.price - h.avgCostBasis) / h.avgCostBasis) * 100;
        weightedReturn += ret * h.weight;
        totalWeight += h.weight;
      }
    }
    if (totalWeight > 0) {
      portfolioReturn = weightedReturn / totalWeight;
    }
  }

  const isUp = portfolioReturn !== null && portfolioReturn >= 0;

  return (
    <div className="bg-card-bg rounded-xl p-4 border border-border">
      <h3 className="text-sm font-medium text-accent mb-3">
        Himalaya Capital Portfolio
      </h3>

      <div className="flex items-baseline gap-2 mb-1">
        <span className="text-2xl text-text-primary">
          ${(PORTFOLIO_TOTAL_VALUE / 1_000_000_000).toFixed(2)}B
        </span>
        <span className="text-xs text-text-muted">{PORTFOLIO_FILING_DATE}</span>
      </div>

      {marketLoading ? (
        <div className="text-xs text-text-muted">Loading market data...</div>
      ) : portfolioReturn !== null ? (
        <div
          className={`text-sm font-medium ${isUp ? "text-gain" : "text-loss"}`}
        >
          {isUp ? "+" : ""}
          {portfolioReturn.toFixed(0)}% from est. cost basis
        </div>
      ) : (
        <div className="text-xs text-text-muted">Market data unavailable</div>
      )}

      <div className="mt-4 space-y-2">
        {PORTFOLIO.slice(0, 5).map((h) => {
          const quote = marketData?.holdings[h.symbol];
          const returnPct = quote
            ? ((quote.price - h.avgCostBasis) / h.avgCostBasis) * 100
            : null;
          const isGain = returnPct !== null && returnPct >= 0;

          return (
            <div
              key={h.symbol}
              className="flex items-center justify-between text-xs"
            >
              <div className="flex items-center gap-2">
                <span className="font-medium text-text-primary w-12">
                  {h.symbol}
                </span>
                <span className="text-text-muted">{h.weight}%</span>
              </div>
              {returnPct !== null ? (
                <span className={isGain ? "text-gain" : "text-loss"}>
                  {isGain ? "+" : ""}
                  {returnPct.toFixed(0)}%
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
