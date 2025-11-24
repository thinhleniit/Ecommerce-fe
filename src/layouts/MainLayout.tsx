import type { ReactNode } from "react";
import { useAuth } from "../store/authStore";
import { useNavigate } from "react-router-dom";

export default function MainLayout({ children }: { children: ReactNode }) {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <aside className="w-64 bg-gray-900 text-white p-4 space-y-4">
        <h2 className="text-xl font-bold mb-4">Ecommerce Admin</h2>

        <nav className="flex flex-col space-y-2">
          <a href="/admin/dashboard" className="hover:underline">
            Dashboard
          </a>
          <a href="/admin/products" className="hover:underline">
            Products
          </a>
        </nav>

        {/* Logout */}
        <button
          onClick={handleLogout}
          className="mt-6 w-full text-left text-red-300 hover:text-red-500 transition"
        >
          Logout
        </button>
      </aside>

      <main className="flex-1 p-6">{children}</main>
    </div>
  );
}
