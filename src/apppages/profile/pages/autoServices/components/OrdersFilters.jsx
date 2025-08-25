import {
  useProfileOrderParamsUrl,
  useProfileOrderFilter,
} from "@apppages/profile/hooks";
import { Disclosure, Transition } from "@headlessui/react";
import { useTypeDevice } from "@hooks";
import { Button } from "flowbite-react";
import { Select } from "@components";
import { IconFilter } from "@icons";
import React, { memo } from "react";
import PropTypes from "prop-types";

import { utilOrderFiltersUpdate } from "../utils";
import { dataFiltersStatuses } from "../config";
import { usePathname, useRouter } from "next/navigation";
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
  const { paramStatus, params } = useProfileOrderParamsUrl();

  // Открыты ли фильтры по-умолчанию
  const isOpenDisclosure = paramStatus !== null;

  /**
   * State фильтров статуса
   */
  const {
    findFilter: findFilterStatus,
    setFilter: setFilterStatus,
    filter: filterStatus,
  } = useProfileOrderFilter(paramStatus, dataFiltersStatuses, false);

  // Фильтрация данных
  utilOrderFiltersUpdate(filterStatus, getOrdersPage);

  /**
   * Выбор фильтров
   */
  const selectHandle = (elem, name) => {
    const value = elem?.name;

    setFilterStatus(value);

    params.set(name, value);
    router.push(`/${pathname}/1?${params.toString()}`);
    setFilters({ ...filters, scrollPage: null, status: value });
  };

  return (
    <Disclosure defaultOpen={isOpenDisclosure}>
      {({ open }) => (
        <div className="flex flex-col justify-between rounded-2xl bg-white">
          <div className="flex flex-col justify-between gap-4 p-3 sm:px-[15px] sm:flex-row sm:h-[60px]">
            {/* Фильтры */}
            <div className="flex w-full flex-row items-center justify-between gap-1 sm:gap-3 sm:order-1 sm:justify-start">
              <div className="w-[120px] flex flex-row items-center gap-1 sm:gap-3">
                {/* Select filters status */}
                <Select
                  className="[&>.select-btn]:w-[120px] [&>.select-btn]:!bg-[#E6F6FD] [&>.select-btn]:hover:!bg-[#E6F6FD]"
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
            {!isMobile && (
              <div className="-order-1 flex w-full sm:justify-end flex-row items-center gap-3 sm:order-2 sm:w-[100%]">
                {/* Кнопка фильтра */}
                <BtnFilter open={open} />
              </div>
            )}
          </div>

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
   * Данные о переключении статуса
   */
  changeAutoServiceOrderStatusQuery: PropTypes.object,

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
