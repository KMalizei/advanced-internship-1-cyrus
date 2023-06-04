import { useState, useEffect } from "react";
import { getAuth, User } from "firebase/auth";
import isUserPremium from "./isUserPremium";
import { auth } from "../firebase";

export default function usePremiumStatus(user: User | null) {
  const [premiumStatus, setPremiumStatus] = useState<boolean>(false);

  useEffect(() => {
    if (user) {
      const checkPremiumStatus = async function () {
        const status = await isUserPremium();
        setPremiumStatus(status);
      };
      checkPremiumStatus();
    }
  }, [user]);

  return premiumStatus;
}
