"use client";

import {
  useProfileTableIntersection,
  useProfileOrdersData,
} from "@apppages/profile/hooks/index.js";
import { TemplatesZeroData } from "@apppages/profile/pages/templates/components/index.js";
import { filtersInitState } from "@apppages/profile/pages/orders/config/index.js";
import { DecoratorDataComponent } from "@decorators";
import { useSelector } from "react-redux";
import { VAR_LINK_ROUTES } from "@vars";
import React, { useState } from "react";
import {
  Table,
  TableBody,
  TableHead,
  TableHeadCell,
  TableRow,
} from "flowbite-react";

import { ProfileZeroData } from "@apppages/profile/components";
import { renderTableOrders } from "@apppages/profile/pages/autoServices/utils";
import { OrdersFilters } from "@apppages/profile/pages/autoServices/components";

/**
 * Компонент таблицы с моими заказами
 * @returns {JSX.Element}
 * @constructor
 */
const AutoServicesOrdersTable = () => {
  /**
   * State фильтров
   */
  const [filters, setFilters] = useState(filtersInitState);
  const has_premium_subscription = useSelector(
    (state) => state.profileSettings.has_premium_subscription,
  );

  const {
    changeAutoServiceOrderStatus,
    getOrdersPageQuery,
    paymentsAllCount,
    paginationData,
    getOrdersPage,
    isZeroOrders,
    isPayments,
    pagesCount,
    isSuccess,
    isLoading,
    prevData,
    orders,
    data,
  } = useProfileOrdersData("autoServices");

  const { observerTarget, listOrders, showTarget } =
    useProfileTableIntersection(
      getOrdersPageQuery,
      pagesCount,
      filters,
      setFilters,
      orders,
      data,
    );

  return (
    <div className="flex flex-col w-full h-full">
      <div className="flex flex-col gap-4 w-full">
        {/* Фильтры */}
        <div
          style={{ display: !isZeroOrders && isPayments ? "block" : "none" }}
          className="z-10"
        >
          <OrdersFilters
            paymentsAllCount={paymentsAllCount}
            paginationData={paginationData}
            getOrdersPage={getOrdersPage}
            setFilters={setFilters}
            filters={filters}
          />
        </div>

        {!isZeroOrders && paymentsAllCount === 0 && isPayments && (
          <div className="sm:h-[calc(100vh-190px)]">
            <ProfileZeroData
              text="Заказов по вашему запросу не найдено"
              page={VAR_LINK_ROUTES.orders}
            />
          </div>
        )}

        {/* Таблица с моими заказами */}
        <div
          className="tableAdaptive h-auto [&>.table-wrapper]:!border-none"
          style={{ display: isZeroOrders ? "none" : "block" }}
        >
          <DecoratorDataComponent
            query={{ ...getOrdersPageQuery, isLoading: prevData.length <= 0 }}
          >
            <Table className="w-full !border-none">
              {paymentsAllCount > 0 && (
                <TableHead className="w-full">
                  <TableHeadCell className="whitespace-nowrap text-center p-0">
                    ID заказа
                  </TableHeadCell>
                  <TableHeadCell className="text-center p-0">
                    Дата
                  </TableHeadCell>
                  <TableHeadCell className="text-center p-0">
                    Ссылка
                  </TableHeadCell>
                  <TableHeadCell className="text-center p-0">
                    Услуга
                  </TableHeadCell>
                  <TableHeadCell className="text-center p-0">
                    Заказов
                  </TableHeadCell>
                  <TableHeadCell className="text-center p-0">
                    Управление
                  </TableHeadCell>
                  <TableHeadCell className="text-center p-0">
                    Статус
                  </TableHeadCell>
                </TableHead>
              )}

              <TableBody
                style={{
                  display: paymentsAllCount > 0 ? "table-row-group" : "none",
                }}
                className="bg-transparent sm:bg-white"
              >
                {/* Рендер строк моих заказов */}
                {renderTableOrders(listOrders, changeAutoServiceOrderStatus)}
              </TableBody>
            </Table>
          </DecoratorDataComponent>
        </div>
      </div>

      {!isPayments && !isLoading && isSuccess && has_premium_subscription && (
        <ProfileZeroData page={VAR_LINK_ROUTES.orders} />
      )}

      {!isPayments && !isLoading && isSuccess && !has_premium_subscription && (
        <TemplatesZeroData
          text={
            <p>
              Данный раздел доступен только
              <br /> пользователям с премиум подпиской
            </p>
          }
          state={1}
        />
      )}

      <div
        className={showTarget ? "block" : "hidden"}
        ref={observerTarget}
      ></div>
    </div>
  );
};

export default AutoServicesOrdersTable;
