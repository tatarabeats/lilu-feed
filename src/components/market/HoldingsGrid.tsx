import { useFeedContext } from "../../store/feedContext";
import { PORTFOLIO, PORTFOLIO_FILING_DATE } from "../../data/portfolio";

export function HoldingsGrid() {
  const { marketData, marketLoading } = useFeedContext();

  return (
    <div>
      <div className="flex items-baseline gap-2 mb-3">
        <h2 className="text-[13px] font-semibold text-text-secondary uppercase tracking-wider">
          Himalaya Capital Holdings
        </h2>
        <span className="text-[11px] text-text-muted">
          {PORTFOLIO_FILING_DATE} 13F
        </span>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
        {PORTFOLIO.map((holding) => {
          const quote = marketData?.holdings[holding.symbol] ?? null;
          const currentPrice = quote?.price ?? null;
          const returnPct =
            currentPrice !== null
              ? ((currentPrice - holding.avgCostBasis) / holding.avgCostBasis) *
                100
              : null;
          const isGain = returnPct !== null && returnPct >= 0;

          return (
            <div
              key={holding.symbol}
              className="bg-card-bg border border-border rounded-xl p-3 flex flex-col gap-1.5"
            >
              {/* ヘッダー行: ティッカー + 保有比率 */}
              <div className="flex items-center justify-between">
                <span className="text-[15px] font-semibold text-text-primary">
                  {holding.symbol}
                </span>
                <span className="text-[11px] text-text-muted bg-card-bg-hover px-1.5 py-0.5 rounded-full">
                  {holding.weight.toFixed(1)}%
                </span>
              </div>

              {/* 銘柄名 */}
              <p className="text-[11px] text-text-muted leading-tight truncate">
                {holding.name}
              </p>

              {/* 取得単価 → 現在価格 */}
              {marketLoading && !quote ? (
                <div className="h-10 bg-card-bg-hover rounded animate-pulse mt-0.5" />
              ) : (
                <div className="flex flex-col gap-0.5 mt-0.5">
                  <div className="flex items-center gap-1.5">
                    <span className="text-[10px] text-text-muted">
                      {holding.firstFilingYear}〜
                    </span>
                    <span className="text-[11px] text-text-muted">
                      avg ${holding.avgCostBasis.toFixed(0)}
                    </span>
                  </div>
                  <div className="flex items-baseline gap-2">
                    <span className="text-[16px] font-medium text-text-primary leading-none">
                      {currentPrice !== null
                        ? `$${currentPrice.toFixed(2)}`
                        : "--"}
                    </span>
                    {returnPct !== null && (
                      <span
                        className={`text-[12px] font-semibold ${
                          isGain ? "text-gain" : "text-loss"
                        }`}
                      >
                        {isGain ? "+" : ""}
                        {returnPct.toFixed(0)}%
                      </span>
                    )}
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
