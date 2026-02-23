import { useState, useEffect } from "react";
import {
  loadNotes,
  deleteNote,
  loadLearnedItems,
  type LearningNote,
  type LearnedItem,
} from "../../services/notesStore";
import { useFeedContext } from "../../store/feedContext";

interface NotesPageProps {
  onBack: () => void;
}

const CATEGORY_LABEL: Record<string, string> = {
  portfolio_moves: "ポートフォリオ",
  holdings_performance: "保有銘柄",
  lilu_news: "ニュース",
  philosophy: "投資哲学",
  company_deep_dive: "企業分析",
  market_context: "市場",
};

export function NotesPage({ onBack }: NotesPageProps) {
  const [tab, setTab] = useState<"notes" | "learned">("notes");
  const [notes, setNotes] = useState<LearningNote[]>([]);
  const [learnedItems, setLearnedItems] = useState<LearnedItem[]>([]);
  const { refreshNotesCount } = useFeedContext();

  useEffect(() => {
    setNotes(loadNotes());
    setLearnedItems(loadLearnedItems());
  }, []);

  const handleDelete = (noteId: string) => {
    deleteNote(noteId);
    const updated = loadNotes();
    setNotes(updated);
    refreshNotesCount();
  };

  return (
    <div className="article-page fixed inset-0 z-50 bg-page-bg overflow-y-auto">
      {/* Header */}
      <header className="sticky top-0 z-10 bg-page-bg/90 backdrop-blur-md border-b border-border/30">
        <div className="max-w-[640px] mx-auto px-4 h-12 flex items-center justify-between">
          <button
            onClick={onBack}
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
          <span className="text-[14px] text-text-muted">
            {tab === "notes"
              ? `${notes.length}件のノート`
              : `${learnedItems.length}件学習済み`}
          </span>
        </div>
      </header>

      <div className="max-w-[640px] mx-auto px-4 pt-6 pb-20">
        <h1 className="text-[26px] font-medium text-gold-gradient mb-4">
          学びの記録
        </h1>

        {/* Tabs */}
        <div className="flex gap-1 mb-6 p-1 bg-card-bg rounded-xl border border-border">
          <button
            onClick={() => setTab("notes")}
            className={`flex-1 py-2 text-[14px] font-medium rounded-lg transition-all ${
              tab === "notes"
                ? "bg-accent/15 text-accent border border-accent/20"
                : "text-text-muted hover:text-text-secondary"
            }`}
          >
            ノート
            {notes.length > 0 && (
              <span className="ml-1.5 text-[12px] opacity-70">
                ({notes.length})
              </span>
            )}
          </button>
          <button
            onClick={() => setTab("learned")}
            className={`flex-1 py-2 text-[14px] font-medium rounded-lg transition-all ${
              tab === "learned"
                ? "bg-accent/15 text-accent border border-accent/20"
                : "text-text-muted hover:text-text-secondary"
            }`}
          >
            学んだ記事
            {learnedItems.length > 0 && (
              <span className="ml-1.5 text-[12px] opacity-70">
                ({learnedItems.length})
              </span>
            )}
          </button>
        </div>

        {/* Notes tab */}
        {tab === "notes" &&
          (notes.length === 0 ? (
            <div className="text-center py-16">
              <p className="text-[48px] mb-3 opacity-30">📝</p>
              <p className="text-text-muted text-[17px]">
                まだメモがありません
              </p>
              <p className="text-text-muted/60 text-[14px] mt-1">
                記事を読んで気づきを書いてみよう
              </p>
            </div>
          ) : (
            <div className="space-y-3">
              {notes.map((note) => (
                <div
                  key={note.id}
                  className="p-4 rounded-xl bg-card-bg border border-border"
                >
                  <p className="text-[16px] text-text-primary leading-[1.7] mb-3">
                    {note.note}
                  </p>
                  <div className="flex items-center justify-between">
                    <div className="flex-1 min-w-0">
                      <p className="text-[13px] text-accent truncate mb-0.5">
                        {note.articleTitle}
                      </p>
                      <div className="flex items-center gap-2">
                        <span className="text-[11px] px-1.5 py-0.5 rounded bg-accent/10 text-accent/70">
                          {CATEGORY_LABEL[note.articleCategory] ||
                            note.articleCategory}
                        </span>
                        <p className="text-[12px] text-text-muted">
                          {new Date(note.createdAt).toLocaleDateString(
                            "ja-JP",
                            {
                              year: "numeric",
                              month: "short",
                              day: "numeric",
                              hour: "2-digit",
                              minute: "2-digit",
                            },
                          )}
                        </p>
                      </div>
                    </div>
                    <button
                      onClick={() => handleDelete(note.id)}
                      className="ml-2 p-1.5 rounded-full text-text-muted/40 hover:text-badge-live hover:bg-badge-live/10 transition-colors shrink-0"
                      title="削除"
                    >
                      <svg
                        className="w-4 h-4"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={2}
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M6 18L18 6M6 6l12 12"
                        />
                      </svg>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          ))}

        {/* Learned tab */}
        {tab === "learned" &&
          (learnedItems.length === 0 ? (
            <div className="text-center py-16">
              <p className="text-[48px] mb-3 opacity-30">✓</p>
              <p className="text-text-muted text-[17px]">
                まだ学んだ記事がありません
              </p>
              <p className="text-text-muted/60 text-[14px] mt-1">
                記事を読んで学んだボタンを押してみよう
              </p>
            </div>
          ) : (
            <div className="space-y-2.5">
              {learnedItems.map((item) => (
                <a
                  key={item.id}
                  href={
                    item.sourceUrl ||
                    `https://www.google.com/search?q=${encodeURIComponent(item.title)}`
                  }
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block p-4 rounded-xl bg-card-bg border border-border hover:border-accent/30 hover:bg-card-bg-hover transition-all group"
                >
                  <p className="text-[15px] text-text-primary group-hover:text-accent leading-[1.6] mb-2 transition-colors line-clamp-2">
                    {item.title}
                  </p>
                  <div className="flex items-center gap-2">
                    <span className="text-[11px] px-1.5 py-0.5 rounded bg-accent/10 text-accent/70">
                      {CATEGORY_LABEL[item.category] || item.category}
                    </span>
                    <span className="text-[12px] text-text-muted">
                      {new Date(item.learnedAt).toLocaleDateString("ja-JP", {
                        month: "short",
                        day: "numeric",
                      })}{" "}
                      に学習
                    </span>
                    <span className="ml-auto text-[12px] text-accent/50 group-hover:text-accent/80 transition-colors">
                      →
                    </span>
                  </div>
                </a>
              ))}
            </div>
          ))}
      </div>
    </div>
  );
}
