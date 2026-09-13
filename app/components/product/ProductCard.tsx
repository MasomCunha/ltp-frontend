import { Link } from "react-router";
import type { Product } from "~/lib/api";

export function ProductCard({ product }: { product: Product }) {
  return (
    <Link to={`/products/${product.id}`} className="flex flex-col gap-0.5">
      <div className="h-full w-full overflow-hidden bg-gray-100">
        <img
          src={product.thumbnail}
          alt={product.title}
          className="h-full w-full object-cover"
          loading="lazy"
        />
      </div>
      <div>
        <p className="text-sm text-gray-900">{product.title}</p>
        <p className="text-sm text-gray-900">${product.price.toFixed(2)}</p>
      </div>
    </Link>
  );
}
