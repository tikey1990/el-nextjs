import {
  useProfileOrderParamsUrl,
  useProfileOrderFilter,
} from "@apppages/profile/hooks";

import { Disclosure, Transition } from "@headlessui/react";
import { useTypeDevice } from "@hooks";
import { TextInput, Button } from "flowbite-react";
import React, { useCallback, memo } from "react";
import { IconBtnSearch } from "@icons/btn";
import debounce from "lodash.debounce";
import { Select } from "@components";
import { IconFilter } from "@icons";
import PropTypes from "prop-types";

import {
  dataFiltersServices,
  dataFiltersStatuses,
  dataFiltersWebsites,
  filtersInitState,
} from "../config";
import {
  utilRenderOrderServices,
  utilRenderOrderSocials,
  utilOrderFiltersUpdate,
} from "../utils";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import PaginationOrders from "@apppages/profile/components/PaginationOrders";

/**
 * Кнопка фильтра
 * @param {boolean} open - Состояние раскрытия и открытия
 * @returns {JSX.Element}
 * @constructor
 */
// eslint-disable-next-line react/prop-types
const BtnFilter = ({ open }) => {
  const { isMobile } = useTypeDevice();

  return (
    <Disclosure.Button
      className="w-[75px] xs:w-[90px] h-[40px] sm:h-[40px] sm:w-[98px]"
      as="div"
    >
      <Button
        className="h-full !rounded-[10px] w-full focus:!ring-1"
        color={open ? "filter" : "gray"}
        size={isMobile ? "md" : "sm"}
      >
        <div
          className={`flex flex-row items-center gap-1 sm:gap-2 text-xs font-pn-regular leading-none ${
            open ? "text-primary-500" : "text-[#828FA4]"
          }`}
        >
          <IconFilter
            className={`text-md sm:text-lg ${open ? "fill-primary-500" : "fill-[#828FA4]"}`}
          />{" "}
          Фильтр
        </div>
      </Button>
    </Disclosure.Button>
  );
};

/**
 * Компонент фильтров моих заказов
 * @returns {JSX.Element}
 * @constructor
 */
