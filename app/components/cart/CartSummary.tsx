import { Form } from "react-router";

type CartSummaryProps = {
  subtotal: number;
  shipping: number;
};

export function CartSummary({ subtotal, shipping }: CartSummaryProps) {
  const total = subtotal + shipping;

  return (
    <div className="w-full shrink-0 rounded-2xl border border-gray-800 p-5 md:w-100">
      <h2 className="mb-4 font-semibold">Cart Summary</h2>

      <div className="text-sm text-gray-700 flex flex-col gap-2">
        <div className="flex justify-between">
          <span>Subtotal</span>
          <span>${subtotal.toFixed(2)}</span>
        </div>
        <div className="flex justify-between">
          <span>Shipping</span>
          <span>${shipping.toFixed(2)}</span>
        </div>
        <div className="flex justify-between">
          <span>Total</span>
          <span>${total.toFixed(2)}</span>
        </div>
      </div>

      <button className="w-full mt-4 rounded bg-[#1F3044] py-2 px-4 text-sm text-white">
        Check out
      </button>
      <p className="mt-4 text-center text-xs text-[#1F3044]">
        Or pay with PayPal
      </p>

      <hr className="my-4" />

      <div>
        <label className="mb-1 block text-xs text-gray-600">Promo code</label>
        <div className="flex gap-2">
          <input
            type="text"
            placeholder="Enter code"
            className="flex-1 rounded border border-[#1F3044] px-3 py-2 text-sm placeholder-[#1F3044]"
          />
          <Form method="post">
            <button className="rounded bg-[#1F3044] px-3 py-2 text-sm text-white">
              Apply
            </button>
          </Form>
        </div>
      </div>
    </div>
  );
}
