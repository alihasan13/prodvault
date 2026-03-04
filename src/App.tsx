import { useState, useMemo, useCallback } from "react";
import { useProducts } from "./hooks/useProducts";
import { useDebounce } from "./hooks/useDebounce";
import { useLocalStorage } from "./hooks/useLocalStorage";
import { Header } from "./components/layout/Header";
import { Footer } from "./components/layout/Footer";
import { CategoryFilter } from "./components/products/CategoryFilter";
import { StatsBar } from "./components/products/StatsBar";
import { ProductGrid } from "./components/products/ProductGrid";
import { DEFAULT_CATEGORY } from "./constants/categories";

export default function App() {
  // ── Server state ────────────────────────────────────────────────────────────
  const { products, loading, error } = useProducts();

  // ── Filter state ────────────────────────────────────────────────────────────
  const [searchInput, setSearchInput]         = useState("");
  const [selectedCategory, setSelectedCategory] = useState(DEFAULT_CATEGORY);
  const [showFavoritesOnly, setShowFavoritesOnly] = useState(false);

  // ── Persistent client state ─────────────────────────────────────────────────
  const [favorites, setFavorites] = useLocalStorage<number[]>("product_favorites", []);

  // ── Debounced search — prevents filtering on every keystroke ────────────────
  const debouncedSearch = useDebounce(searchInput, 350);

  // ── Derived: category list built from live product data ─────────────────────
  const categories = useMemo(() => {
    const cats = [...new Set(products.map((p) => p.category))].sort();
    return [DEFAULT_CATEGORY, ...cats];
  }, [products]);

  // ── Derived: filtered product list ──────────────────────────────────────────
  const filtered = useMemo(() => {
    return products.filter((p) => {
      const matchSearch   = p.title.toLowerCase().includes(debouncedSearch.toLowerCase());
      const matchCategory = selectedCategory === DEFAULT_CATEGORY || p.category === selectedCategory;
      const matchFavorite = !showFavoritesOnly || favorites.includes(p.id);
      return matchSearch && matchCategory && matchFavorite;
    });
  }, [products, debouncedSearch, selectedCategory, favorites, showFavoritesOnly]);

  // ── Handlers ────────────────────────────────────────────────────────────────
  const toggleFavorite = useCallback(
    (id: number) => {
      setFavorites((prev) =>
        prev.includes(id) ? prev.filter((f) => f !== id) : [...prev, id]
      );
    },
    [setFavorites]
  );

  const clearFilters = useCallback(() => {
    setSearchInput("");
    setSelectedCategory(DEFAULT_CATEGORY);
    setShowFavoritesOnly(false);
  }, []);

  const hasActiveFilters =
    !!debouncedSearch || selectedCategory !== DEFAULT_CATEGORY || showFavoritesOnly;

  return (
    <div
      className="min-h-screen bg-zinc-950 text-zinc-100"
      style={{ fontFamily: "'DM Sans', 'Inter', sans-serif" }}
    >
      {/* Google Fonts */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@300;400;500;600;700&family=DM+Mono:wght@400;500&display=swap');
        * { font-family: 'DM Sans', sans-serif; }
        .font-mono { font-family: 'DM Mono', monospace; }
      `}</style>

      <Header
        searchInput={searchInput}
        onSearchChange={setSearchInput}
        showFavoritesOnly={showFavoritesOnly}
        onToggleFavorites={() => setShowFavoritesOnly((f) => !f)}
        favCount={favorites.length}
      />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 py-6">
        <CategoryFilter
          categories={categories}
          selected={selectedCategory}
          onSelect={setSelectedCategory}
        />

        {!loading && (
          <StatsBar
            filteredCount={filtered.length}
            totalCount={products.length}
            searchQuery={debouncedSearch}
            showFavoritesOnly={showFavoritesOnly}
            hasActiveFilters={hasActiveFilters}
            onClearFilters={clearFilters}
          />
        )}

        <ProductGrid
          products={filtered}
          loading={loading}
          error={error}
          favorites={favorites}
          searchQuery={debouncedSearch}
          selectedCategory={selectedCategory}
          onToggleFavorite={toggleFavorite}
        />
      </main>

      <Footer totalProducts={products.length} savedCount={favorites.length} />
    </div>
  );
}