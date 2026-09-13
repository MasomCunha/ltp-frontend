import { Form } from "react-router";
import type { Product } from "~/lib/api";

export function ProductDetails({ product, isAdding }: { product: Product; isAdding: boolean }) {
  return (
    <div className="w-96 shrink-0">
      <h1 className="text-xl font-semibold">{product.title}</h1>
      <p className="mt-1 text-lg font-semibold">${product.price.toFixed(2)}</p>

      <Form method="post" className="mt-4">
        <button
          type="submit"
          disabled={isAdding}
          className="w-full rounded bg-gray-900 py-2 px-4 text-sm text-white disabled:opacity-60 cursor-pointer"
        >
          {isAdding ? "Adding..." : "Add to Cart"}
        </button>
      </Form>

      <hr className="my-6 border-gray-900" />

      <h2 className="mb-2 text-sm">Product Details</h2>
      <p className="text-sm leading-relaxed text-gray-600">{product.description}</p>
    </div>
  );
}