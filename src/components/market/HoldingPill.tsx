import type { StockQuote } from "../../types/market";

interface HoldingPillProps {
  symbol: string;
  quote: StockQuote | null;
  weight: number;
}

export function HoldingPill({ symbol, quote, weight }: HoldingPillProps) {
  return (
    <div className="shrink-0 flex items-center gap-2 px-3 py-1.5 rounded-lg bg-card-bg border border-border">
      <span className="text-xs font-medium text-text-primary">{symbol}</span>
      <span className="text-[10px] text-text-muted">{weight.toFixed(1)}%</span>
      {quote ? (
        <span className="text-xs text-text-secondary">
          ${quote.price.toFixed(2)}
        </span>
      ) : (
        <span className="text-xs text-text-muted">--</span>
      )}
    </div>
  );
}
