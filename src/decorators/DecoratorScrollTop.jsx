"use client";
import { useLayoutEffect } from "react";
import { usePathname } from "next/navigation";

/**
 * Компонент декоратор для проскролливания страницы при переходе между страницами приложения
 * @param children
 * @returns {*}
 * @constructor
 */
export const DecoratorScrollTop = ({ children }) => {
  const pathname = usePathname();

  useLayoutEffect(() => {
    if (pathname !== "/profile/services")
      document.querySelector(".app").scrollTo({
        behavior: "instant", // Optional if you want to skip the scrolling animation
        left: 0,
        top: 0,
      });
  }, [pathname]);
  return children;
};
