# PRODVAULT — Product Management Dashboard

A production-grade React + TypeScript product dashboard built with modern frontend best practices.

---

## 🚀 Getting Started

### Prerequisites
- Node.js ≥ 18
- npm or yarn

### Setup

```bash
# 1. Create a Vite + React + TypeScript project
npm create vite@latest prodvault -- --template react-ts
cd prodvault

# 2. Install Tailwind CSS
npm install -D tailwindcss postcss autoprefixer


# 3. Configure tailwind.config.js
#    content: ["./index.html", "./src/**/*.{ts,tsx}"]

# 4. Add Tailwind directives to src/index.css
#    @tailwind base; @tailwind components; @tailwind utilities;

# 5. Run the dev server
npm run dev
```

Open [http://localhost:5173](http://localhost:5173)

---

## 🏗 Architecture Overview

### Data Layer & Caching

**Is caching feasible here?**  
Yes — the product catalog is static/semi-static data that doesn't change per-user. A simple in-memory `Map`-based cache with a 5-minute TTL sits in front of the mock API call. On the first load, it "fetches" (simulated 900ms delay) and stores results. Subsequent calls within the TTL window return instantly from cache — zero re-fetch.

**NOTE**
For a real app this pattern extends naturally to SWR, React Query, or RTK Query — all of which offer cache invalidation, background revalidation, and deduplication out of the box.

### Search with Debounce

The search input fires on every keystroke into `searchInput` state, but the actual filter logic runs only on `debouncedSearch` — a value that updates **350ms after the user stops typing**. This means:

- No wasted filter computations mid-typing
- In a real API scenario: no network calls per keystroke
- `useDebounce` is a clean, reusable custom hook

### Lazy Loading Images

Each product image uses a custom `LazyImage` component. Images are only requested from the network when their container enters the viewport (with a 100px root margin lookahead). This:

- Cuts initial page load bandwidth significantly
- Improves LCP (Largest Contentful Paint)
- Shows a spinner placeholder until the image is decoded

### Persistence (Favorites)

Favorites are stored in `localStorage` via a `useLocalStorage` custom hook. On initialization, state is seeded from storage — so refreshing the page preserves all selections without any backend.


### State Management

No external state library is needed for this scope. 

| State | Where | Mechanism |
|---|---|---|
| Products list | App | `useState` + `useEffect` |
| Search query | App | `useState` → `useDebounce` |
| Category filter | App | `useState` |
| Favorites | App | `useLocalStorage` custom hook |
| Image loaded | LazyImage | local `useState` |

Filtered data uses `useMemo` to avoid recomputation on unrelated renders.

### Performance Choices

- **`useMemo`** for filtered product list — only recomputes when search/category/favorites change
- **`useCallback`** for `toggleFavorite` — stable reference passed to many child cards
- **Cancelled async effects** — `fetchProducts` effect sets a `cancelled` flag to prevent state updates on unmounted components
- **Skeleton loading** — 8 animated placeholder cards during fetch; no layout shift
- **`line-clamp-2`** on product titles — consistent card heights regardless of title length

### Component Structure

```
src/
├── data/
│   └── products.ts
├── services/
│   └── productService.ts
├── hooks/
│   ├── useDebounce.ts
│   ├── useLocalStorage.ts
│   └── useProducts.ts
├── constants/
│   └── categories.ts
├── types/
│   └── product.ts
├── components/
│   ├── ui/
│   │   ├── LazyImage.tsx
│   │   ├── Stars.tsx
│   │   └── SkeletonCard.tsx
│   ├── layout/
│   │   ├── Header.tsx
│   │   └── Footer.tsx
│   ├── products/
│   │   ├── ProductCard.tsx
│   │   ├── ProductGrid.tsx
│   │   ├── CategoryFilter.tsx
│   │   └── StatsBar.tsx
│   └── EmptyState.tsx
└── App.tsx
```

### Styling

Tailwind CSS with a custom dark theme (`zinc-950` base).  uses sans-serif from Google Fonts.
---

## ✅ Feature Checklist

- [x] Product grid with title, image, price, category
- [x] Search bar with debounce (350ms)
- [x] Category filtering 
- [x] Favorite toggle per product
- [x] Favorites persist across page refreshes (localStorage)
- [x] Loading skeleton state
- [x] Lazy image loading via IntersectionObserver
- [x] In-memory API cache with 5-min TTL
- [x] Responsive layout (1 → 2 → 3 → 4 col grid)
- [x] Mobile-friendly header with search + favorites count
- [x] Clear filters shortcut