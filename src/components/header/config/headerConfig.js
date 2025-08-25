"use client";
import { useAuth } from "@hooks";
import { VAR_LINK_ROUTES } from "@vars";

/**
 * Навигация в шапке
 */
export const navData = (isMobile) => {
  const { isAuth } = useAuth();

  if (isAuth)
    return [
      {
        routeName: "Промокоды",
        name: "Промокоды",
      },
      {
        link: `/${VAR_LINK_ROUTES.services}`,
        routeName: VAR_LINK_ROUTES.services,
        name: "Тарифы",
      },
      {
        link: `/${VAR_LINK_ROUTES.profile}/${VAR_LINK_ROUTES.orders}`,
        routeName: VAR_LINK_ROUTES.profile,
        name: "Профиль",
      },
      {
        routeName: "Телеграм бот",
        link: "/profile/settings",
        name: "Телеграм бот",
      },
    ];
  else {
    if (isMobile)
      return [
        {
          link: `${VAR_LINK_ROUTES.home}`,
          routeName: VAR_LINK_ROUTES.home,
          name: "Главная",
        },
        {
          link: `/${VAR_LINK_ROUTES.services}`,
          routeName: VAR_LINK_ROUTES.services,
          name: "Тарифы",
        },
      ];
    else
      return [
        {
          link: `${VAR_LINK_ROUTES.home}`,
          routeName: VAR_LINK_ROUTES.home,
          name: "Главная",
        },
        {
          link: `/${VAR_LINK_ROUTES.services}`,
          routeName: VAR_LINK_ROUTES.services,
          name: "Тарифы",
        },
      ];
  }
};
