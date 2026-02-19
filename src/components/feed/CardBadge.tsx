import type { BadgeType } from '../../types/feed';

interface CardBadgeProps {
  badge: BadgeType;
  archiveDate: string | null;
}

export function CardBadge({ badge, archiveDate }: CardBadgeProps) {
  if (badge === 'LIVE') {
    return (
      <span className="absolute top-3 left-3 z-10 flex items-center gap-1.5 px-2 py-0.5 rounded-md bg-badge-live text-white text-[11px] font-bold tracking-wider">
        <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse-dot" />
        LIVE
      </span>
    );
  }

  return (
    <span className="absolute top-3 left-3 z-10 px-2 py-0.5 rounded-md bg-badge-archive text-white text-[11px] font-bold tracking-wider">
      ARCHIVE: {archiveDate}
    </span>
  );
}
