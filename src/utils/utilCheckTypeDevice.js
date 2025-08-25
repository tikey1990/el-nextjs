"use client";
import { useTypeDevice } from "@hooks";
import { useEffect } from "react";

export const utilCheckTypeDevice = () => {
  const typeDevice = useTypeDevice();

  useEffect(() => {
    Object.keys(typeDevice).forEach((key) =>
      localStorage.setItem(key, typeDevice[key]),
    );
  }, []);
};
