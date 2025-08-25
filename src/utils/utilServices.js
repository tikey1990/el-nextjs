"use client";
import { setMassOrdersStatus, setMassOrder, setBalance } from "@features";
import { utilYMSuccessfulOrderCreation } from "@utils/ym/index.js";
import { VAR_IS_MODE_PREDPROD_OR_PROD } from "@vars";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";

/**
 * Утилита для форматирования ссылок.
 * @param {[]} links - Массив ссылок.
 * @returns {*[]}
 */
export const utilServicesFormattingCustomLinks = (links) => {
  let processedLinks = [];

  links?.forEach((link) => {
    const parts = link.split(" | ");
    const url = parts[0];

    processedLinks.push(url);
  });

  return processedLinks;
};

/**
 * Подсчет итогового количества всех ссылок для формирования суммы заказа
 * @param links
 * @param count
 * @returns {number}
 */
export const utilServicesCalcCountInMassLinks = (links, count) => {
  let total = 0;

  links?.forEach((elem) => {
    const isSeparatorPresent = elem.includes(" | ");

    if (isSeparatorPresent) {
      const elements = elem.split(" | ");
      const lastElem = elements[1];

      if (lastElem) total += Number(lastElem);
    } else if (elem.trim().length > 0) {
      total += count;
    }
  });

  return total;
};

/**
 * Утилита для отслеживания и изменения статуса массового заказа
 * @param createOrder
 * @param createOrderQuery
 * @param massOrders
 */
export const utilServicesChangeStatusMassOrder = (
  createOrder,
  createOrderQuery,
  massOrders,
) => {
  const { originalArgs, isSuccess, isLoading } = createOrderQuery;
  const dispatch = useDispatch();

  // Массив id заказов, которые поставлены на паузу
  const [pausedOrder, setPausedOrder] = useState([]);

  // Если заказ массовый
  const isMassOrder = originalArgs?.source === "site";

  /**
   * Меняем статусы заказов
   */
  useEffect(() => {
    if (isMassOrder) {
      if (!isLoading && isSuccess) {
        const isAutoService = originalArgs?.type.includes("auto_");
        toast.success(
          isAutoService ? "Канал отслеживается!" : "Заказ успешно создан",
        );
      }
    }
  }, [createOrderQuery]);

  /**
   * Меняем статус массовых заказов
   */
  useEffect(() => {
    setPausedOrder([]);

    // Перебираем все массовые заказы
    massOrders.forEach((order) => {
      const isEveryDataNotActive = order?.data.every(
        (elem) => elem?.status !== "active",
      );
      // Если все заказы завершены и заказ не на паузе
      const isEveryDataFinished = order?.data.every(
        (elem) => elem?.status === "finished" && order?.status !== "paused",
      );
      // Если есть заказы с ошибками и заказ не на паузе
      const isSomeDataError = order?.data.some(
        (elem) =>
          elem?.status === "error" &&
          order?.status !== "paused" &&
          isEveryDataNotActive,
      );

      if (order?.status === "paused")
        setPausedOrder((state) => [order?.id, ...state]);

      if (isEveryDataFinished)
        dispatch(setMassOrdersStatus({ status: "finished", id: order?.id }));
      if (isSomeDataError)
        dispatch(setMassOrdersStatus({ status: "error", id: order?.id }));
    });
  }, [massOrders]);

  /**
   * Создаем заказы
   */
  useEffect(() => {
    // Массив таймаутов
    const timeoutIds = [];

    /**
     * Проходимся по всем массовым заказам и создаем очередь заказов.
     * Если создать 2 заказа одновременно — то заказы будут выполняться по очереди.
     */
    massOrders.forEach((order) => {
      // Если заказ остановлен
      const isIdOrderPaused = pausedOrder?.find((elem) => elem === order?.id);
      // Кол-во активных заказов
      const countActiveOrders = order?.data?.filter(
        (elem) => elem?.status === "active",
      ).length;
      // Если заказа активный и не поставлен на паузу
      const isOrderActiveAndNotPaused =
        order.status === "active" && !isIdOrderPaused;
      /**
       * Если есть активные заказы и заказ выполнен с ошибкой.
       * В случаях, когда заказ завершен, но с ошибками, т.е пользователь захотел перезагрузить заказ
       */
      const isFindOrdersActiveAndErrorOrder =
        countActiveOrders > 0 && order.status === "error";

      if (isOrderActiveAndNotPaused || isFindOrdersActiveAndErrorOrder) {
        let counterDelay = 0;

        order?.data.forEach((elem) => {
          if (elem.status === "active") {
            counterDelay += 400;

            const timeoutId = setTimeout(() => {
              // Создаем заказ
              createOrder({
                ...elem,
                status: undefined,
                price: undefined,
                id: undefined,
              }).then((response) => {
                const data = response?.data?.data;

                const errorMessage = VAR_IS_MODE_PREDPROD_OR_PROD
                  ? response?.error?.data?.error
                  : response?.error?.data;

                if (data) {
                  dispatch(
                    setMassOrder({
                      currBal: data?.balance,
                      status: "finished",
                      link: data?.link,
                      newId: data?.id,
                      id: elem?.id,
                    }),
                  );
                  utilYMSuccessfulOrderCreation(data?.price);
                } else {
                  dispatch(
                    setMassOrder({
                      errorMessage: errorMessage,
                      id: `${elem?.id}`,
                      status: "error",
                    }),
                  );
                }
              });

              dispatch(setMassOrder({ status: "loading", id: elem?.id }));
            }, counterDelay); // Интервал между запросами

            // Кидаем в массив таймаут
            timeoutIds.push(timeoutId);
          }
        });
      }
    });

    /**
     * Реализует функцию паузы / возобновления заказов
     */
    return () => {
      // Кидаем в массив таймаут
      timeoutIds.forEach((id) => clearTimeout(id));
    };
  }, [massOrders.length, pausedOrder]);
};

/**
 * Утилита для отслеживания заказа
 * @param createOrderQuery
 * @param getValues
 * @param reset
 */
export const utilServicesCheckOrder = (createOrderQuery, getValues, reset) => {
  const { originalArgs, isSuccess, isLoading, data } = createOrderQuery;
  const dispatch = useDispatch();

  /**
   * Следим за отправкой запроса об отправке заказа
   */
  useEffect(() => {
    if (!isLoading && isSuccess) {
      const newBalance = data?.data?.balance;

      if (originalArgs.source !== "massorders") {
        // Сбрасываем форму с новыми значениями
        reset({ link: null });
      }

      // Устанавливаем новый баланс
      dispatch(setBalance(newBalance));
    }
  }, [createOrderQuery]);
};

/**
 * Обьединение заказов.
 * @param existingOrders
 * @param newOrders
 * @returns {*}
 */
export const utilMergeOrders = (existingOrders, newOrders) => {
  // Создаем копию существующих заказов
  let mergedOrders = [...existingOrders];

  // Перебираем все новые заказы
  newOrders.forEach((newOrder) => {
    const existingOrderIndex = mergedOrders?.findIndex(
      (order) => order.id === newOrder.id,
    );

    if (existingOrderIndex !== -1) {
      // Если заказ с таким ID уже существует, заменяем его новыми данными
      mergedOrders[existingOrderIndex] = newOrder;
    } else {
      // Если заказ новый, добавляем его в массив
      mergedOrders.push(newOrder);
    }
  });

  return mergedOrders;
};
