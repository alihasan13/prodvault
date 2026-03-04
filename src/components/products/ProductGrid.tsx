import { type  Product } from "../../types/product";
import { ProductCard } from "./ProductCard";
import { SkeletonCard } from "../ui/SkeletonCard";
import { EmptyState } from "./EmptyState";

interface ProductGridProps {
  products: Product[];
  loading: boolean;
  error: string | null;
  favorites: number[];
  searchQuery: string;
  selectedCategory: string;
  onToggleFavorite: (id: number) => void;
}

export function ProductGrid({
  products,
  loading,
  error,
  favorites,
  searchQuery,
  selectedCategory,
  onToggleFavorite,
}: ProductGridProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">

      {/* Error state */}
      {error && (
        <div className="col-span-full bg-red-500/10 border border-red-500/30 rounded-2xl p-6 text-center">
          <p className="text-red-400 font-medium">Failed to load products</p>
          <p className="text-red-400/70 text-sm mt-1">{error}</p>
        </div>
      )}

      {/* Loading skeletons */}
      {loading &&
        Array.from({ length: 8 }).map((_, i) => <SkeletonCard key={i} />)}

      {/* Empty state */}
      {!loading && !error && products.length === 0 && (
        <EmptyState query={searchQuery} category={selectedCategory} />
      )}

      {/* Product cards */}
      {!loading &&
        !error &&
        products.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
            isFavorite={favorites.includes(product.id)}
            onToggleFavorite={onToggleFavorite}
          />
        ))}

    </div>
  );
}