"use client";
import { useParams } from "next/navigation";

/**
 * Получение информации о номере страницы
 */
export const useGetPage = () => {
  const { params } = useParams();

  return { page: params?.length ? Number(params[0]) : 1 };
};
