import { createCookieSessionStorage } from "react-router";

type CartData = {
  cart: Record<string, number>;
};

const { getSession, commitSession } = createCookieSessionStorage<CartData>({
  cookie: {
    name: "__cart",
    httpOnly: true,
    sameSite: "lax",
    path: "/",
    secrets: ["ltp-frontend"]
  },
});

export async function getCart(request: Request) {
  const session = await getSession(request.headers.get("Cookie"));
  const cart = session.get("cart") ?? {};
  return { session, cart };
}

export async function addToCart(request: Request, productId: string, quantity = 1) {
  const { session, cart } = await getCart(request);
  cart[productId] = (cart[productId] ?? 0) + quantity;
  session.set("cart", cart);
  return session;
}

export async function updateCartItem(request: Request, productId: string, quantity: number) {
  const { session, cart } = await getCart(request);
  if (quantity <= 0) {
    delete cart[productId];
  } else {
    cart[productId] = quantity;
  }
  session.set("cart", cart);
  return session;
}

export { commitSession };