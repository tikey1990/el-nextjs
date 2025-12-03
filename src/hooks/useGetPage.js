"use client";
import { useSearchParams } from "next/navigation";

/**
 * Получение информации о номере страницы
 */
export const useGetPage = () => {
  const params = useSearchParams();

  const page = Number(params.get("page") || 1);

  return { page };
};
