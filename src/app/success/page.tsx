"use client";
import { useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { useRouter } from "next/navigation";
import { auth } from "../firebase";
import { FaSpinner } from "react-icons/fa";

function SuccessPage() {
  const router = useRouter();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      console.log(user);
      if (user) {
        user
          .getIdToken(true)
          .then(() => {
            setTimeout(() => {
              router.push("/settings");
            }, 2000);
          })
          .catch((error) => {
            alert(error.message);
          });
      }
    });

    return unsubscribe;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <div className="success__page--bg">
        <div className="success__page--text">
          Payment was successful. Refreshing your information...
        </div>
        <div className="audio__book--spinner spinner__position">
          <FaSpinner />
        </div>
      </div>
    </>
  );
}

export default SuccessPage;
