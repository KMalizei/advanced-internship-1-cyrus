import { create } from "zustand";

type AuthStore = {
  email: string;
  setEmail: (email: string) => void;
};

export const useEmailStore = create<AuthStore>((set) => ({
  email: "",
  setEmail: (email) => {
    set({ email });
  },
}));
