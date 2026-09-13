import type { Product } from "~/lib/api";
import { ProductCard } from "./ProductCard";

export function ProductGrid({ products }: { products: Product[] }) {
  if (products.length === 0) {
    return <p className="text-sm text-gray-500">No products found.</p>;
  }

  return (
    <div className="grid grid-cols-2 gap-x-6 gap-y-8 sm:grid-cols-3">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
}