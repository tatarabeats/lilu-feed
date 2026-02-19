import type { StockQuote } from '../../types/market';

interface HoldingPillProps {
  symbol: string;
  quote: StockQuote | null;
  weight: number;
}

export function HoldingPill({ symbol, quote, weight }: HoldingPillProps) {
  const isUp = quote && quote.changePercent >= 0;
  const changeColor = quote
    ? isUp ? 'text-gain' : 'text-loss'
    : 'text-text-muted';

  return (
    <div className="shrink-0 flex items-center gap-2 px-3 py-1.5 rounded-lg bg-card-bg">
      <span className="text-xs font-medium text-text-primary">{symbol}</span>
      <span className="text-[10px] text-text-muted">{weight.toFixed(1)}%</span>
      {quote ? (
        <>
          <span className="text-xs text-text-secondary">
            ${quote.price.toFixed(2)}
          </span>
          <span className={`text-xs font-medium ${changeColor}`}>
            {isUp ? '+' : ''}{quote.changePercent.toFixed(2)}%
          </span>
        </>
      ) : (
        <span className="text-xs text-text-muted">--</span>
      )}
    </div>
  );
}
