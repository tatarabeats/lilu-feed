import { useEffect, useState } from "react";
import { useFeedContext } from "../../store/feedContext";
import { fetchSummary, NO_CONTENT_MARKER } from "../../services/summaryApi";
import {
  saveNote,
  getNotesForArticle,
  type LearningNote,
} from "../../services/notesStore";

export function ArticlePage() {
  const { selectedArticle, clearArticle, onLearned, refreshNotesCount } =
    useFeedContext();
  const [body, setBody] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [noteText, setNoteText] = useState("");
  const [notes, setNotes] = useState<LearningNote[]>([]);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    if (!selectedArticle) return;

    setLoading(true);
    setBody(null);
    setNoteText("");
    setSaved(false);
    setNotes(getNotesForArticle(selectedArticle.id));

    fetchSummary(selectedArticle).then((text) => {
      setBody(text);
      setLoading(false);
    });
  }, [selectedArticle]);

  if (!selectedArticle) return null;

  const item = selectedArticle;

  const handleBack = () => {
    if (history.state?.articleId) {
      history.back();
    } else {
      clearArticle();
    }
  };

  const handleLearned = () => {
    onLearned(item.id);
    handleBack();
  };

  const handleSaveNote = () => {
    if (!noteText.trim()) return;
    const newNote = saveNote(
      item.id,
      item.title,
      item.category,
      noteText.trim(),
    );
    setNotes([newNote, ...notes]);
    setNoteText("");
    setSaved(true);
    refreshNotesCount();
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <div className="article-page fixed inset-0 z-50 bg-page-bg overflow-y-auto">
      {/* Fixed header */}
      <header className="sticky top-0 z-10 bg-page-bg/90 backdrop-blur-md border-b border-border/30">
        <div className="max-w-[640px] mx-auto px-4 h-12 flex items-center justify-between">
          <button
            onClick={handleBack}
            className="flex items-center gap-1.5 text-text-secondary hover:text-text-primary transition-colors"
          >
            <svg
              width="20"
              height="20"
              viewBox="0 0 20 20"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
            >
              <path
                d="M12.5 15L7.5 10L12.5 5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            <span className="text-[15px]">Feed</span>
          </button>
          <div className="flex items-center gap-2">
            {item.badge === "LIVE" && (
              <span className="px-2.5 py-0.5 text-[12px] font-medium bg-badge-live/25 text-badge-live rounded-full">
                LIVE
              </span>
            )}
            {item.badge === "ARCHIVE" && item.archiveDate && (
              <span className="px-2.5 py-0.5 text-[12px] font-medium bg-badge-archive/25 text-text-muted rounded-full">
                ARCHIVE: {item.archiveDate}
              </span>
            )}
          </div>
        </div>
      </header>

      {/* Article content */}
      <article className="max-w-[640px] mx-auto px-4 pt-6 pb-32">
        {/* Category */}
        <div className="mb-3">
          <span className="text-[13px] font-medium text-accent uppercase tracking-wider">
            {getCategoryLabel(item.category)}
          </span>
        </div>

        {/* Title */}
        <h1 className="text-[26px] md:text-[32px] font-normal leading-[1.35] tracking-[-0.5px] text-text-primary mb-3">
          {item.title}
        </h1>

        {/* Meta */}
        <div className="flex items-center gap-2 text-[14px] text-text-muted mb-1.5">
          <span>{item.sourceName}</span>
          <span>·</span>
          <span>{formatDate(item.publishedAt)}</span>
          {item.author && (
            <>
              <span>·</span>
              <span>{item.author}</span>
            </>
          )}
        </div>

        {/* Tickers */}
        {item.tickers.length > 0 && (
          <div className="flex gap-1.5 mb-5">
            {item.tickers.map((t) => (
              <span
                key={t}
                className="px-2.5 py-0.5 text-[13px] font-medium bg-accent/10 text-accent/80 rounded-md border border-accent/15"
              >
                ${t}
              </span>
            ))}
          </div>
        )}

        {/* Divider */}
        <div className="h-px bg-border/50 my-5" />

        {/* Body */}
        {loading ? (
          <div className="space-y-4">
            <div className="h-5 skeleton w-full" />
            <div className="h-5 skeleton w-[90%]" />
            <div className="h-5 skeleton w-[95%]" />
            <div className="h-5 skeleton w-[80%]" />
            <div className="h-8" />
            <div className="h-5 skeleton w-full" />
            <div className="h-5 skeleton w-[85%]" />
            <div className="h-5 skeleton w-[92%]" />
          </div>
        ) : body === NO_CONTENT_MARKER ? (
          <div className="py-8 text-center">
            <p className="text-[16px] text-text-secondary mb-4">
              この記事の本文を取得できませんでした。
            </p>
            <a
              href={
                item.sourceUrl ||
                `https://www.google.com/search?q=${encodeURIComponent(item.title)}`
              }
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-accent/15 text-accent text-[15px] font-medium border border-accent/20 hover:bg-accent/25 transition-colors"
            >
              {item.sourceUrl ? "元の記事を直接読む →" : "Google で検索する →"}
            </a>
          </div>
        ) : (
          <div className="article-body text-[17px] text-text-primary leading-[1.9]">
            {body
              ?.split("\n")
              .filter(Boolean)
              .map((line, i) => {
                // Markdown heading
                const h2Match = line.match(/^##\s+(.+)/);
                if (h2Match) {
                  return (
                    <h2
                      key={i}
                      className="text-[20px] font-semibold text-text-primary mt-6 mb-2"
                    >
                      {h2Match[1]}
                    </h2>
                  );
                }
                const h1Match = line.match(/^#\s+(.+)/);
                if (h1Match) {
                  return (
                    <h2
                      key={i}
                      className="text-[21px] font-semibold text-text-primary mt-6 mb-2"
                    >
                      {h1Match[1]}
                    </h2>
                  );
                }
                // Bold text: **text** → <strong>
                const parts = line.split(/(\*\*[^*]+\*\*)/g);
                return (
                  <p key={i} className="mb-4 last:mb-0">
                    {parts.map((part, j) => {
                      const boldMatch = part.match(/^\*\*(.+)\*\*$/);
                      if (boldMatch) {
                        return (
                          <strong key={j} className="font-semibold">
                            {boldMatch[1]}
                          </strong>
                        );
                      }
                      return part;
                    })}
                  </p>
                );
              })}
          </div>
        )}

        {/* Divider */}
        <div className="h-px bg-border/50 my-8" />

        {/* Learning Note Section */}
        <div className="mb-8">
          <h3 className="text-[17px] font-semibold text-text-primary mb-3">
            この記事から何を学んだ？
          </h3>
          <div className="relative">
            <textarea
              value={noteText}
              onChange={(e) => setNoteText(e.target.value)}
              placeholder="自分の言葉で気づきを書く..."
              className="w-full min-h-[90px] p-3.5 rounded-xl bg-input-bg border border-border text-[16px] text-text-primary placeholder:text-text-muted/50 resize-none focus:outline-none focus:border-accent/40 focus:ring-1 focus:ring-accent/20 transition-colors"
              rows={3}
            />
            <div className="flex items-center justify-between mt-2.5">
              <span className="text-[13px] text-text-muted">
                {saved ? "保存しました" : ""}
              </span>
              <button
                onClick={handleSaveNote}
                disabled={!noteText.trim()}
                className="px-5 py-2 rounded-lg bg-accent text-white text-[15px] font-medium disabled:opacity-30 disabled:cursor-not-allowed hover:bg-accent-dark active:scale-[0.97] transition-all"
              >
                記録する
              </button>
            </div>
          </div>

          {/* Past notes for this article */}
          {notes.length > 0 && (
            <div className="mt-4 space-y-2">
              {notes.map((n) => (
                <div
                  key={n.id}
                  className="p-3.5 rounded-lg bg-accent/10 border border-accent/15"
                >
                  <p className="text-[15px] text-text-primary leading-[1.7]">
                    {n.note}
                  </p>
                  <p className="text-[12px] text-text-muted mt-1.5">
                    {new Date(n.createdAt).toLocaleDateString("ja-JP", {
                      month: "short",
                      day: "numeric",
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </p>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Divider */}
        <div className="h-px bg-border/50 mb-6" />

        {/* Source link */}
        <a
          href={
            item.sourceUrl ||
            `https://www.google.com/search?q=${encodeURIComponent(item.title)}`
          }
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 text-[15px] text-accent hover:text-accent/80 transition-colors mb-6"
        >
          <svg
            width="18"
            height="18"
            viewBox="0 0 16 16"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
          >
            <path
              d="M6 8.5L7.5 10C8.33 10.83 9.67 10.83 10.5 10L12.5 8C13.33 7.17 13.33 5.83 12.5 5L12 4.5"
              strokeLinecap="round"
            />
            <path
              d="M10 7.5L8.5 6C7.67 5.17 6.33 5.17 5.5 6L3.5 8C2.67 8.83 2.67 10.17 3.5 11L4 11.5"
              strokeLinecap="round"
            />
          </svg>
          {item.sourceUrl ? "元の記事を見る" : "Google で検索する"}
        </a>

        {/* Actions */}
        <button
          onClick={handleLearned}
          className="w-full py-3.5 rounded-xl bg-accent/15 text-accent text-[16px] font-medium border border-accent/20 hover:bg-accent/25 hover:border-accent/40 active:scale-[0.98] transition-all"
        >
          ✓ 学んだ — フィードから消す
        </button>
      </article>
    </div>
  );
}

function getCategoryLabel(cat: string): string {
  const labels: Record<string, string> = {
    portfolio_moves: "ポートフォリオ",
    holdings_performance: "保有銘柄",
    lilu_news: "ニュース",
    philosophy: "投資哲学",
    company_deep_dive: "企業分析",
    market_context: "市場",
  };
  return labels[cat] || cat;
}

function formatDate(iso: string): string {
  const date = new Date(iso);
  const now = new Date();
  const diffMs = now.getTime() - date.getTime();
  const diffHours = diffMs / (1000 * 60 * 60);

  if (diffHours < 1) return `${Math.floor(diffMs / (1000 * 60))}分前`;
  if (diffHours < 24) return `${Math.floor(diffHours)}時間前`;
  if (diffHours < 48) return "昨日";

  return date.toLocaleDateString("ja-JP", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}
