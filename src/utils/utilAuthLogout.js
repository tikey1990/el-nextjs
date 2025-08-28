import {
  toggleHasPremiumSubscriptionActive,
  setCreateTemplate,
  setSubscription,
  clearMassOrders,
  setIsResident,
  setTemplates,
  setCofetti,
  setToken,
  logout,
} from "@features";
import { deleteCookie, setCookie } from "@utils";

/**
 * Утилита для выхода из аккаунта
 * @param dispatch - Dispatch
 * @param navigate - Navigate
 */
export const utilAuthLogout = (dispatch, navigate) => {
  // localStorage.removeItem("auth");
  deleteCookie("auth");
  dispatch(logout());
  dispatch(clearMassOrders());
  dispatch(setIsResident(null));
  dispatch(
    setSubscription({
      latest_premium_subscription_end_date: null,
      auto_renewal_premium_subscription: null,
      premium_subscription_end_date: null,
      has_premium_subscription: null,
    }),
  );
  dispatch(setTemplates(null));
  dispatch(setCreateTemplate(null));
  navigate("/");
};

/**
 * Утилита для обновления токена пользователя
 * @param {string} token - Токен пользователя
 * @param dispatch - Dispatch
 */
export const utilRefreshLoginToken = (token, dispatch) => {
  localStorage.setItem("auth", token);
  setCookie("auth", token);
  dispatch(setToken(token));
};

export const utilRegConfetti = (dispatch, data) => {
  if (data?.received_premium) {
    dispatch(setCofetti(true));
    localStorage.setItem("has_premium_subscription_active", "true");
    dispatch(toggleHasPremiumSubscriptionActive({ force: true }));
  }
};

export const utilAuthSetTokens = (data) => {
  localStorage.removeItem("utm_source");

  localStorage.setItem("auth", data.token);
  localStorage.setItem("regRedirect", "true");
  localStorage.removeItem("ref");

  setCookie("auth", data.token, {
    expires: new Date(
      new Date().getFullYear() + 2,
      new Date().getMonth(),
      new Date().getDate(),
    ).toUTCString(),
    domain: "easyliker.space",
  });
  setCookie("auth", data.token, {
    expires: new Date(
      new Date().getFullYear() + 2,
      new Date().getMonth(),
      new Date().getDate(),
    ).toUTCString(),
    domain: ".easyliker.space",
  });
  setCookie("auth", data.token, {
    expires: new Date(
      new Date().getFullYear() + 2,
      new Date().getMonth(),
      new Date().getDate(),
    ).toUTCString(),
    domain: "easyliker.ru",
  });
  setCookie("auth", data.token, {
    expires: new Date(
      new Date().getFullYear() + 2,
      new Date().getMonth(),
      new Date().getDate(),
    ).toUTCString(),
    domain: ".easyliker.ru",
  });
  setCookie("auth", data.token, {
    expires: new Date(
      new Date().getFullYear() + 2,
      new Date().getMonth(),
      new Date().getDate(),
    ).toUTCString(),
  });
};
