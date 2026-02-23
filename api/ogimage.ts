export default async function handler(req: Request): Promise<Response> {
  if (req.method !== "GET") {
    return new Response(JSON.stringify({ error: "Method not allowed" }), {
      status: 405,
      headers: { "Content-Type": "application/json" },
    });
  }

  const { searchParams } = new URL(req.url);
  const targetUrl = searchParams.get("url");

  if (
    !targetUrl ||
    (!targetUrl.startsWith("http://") && !targetUrl.startsWith("https://"))
  ) {
    return jsonResponse(null, false);
  }

  try {
    const res = await fetch(targetUrl, {
      redirect: "follow",
      headers: {
        "User-Agent":
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/121.0.0.0 Safari/537.36",
        Accept:
          "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8",
        "Accept-Language": "en-US,en;q=0.5",
      },
      signal: AbortSignal.timeout(8000),
    });

    if (!res.ok) return jsonResponse(null, false);

    const html = await res.text();
    const imageUrl = extractOgImage(html);

    return jsonResponse(imageUrl, imageUrl !== null);
  } catch {
    return jsonResponse(null, false);
  }
}

function extractOgImage(html: string): string | null {
  const patterns = [
    // og:image
    /<meta[^>]*property=["']og:image["'][^>]*content=["']([^"']+)["']/i,
    /<meta[^>]*content=["']([^"']+)["'][^>]*property=["']og:image["']/i,
    // og:image:url (variant)
    /<meta[^>]*property=["']og:image:url["'][^>]*content=["']([^"']+)["']/i,
    /<meta[^>]*content=["']([^"']+)["'][^>]*property=["']og:image:url["']/i,
    // twitter:image (higher coverage on news sites)
    /<meta[^>]*name=["']twitter:image["'][^>]*content=["']([^"']+)["']/i,
    /<meta[^>]*content=["']([^"']+)["'][^>]*name=["']twitter:image["']/i,
    /<meta[^>]*property=["']twitter:image["'][^>]*content=["']([^"']+)["']/i,
    /<meta[^>]*content=["']([^"']+)["'][^>]*property=["']twitter:image["']/i,
  ];
  for (const pattern of patterns) {
    const match = pattern.exec(html);
    if (match?.[1] && match[1].startsWith("http")) return match[1];
  }
  return null;
}

function jsonResponse(imageUrl: string | null, found: boolean): Response {
  // 画像あり: 24時間キャッシュ / 画像なし: 2時間（再取得機会を増やす）
  const maxAge = found ? 86400 : 7200;
  return new Response(JSON.stringify({ imageUrl }), {
    status: 200,
    headers: {
      "Content-Type": "application/json",
      "Cache-Control": `public, s-maxage=${maxAge}`,
    },
  });
}

export const config = { runtime: "edge" };
