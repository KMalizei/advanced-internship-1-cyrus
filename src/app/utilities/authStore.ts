import { create } from "zustand";

interface UserState {
  userEmail: string | null;
  setUserEmail: (email: string | null) => void;
  isUserAuth: boolean;
  setIsUserAuth: (auth: boolean) => void;
}

const emailState = () => {
  if (typeof window !== "undefined") {
    const emailState = localStorage.getItem("user-storage");
    return emailState ? JSON.parse(emailState).userEmail : false;
  }
  return false;
};

export const authState = create<UserState>((set) => ({
  isUserAuth: false,
  userEmail: emailState(),
  setUserEmail: (email) =>{ 
    if (typeof window !== "undefined") {
      localStorage.setItem(
        "user-storage",
        JSON.stringify({ userEmail: email })
      );
    }
    set({ userEmail: email });
  },
  setIsUserAuth: (auth) => set({ isUserAuth: auth }),
}));
