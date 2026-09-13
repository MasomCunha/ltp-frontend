import { Links, Meta, Outlet, Scripts, ScrollRestoration } from "react-router";
import { Header } from "~/components/layout/Header";
import { getCart } from "~/lib/cart.server";
import type { Route } from "./+types/root";
import "./app.css";

export async function loader({ request }: Route.LoaderArgs) {
  const { cart } = await getCart(request);
  const cartCount = Object.values(cart).reduce((sum, qty) => sum + qty, 0);
  return { cartCount };
}

export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body>
        {children}
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}

export default function App({ loaderData }: Route.ComponentProps) {
  return (
    <>
      <Header cartCount={loaderData?.cartCount ?? 0} />
      <Outlet />
    </>
  );
}