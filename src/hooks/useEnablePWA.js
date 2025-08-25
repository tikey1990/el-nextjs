"use client";
import { useEffect, useState } from "react";

export const useEnablePWA = () => {
  const [isPWA, setIsPWA] = useState(false);

  useEffect(() => {
    const setPWA = () => {
      const urlParams = new URLSearchParams(window.location.search);
      const source = urlParams.get("source");

      if (source === "pwa") {
        setIsPWA(true);
      } else {
        const isStandalone =
          window.matchMedia("(display-mode: standalone)").matches ||
          window.navigator.standalone ||
          document.referrer.includes("homescreen");
        setIsPWA(isStandalone);
      }
    };
    const mql = window.matchMedia("(display-mode: standalone)");

    mql.addEventListener("change", setPWA);
    setPWA();

    return () => mql.removeEventListener("change", setPWA);
  }, []);

  return { isEnablePWA: isPWA };
};
