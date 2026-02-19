import { MarketWidget } from './MarketWidget';

export function Sidebar() {
  return (
    <aside className="hidden lg:block w-[336px] shrink-0 space-y-6 sticky top-20 self-start">
      <MarketWidget />

      {/* Quick Links */}
      <div className="bg-card-bg rounded-xl p-4">
        <h3 className="text-sm font-medium text-text-secondary mb-3">
          Quick Links
        </h3>
        <div className="space-y-2">
          <a
            href="https://www.himcap.com/publications"
            target="_blank"
            rel="noopener noreferrer"
            className="block text-xs text-accent hover:text-accent-dark transition-colors"
          >
            Himalaya Capital Publications
          </a>
          <a
            href="https://www.sec.gov/cgi-bin/browse-edgar?action=getcompany&CIK=0001709323&type=13F&dateb=&owner=include&count=40"
            target="_blank"
            rel="noopener noreferrer"
            className="block text-xs text-accent hover:text-accent-dark transition-colors"
          >
            SEC EDGAR Filings
          </a>
          <a
            href="https://www.dataroma.com/m/holdings.php?m=HC"
            target="_blank"
            rel="noopener noreferrer"
            className="block text-xs text-accent hover:text-accent-dark transition-colors"
          >
            Dataroma — Portfolio History
          </a>
          <a
            href="https://whalewisdom.com/filer/himalaya-capital-management-llc"
            target="_blank"
            rel="noopener noreferrer"
            className="block text-xs text-accent hover:text-accent-dark transition-colors"
          >
            WhaleWisdom Profile
          </a>
        </div>
      </div>

      {/* About */}
      <div className="bg-card-bg rounded-xl p-4">
        <h3 className="text-sm font-medium text-text-secondary mb-2">
          About Li Lu
        </h3>
        <p className="text-xs text-text-muted leading-5">
          Li Lu (b. 1966) is the founder of Himalaya Capital Management.
          He was Charlie Munger's only external money manager.
          His portfolio holds just 9 positions totaling $3.57B.
        </p>
      </div>
    </aside>
  );
}
