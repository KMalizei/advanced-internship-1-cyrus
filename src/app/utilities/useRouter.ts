import React, { useState, useEffect } from "react";
import { useRouter as originalUseRouter } from "next/router";

function useRouter() {
  const [isReady, setIsReady] = useState(false);
  const router = originalUseRouter();

  useEffect(() => {
    if (router.asPath !== router.route) {
      setIsReady(true);
    }
  }, [router]);

  return isReady ? router : { ...router, pathname: "" };
}

export default useRouter;
