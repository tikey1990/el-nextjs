/**
 * Утилита для яндекс метрики для отслеживания регистрации
 * @returns {*}
 */
export const utilYMRegistration = () =>
  ym(78100309, "reachGoal", "REGISTRATION");

/**
 * Утилита для яндекс метрики для отслеживания успешно завершенных заказов
 * @param {string} orderPrice - Цена выполненного заказа
 * @returns {*}
 */
export const utilYMSuccessfulOrderCreation = (orderPrice) =>
  ym(78100309, "reachGoal", "SUCCESSFUL_ORDER_CREATION", {
    order_price: `${orderPrice}`,
    currency: "RUB",
  });
