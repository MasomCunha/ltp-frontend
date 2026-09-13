import { Form, useNavigation } from "react-router";
import type { Route } from "./+types/product-detail";
import { getProduct } from "~/lib/api";
import { addToCart, commitSession } from "~/lib/cart.server";

export function meta({ data }: Route.MetaArgs) {
  return [{ title: data?.product.title ?? "Product" }];
}

export async function loader({ params }: Route.LoaderArgs) {
  const product = await getProduct(params.id!);
  return { product };
}

export async function action({ request, params }: Route.ActionArgs) {
  const session = await addToCart(request, params.id!, 1);
  return new Response(null, {
    status: 302,
    headers: {
      Location: `/products/${params.id}`,
      "Set-Cookie": await commitSession(session),
    },
  });
}

export default function ProductDetail({ loaderData }: Route.ComponentProps) {
  const { product } = loaderData;
  const navigation = useNavigation();
  const isAdding = navigation.state === "submitting";

  return (
    <main>
      <img src={product.thumbnail} alt={product.title} width={300} />
      <h1>{product.title}</h1>
      <p>{product.brand}</p>
      <p>{product.category}</p>
      <p>{product.description}</p>
      <p>${product.price}</p>
      <p>Rating: {product.rating}</p>
      <p>Stock: {product.stock}</p>

      <Form method="post">
        <button type="submit" disabled={isAdding}>
          {isAdding ? "A adicionar..." : "Add to cart"}
        </button>
      </Form>
    </main>
  );
}