import {
  useChangeAutoServiceOrderStatusMutation,
  useGetAutoServicesOrdersPageMutation,
  useGetOrdersPageMutation,
} from "@features";
import {
  useIntersectionObserveElementWithCallback,
  utilHandleObserveTarget,
  useGetPage,
} from "@hooks";
import { useEffect, useState } from "react";
import {
  useParams,
  usePathname,
  useRouter,
  useSearchParams,
} from "next/navigation";

/**
 * Хук для получения параметров url
 */
export const useProfileOrderParamsUrl = () => {
  const searchParams = useSearchParams();
  const params = new URLSearchParams(searchParams);

  // Get параметр статуса заказа
  const paramStatus = params.get("status");
  // Get параметр соц сети
  const paramWebsite =
    params.get("website") === "Все соцсети" ? "all" : params.get("website");
  // Get параметр категории соц сети
  const paramType =
    params.get("type") === "Все услуги" ? "all" : params.get("type");
  // Get параметр поиска заказов
  const paramSearch = params.get("data_search");
  params.delete("page");

  return { paramWebsite, paramStatus, paramSearch, paramType, params };
};

/**
 * Хук для реализации infinite scroll в таблице с заказами.
 * @param {{}} query - Данные запроса.
 * @param {number} pagesCount - Количество страниц.
 * @param {{}} filters - State фильтров
 * @param {function} setFilters - SetState фильтров.
 * @param {[]} orders - Заказы
 * @param {[]} data - Данные с сервера
 * @returns {{showTarget: boolean, listOrders: *[], observerTarget}}
 */
export const useProfileTableIntersection = (
  query,
  pagesCount,
  filters,
  setFilters,
  orders,
  data,
) => {
  const { isLoading, isSuccess } = query;
  const { params } = useProfileOrderParamsUrl();
  const router = useRouter();
  const { page } = useGetPage();
  const pathname = usePathname();
  const { params: urlParams } = useParams();
  const [resultOrders, setResultOrders] = useState([]);
  const [showTarget, setShowTarget] = useState(false);
  const [listOrders, setListOrders] = useState([]);

  const basePath = !urlParams?.length
    ? pathname
    : pathname.split("/").slice(0, -1).join("/");

  const observerTarget = useIntersectionObserveElementWithCallback(
    () =>
      utilHandleObserveTarget(
        page,
        window.history.replaceState,
        params,
        setFilters,
        setShowTarget,
        basePath,
        pagesCount,
      ),
    [page, params, router.push, basePath],
  );

  useEffect(() => {
    if (!isLoading && isSuccess && data && filters?.scrollPage !== null) {
      // eslint-disable-next-line no-unsafe-optional-chaining
      if (resultOrders.length === 0)
        setResultOrders([...orders, ...data?.data?.orders]);
      // eslint-disable-next-line no-unsafe-optional-chaining
      else setResultOrders((prev) => [...prev, ...data?.data?.orders]);

      if (page < pagesCount)
        setTimeout(() => {
          setShowTarget(true);
        }, 2000);
    }

    if (
      !isLoading &&
      isSuccess &&
      data &&
      filters?.scrollPage === null &&
      data?.data?.orders.length === 15 &&
      page < pagesCount
    ) {
      setTimeout(() => {
        setShowTarget(true);
      }, 2000);
    }

    if (isLoading) setShowTarget(false);
  }, [query, pagesCount]);

  useEffect(() => {
    if (filters?.scrollPage === null) {
      setResultOrders([]);
      setShowTarget(false);
    }
  }, [filters]);

  useEffect(() => {
    if (filters?.scrollPage === null && orders?.length > 0)
      setListOrders(orders);
    else if (filters?.scrollPage !== null && resultOrders?.length > 0)
      setListOrders(resultOrders);
  }, [orders, resultOrders, filters]);

  return { observerTarget, showTarget, listOrders };
};

export const useProfileOrdersData = (variant = "orders") => {
  const useGetPageMutation = () => {
    switch (variant) {
      case "orders":
        return useGetOrdersPageMutation();
      case "autoServices":
        return useGetAutoServicesOrdersPageMutation();
      default:
        return useGetOrdersPageMutation();
    }
  };

  const { page } = useGetPage(); // Получаем текущий номер страницы

  /**
   * Получаем данные о моих заказах
   */
  const [getOrdersPage, getOrdersPageQuery] = useGetPageMutation();
  const { isSuccess, isLoading, data } = getOrdersPageQuery;
  const [prevData, setPrevData] = useState([]);

  const [changeAutoServiceOrderStatus, changeAutoServiceOrderStatusQuery] =
    useChangeAutoServiceOrderStatusMutation();

  // Массив заказов
  const orders = prevData?.data?.orders;
  // Количество записей всего
  const paymentsAllCount = prevData?.data?.["orders_count"];
  // Количество заказов в аккаунте всего
  const paymentsAbsoluteAll = prevData?.data?.["all_orders_count"];
  const [prevPaymentsAbsoluteAllCount, setPrevPaymentsAbsoluteAllCount] =
    useState(paymentsAbsoluteAll);
  // Есть ли записи вообще в аккаунте
  const isPayments = prevData?.data?.["all_orders_count"] > 0;
  // Количество страниц
  const pagesCount = prevData?.data?.["pages_count"] ?? 0;
  // Первая запись на странице
  const countOrderFirst = (page - 1) * 15 + 1;
  // Последняя запись на странице
  const countOrderLast =
    page * 15 > prevPaymentsAbsoluteAllCount
      ? prevPaymentsAbsoluteAllCount
      : page * 15;
  // Если заказы пустые
  const isZeroOrders =
    !isLoading && isSuccess && prevPaymentsAbsoluteAllCount === 0;
  const paginationData = {
    countOrderFirst: countOrderFirst,
    countOrderLast: countOrderLast,
    pagesCount: pagesCount,
  };

  useEffect(() => {
    if (data && !isLoading && isSuccess) setPrevData(data);

    if (!isLoading && isSuccess && paymentsAbsoluteAll > 0) {
      setPrevPaymentsAbsoluteAllCount(paymentsAbsoluteAll);
    }
  }, [paymentsAllCount, getOrdersPageQuery]);

  return {
    changeAutoServiceOrderStatusQuery,
    changeAutoServiceOrderStatus,
    prevPaymentsAbsoluteAllCount,
    getOrdersPageQuery,
    paymentsAllCount,
    paginationData,
    getOrdersPage,
    isZeroOrders,
    pagesCount,
    isPayments,
    isLoading,
    isSuccess,
    prevData,
    orders,
    data,
  };
};

/**
 * Хук для получения состояний фильтров.
 * @param {{}} param - Get параметр.
 * @param {[]} filtersData - Данные фильтров.
 * @param {boolean} isLoading - Состояние загрузки.
 */
export const useProfileOrderFilter = (param, filtersData, isLoading) => {
  // Ищем фильтр в соответствии с выбранными фильтрами
  const findFilter = filtersData?.find((elem, index) =>
    param ? elem.name === param : index === 0,
  );
  const [filter, setFilter] = useState(findFilter);

  // Обновляем состояние фильтров когда данные загрузились
  useEffect(() => {
    if (filtersData && !isLoading) {
      setFilter(findFilter);
    }
  }, [param, isLoading]);

  return { findFilter, setFilter, filter };
};
