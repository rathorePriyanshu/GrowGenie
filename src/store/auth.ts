import { create } from "zustand";
import type { User } from "../servies/types";

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  authInitialized: boolean;
  loading: boolean;

  setAuth: (user: User) => void;
  clearAuth: () => void;
  setInitialized: () => void;
  setLoading: (value: boolean) => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  isAuthenticated: false,
  authInitialized: false,
  loading: false,

  setAuth: (user: User) => {
    set({ user, isAuthenticated: true });
  },
  clearAuth: () => {
    set({ user: null, isAuthenticated: false });
  },
  setInitialized: () => {
    set({ authInitialized: true });
  },
  setLoading: (value) => {
    set({ loading: value });
  },
}));
