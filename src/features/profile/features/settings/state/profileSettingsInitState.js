/**
 * Init state настроек профиля
 */
export const profileSettingsInitState = {
  /**
   * Звездное небо
   */
  stars: {
    // Вкл/выкл
    status:
      typeof window !== "undefined" && localStorage.getItem("stars_status")
        ? localStorage.getItem("stars_status") === "true"
        : true,
    fps: 50,
  },

  /**
   * Включен ли визуальный премиум режим
   */
  has_premium_subscription_active:
    typeof window !== "undefined"
      ? localStorage.getItem("has_premium_subscription_active") === "true"
      : "true",

  /**
   * Последняя дата окончания подписки
   */
  latest_premium_subscription_end_date: null,

  /**
   * Автопродление премиум подписки
   */
  auto_renewal_premium_subscription: null,

  /**
   * Дата окончания подписки
   */
  premium_subscription_end_date: null,

  /**
   * Премиум подписка
   */
  has_premium_subscription: null,

  /**
   * Статус взаимодействия по Telegram ключу
   */
  telegramTokenStatus: null,

  /**
   * Статус подтверждения почты пользователя
   */
  emailIsConfirmed: null,

  /**
   * Предыдущий баланс пользователя
   */
  prevBalance: null,

  /*
   * Поле для доступа старым юзерам к старым фишкам. Допустим старые пользователи могут юзать накрутку инстаграм, а новые - нет
   */
  is_resident: null,

  confetti: false,

  /**
   * Баланс пользователя
   */
  balance: null,

  /**
   * Telegram ключ
   */
  tgKey: null,

  /**
   * Почта пользователя
   */
  email: null,
};
