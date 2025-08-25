"use client";
import { useDispatch, useSelector } from "react-redux";
import { clearError, setToken } from "@features";
import { VAR_LINK_ROUTES } from "@vars";
import { useEffect } from "react";
import { useAuth } from "@hooks";
import { useRouter } from "next/navigation";

/**
 * Утилита для перенаправления пользователя после авторизации или регистрации
 */
export const utilRegRedirect = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const { isAuth } = useAuth();
  const error = useSelector((state) => state.auth.error);

  useEffect(() => {
    if (isAuth) {
      if (localStorage.getItem("regRedirect") === "true") {
        dispatch(setToken(localStorage.getItem("auth")));
        router.push(`/${VAR_LINK_ROUTES.profile}/${VAR_LINK_ROUTES.deposit}`);
        localStorage.setItem("regRedirect", "false");
      }
    }

    if (error !== null) {
      setTimeout(() => {
        dispatch(clearError());
      }, 2000);
    }
  }, [isAuth, localStorage, document.cookie]);
};
