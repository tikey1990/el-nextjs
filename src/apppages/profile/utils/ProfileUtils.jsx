"use client";
import { useGetBalanceMutation } from "@features";
import { useEffect } from "react";

export const utilRefreshBalance = () => {
  const [getBalance] = useGetBalanceMutation();

  useEffect(() => {
    const interval = setInterval(() => {
      getBalance();
    }, 5000);

    return () => clearInterval(interval);
  }, [getBalance]);
};
