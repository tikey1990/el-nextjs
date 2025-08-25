"use client";
import { useSelector } from "react-redux";

import { utilAsideRenderMassorders } from "../utils";

/**
 * Компонент элемента бокового меню массовых заказов
 * @returns {JSX.Element}
 * @constructor
 */
export const AsideMassOrdersServices = () => {
  const orders = useSelector((state) => state.services.massOrders);
  const isNotEmptyOrders = orders?.length > 0;

  return (
    <>
      {isNotEmptyOrders && (
        <div className="flex flex-col gap-4 order-10">
          {utilAsideRenderMassorders(orders)}
        </div>
      )}
    </>
  );
};
