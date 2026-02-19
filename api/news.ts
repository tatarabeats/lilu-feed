export default async function handler(req: Request): Promise<Response> {
  if (req.method !== 'GET') {
    return new Response(JSON.stringify({ error: 'Method not allowed' }), {
      status: 405,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  try {
    const query = encodeURIComponent('"Li Lu" OR "Himalaya Capital" OR "李録"');
    const rssUrl = `https://news.google.com/rss/search?q=${query}&hl=en-US&gl=US&ceid=US:en`;

    const res = await fetch(rssUrl);
    if (!res.ok) throw new Error(`RSS fetch failed: ${res.status}`);

    const xml = await res.text();
    const items = parseRss(xml);

    return new Response(
      JSON.stringify({ items, fetchedAt: new Date().toISOString() }),
      {
        status: 200,
        headers: {
          'Content-Type': 'application/json',
          'Cache-Control': 'public, s-maxage=1800',
        },
      },
    );
  } catch (err) {
    return new Response(
      JSON.stringify({ items: [], error: String(err) }),
      {
        status: 200,
        headers: { 'Content-Type': 'application/json' },
      },
    );
  }
}

function parseRss(xml: string): { title: string; link: string; pubDate: string; source: string }[] {
  const items: { title: string; link: string; pubDate: string; source: string }[] = [];
  const itemRegex = /<item>([\s\S]*?)<\/item>/g;
  let match;

  while ((match = itemRegex.exec(xml)) !== null) {
    const block = match[1];
    const title = extractTag(block, 'title');
    const link = extractTag(block, 'link');
    const pubDate = extractTag(block, 'pubDate');
    const source = extractTag(block, 'source') || 'Google News';

    if (title && link) {
      items.push({ title, link, pubDate: pubDate || '', source });
    }
  }

  return items;
}

function extractTag(xml: string, tag: string): string {
  const regex = new RegExp(`<${tag}[^>]*>(?:<!\\[CDATA\\[)?([\\s\\S]*?)(?:\\]\\]>)?</${tag}>`);
  const m = regex.exec(xml);
  return m ? m[1].trim() : '';
}

export const config = { runtime: 'edge' };
