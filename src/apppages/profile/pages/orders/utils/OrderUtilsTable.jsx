import { configIconsReactionsServices, servicesConfig } from "@config";
import { lazyReactNaiveRetry, utilFormatDate } from "@utils";
import { useTypeDevice } from "@hooks";
import { Table, TableCell, TableRow } from "flowbite-react";
import React from "react";

import { configOrderTypeIcon } from "../config";

const OrdersProgress = lazyReactNaiveRetry(
  () => import("../components/OrdersProgress"),
);
const Tooltip = lazyReactNaiveRetry(
  () => import("@components/popup/Tooltip.jsx"),
);

/**
 * Рендер строк таблицы с моими заказами
 * @param {[]} data - Данные о моих заказах
 * @returns {*}
 */
export const renderTableOrders = (data) => {
  const { isMobile } = useTypeDevice();

  return (
    Array.isArray(data) &&
    data?.map((elem, index) => {
      // ID
      const id = elem?.id;
      const isReactions = elem?.type === "reactions";
      // Дата
      const date = utilFormatDate(elem?.["creation_date"], !isMobile);
      // Иконка
      const icon = servicesConfig?.[`${elem?.website}`]?.icon;
      // Старт
      const start = elem?.start;
      // Сумма
      const sum = elem?.sum.toLocaleString("ru-RU", {
        minimumFractionDigits: 2,
        useGrouping: true,
      });
      // Услуга
      const service = () => {
        const replaceStr = elem?.name;
        if (!isReactions) {
          return (
            <p
              dangerouslySetInnerHTML={{
                __html:
                  replaceStr.replace(/\|/g, " <br /> ") +
                  `<p>ID: ${elem?.service_id}</p>`,
              }}
              className=""
            />
          );
        }

        const parts = replaceStr.split(",");
        const firstPart = parts[0].split("|")[0];
        const secondPart = parts[0].split("|")[1];
        const typeReaction = elem.quality.split("_")[1];
        const iconReaction = configIconsReactionsServices({
          className: "w-4 h-4",
        })?.[`${typeReaction}`]?.icon;

        return (
          <div className="inline-flex items-center flex-row sm:flex-col gap-1">
            <p>{firstPart}</p>
            <p className="flex items-center gap-1">
              {secondPart} {iconReaction}
            </p>
            <p>ID: {elem?.service_id}</p>
          </div>
        );
      };
      // Ресурс
      const source = elem?.source;
      // Ссылка
      const link = elem?.link;
      // Иконка ресурса
      const iconSource = configOrderTypeIcon?.[`${source}`].icon;
      const textPopupSource = () => {
        switch (source) {
          case "api":
            return "Заказ оформлен через API";
          case "site":
            return "Заказ оформлен через сайт";
          case "massorders":
            return "Заказ оформлен через массовое продвижение";
          case "telegram":
            return "Заказ оформлен через Telegram бота";
          case "template":
            return "Заказ оформлен через шаблоны";
          case "auto_service":
            return "Заказ оформлен через автоуслуги";
          default:
            return "Заказ оформлен через API";
        }
      };

      return (
        <TableRow key={index}>
          {/* ID */}
          <TableCell
            className="p-0 text-center before:max-sm:!text-white before:max-sm:!font-pn-semibold"
            data-label="ID"
          >
            <div className="flex items-center max-sm:w-full max-sm:justify-between font-pn-semibold sm:font-pn-regular text-[15px] sm:text-sm flex-row-reverse sm:flex-col gap-2 text-white sm:text-gray-600">
              <Tooltip
                direction={isMobile ? "left" : "top"}
                nodePopup={textPopupSource()}
              >
                {iconSource}
              </Tooltip>
              <div className="max-sm:!pl-3.5">{id}</div>
            </div>
          </TableCell>

          {/* ДАТА */}
          <TableCell
            className="p-0 text-sm text-left sm:text-center text-gray-600 max-sm:bg-white max-sm:!rounded-none"
            data-label="Дата"
          >
            <div
              dangerouslySetInnerHTML={{ __html: date }}
              className="whitespace-nowrap"
            />
          </TableCell>

          {/* ССЫЛКА */}
          <TableCell
            className="p-0 text-sm text-center max-sm:bg-white max-sm:!rounded-none"
            data-label="Ссылка"
          >
            <a
              className="flex justify-center"
              aria-label="Ссылка"
              rel="noreferrer"
              target="_blank"
              href={link}
            >
              {icon}
            </a>
          </TableCell>

          {/* СТАРТ */}
          <TableCell
            className="p-0 text-sm text-gray-600 text-center max-sm:bg-white max-sm:!rounded-none"
            data-label="Старт"
          >
            {start}
          </TableCell>

          {/* ЦЕНА */}
          <TableCell
            className="whitespace-nowrap text-sm text-gray-600 text-center max-sm:bg-white max-sm:!rounded-none"
            data-label="Цена"
          >
            {sum} р.
          </TableCell>

          {/* УСЛУГА */}
          <TableCell
            className="sm:!p-0 sm:w-[550px] text-sm text-gray-600 text-left sm:text-center max-sm:bg-white max-sm:!rounded-none"
            data-label="Услуга"
          >
            {service()}
          </TableCell>

          {/* ПРОГРЕСС */}
          <TableCell
            className="p-0 text-sm sm:min-w-[175px] text-gray-600 max-sm:bg-white max-sm:!rounded-b-xl max-sm:!rounded-t-none"
            data-label="Прогресс"
          >
            <OrdersProgress data={elem} />
          </TableCell>
        </TableRow>
      );
    })
  );
};
