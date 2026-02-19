interface SourceFaviconProps {
  sourceName: string;
  faviconUrl: string | null;
}

export function SourceFavicon({ sourceName, faviconUrl }: SourceFaviconProps) {
  return (
    <div className="flex items-center gap-1.5">
      {faviconUrl ? (
        <img
          src={faviconUrl}
          alt=""
          className="w-3.5 h-3.5 rounded-full"
        />
      ) : (
        <div className="w-3.5 h-3.5 rounded-full bg-border flex items-center justify-center">
          <span className="text-[8px] font-bold text-text-muted">
            {sourceName.charAt(0).toUpperCase()}
          </span>
        </div>
      )}
      <span className="text-xs text-text-secondary">{sourceName}</span>
    </div>
  );
}
