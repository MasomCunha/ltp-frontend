import type { Route } from "./+types/cart";
import { getProduct } from "~/lib/api";
import { getCart, updateCartItem, commitSession } from "~/lib/cart.server";
import { CartItem } from "~/components/cart/CartItem";
import { CartSummary } from "~/components/cart/CartSummary";
import { PageWrapper } from "~/components/layout/PageWrapper";

const SHIPPING = 20;

export async function loader({ request }: Route.LoaderArgs) {
  const { cart } = await getCart(request);
  const entries = Object.entries(cart);

  const items = await Promise.all(
    entries.map(async ([id, quantity]) => {
      const product = await getProduct(id);
      return { product, quantity };
    }),
  );

  const subtotal = items.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0,
  );
  return { items, subtotal };
}

export async function action({ request }: Route.ActionArgs) {
  const formData = await request.formData();
  const intent = String(formData.get("intent"));
  const productId = String(formData.get("productId"));

  const { cart } = await getCart(request);
  const currentQty = cart[productId] ?? 0;

  const nextQty =
    intent === "increment"
      ? currentQty + 1
      : intent === "decrement"
        ? currentQty - 1
        : 0; // remove

  const session = await updateCartItem(request, productId, nextQty);

  return new Response(null, {
    status: 302,
    headers: { Location: "/cart", "Set-Cookie": await commitSession(session) },
  });
}

export default function Cart({ loaderData }: Route.ComponentProps) {
  const { items, subtotal } = loaderData;

  return (
    <PageWrapper>
      <div className="flex-1">
        {items.length === 0 && (
          <p className="text-sm text-gray-500">O carrinho está vazio.</p>
        )}
        {items.map(({ product, quantity }) => (
          <CartItem key={product.id} product={product} quantity={quantity} />
        ))}
      </div>
      <CartSummary
        subtotal={subtotal}
        shipping={items.length > 0 ? SHIPPING : 0}
      />
    </PageWrapper>
  );
}
