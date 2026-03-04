interface HeaderProps {
  searchInput: string;
  onSearchChange: (value: string) => void;
  showFavoritesOnly: boolean;
  onToggleFavorites: () => void;
  favCount: number;
}

export function Header({
  searchInput,
  onSearchChange,
  showFavoritesOnly,
  onToggleFavorites,
  favCount,
}: HeaderProps) {
  return (
    <header className="sticky top-0 z-50 bg-zinc-950/80 backdrop-blur-xl border-b border-zinc-800/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4 flex items-center justify-between gap-4">

        {/* Logo */}
        <div className="flex items-center gap-3 shrink-0">
          <div className="w-8 h-8 bg-amber-400 rounded-lg flex items-center justify-center">
            <svg className="w-4 h-4 text-zinc-900" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 21v-7.5a.75.75 0 01.75-.75h3a.75.75 0 01.75.75V21m-4.5 0H2.36m11.14 0H18m0 0h3.64m-1.39 0V9.349m-16.5 11.65V9.35m0 0a3.001 3.001 0 003.75-.615A2.993 2.993 0 009.75 9.75c.896 0 1.7-.393 2.25-1.016a2.993 2.993 0 002.25 1.016c.896 0 1.7-.393 2.25-1.016a3.001 3.001 0 003.75.614m-16.5 0a3.004 3.004 0 01-.621-4.72L4.318 3.44A1.5 1.5 0 015.378 3h13.243a1.5 1.5 0 011.06.44l1.19 1.189a3 3 0 01-.621 4.72m-13.5 8.65h3.75a.75.75 0 00.75-.75V13.5a.75.75 0 00-.75-.75H6.75a.75.75 0 00-.75.75v3.75c0 .415.336.75.75.75z" />
            </svg>
          </div>
          <div>
            <h1 className="text-base font-bold leading-tight tracking-tight text-white">PRODVAULT</h1>
            <p className="text-xs text-zinc-500 hidden sm:block">Product Dashboard</p>
          </div>
        </div>

        {/* Search bar */}
        <div className="flex-1 max-w-md relative">
          <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500 pointer-events-none" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
          <input
            type="text"
            value={searchInput}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="Search products..."
            className="w-full bg-zinc-900 border border-zinc-800 rounded-xl pl-10 pr-4 py-2.5 text-sm text-zinc-100 placeholder-zinc-600 focus:outline-none focus:border-amber-400/60 focus:ring-1 focus:ring-amber-400/20 transition-all"
          />
          {searchInput && (
            <button
              onClick={() => onSearchChange("")}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-500 hover:text-zinc-300"
              aria-label="Clear search"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          )}
        </div>

        {/* Favorites toggle */}
        <button
          onClick={onToggleFavorites}
          aria-pressed={showFavoritesOnly}
          className={`relative flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 shrink-0 ${
            showFavoritesOnly
              ? "bg-amber-400 text-zinc-900"
              : "bg-zinc-900 text-zinc-300 border border-zinc-800 hover:border-zinc-700"
          }`}
        >
          <svg
            className="w-4 h-4"
            fill={showFavoritesOnly ? "currentColor" : "none"}
            stroke="currentColor"
            strokeWidth="2"
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
          </svg>
          <span className="hidden sm:inline">Saved</span>
          {favCount > 0 && (
            <span
              className={`text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center ${
                showFavoritesOnly
                  ? "bg-zinc-900/30 text-zinc-900"
                  : "bg-amber-400 text-zinc-900"
              }`}
            >
              {favCount}
            </span>
          )}
        </button>

      </div>
    </header>
  );
}