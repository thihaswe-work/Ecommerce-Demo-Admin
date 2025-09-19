import { create } from "zustand";
import { apiClient } from "@/api/client";

interface AuthState {
  user: any | null;
  setUser: (user: any) => void;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
}

export const useAuthStore = create<AuthState>((set) => ({
  user:
    typeof window !== "undefined"
      ? JSON.parse(localStorage.getItem("user") || "null")
      : null,

  setUser: (user) => {
    localStorage.setItem("user", JSON.stringify(user));
    set({ user });
  },

  login: async (email, password) => {
    try {
      const res = await apiClient.post("/auth/login", { email, password });
      console.log(res.data.user); // user info
      console.log("cookie", document.cookie);
      set({ user: res.data.user });
      localStorage.setItem("user", JSON.stringify(res.data.user));
    } catch (err: any) {
      throw new Error(err.response?.data?.message || "Login failed");
    }
  },

  logout: async () => {
    try {
      await apiClient.post("/auth/logout"); // clear cookie on backend
    } catch (err) {
      console.error("Logout failed", err);
    } finally {
      set({ user: null });
      localStorage.removeItem("user");
    }
  },
}));
