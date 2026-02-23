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
    const { titles } = await req.json() as { titles: string[] };

    if (!titles || titles.length === 0) {
      return new Response(JSON.stringify({ translations: [] }), {
        status: 200,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    // Batch translate up to 30 titles in one API call
    const batch = titles.slice(0, 30);
    const numbered = batch.map((t, i) => `${i + 1}. ${t}`).join('\n');

    const prompt = `以下のニュース記事タイトルを日本語に翻訳してください。

ルール:
- 各タイトルを簡潔な日本語に訳す
- 固有名詞（人名・企業名・地名）はそのまま残すか、一般的なカタカナ表記にする
- Li Lu → 李録（リ・ルー）、Himalaya Capital → ヒマラヤ・キャピタル
- 番号付きで、翻訳のみを返す（説明不要）
- 元が既に日本語の場合はそのまま返す

${numbered}`;

    const claudeRes = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': apiKey,
        'anthropic-version': '2023-06-01',
      },
      body: JSON.stringify({
        model: 'claude-haiku-4-5-20251001',
        max_tokens: 2048,
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

    const responseText = claudeData.content
      .filter((c) => c.type === 'text')
      .map((c) => c.text)
      .join('\n');

    // Parse numbered lines in order: "1. 翻訳テキスト"
    const lines = responseText.split('\n').filter((l) => l.trim());
    const parsed: string[] = [];
    for (const line of lines) {
      const m = /^\d+[.)\s]+(.+)/.exec(line.trim());
      if (m) parsed.push(m[1].trim());
    }

    const translations: string[] = [];
    for (let i = 0; i < batch.length; i++) {
      translations.push(parsed[i] || batch[i]);
    }

    return new Response(
      JSON.stringify({ translations }),
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
      JSON.stringify({ translations: [], error: String(err) }),
      {
        status: 200,
        headers: { 'Content-Type': 'application/json' },
      },
    );
  }
}

export const config = { runtime: 'edge' };
