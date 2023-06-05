import { onIdTokenChanged, getAuth } from "firebase/auth";
import { useEffect, useState } from "react";
import { User } from "firebase/auth";

export default function usePremiumStatus(user: User | null) {
  const [premiumStatus, setPremiumStatus] = useState<boolean>(false);

  useEffect(() => {
    const auth = getAuth();

    return onIdTokenChanged(auth, async (user) => {
      if (user) {
        const tokenResult = await user.getIdTokenResult();
        if (tokenResult.claims.stripeRole === "premium") {
          setPremiumStatus(true);
        }
      } else {
        setPremiumStatus(false);
      }
    });
  }, [user]);

  return premiumStatus;
}
