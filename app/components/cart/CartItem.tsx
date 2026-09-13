import { Form } from "react-router";
import { Trash2 } from "lucide-react";
import type { Product } from "~/lib/api";

type CartItemProps = {
  product: Product;
  quantity: number;
};

export function CartItem({ product, quantity }: CartItemProps) {
  return (
    <div className="flex items-stretch gap-4 border-b border-gray-900 py-4">
      <div className="h-28 w-28 shrink-0 bg-gray-200">
        <img
          src={product.thumbnail}
          alt={product.title}
          className="h-full w-full object-cover"
        />
      </div>

      <div className="flex flex-1 flex-col justify-between">
        <div>
          <p className="text-sm">{product.title}</p>
          <p className="text-sm">${product.price.toFixed(2)}</p>
        </div>

        <Form method="post" className="flex items-center gap-3">
          <input type="hidden" name="productId" value={product.id} />

          <div className="flex divide-x-none rounded border border-gray-800">
            <button
              name="intent"
              value="decrement"
              className="flex h-7 w-7 items-center justify-center text-sm cursor-pointer"
            >
              −
            </button>
            <span className="flex h-7 w-7 items-center justify-center text-sm">
              {quantity}
            </span>
            <button
              name="intent"
              value="increment"
              className="flex h-7 w-7 items-center justify-center text-sm cursor-pointer"
            >
              +
            </button>
          </div>

          <button
            name="intent"
            value="remove"
            aria-label="Remove"
            className="text-gray-800"
          >
            <Trash2 size={16} className="cursor-pointer" />
          </button>
        </Form>
      </div>
    </div>
  );
}
