interface FooterProps {
  totalProducts: number;
  savedCount: number;
}

export function Footer({ totalProducts, savedCount }: FooterProps) {
  return (
    <footer className="border-t border-zinc-800/60 mt-16 py-6 text-center text-xs text-zinc-600">
      PRODVAULT · {totalProducts} products · {savedCount} saved
    </footer>
  );
}