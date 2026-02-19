interface FinnhubQuote {
  c: number;
  dp: number;
}

const SYMBOLS = ['GOOG', 'BAC', 'PDD', 'BRK-B', 'EWBC', 'OXY', 'CROX', 'AAPL'];

async function fetchQuote(symbol: string, apiKey: string): Promise<FinnhubQuote | null> {
  try {
    const res = await fetch(
      `https://finnhub.io/api/v1/quote?symbol=${symbol}&token=${apiKey}`,
    );
    if (!res.ok) return null;
    return (await res.json()) as FinnhubQuote;
  } catch {
    return null;
  }
}

export default async function handler(req: Request): Promise<Response> {
  if (req.method !== 'GET') {
    return new Response(JSON.stringify({ error: 'Method not allowed' }), {
      status: 405,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  const apiKey = process.env.FINNHUB_API_KEY;
  if (!apiKey) {
    return new Response(JSON.stringify({ error: 'Finnhub API key not configured' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  const quotes = await Promise.all(SYMBOLS.map((s) => fetchQuote(s, apiKey)));

  const holdings: Record<string, { price: number; changePercent: number } | null> = {};
  SYMBOLS.forEach((s, i) => {
    const q = quotes[i];
    holdings[s] = q ? { price: q.c, changePercent: q.dp } : null;
  });

  return new Response(
    JSON.stringify({ holdings, fetchedAt: new Date().toISOString() }),
    {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
        'Cache-Control': 'public, s-maxage=300',
      },
    },
  );
}

export const config = { runtime: 'edge' };
