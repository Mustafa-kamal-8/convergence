import { create } from "zustand";

interface AuthState {
  isAuth: boolean;
  user: any | null;
  setIsAuth: (state: boolean, user: null) => void;
}

export const useAuth = create<AuthState>((set) => ({
  isAuth: false,
  user: null,
  setIsAuth: (state: boolean, user = null) => set({ isAuth: state, user }),
}));
