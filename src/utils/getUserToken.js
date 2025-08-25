/**
 * Util для получения токена пользователя
 */
export const getUserToken =
  typeof window !== "undefined" && localStorage.getItem("auth")
    ? localStorage.getItem("auth")
    : null;
