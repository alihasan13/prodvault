import { type Product } from "../types/product";
import { MOCK_PRODUCTS } from "../data/products";

// ─── In-memory cache with TTL ─────────────────────────────────────────────────
const cache = new Map<string, { data: Product[]; timestamp: number }>();
const CACHE_TTL = 5 * 60 * 1000; // 5 minutes

function getCached(key: string): Product[] | null {
  const entry = cache.get(key);
  if (!entry) return null;
  if (Date.now() - entry.timestamp > CACHE_TTL) {
    cache.delete(key);
    return null;
  }
  return entry.data;
}

function setCache(key: string, data: Product[]): void {
  cache.set(key, { data, timestamp: Date.now() });
}

// ─── Public API ───────────────────────────────────────────────────────────────
export async function fetchProducts(): Promise<Product[]> {
  const CACHE_KEY = "products_all";

  const cached = getCached(CACHE_KEY);
  if (cached) return cached;

  // Simulate network latency
  await new Promise((r) => setTimeout(r, 900));

  setCache(CACHE_KEY, MOCK_PRODUCTS);
  return MOCK_PRODUCTS;
}