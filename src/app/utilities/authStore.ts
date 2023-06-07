import { create } from "zustand";

type AuthStore = {
  isUserAuth: boolean;
  setIsUserAuth: (isUserAuth: boolean) => void;
};

export const useAuthStore = create<AuthStore>((set) => {
  if (typeof window !== "undefined" && typeof document !== "undefined") {
    return {
      isUserAuth: localStorage.getItem("auth-storage") === "true" || false,
      setIsUserAuth: (isUserAuth) => {
        set({ isUserAuth: isUserAuth });
        localStorage.setItem("auth-storage", isUserAuth.toString());
      },
    };
  }

  return {
    isUserAuth: false,
    setIsUserAuth: () => {},
  };
});
