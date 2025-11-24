import type { ReactNode } from "react";
import { Link } from "react-router-dom";
import { useCart } from "../store/cartStore";

export default function UserLayout({ children }: { children: ReactNode }) {
  const cartItems = useCart((s) => s.items);
  const itemCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow p-4 flex items-center justify-between">
        <Link to="/" className="text-xl font-bold">
          Ecommerce Store
        </Link>

        <div className="flex items-center gap-4">
          {/* Cart Icon */}
          <Link to="/cart" className="relative">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-7 h-7 text-gray-700 hover:text-gray-900 transition"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2 9m12-9l2 9m-8-4h4"
              />
            </svg>

            {itemCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-600 text-white text-xs px-1.5 py-0.5 rounded-full">
                {itemCount}
              </span>
            )}
          </Link>

          {/* Admin Login Button */}
          <Link
            to="/login"
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
          >
            Admin Login
          </Link>
        </div>
      </header>

      <main className="p-6">{children}</main>
    </div>
  );
}
