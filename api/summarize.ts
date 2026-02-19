export default async function handler(req: Request): Promise<Response> {
  if (req.method !== 'POST') {
    return new Response(JSON.stringify({ error: 'Method not allowed' }), {
      status: 405,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  const apiKey = process.env.ANTHROPIC_API_KEY;
  if (!apiKey) {
    return new Response(JSON.stringify({ error: 'API key not configured' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  try {
    const { url, title, category } = await req.json() as {
      url: string;
      title: string;
      category: string;
    };

    // 1. Fetch article HTML
    let articleText = '';
    if (url) {
      try {
        const res = await fetch(url, {
          headers: {
            'User-Agent': 'Mozilla/5.0 (compatible; LiLuFeed/1.0)',
            'Accept': 'text/html',
          },
          signal: AbortSignal.timeout(10000),
        });
        if (res.ok) {
          const html = await res.text();
          articleText = extractArticleText(html);
        }
      } catch {
        // Scraping failed, will use title only
      }
    }

    // 2. Build prompt
    const categoryContext: Record<string, string> = {
      lilu_news: 'Li Lu（李録）/ Himalaya Capitalに関するニュース',
      portfolio_moves: 'Himalaya Capitalのポートフォリオ変更（13Fファイリング）',
      company_deep_dive: 'Li Luが保有する企業の分析',
      philosophy: 'Li Luの投資哲学',
      market_context: '市場全体のコンテキスト',
      holdings_performance: '保有銘柄のパフォーマンス',
    };

    const context = categoryContext[category] || 'Li Lu関連の記事';
    const sourceInfo = articleText
      ? `以下は${context}に関する記事です。\n\n記事タイトル: ${title}\n\n記事本文:\n${articleText.slice(0, 4000)}`
      : `以下は${context}に関する記事のタイトルです（本文の取得に失敗しました）。\n\n記事タイトル: ${title}`;

    const prompt = `${sourceInfo}

この記事の内容を日本語で300〜500文字に要約してください。

要件:
- Li Lu / Himalaya Capitalに関連するポイントを重視
- 投資家として知っておくべき重要な情報を抽出
- 段落分けして読みやすくする（2〜3段落）
- 事実ベースで客観的に
- 記事の核心的なメッセージを最初に述べる
- Markdownの見出し記法（# や ##）は使わず、プレーンテキストの段落で書く
- **太字**は重要な固有名詞や数字に使ってもよい`;

    // 3. Call Claude API
    const claudeRes = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': apiKey,
        'anthropic-version': '2023-06-01',
      },
      body: JSON.stringify({
        model: 'claude-haiku-4-5-20251001',
        max_tokens: 1024,
        messages: [{ role: 'user', content: prompt }],
      }),
    });

    if (!claudeRes.ok) {
      const err = await claudeRes.text();
      throw new Error(`Claude API error: ${claudeRes.status} ${err}`);
    }

    const claudeData = await claudeRes.json() as {
      content: { type: string; text: string }[];
    };

    const summary = claudeData.content
      .filter((c) => c.type === 'text')
      .map((c) => c.text)
      .join('\n');

    return new Response(
      JSON.stringify({ summary, fetchedAt: new Date().toISOString() }),
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
      JSON.stringify({ summary: null, error: String(err) }),
      {
        status: 200,
        headers: { 'Content-Type': 'application/json' },
      },
    );
  }
}

function extractArticleText(html: string): string {
  // Remove script, style, nav, header, footer tags and their content
  let text = html
    .replace(/<script[\s\S]*?<\/script>/gi, '')
    .replace(/<style[\s\S]*?<\/style>/gi, '')
    .replace(/<nav[\s\S]*?<\/nav>/gi, '')
    .replace(/<header[\s\S]*?<\/header>/gi, '')
    .replace(/<footer[\s\S]*?<\/footer>/gi, '')
    .replace(/<aside[\s\S]*?<\/aside>/gi, '')
    .replace(/<form[\s\S]*?<\/form>/gi, '');

  // Remove all HTML tags
  text = text.replace(/<[^>]+>/g, ' ');

  // Decode HTML entities
  text = text
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&nbsp;/g, ' ');

  // Normalize whitespace
  text = text.replace(/\s+/g, ' ').trim();

  return text;
}

export const config = { runtime: 'edge' };
