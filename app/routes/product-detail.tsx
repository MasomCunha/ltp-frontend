import { useNavigation } from "react-router";
import type { Route } from "./+types/product-detail";
import { getProduct } from "~/lib/api";
import { addToCart, commitSession } from "~/lib/cart.server";
import { ProductGallery } from "~/components/product/ProductGallery";
import { ProductDetails } from "~/components/product/ProductDetails";
import { PageWrapper } from "~/components/layout/PageWrapper";

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
    headers: { Location: `/products/${params.id}`, "Set-Cookie": await commitSession(session) },
  });
}

export default function ProductDetail({ loaderData }: Route.ComponentProps) {
  const { product } = loaderData;
  const navigation = useNavigation();
  const isAdding = navigation.state === "submitting";

  return (
    <PageWrapper>
      <ProductGallery image={product.thumbnail} alt={product.title} />
      <ProductDetails product={product} isAdding={isAdding} />
    </PageWrapper>
  );
}