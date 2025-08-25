import { DepositZeroOrders } from "@apppages/profile/pages/deposit/components";
import { DecoratorDataComponent } from "@decorators";
import { useGetMyPaymentsMutation } from "@features";
import { configHistoryPayments } from "@config";
import { utilFormatDate } from "@utils";
import { useTypeDevice } from "@hooks";
import { Table } from "@components";
import { useEffect } from "react";

import "./styles/depositRefillTable.scss";

/**
 * Компонент таблицы пополнения баланса
 * @returns {JSX.Element}
 * @constructor
 */
export const DepositTable = () => {
  const [getMyPayments, getMyPaymentsQuery] = useGetMyPaymentsMutation();
  const { isSuccess, isLoading, data } = getMyPaymentsQuery;
  const { isMobile } = useTypeDevice();

  const columns = [
    {
      Cell: (methods) => {
        const { value } = methods;
        const formattedValue = Math.floor(value);

        return (
          <p>
            {formattedValue} <span className="text-sm">₽</span>
          </p>
        );
      },
      Header: "Сумма",
      accessor: "sum",
    },
    {
      Cell: (methods) => {
        const { value } = methods;

        return (
          <div
            dangerouslySetInnerHTML={{
              __html: utilFormatDate(value, isMobile),
            }}
          />
        );
      },
      accessor: "creation_date",
      Header: "Дата",
    },
    {
      Cell: (methods) => {
        const { value } = methods;

        return (
          <div className="flex flex-row justify-center items-center font-pn-regular gap-2 text-gray-600 text-sm">
            {configHistoryPayments?.[`${value}`]?.icon}{" "}
            {configHistoryPayments?.[`${value}`]?.name ?? value}
          </div>
        );
      },
      accessor: "method",
      Header: "Способ",
    },
  ];

  useEffect(() => {
    getMyPayments({ page_number: 1 });
  }, []);

  const isShow = !isLoading && isSuccess && data?.data?.["payments"].length > 0;

  return (
    <div className="deposit__content__wrapper relative table">
      <DecoratorDataComponent query={getMyPaymentsQuery}>
        {isShow ? (
          <Table data={data?.data?.["payments"] ?? []} columns={columns} />
        ) : (
          <DepositZeroOrders state={2} />
        )}
      </DecoratorDataComponent>
    </div>
  );
};
