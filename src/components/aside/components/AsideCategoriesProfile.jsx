"use client";
import { VAR_HAS_PREMIUM_VISUAL_MODE, VAR_LINK_ROUTES } from "@vars";
import { useTypeDevice } from "@hooks";
import classnames from "classnames";

import { IconReferal } from "../assets/icons";
import { profileCategories } from "../utils";
import Link from "next/link";
import { usePathname } from "next/navigation";

/**
 * Компонент категорий профиля
 * @returns {JSX.Element}
 * @constructor
 */
export const AsideCategoriesProfile = () => {
  const pathname = usePathname();
  const { isMobile } = useTypeDevice();
  const isCheckedVisualMode = VAR_HAS_PREMIUM_VISUAL_MODE();

  const categoriesData = [
    { name: "Мои заказы", path: "/profile/orders" },
    { name: "Автоуслуги", path: "/profile/auto_services" },
    { name: "Шаблоны", path: "/profile/templates" },
    { name: "Рефералы", path: "/profile/ref" },
    { name: "Настройки", path: "/profile/settings" },
    { name: "API", path: "/profile/api" },
    { name: "Помощь", path: "/profile/faq" },
  ];
  const renderCategoriesProfiles = () => {
    return categoriesData.map((elem, index) => (
      <Link
        className={`container__item${elem.path === pathname ? " active" : ""}`}
        href={elem.path}
        key={index}
      >
        {profileCategories(elem, false)}
        <p className="container__item-text">{elem.name}</p>
      </Link>
    ));
  };

  const classWrapperCategories = classnames(
    "aside__container container--categs",
    { "aside-bg-premium": isCheckedVisualMode },
  );

  return (
    <>
      {/* Категории */}
      <div className={classWrapperCategories}>{renderCategoriesProfiles()}</div>

      {/* Реферальный блок */}
      {!isMobile && (
        <Link
          className="aside__container container--referal cursor-pointer transition-all ease-in duration-100 order-12"
          href={VAR_LINK_ROUTES.ref}
        >
          <IconReferal className="referal-img" />

          <p className="referal-title text text-color-black text-type-bold text-size-md">
            Приглашайте друзей <br />и зарабатывайте деньги
          </p>
          <p className="referal-text text text-color-black text-size-sm">
            Получайте до 15% с каждого пополнения ваших реферралов
          </p>
        </Link>
      )}
    </>
  );
};
