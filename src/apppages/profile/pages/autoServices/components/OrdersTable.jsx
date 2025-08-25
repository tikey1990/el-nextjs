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
import { Table } from "flowbite-react";

import { ProfileZeroData } from "../../../components";
import { renderTableOrders } from "../utils";
import { OrdersFilters } from "./";

/**
 * Компонент таблицы с моими заказами
 * @returns {JSX.Element}
 * @constructor
 */
export const OrdersTable = () => {
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
                <Table.Head className="w-full">
                  <Table.HeadCell className="whitespace-nowrap text-center p-0">
                    ID заказа
                  </Table.HeadCell>
                  <Table.HeadCell className="text-center p-0">
                    Дата
                  </Table.HeadCell>
                  <Table.HeadCell className="text-center p-0">
                    Ссылка
                  </Table.HeadCell>
                  <Table.HeadCell className="text-center p-0">
                    Услуга
                  </Table.HeadCell>
                  <Table.HeadCell className="text-center p-0">
                    Заказов
                  </Table.HeadCell>
                  <Table.HeadCell className="text-center p-0">
                    Управление
                  </Table.HeadCell>
                  <Table.HeadCell className="text-center p-0">
                    Статус
                  </Table.HeadCell>
                </Table.Head>
              )}

              <Table.Body
                style={{
                  display: paymentsAllCount > 0 ? "table-row-group" : "none",
                }}
                className="bg-transparent sm:bg-white"
              >
                {/* Рендер строк моих заказов */}
                {renderTableOrders(listOrders, changeAutoServiceOrderStatus)}
              </Table.Body>
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
