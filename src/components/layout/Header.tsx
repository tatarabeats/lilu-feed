import { TopicTabs } from '../common/TopicTabs';

export function Header() {
  return (
    <header className="sticky top-0 z-20 bg-page-bg/95 backdrop-blur-sm border-b border-border/10 pb-2.5 md:pb-3">
      <div className="flex items-center justify-between mb-2 md:mb-3 pt-3 md:pt-4">
        <h1 className="font-serif text-lg md:text-2xl text-text-primary tracking-[-0.5px]">
          Li Lu Feed
        </h1>
        <span className="text-[10px] md:text-xs text-text-muted tracking-wide uppercase">
          Himalaya Capital
        </span>
      </div>
      <TopicTabs />
    </header>
  );
}
