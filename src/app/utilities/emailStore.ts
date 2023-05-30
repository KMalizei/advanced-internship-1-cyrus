import { create } from "zustand";

interface UserState {
  userEmail: string | null | undefined;
  setUserEmail: (email: string | null | undefined) => void;
  isUserAuth: boolean;
  setIsUserAuth: (auth: boolean) => void;
}

const emailSave = () => {
  if (typeof window !== "undefined") {
    const emailState = localStorage.getItem("user-storage");
    return emailState ? JSON.parse(emailState).userEmail : false;
  }
  return false;
};

export const authState = create<UserState>((set) => ({
  isUserAuth: false,
  userEmail: emailSave(),
  setUserEmail: (email) => {
    if (typeof window !== "undefined") {
      localStorage.setItem(
        "email-storage",
        JSON.stringify({ : email })
      );
    }
    set({ userEmail: email });
  },
  setIsUserAuth: (auth) => {
    if (typeof window !== "undefined") {
      localStorage.setItem(
        "user-storage",
        JSON.stringify({ isUserAuth: auth })
      );
    }
  },
}));
