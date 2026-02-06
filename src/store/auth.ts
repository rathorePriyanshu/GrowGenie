import { create } from "zustand";
import type { User } from "../servies/types";

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  authInitialized: boolean;

  setAuth: (user: User) => void;
  clearAuth: () => void;
  setInitialized: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  isAuthenticated: false,
  authInitialized: false,

  setAuth: (user: User) => {
    set({ user, isAuthenticated: true });
  },
  clearAuth: () => {
    set({ user: null, isAuthenticated: false });
  },
  setInitialized: () => {
    set({ authInitialized: true });
  },
}));
