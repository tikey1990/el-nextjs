"use client";
import { useGetBalanceMutation, setMassOrdersStatus } from "@features";
import { useDispatch, useSelector } from "react-redux";
import { IconRefresh } from "@icons";
import { Button } from "flowbite-react";
import { VAR_LINK_ROUTES } from "@vars";
import classnames from "classnames";
import PropTypes from "prop-types";
import { useState } from "react";

import {
  IconModalMassOrderCoins,
  IconPlus,
} from "../../../assets/icons/index.js";
import Link from "next/link";

/**
 * Компонент с балансом в массовом заказе
 * @param order
 * @returns {JSX.Element}
 * @constructor
 */
export const AsideMassOrderModalBal = ({ order }) => {
  const { status: orderStatus, id: orderId } = order;

  const balance = useSelector((state) => state.profileSettings.balance);

  const dispatch = useDispatch();
  const textButtonStatus =
    orderStatus === "active" ? "Остановить" : "Возобновить";
  const [isAnimBalance, setIsAnimBalance] = useState(false);

  /**
   * Получаем баланс пользователя
   */
  const [getBalance] = useGetBalanceMutation();

  const iconRefreshBalClass = classnames("cursor-pointer", {
    "animate-spin-fast": isAnimBalance,
  });

  /**
   * Слушатель на остановку / возобновление заказа
   */
  const handlePauseOrder = () =>
    dispatch(
      setMassOrdersStatus({
        status: orderStatus === "active" ? "paused" : "active",
        id: orderId,
      }),
    );

  /**
   * Слушатель обновления баланса
   */
  const handleRefreshBalance = () => {
    getBalance();
    setIsAnimBalance(true);
    setTimeout(() => setIsAnimBalance(false), 500);
  };

  return (
    <div className="flex flex-col sm:flex-row justify-between gap-4 flex-nowrap mb-[16px]">
      <div className="rounded-2xl ring-1 ring-[#CEF0FF] h-[54px] max-w-[424px] p-4 w-full flex justify-between items-center">
        {/* Баланс */}
        <div className="flex justify-between gap-3 items-center">
          <IconModalMassOrderCoins />

          <span className="flex items-center gap-1.5 sm:gap-3 font-pn-semibold sm:text-lg text-[16px]">
            <p className="text-gray-600">Баланс: </p>
            <p className="text-primary-500">{balance} руб</p>
          </span>
        </div>

        <div className="flex justify-between gap-3 items-center">
          {/* Обновление баланса */}
          <IconRefresh
            className={iconRefreshBalClass}
            onClick={handleRefreshBalance}
          />

          {/* Ссылка на пополнение баланса */}
          <Link
            to={`/${VAR_LINK_ROUTES.profile}/${VAR_LINK_ROUTES.deposit}`}
            target="_blank"
          >
            <IconPlus className="cursor-pointer fill-[url(#paint0_linear_1947_23391)] shadow-balance transition-shadow ease-in-out duration-150 hover:shadow-balanceHover rounded-full" />
          </Link>
        </div>
      </div>

      {/* Возобновить */}
      <Button
        className="h-[54px] w-full sm:max-w-[290px] !font-pn-semibold !text-[15px]"
        disabled={orderStatus === "finished" || orderStatus === "error"}
        onClick={handlePauseOrder}
        color="primary"
        size="custom"
      >
        {textButtonStatus}
      </Button>
    </div>
  );
};

AsideMassOrderModalBal.propTypes = {
  /**
   * Order
   */
  order: PropTypes.object,
};
