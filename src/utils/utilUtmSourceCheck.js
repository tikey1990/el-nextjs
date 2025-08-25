"use client";
import { useEffect } from "react";
import { useAuth } from "@hooks";
import { useSearchParams } from "next/navigation";

/**
 * Утилита для отслеживания места откуда пришел пользователь
 */
export const utilUtmSourceCheck = () => {
  const { isAuth } = useAuth();
  const searchParams = useSearchParams();

  useEffect(() => {
    if (searchParams.get("utm_source") && !isAuth)
      localStorage.setItem("utm_source", searchParams.get("utm_source"));
  }, [searchParams]);
};
