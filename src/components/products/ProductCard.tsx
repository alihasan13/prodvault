import { type Product } from "../../types/product";
import { LazyImage } from "../ui/LazyImage";
import { CATEGORY_COLORS } from "../../constants/categories";

interface ProductCardProps {
  product: Product;
  isFavorite: boolean;
  onToggleFavorite: (id: number) => void;
}

export function ProductCard({
  product,
  isFavorite,
  onToggleFavorite,
}: ProductCardProps) {
  const catColor =
    CATEGORY_COLORS[product.category] ?? "bg-zinc-700 text-zinc-300";

  return (
    <div className="group relative bg-zinc-900 border border-zinc-800 rounded-2xl overflow-hidden hover:border-amber-400/40 transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl hover:shadow-amber-400/5">

      {/* ── Image area  */}
      <div className="relative">
        <LazyImage src={product.image} alt={product.title} className="h-52 w-full" />
        <div className="absolute inset-0 bg-gradient-to-t from-zinc-900/60 to-transparent" />

     

       
      </div>

      {/* ── Info area ─ */}
      <div className="p-4">
        <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${catColor}`}>
          {product.category}
        </span>

        <h3 className="mt-2 text-sm font-semibold text-zinc-100 leading-snug line-clamp-2 group-hover:text-amber-100 transition-colors">
          {product.title}
        </h3>


        <div className="mt-3 flex items-center justify-between">
          <span className="text-xl font-bold text-amber-400 font-mono">
            ${product.price.toFixed(2)}
          </span>
          <button
            onClick={() => onToggleFavorite(product.id)}
            className={`text-xs px-3 py-1.5 rounded-lg font-medium transition-all duration-200 ${
              isFavorite
                ? "bg-amber-400/10 text-amber-400 border border-amber-400/30 hover:bg-amber-400/20"
                : "bg-zinc-800 text-zinc-300 hover:bg-zinc-700 hover:text-white border border-zinc-700"
            }`}
          >
            {isFavorite ? "Saved ✓" : "Save"}
          </button>
        </div>
      </div>

    </div>
  );
}