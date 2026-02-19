import type { FeedItem } from '../types/feed';

interface EdgarFiling {
  form: string;
  filingDate: string;
  primaryDocument: string;
  accessionNumber: string;
}

let cached: { data: FeedItem[]; timestamp: number } | null = null;
const CACHE_TTL = 24 * 60 * 60 * 1000;

export async function fetchEdgarFilings(): Promise<FeedItem[]> {
  if (cached && Date.now() - cached.timestamp < CACHE_TTL) {
    return cached.data;
  }

  try {
    const res = await fetch('/api/edgar');
    if (!res.ok) throw new Error('EDGAR API error');
    const json = await res.json() as { filings: EdgarFiling[] };

    const items: FeedItem[] = json.filings.map((filing, i) => {
      const publishedAt = new Date(filing.filingDate).toISOString();
      const pub = new Date(publishedAt);
      const ageMs = Date.now() - pub.getTime();
      const isLive = ageMs < 7 * 24 * 60 * 60 * 1000;

      return {
        id: `edgar-${i}-${filing.accessionNumber}`,
        category: 'portfolio_moves' as const,
        title: `Himalaya Capital ${filing.form} Filing — ${filing.filingDate}`,
        summary: `New ${filing.form} filing submitted to SEC on ${filing.filingDate}. Review for portfolio position changes.`,
        imageUrl: null,
        sourceUrl: `https://www.sec.gov/Archives/edgar/data/1709323/${filing.accessionNumber.replace(/-/g, '')}/${filing.primaryDocument}`,
        sourceName: 'SEC EDGAR',
        sourceFaviconUrl: null,
        badge: isLive ? 'LIVE' as const : 'ARCHIVE' as const,
        archiveDate: isLive ? null : `${pub.getFullYear()}-${String(pub.getMonth() + 1).padStart(2, '0')}`,
        publishedAt,
        tickers: [],
      };
    });

    cached = { data: items, timestamp: Date.now() };
    return items;
  } catch {
    return [];
  }
}
