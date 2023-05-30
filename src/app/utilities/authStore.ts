import create from "zustand";

type AuthStore = {
  isUserAuth: boolean;
  setIsUserAuth: (isAuth: boolean) => void;
};

export const useAuthStore = create<AuthStore>((set) => ({
  isUserAuth: false,
  setIsUserAuth: (isAuth) => set({ isUserAuth: isAuth }),
}));
