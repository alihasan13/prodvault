interface EmptyStateProps {
  query: string;
  category: string;
}

export function EmptyState({ query, category }: EmptyStateProps) {
  return (
    <div className="col-span-full flex flex-col items-center justify-center py-24 text-center">
      <div className="w-20 h-20 rounded-full bg-zinc-800 flex items-center justify-center mb-5">
        <svg
          className="w-9 h-9 text-zinc-600"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 15.803 7.5 7.5 0 0016.803 15.803z" />
        </svg>
      </div>
      <h3 className="text-lg font-semibold text-zinc-300">No products found</h3>
      <p className="mt-1 text-sm text-zinc-600 max-w-xs">
        {query && `No results for "${query}"`}
        {category !== "All" && ` in ${category}`}
        {!query && category === "All" && "Try adjusting your filters."}
      </p>
    </div>
  );
}