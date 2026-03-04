
export function SkeletonCard() {
  return (
    <div className="bg-zinc-900 border border-zinc-800 rounded-2xl overflow-hidden animate-pulse">
      <div className="h-52 bg-zinc-800" />
      <div className="p-4 space-y-3">
        <div className="h-3 bg-zinc-800 rounded w-1/3" />
        <div className="h-4 bg-zinc-800 rounded w-4/5" />
        <div className="h-3 bg-zinc-800 rounded w-3/5" />
        <div className="h-6 bg-zinc-800 rounded w-1/2 mt-4" />
      </div>
    </div>
  );
}