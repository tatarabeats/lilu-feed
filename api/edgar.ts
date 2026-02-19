const CIK = '0001709323';

interface SecSubmissions {
  filings?: {
    recent?: {
      form?: string[];
      filingDate?: string[];
      primaryDocument?: string[];
      accessionNumber?: string[];
    };
  };
}

export default async function handler(req: Request): Promise<Response> {
  if (req.method !== 'GET') {
    return new Response(JSON.stringify({ error: 'Method not allowed' }), {
      status: 405,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  try {
    const res = await fetch(`https://data.sec.gov/submissions/CIK${CIK}.json`, {
      headers: {
        'User-Agent': 'LiLuFeed/1.0 shunpei.kihara@gmail.com',
        Accept: 'application/json',
      },
    });

    if (!res.ok) throw new Error(`SEC API error: ${res.status}`);

    const data = (await res.json()) as SecSubmissions;
    const recent = data.filings?.recent;

    if (!recent?.form) {
      return new Response(
        JSON.stringify({ filings: [], fetchedAt: new Date().toISOString() }),
        { status: 200, headers: { 'Content-Type': 'application/json' } },
      );
    }

    const filings: {
      form: string;
      filingDate: string;
      primaryDocument: string;
      accessionNumber: string;
    }[] = [];

    for (let i = 0; i < recent.form.length && filings.length < 20; i++) {
      const form = recent.form[i];
      // Only include 13F and related filings
      if (form.startsWith('13F') || form === 'SC 13G' || form === 'SC 13G/A') {
        filings.push({
          form,
          filingDate: recent.filingDate?.[i] || '',
          primaryDocument: recent.primaryDocument?.[i] || '',
          accessionNumber: recent.accessionNumber?.[i] || '',
        });
      }
    }

    return new Response(
      JSON.stringify({ filings, fetchedAt: new Date().toISOString() }),
      {
        status: 200,
        headers: {
          'Content-Type': 'application/json',
          'Cache-Control': 'public, s-maxage=86400',
        },
      },
    );
  } catch (err) {
    return new Response(
      JSON.stringify({ filings: [], error: String(err) }),
      {
        status: 200,
        headers: { 'Content-Type': 'application/json' },
      },
    );
  }
}

export const config = { runtime: 'edge' };
