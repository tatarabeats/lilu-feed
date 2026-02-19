export function Skeleton({ className = '' }: { className?: string }) {
  return <div className={`skeleton ${className}`} />;
}

export function CardSkeleton({ hero = false }: { hero?: boolean }) {
  if (hero) {
    return (
      <div className="col-span-3 flex gap-6">
        <div className="flex-1 space-y-3">
          <Skeleton className="h-8 w-3/4" />
          <Skeleton className="h-4 w-1/3" />
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-5/6" />
        </div>
        <Skeleton className="w-[310px] h-[206px] shrink-0" />
      </div>
    );
  }

  return (
    <div className="space-y-0">
      <Skeleton className="w-full aspect-[3/2]" />
      <div className="p-4 space-y-2">
        <Skeleton className="h-5 w-full" />
        <Skeleton className="h-5 w-3/4" />
        <Skeleton className="h-3 w-1/2 mt-3" />
      </div>
    </div>
  );
}
