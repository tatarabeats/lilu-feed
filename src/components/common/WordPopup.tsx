interface WordPopupProps {
  word: string;
  meaning: string;
  x: number;
  y: number;
}

export function WordPopup({ word, meaning, x, y }: WordPopupProps) {
  // Clamp position to viewport
  const left = Math.min(Math.max(x - 60, 8), window.innerWidth - 200);
  const top = Math.max(y, 8);

  return (
    <div
      className="word-popup"
      style={{ left, top }}
    >
      <div className="text-accent text-[13px] font-medium mb-0.5">{word}</div>
      <div className="text-text-primary text-[13px]">{meaning}</div>
    </div>
  );
}
