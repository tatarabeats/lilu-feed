# Li Lu Feed — Li Lu / Himalaya Capital 特化ニュースフィード

Perplexity Discover風UIで李録（Li Lu）とHimalaya Capitalに特化した自分専用フィードアプリ。

## デプロイ
- **ローカル**: `npm run dev`
- **ビルド**: `npm run build`
- **デプロイ先**: Vercel（未設定）
- **GitHub**: 未プッシュ

## 技術スタック
- React 19 + TypeScript + Vite 7 + Tailwind CSS v4
- Vercel Edge Functions（API: market, news, edgar）
- PWA対応
- CSS animations（Framer Motionなし）

## API環境変数
- `FINNHUB_API_KEY` — Finnhub株価API

## データソース
- **Finnhub**: ポートフォリオ8銘柄のリアルタイム株価（5分キャッシュ）
- **Google News RSS**: "Li Lu" OR "Himalaya Capital"（30分キャッシュ）
- **SEC EDGAR**: CIK 0001709323 の13Fファイリング（24時間キャッシュ）
- **archive.ts**: スピーチ、書籍、ポッドキャスト、名言、企業分析（静的30件）

## 主要ファイル
- `src/types/feed.ts` — FeedItem, FeedCategory, CardSize型
- `src/data/archive.ts` — アーカイブコンテンツ30件
- `src/data/portfolio.ts` — Li Luの現在ポートフォリオ（Q4 2025）
- `src/services/feedBuilder.ts` — フィード構築（マージ+フィルタ+ソート+ページネーション）
- `src/services/userPrefsStore.ts` — localStorage CRUD（learned/dismissed/カテゴリ重み）
- `src/store/feedContext.tsx` — React Context（フィード状態管理）
- `src/components/feed/FeedGrid.tsx` — 3列グリッド（Hero/Small交互パターン）
- `src/components/feed/HeroCard.tsx` — 全幅カード
- `src/components/feed/SmallCard.tsx` — 1/3幅カード
- `api/market.ts`, `api/news.ts`, `api/edgar.ts` — Vercel Edge Functions

## UIパターン
- Perplexity Discover準拠のダークテーマ（#171615背景）
- Hero → Small×3 → Hero → Small×3 のカードパターン
- LIVE（赤）/ ARCHIVE（グレー）バッジ
- 「Learned」ボタン: 二度と表示しない
- 「Not interested」ボタン: カテゴリの重みを0.2減少
- ホバー: タイトルがティール色に変化、画像105%ズーム

## ポートフォリオ（Q4 2025, $3.57B, 9銘柄）
GOOG 43.86% | BAC 16.08% | PDD 14.64% | BRK-B 12.64% | EWBC 8.74% | OXY 1.69% | CROX 1.51% | AAPL 0.84%
