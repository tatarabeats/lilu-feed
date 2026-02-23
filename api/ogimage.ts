export default async function handler(req: Request): Promise<Response> {
  if (req.method !== 'GET') {
    return new Response(JSON.stringify({ error: 'Method not allowed' }), {
      status: 405,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  const { searchParams } = new URL(req.url);
  const targetUrl = searchParams.get('url');

  if (!targetUrl || (!targetUrl.startsWith('http://') && !targetUrl.startsWith('https://'))) {
    return jsonResponse(null);
  }

  try {
    const res = await fetch(targetUrl, {
      redirect: 'follow',
      headers: {
        'User-Agent': 'Mozilla/5.0 (compatible; LiLuFeed/1.0)',
        'Accept': 'text/html',
      },
      signal: AbortSignal.timeout(5000),
    });

    if (!res.ok) return jsonResponse(null);

    const html = await res.text();
    const imageUrl = extractOgImage(html);

    return jsonResponse(imageUrl);
  } catch {
    return jsonResponse(null);
  }
}

function extractOgImage(html: string): string | null {
  const patterns = [
    /<meta[^>]*property=["']og:image["'][^>]*content=["']([^"']+)["']/i,
    /<meta[^>]*content=["']([^"']+)["'][^>]*property=["']og:image["']/i,
  ];
  for (const pattern of patterns) {
    const match = pattern.exec(html);
    if (match?.[1]) return match[1];
  }
  return null;
}

function jsonResponse(imageUrl: string | null): Response {
  return new Response(JSON.stringify({ imageUrl }), {
    status: 200,
    headers: {
      'Content-Type': 'application/json',
      'Cache-Control': 'public, s-maxage=86400',
    },
  });
}

export const config = { runtime: 'edge' };
