import { useFeedContext } from '../../store/feedContext';
import { PORTFOLIO } from '../../data/portfolio';
import { HoldingPill } from './HoldingPill';

export function PortfolioBanner() {
  const { marketData } = useFeedContext();

  return (
    <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-none">
      {PORTFOLIO.map((holding) => (
        <HoldingPill
          key={holding.symbol}
          symbol={holding.symbol}
          quote={marketData?.holdings[holding.symbol] ?? null}
          weight={holding.weight}
        />
      ))}
    </div>
  );
}
