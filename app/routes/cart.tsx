import { Form } from "react-router";
import type { Route } from "./+types/cart";
import { getProduct } from "~/lib/api";
import { getCart, removeFromCart, commitSession } from "~/lib/cart.server";

export async function loader({ request }: Route.LoaderArgs) {
  const { cart } = await getCart(request);
  const entries = Object.entries(cart);

  const items = await Promise.all(
    entries.map(async ([id, quantity]) => {
      const product = await getProduct(id);
      return { product, quantity };
    })
  );

  const total = items.reduce((sum, item) => sum + item.product.price * item.quantity, 0);

  return { items, total };
}

export async function action({ request }: Route.ActionArgs) {
  const formData = await request.formData();
  const productId = String(formData.get("productId"));
  const session = await removeFromCart(request, productId);

  return new Response(null, {
    status: 302,
    headers: {
      Location: "/cart",
      "Set-Cookie": await commitSession(session),
    },
  });
}

export default function Cart({ loaderData }: Route.ComponentProps) {
  const { items, total } = loaderData;

  return (
    <main>
      <h1>Shopping Cart</h1>
      {items.length === 0 && <p>O carrinho está vazio.</p>}
      <ul>
        {items.map(({ product, quantity }) => (
          <li key={product.id}>
            <img src={product.thumbnail} alt={product.title} width={80} />
            <span>{product.title}</span>
            <span>Qty: {quantity}</span>
            <span>${(product.price * quantity).toFixed(2)}</span>
            <Form method="post">
              <input type="hidden" name="productId" value={product.id} />
              <button type="submit">Remover</button>
            </Form>
          </li>
        ))}
      </ul>
      <p>Total: ${total.toFixed(2)}</p>
    </main>
  );
}