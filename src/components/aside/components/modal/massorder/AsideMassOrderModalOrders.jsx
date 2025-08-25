import {
  IconStatusMoney,
  IconStatusWarn,
  IconStatusTime,
  IconStatusDone,
} from "@icons/status/index.js";
import { IconRefresh, IconMoney } from "@icons";
import { useDispatch } from "react-redux";
import { setMassOrder } from "@features";
import PropTypes from "prop-types";

/**
 * Компонент информацией о массовом заказе
 * @param orders
 * @param order
 * @returns {JSX.Element}
 * @constructor
 */
export const AsideMassOrderModalOrders = ({ orders, order }) => {
  const { status: statusOrder } = order;

  const dispatch = useDispatch();

  /**
   * Рендер заказов
   * @returns {unknown[]}
   */
  const renderOrders = () =>
    orders
      .map((elem, index) => {
        const isRenderOrder =
          elem?.status !== "active" ||
          (elem?.status === "active" && orders[index - 1]?.status !== "active");

        /**
         * Слушатель обновления баланса
         */
        const handleRefreshOrder = () =>
          dispatch(setMassOrder({ status: "active", id: elem?.id }));

        /**
         * Иконка статуса заказа
         * @returns {JSX.Element}
         */
        const iconStatus = () => {
          switch (elem?.status) {
            case "finished":
              return <IconStatusDone className="w-[38px] h-[38px]" />;

            case "active":
              return <IconStatusTime className="w-[38px] h-[38px]" />;

            case "error":
              return elem?.errorMessage.includes("Недостаточно средств") ? (
                <IconStatusMoney className="w-[38px] h-[38px]" />
              ) : (
                <IconStatusWarn className="w-[38px] h-[38px] fill-red-500" />
              );
          }
        };

        /**
         * Текст сообщения
         * @returns {*|string}
         */
        const textIdOrErrorMessage = () => {
          switch (elem?.status) {
            case "finished":
              return `ID ${elem?.newId}`;

            case "active":
              return "Обработка...";

            case "error":
              return elem?.errorMessage;
          }
        };

        /**
         * Повторная отправка заказа или баланс
         * @returns {JSX.Element}
         */
        const refreshOrderOrShowBalance = () => {
          const price = `${elem?.price}`.replace(".", ",");
          const currBal = `${elem?.currBal}`.replace(".", ",");

          switch (elem?.status) {
            case "finished":
              return (
                <div className="bg-[#F0FAFF] max-sm:w-auto h-[26px] sm:h-[48px] px-[10px] max-sm:translate-x-9 max-sm:mt-[10px] rounded-xl flex max-sm:gap-1 flex-row sm:flex-col justify-center sm:py-[7px] sm:px-3 items-center sm:items-end">
                  <p className="font-pn-semibold text-[15px] text-primary-500">
                    {isNaN(elem?.price) ? 0 : `-${price}`} руб.
                  </p>
                  <p className="sm:hidden text-gray-500">/</p>
                  <p className="text-gray-500 inline-flex items-center gap-1.5 font-pn-regular text-sm">
                    <IconMoney /> {currBal} руб.
                  </p>
                </div>
              );

            case "active" && statusOrder !== "paused":
              return (
                <IconRefresh className="cursor-pointer animate-spin mr-4" />
              );

            case "error":
              return (
                <IconRefresh
                  className="cursor-pointer translate-x-[-0.7rem]"
                  onClick={handleRefreshOrder}
                />
              );
          }
        };

        const link = elem?.link
          ? elem.link.match(/^(http:\/\/|https:\/\/)/)
            ? elem.link
            : `https://${elem.link}`
          : "";

        return isRenderOrder ? (
          <div
            className="w-[calc(100%-20px)] flex items-center mx-auto max-sm:flex-wrap p-[10px] h-auto sm:h-[68px] shadow-block2 rounded-xl space-x-4"
            key={index}
          >
            {iconStatus()}

            {/* Информация о заказе */}
            <span className="inline-flex flex-col">
              <a
                className="text-gray-600 font-pn-semibold max-w-[100%] overflow-hidden text-ellipsis text-[15px]"
                rel="noopener noreferrer"
                target="_blank"
                href={link}
              >
                {elem?.link}
              </a>
              <p className="text-gray-500 font-pn-regular text-sm">
                {textIdOrErrorMessage()}
              </p>
            </span>

            <div className="flex-grow" />

            {refreshOrderOrShowBalance()}
          </div>
        ) : (
          <div className="hidden" key={index}></div>
        );
      })
      .reverse();

  return (
    <div className="flex flex-col gap-[10px] sm:overflow-y-scroll sm:min-h-[300px] sm:max-h-[300px] min-h-[250px] max-h-[250px] custom-scrollbar">
      {renderOrders()}
    </div>
  );
};

AsideMassOrderModalOrders.propTypes = {
  /**
   * orders
   */
  orders: PropTypes.array,

  /**
   * Order
   */
  order: PropTypes.object,
};
