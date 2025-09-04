import { useSelector } from "react-redux";

/**
 * Id клиента для авторизации через google
 */
export const VAR_AUTH_GOOGLE_CLIENT_ID =
  "715452114407-avbvdiadde5antrgfmtr77ejnffnva6f.apps.googleusercontent.com";

/**
 * Находится ли приложение в режиме продакшен
 */
export const VAR_IS_MODE_PROD = true;
// import.meta.env && import.meta.env?.VITE_IS_MODE_PROD === "true";

/**
 * Находится ли приложение в режиме продакшен
 */
export const VAR_IS_MODE_PRED_PROD =
  import.meta.env && import.meta.env?.VITE_IS_MODE_PRED_PROD === "true";

/**
 * Находится ли приложение в режиме продакшена или предпродакшена
 */
export const VAR_IS_MODE_PREDPROD_OR_PROD =
  VAR_IS_MODE_PROD || VAR_IS_MODE_PRED_PROD;

/**
 * URL для отправки данных на сервер
 */
export const VAR_API_URL = "";

/**
 * Ключ google recaptcha
 * @type {string}
 */
export const VAR_GOOGLE_RECAPTCHA_KEY =
  "6LfgoMwZAAAAAGc3ETwpa3WpDqIKxF9LCGCU-TNF";

/**
 * Тестовое значение google recaptcha
 * @type {string}
 */
export const VAR_TEST_RECAPTCHA_VALUE =
  "aw90d8aw890d7awd789wa6daw78d56aw678d5awd56784awd5684wad978a6d789aww789d6aw";

/**
 * Включен ли визуальный премиум режим
 */
export const VAR_HAS_PREMIUM_VISUAL_MODE = () => {
  const has_premium_subscription = useSelector(
    (state) => state.profileSettings.has_premium_subscription,
  );
  const has_premium_subscription_active = useSelector(
    (state) => state.profileSettings.has_premium_subscription_active,
  );

  return has_premium_subscription && has_premium_subscription_active;
};

/**
 * Конфиг с именами маршрутов
 */
export const VAR_LINK_ROUTES = {
  autoServices: "auto_services",
  templates: "templates",
  agreement: "agreement",
  register: "register",
  settings: "settings",
  services: "services",
  servicesNew: "fees",
  privacy: "privacy",
  deposit: "deposit",
  history: "history",
  profile: "profile",
  logout: "logout",
  orders: "orders",
  offer: "offer",
  login: "auth",
  info: "info",
  api: "api",
  faq: "faq",
  ref: "ref",
  home: "/",
};

/**
 * Конфиг со ссылками на социальные сети
 * @type {{tg: string, vk: string, inst: string}}
 */
export const VAR_SOCIAL_LINKS = {
  tg: "tg://resolve?domain=Stream_Promotion_bot",
  inst: "https://www.instagram.com/easyliker.ru",
  tgInfo: "https://t.me/easyliker_info",
  tgBot: "https://t.me/EasyLikerBot",
  vk: "https://vk.com/easyliker_ru",
  email: "support@easyliker.ru",
};
