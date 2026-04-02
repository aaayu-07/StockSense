export default function CompanySidebar({ companies, selectedSymbol, onSelect }) {
  return (
    <aside className="sidebar card">
      <div className="sidebar-header">
        <p className="eyebrow">Tracked Companies</p>
        <h2>Portfolio Watchlist</h2>
      </div>

      <div className="company-list">
        {companies.map((company) => (
          <button
            key={company.symbol}
            type="button"
            className={`company-item ${selectedSymbol === company.symbol ? "active" : ""}`}
            onClick={() => onSelect(company.symbol)}
          >
            <span className="company-symbol">{company.symbol}</span>
            <span className="company-name">{company.name}</span>
          </button>
        ))}
      </div>
    </aside>
  );
}
