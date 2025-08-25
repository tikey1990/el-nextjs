import { configSocialsIcons } from "@config/social/index.js";
import { configIconsReactionsServices } from "@config";
import { IconRuble } from "@icons";
import classnames from "classnames";
import PropTypes from "prop-types";

/**
 * Компонент информацией о массовом заказе
 * @param order
 * @returns {JSX.Element}
 * @constructor
 */
export const AsideMassOrderModalInfo = ({ order }) => {
  const {
    price_per_one: orderPricePerOne,
    quality: orderQuality,
    website: orderWebsite,
    type_ru: orderTypeRu,
    type: orderType,
    data: orderData,
    countAllOrders,
  } = order;
  const isReactions = orderType === "Реакции";
  const iconReaction =
    configIconsReactionsServices()?.[`${orderQuality}`]?.icon;
  const formatOrderPricePerOne = `${orderPricePerOne}`.replace(".", ",");
  // Кол-во выполненных заказов
  const countOrdersNotActive =
    orderData.filter((elem) => elem?.status !== "active")?.length ??
    countAllOrders;
  // Кол-во завершенных заказов
  const countOrdersFinished =
    orderData.filter((elem) => elem?.status === "finished")?.length ?? 0;
  // Кол-во отмененных заказов
  const countOrdersError =
    orderData.filter((elem) => elem?.status === "error")?.length ?? 0;

  // Конфиг соц сети
  const configServiceInfo = configSocialsIcons?.[`${orderWebsite}`];
  // Класс для иконки соц сети заказа
  const iconClass = classnames(
    "rounded-full w-[54px] h-[54px] flex justify-center items-center",
    configServiceInfo?.bg,
  );

  return (
    <div className="flex flex-col sm:flex-row justify-between gap-4 flex-nowrap mb-10">
      <div className="rounded-2xl ring-1 ring-[#CEF0FF] max-sm:gap-[10px] max-sm:p-[15px] px-[15px] sm:h-[84px] flex-col sm:flex-row sm:max-w-[424px] w-full flex items-start sm:items-center justify-between">
        <div className="flex flex-row items-center gap-3">
          {/* Иконка сервиса */}
          <div className={iconClass}>{configServiceInfo?.iconMassOrder}</div>

          {/* Качество и тип */}
          <div
            className={classnames(
              "flex",
              { "flex-row items-center gap-1.5": isReactions },
              { "flex-col": !isReactions },
            )}
          >
            <p className="font-pn-semibold text-gray-600 text-[15px]">
              {orderType} ({orderTypeRu})
            </p>
            <p className="font-pn-regular text-[#828FA4] text-sm">
              {isReactions ? iconReaction : `${orderQuality} качество`}
            </p>
          </div>
        </div>

        {/* Стоимость */}
        <div className="flex items-center gap-1 py-3 px-[14px] max-sm:ml-[65px] rounded-[35px] bg-[#F0FAFF]">
          <span className="text-primary-500 inline-flex items-center text-[13px] font-pn-semibold gap-[3px]">
            {formatOrderPricePerOne}
            <IconRuble className="fill-primary-500 -translate-y-[1px]" />
          </span>
        </div>
      </div>

      {/* Статистика */}
      <div className="rounded-2xl ring-1 ring-[#CEF0FF] px-[20px] h-[84px] w-full sm:max-w-[290px] flex items-center justify-between">
        {/* Обработанные заказы */}
        <span className="inline-flex flex-col">
          <p className="text-[13px] text-gray-500 font-pn-regular">
            Обработано
          </p>
          <p className="text-sm font-pn-semibold text-gray-600">
            {countOrdersNotActive}/{countAllOrders}
          </p>
        </span>

        {/* Успешные заказы */}
        <span className="inline-flex flex-col">
          <p className="text-[13px] text-gray-500 font-pn-regular">Успешно</p>
          <p className="text-sm font-pn-semibold text-primary-500">
            {countOrdersFinished}/{countAllOrders}
          </p>
        </span>

        {/* Ошибки в заказах */}
        <span className="inline-flex flex-col">
          <p className="text-[13px] text-gray-500 font-pn-regular">Ошибки</p>
          <p className="text-sm font-pn-semibold text-red-500">
            {countOrdersError}/{countAllOrders}
          </p>
        </span>
      </div>
    </div>
  );
};

AsideMassOrderModalInfo.propTypes = {
  /**
   * Order
   */
  order: PropTypes.object,
};
