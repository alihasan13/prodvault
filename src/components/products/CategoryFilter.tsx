import { CATEGORY_COLORS } from "../../constants/categories";

interface CategoryFilterProps {
  categories: string[];
  selected: string;
  onSelect: (category: string) => void;
}

export function CategoryFilter({
  categories,
  selected,
  onSelect,
}: CategoryFilterProps) {
  return (
    <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-none mb-6">
      {categories.map((cat) => {
        const isActive = selected === cat;
        const activeStyle =
          cat === "All"
            ? "bg-amber-400 text-zinc-900"
            : CATEGORY_COLORS[cat] ?? "bg-zinc-700 text-zinc-300";

        return (
          <button
            key={cat}
            onClick={() => onSelect(cat)}
            className={`shrink-0 px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200 ${
              isActive
                ? activeStyle
                : "bg-zinc-900 text-zinc-400 border border-zinc-800 hover:text-zinc-200 hover:border-zinc-700"
            }`}
          >
            {cat}
          </button>
        );
      })}
    </div>
  );
}