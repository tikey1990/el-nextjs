import {
  useProfileTableIntersection,
  useProfileOrdersData,
} from "@apppages/profile/hooks";
import { DecoratorDataComponent } from "@decorators";
import { lazyReactNaiveRetry } from "@utils";
import { VAR_LINK_ROUTES } from "@vars";
import React, { useState } from "react";
import { Table } from "flowbite-react";

import { ProfileZeroData } from "../../../components";
import { filtersInitState } from "../config";
import { renderTableOrders } from "../utils";
import { OrdersFilters } from "./";

const Tooltip = lazyReactNaiveRetry(
  () => import("@components/popup/Tooltip.jsx"),
);

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

  const {
    prevPaymentsAbsoluteAllCount,
    getOrdersPageQuery,
    paymentsAllCount,
    paginationData,
    getOrdersPage,
    isZeroOrders,
    pagesCount,
    isPayments,
    isSuccess,
    isLoading,
    prevData,
    orders,
    data,
  } = useProfileOrdersData();
  console.log(pagesCount);
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
            prevPaymentsAbsoluteAllCount={prevPaymentsAbsoluteAllCount}
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
          className="tableAdaptive h-auto [&>.table-wrapper]:!border-none [&_.group-head-cell]:sm:!px-4"
          style={{ display: isZeroOrders ? "none" : "block" }}
        >
          <DecoratorDataComponent
            query={{ ...getOrdersPageQuery, isLoading: prevData.length <= 0 }}
          >
            <Table className="w-full">
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
                    Старт
                  </Table.HeadCell>
                  <Table.HeadCell className="text-center p-0">
                    Цена
                  </Table.HeadCell>
                  <Table.HeadCell className="text-center p-0">
                    Услуга
                  </Table.HeadCell>
                  <Table.HeadCell className="cursor-pointer text-center p-0 decoration-dashed underline-offset-4 hover:underline">
                    <div className="inline-flex">
                      <Tooltip nodePopup="Прогресс бар на некоторых услугах может отставать от реального этапа выполнения">
                        <p
                          style={{
                            textDecorationColor: "rgba(255, 255, 255, 0.40)",
                          }}
                          className="underline decoration-dashed"
                        >
                          Прогресс
                        </p>
                      </Tooltip>
                    </div>
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
                {renderTableOrders(listOrders)}
              </Table.Body>
            </Table>
          </DecoratorDataComponent>
        </div>
      </div>

      {!isPayments && !isLoading && isSuccess && (
        <ProfileZeroData page={VAR_LINK_ROUTES.orders} />
      )}

      <div
        className={showTarget ? "block" : "hidden"}
        ref={observerTarget}
      ></div>
    </div>
  );
};
