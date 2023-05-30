import { create } from "zustand";

type AuthStore = {
  email: string | null;
  setEmail: (email: string | null) => void;
};

export const useEmailStore = create<AuthStore>((set) => ({
  email: null,
  setEmail: (email) => {
    set({ email });
  },
}));
