import { Header } from './Header';
import { Sidebar } from './Sidebar';
import { FeedGrid } from '../feed/FeedGrid';
import { PortfolioBanner } from '../market/PortfolioBanner';

export function AppShell() {
  return (
    <div className="min-h-screen bg-page-bg">
      <div className="max-w-[1100px] mx-auto px-3 md:px-4">
        <Header />

        <div className="mt-2 mb-2 md:mt-4 md:mb-3">
          <PortfolioBanner />
        </div>

        <div className="flex gap-6">
          <main className="flex-1 min-w-0 pb-24 md:pb-20">
            <FeedGrid />
          </main>
          <Sidebar />
        </div>
      </div>
    </div>
  );
}
