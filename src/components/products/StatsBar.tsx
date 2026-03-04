interface StatsBarProps {
  filteredCount: number;
  totalCount: number;
  searchQuery: string;
  showFavoritesOnly: boolean;
  hasActiveFilters: boolean;
  onClearFilters: () => void;
}

export function StatsBar({
  filteredCount,
  totalCount,
  searchQuery,
  showFavoritesOnly,
  hasActiveFilters,
  onClearFilters,
}: StatsBarProps) {
  return (
    <div className="flex items-center justify-between mb-5">
      <p className="text-sm text-zinc-500">
        {showFavoritesOnly ? (
          <>
            <span className="text-zinc-200 font-medium">{filteredCount}</span>
            {" "}saved item{filteredCount !== 1 ? "s" : ""}
          </>
        ) : (
          <>
            <span className="text-zinc-200 font-medium">{filteredCount}</span>
            {" "}of {totalCount} products
          </>
        )}
        {searchQuery && (
          <>
            {" "}for "
            <span className="text-amber-400">{searchQuery}</span>
            "
          </>
        )}
      </p>

      {hasActiveFilters && (
        <button
          onClick={onClearFilters}
          className="text-xs text-zinc-500 hover:text-amber-400 transition-colors underline underline-offset-2"
        >
          Clear filters
        </button>
      )}
    </div>
  );
}