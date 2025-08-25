import { useProfileOrderParamsUrl } from "@apppages/profile/hooks";
import { useGetPage } from "@hooks";
import { useEffect } from "react";

import { useFiltersData } from "../hooks";

/**
 * Функция для обновления фильтров.
 * @param {{}} filters - State фильтров.
 * @param {function} getOrdersPage - Получение моих заказов.
 * @param {{}} changeAutoServiceOrderStatusQuery - Данные о переключении статуса.
 */
export const utilOrderFiltersUpdate = (filters, getOrdersPage) => {
  const { paramStatus } = useProfileOrderParamsUrl();
  const { page } = useGetPage();
  const filtersData = useFiltersData(filters); // Данные о фильтрах

  useEffect(() => {
    getOrdersPage({ filters: JSON.stringify(filtersData) });
  }, [page, paramStatus]);
};
