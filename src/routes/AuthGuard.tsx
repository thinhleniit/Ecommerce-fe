import { Navigate } from "react-router-dom";
import { useAuth } from "../store/authStore";
import type { ReactNode } from "react";

interface Props {
  children: ReactNode;
  roles?: string[];
}

export default function AuthGuard({ children, roles }: Props) {
  const { token, role } = useAuth();

  if (!token) return <Navigate to="/login" replace />;

  const currentRole = role?.toLowerCase();

  if (roles && !roles.map((r) => r.toLowerCase()).includes(currentRole!)) {
    return <Navigate to="/unauthorized" replace />;
  }

  return <>{children}</>;
}
