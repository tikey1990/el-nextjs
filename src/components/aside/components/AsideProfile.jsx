"use client";
import {
  AsideCategoriesProfile,
  AsideBalRefill,
  AsidePremium,
  AsideBal,
} from "../components";
import { usePathname } from "next/navigation";

/**
 * Компонент бокового меню профиля
 * @returns {JSX.Element}
 * @constructor
 */
export const AsideProfile = () => {
  const pathname = usePathname();

  return (
    <>
      {/* Просмотр баланса */}
      <AsideBal />

      {/* Пополнение баланса */}
      <AsideBalRefill />

      {/* Премиум подписка */}
      <AsidePremium />

      {/* Категории */}
      <AsideCategoriesProfile />

      {pathname === "api" && (
        <div
          className="max-sm:-mt-4 sm:top-4 sm:sticky order-12"
          id="apiDocs"
        ></div>
      )}
    </>
  );
};
