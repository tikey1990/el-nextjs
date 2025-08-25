"use client";
import { useTypeDevice, useAuth } from "@hooks";

import { Button } from "flowbite-react";

import {
  AsideCategoriesServices,
  AsideBalRefill,
  AsidePremium,
  AsideBal,
} from "../components";
import { useRouter } from "next/navigation";

/**
 * Боковая панель
 * @returns {JSX.Element}
 * @constructor
 */
export const AsidePage = () => {
  const { isAuth } = useAuth();
  const { isMobile } = useTypeDevice();
  const router = useRouter();

  return (
    <>
      {/* Просмотр баланса */}
      <AsideBal />

      {/* Пополнение баланса */}
      <AsideBalRefill />

      {/* Премиум подписка */}
      <AsidePremium />

      {!isAuth && !isMobile && (
        <div className="container__item item-auth">
          <Button
            onClick={() => router.push("/register")}
            color="primary"
            size="md"
          >
            Регистрация
          </Button>
          <Button
            onClick={() => router.push("/auth")}
            color="secondaryTransparent"
            size="md"
          >
            Вход
          </Button>
        </div>
      )}
    </>
  );
};
