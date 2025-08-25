import { useDispatch, useSelector } from "react-redux";
import { clearError, setToken } from "@features";
import { VAR_LINK_ROUTES } from "@vars";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

/**
 * Утилита для авторизации пользователя
 */
export const authUser = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const error = useSelector((state) => state.auth.error);

  useEffect(() => {
    if (localStorage.getItem("auth")) {
      router.push(`/${VAR_LINK_ROUTES.services}`);
      dispatch(setToken(localStorage.getItem("auth")));
    }

    if (error !== null) {
      setTimeout(() => {
        dispatch(clearError());
      }, 2000);
    }
  }, [localStorage, error, document.cookie]);
};
