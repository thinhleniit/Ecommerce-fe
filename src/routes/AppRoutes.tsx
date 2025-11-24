import { createBrowserRouter, RouterProvider, Outlet } from "react-router-dom";

import LoginPage from "../pages/LoginPage";
import DashboardPage from "../pages/DashboardPage";
import ProductListPage from "../pages/ProductListPage";
import ProductCreatePage from "../pages/ProductCreatePage";
import ProductEditPage from "../pages/ProductEditPage";
import CartPage from "../pages/CartPage";
import StorePage from "../pages/ProductStorePage";
import MainLayout from "../layouts/MainLayout";
import UserLayout from "../layouts/UserLayout";
import AuthGuard from "./AuthGuard";

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <UserLayout>
        <Outlet />
      </UserLayout>
    ),
    children: [
      { path: "/", element: <StorePage /> },
      { path: "/cart", element: <CartPage /> },
      { path: "/login", element: <LoginPage /> },
    ],
  },

  // ADMIN + STAFF
  {
    path: "/admin",
    element: (
      <AuthGuard roles={["Admin", "Staff"]}>
        <MainLayout>
          <Outlet />
        </MainLayout>
      </AuthGuard>
    ),
    children: [
      { path: "dashboard", element: <DashboardPage /> },
      { path: "products", element: <ProductListPage /> },
    ],
  },

  // Admin only
  {
    path: "/admin/manage",
    element: (
      <AuthGuard roles={["Admin"]}>
        <MainLayout>
          <Outlet />
        </MainLayout>
      </AuthGuard>
    ),
    children: [
      { path: "create", element: <ProductCreatePage /> },
      { path: "edit/:id", element: <ProductEditPage /> },
    ],
  },
]);

export default function AppRoutes() {
  return <RouterProvider router={router} />;
}
