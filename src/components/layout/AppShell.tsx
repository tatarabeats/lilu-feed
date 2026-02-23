import { Header } from "./Header";
import { Sidebar } from "./Sidebar";
import { FeedGrid } from "../feed/FeedGrid";

interface AppShellProps {
  onOpenNotes?: () => void;
}

export function AppShell({ onOpenNotes }: AppShellProps) {
  return (
    <div className="min-h-screen bg-page-bg">
      <div className="max-w-[1100px] mx-auto px-3 md:px-4">
        <Header onOpenNotes={onOpenNotes} />

        <div className="flex gap-6 mt-2 md:mt-4">
          <main className="flex-1 min-w-0 pb-24 md:pb-20">
            <FeedGrid />
          </main>
          <Sidebar />
        </div>
      </div>
    </div>
  );
}
