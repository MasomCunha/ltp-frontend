import { Link } from "react-router";
import { Search, User, ShoppingBag } from "lucide-react";

type HeaderProps = {
  cartCount?: number;
};

export function Header({ cartCount = 0 }: HeaderProps) {
  return (
    <header className="border-b border-gray-200 bg-white">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        <Link to="/" className="text-lg font-bold tracking-wide">
          THE ONLINE STORE
        </Link>

        <nav className="hidden gap-8 text-sm text-gray-700 md:flex">
          <Link to="/">Home</Link>
          <Link to="/">Shop</Link>
          <Link to="/">Deals</Link>
          <Link to="/">Contact</Link>
          <Link to="/">Account</Link>
        </nav>

        <div className="flex items-center gap-4 text-gray-700">
          <button aria-label="Search">
            <Search size={20} />
          </button>
          <Link to="/account" aria-label="Account">
            <User size={20} />
          </Link>
          <Link to="/cart" aria-label="Cart" className="relative">
            <ShoppingBag size={20} />
            {cartCount > 0 && (
              <span className="absolute -right-2 -top-2 flex h-4 w-4 items-center justify-center rounded-full bg-black text-[10px] text-white">
                {cartCount}
              </span>
            )}
          </Link>
        </div>
      </div>
    </header>
  );
}