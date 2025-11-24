import { create } from "zustand";

export interface AuthState {
  token: string | null;
  role: string | null;

  setToken: (token: string) => void;
  setRole: (role: string) => void;
  logout: () => void;
}

export const useAuth = create<AuthState>((set) => ({
  token: localStorage.getItem("token"),
  role: localStorage.getItem("role"),

  setToken: (token: string) => {
    localStorage.setItem("token", token);
    set({ token });
  },

  setRole: (role: string) => {
    localStorage.setItem("role", role);
    set({ role });
  },

  logout: () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    set({ token: null, role: null });
  },
}));
