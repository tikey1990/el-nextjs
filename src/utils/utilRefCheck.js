"use client";
import { useEffect } from "react";
import { useAuth } from "@hooks";
import { useSearchParams } from "next/navigation";

/**
 * Утилита для отслеживания ref-кода.
 */
export const utilRefCheck = () => {
  const { isAuth } = useAuth();
  const params = useSearchParams();

  useEffect(() => {
    if (params.get("ref") && !isAuth)
      localStorage.setItem("ref", params.get("ref"));
  }, [location, params]);
};
