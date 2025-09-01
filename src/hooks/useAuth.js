"use client";
import { useContext, useMemo } from "react";
import { useAppSelector } from "@/hooks/useRedux";
import { AuthContext } from "@/providers/auth";

/**
 *
 */
export const useAuth = () => {
  const auth = useAppSelector((state) => state.auth.auth);
  const { isAuth } = useContext(AuthContext);
  return useMemo(() => ({ isAuth: Boolean(auth) || isAuth }), [auth, isAuth]);
};