export const OrdersFilters = memo(function OrdersFilters({
  prevPaymentsAbsoluteAllCount,
  paymentsAllCount,
  paginationData,
  getOrdersPage,
  setFilters,
  filters,
}) {
  const { countOrderFirst, countOrderLast, pagesCount } = paginationData;

  const { isMobile } = useTypeDevice();
  const router = useRouter();
  const pathname = usePathname();
  const readOnlySearchParams = useSearchParams();
  const searchParams = new URLSearchParams(readOnlySearchParams);
  const { paramWebsite, paramSearch, paramStatus, paramType, params } =
    useProfileOrderParamsUrl();

  // Открыты ли фильтры по-умолчанию
  const isOpenDisclosure =
    paramWebsite !== null ||
    paramType !== null ||
    paramStatus !== null ||
    paramSearch !== null;

  const isActiveStatus = paramStatus;

  /**
   * State фильтров статуса
   */
  const {
    findFilter: findFilterStatus,
    setFilter: setFilterStatus,
    filter: filterStatus,
  } = useProfileOrderFilter(paramStatus, dataFiltersStatuses, false);

  /**
   * State фильтров соц сети
   */
  const { isLoading: isLoadingFilters, data: dataFilter } =
    dataFiltersWebsites();
  const {
    findFilter: findFilterWebsite,
    setFilter: setFilterWebsite,
    filter: filterWebsite,
  } = useProfileOrderFilter(paramWebsite, dataFilter, isLoadingFilters);

  /**
   * State фильтров соц сети
   */
  const { isLoading, data } = dataFiltersServices();
  const {
    findFilter: findFilterType,
    setFilter: setFilterType,
    filter: filterType,
  } = useProfileOrderFilter(paramType, data, isLoading);

  // Фильтрация данных
  utilOrderFiltersUpdate(filters, getOrdersPage);

  /**
   * Выбор фильтров
   */
  const selectHandle = (elem, name) => {
    if (name?.name === "status") setFilterStatus(elem);
    if (name?.name === "website") setFilterWebsite(elem);
    if (name?.name === "type") setFilterType(elem);

    const value = () => {
      switch (name) {
        case "Все соцсети":
          return null;
        case "Все услуги":
          return null;
        default:
          return name === "status" || name === "website" || name === "type"
            ? elem?.name
            : elem.target.value;
      }
    };

    setFilters({ ...filters, [`${name}`]: value(), scrollPage: null });
    router.push(`/profile/orders/1?${params.toString()}`);

    if (value() !== "Все соцсети" && value() !== "Все услуги") {
      params.set(name, value());
      router.push(`${pathname}/1?${params.toString()}`);
    } else if (value() === "Все соцсети") {
      setFilters({ ...filters, scrollPage: null, website: null, type: null });
      searchParams.delete("type");
      searchParams.delete("website");
      router.push(`${pathname}/1?${searchParams.toString()}`);
    } else {
      setFilters({ ...filters, scrollPage: null, type: null });
      searchParams.delete("type");
      router.push(`${pathname}/1?${searchParams.toString()}`);
    }
  };

  /**
   * Нажатие на кнопку "Все"
   */
  const allHandle = () => {
    setFilters({ ...filters, ...filtersInitState });
    router.push(`${pathname}/1`);
  };

  /**
   * Поиск
   */
  const searchHandle = useCallback(
    debounce((newValue) => {
      setFilters({ ...filters, search: newValue, scrollPage: null });
      params.set("data_search", newValue);
      router.push({ search: params.toString() });
    }, 800),
    [router],
  );

  return (
    <Disclosure defaultOpen={isOpenDisclosure}>
      {({ open }) => (
        <div className="flex flex-col justify-between rounded-2xl bg-white">
          <div className="flex flex-col justify-between gap-4 p-3 sm:px-[15px] sm:flex-row sm:h-[60px]">
            {/* Фильтры */}
            <div className="flex w-full flex-row items-center justify-between gap-1 sm:gap-3 sm:order-1 sm:justify-start">
              <div className="max-sm:w-full max-xs:w-[40%] flex flex-row items-center gap-1 sm:gap-3">
                {/* Все */}
                <Button
                  className={`flex h-[35px] sm:h-[36px] hover:!bg-[#E6F6FD] [&_span]:px-1.5 focus:!ring-0 !border-none flex-row gap-2 rounded-[10px] sm:gap-3 ${
                    !isActiveStatus
                      ? "bg-[#E6F6FD]"
                      : "bg-transparent hover:!bg-[#E6F6FD]"
                  }`}
                  onClick={allHandle}
                  color="gray"
                  size="sm"
                >
                  <div className="flex flex-row gap-1.5 justify-center font-pn-semibold text-gray-600 text-ellipsis text-sm whitespace-nowrap">
                    Все{" "}
                    <p className="text-gray-500 font-pn-regular">
                      {prevPaymentsAbsoluteAllCount}
                    </p>
                  </div>
                </Button>

                {/* Select filters status */}
                <Select
                  className={
                    isActiveStatus &&
                    "[&>.select-btn]:!bg-[#E6F6FD] [&>.select-btn]:hover:!bg-[#E6F6FD]"
                  }
                  onChange={(elem) => selectHandle(elem, "status")}
                  defaultValue={findFilterStatus}
                  data={dataFiltersStatuses}
                  state={filterStatus}
                />
              </div>

              {/* Кнопка фильтра */}
              {isMobile && <BtnFilter open={open} />}
            </div>

            {/* Поиск и кнопка фильтров */}
            <div className="-order-1 flex w-full flex-row items-center gap-3 sm:order-2 sm:w-[100%]">
              {/* Поиск */}
              <div className="w-full">
                <TextInput
                  onChange={(e) => {
                    searchHandle(e.target.value);
                  }}
                  style={{ borderRadius: "10px" }}
                  className="h-[40px] w-full"
                  placeholder="Ссылка или ID"
                  rightIcon={IconBtnSearch}
                  sizing="sm"
                  type="text"
                />
              </div>

              {/* Кнопка фильтра */}
              {!isMobile && <BtnFilter open={open} />}
            </div>
          </div>

          {/* Контент */}
          <Transition
            leaveFrom="transform scale-100 opacity-100"
            enterTo="transform scale-100 opacity-100"
            enterFrom="transform scale-95 opacity-0"
            enter="transition duration-100 ease-out"
            leave="transition duration-75 ease-out"
            leaveTo="transform scale-95 opacity-0"
            id="ordersPagination"
            show={open}
            as="div"
          >
            <Disclosure.Panel className="flex flex-col sm:flex-row items-end gap-5 p-4 shadow-[0px_5px_12px_0px_rgba(42,45,54,0.06)_inset] rounded-b-2xl border-t-[#E8EBF1]">
              {/* Социальная сеть */}
              {utilRenderOrderSocials(
                selectHandle,
                filterWebsite,
                findFilterWebsite,
              )}

              {/* Все услуги соц сети */}
              {utilRenderOrderServices(
                selectHandle,
                filterType,
                findFilterType,
              )}
            </Disclosure.Panel>

            {pagesCount > 0 && (
              <div className="m-4 mt-0">
                <div className="flex flex-col items-center font-pn-semibold text-sm text-gray-600 justify-between sm:flex-row">
                  <PaginationOrders
                    paymentsAllCount={paymentsAllCount}
                    countOrderFirst={countOrderFirst}
                    countOrderLast={countOrderLast}
                    pagesCount={pagesCount}
                    setFilters={setFilters}
                  />
                </div>
              </div>
            )}
          </Transition>
        </div>
      )}
    </Disclosure>
  );
});

OrdersFilters.propTypes = {
  /**
   * Кол-во записей всего
   */
  prevPaymentsAbsoluteAllCount: PropTypes.number,

  /**
   * Данные пагинации
   */
  paginationData: PropTypes.object.isRequired,

  /**
   * Получение данных о заказах
   */
  getOrdersPage: PropTypes.func.isRequired,

  /**
   * State фильтров
   */
  setFilters: PropTypes.func.isRequired,

  /**
   * State фильтров
   */
  filters: PropTypes.object.isRequired,

  /**
   * Кол-во записей всего
   */
  paymentsAllCount: PropTypes.number,
};
