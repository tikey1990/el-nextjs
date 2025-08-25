import { ToggleSwitch } from "@components";
import { servicesConfig } from "@config";
import React, { useState } from "react";
import { Table, TableCell, TableRow } from "flowbite-react";

/**
 * Рендер строк таблицы с моими заказами.
 * @param {[]} data - Данные о моих заказах.
 * @param {function} changeAutoServiceOrderStatus - Данные о моих заказах.
 * @returns {*}
 */
export const renderTableOrders = (data, changeAutoServiceOrderStatus) => {
  const [active, setActive] = useState([]);

  return (
    Array.isArray(data) &&
    data?.map((elem, index) => {
      // ID
      const id = elem?.id;
      // Дата
      const creation_date = elem?.creation_date;
      // Иконка
      const icon = servicesConfig?.[`${elem?.website}`].icon;
      // Услуга
      const service =
        elem?.name.replace(/\|/g, " <br /> ") + "<p>{firstPart}</p>";
      // Заказов
      const ordersCreatedCount = elem?.orders_created_count;
      // Ссылка
      const link = elem?.link;
      // Если активный
      let isActive = elem?.is_active;
      const status = elem?.status;

      const findElem = active?.find((item) => item?.id === elem?.id);
      const isActiveSwitch = findElem ? findElem?.isActive : isActive;
      const statusSwitch = findElem
        ? findElem?.status
        : isActive
          ? "Включается"
          : "Остановлен";

      const handleToggleIsActive = () => {
        changeAutoServiceOrderStatus({
          status: Number(!isActiveSwitch),
          id,
        }).then((response) => {
          if (response?.data?.data) {
            const status = response?.data?.data !== "0";

            setActive((prev) => {
              const index = prev?.findIndex((item) => item.id === id);
              if (index > -1) {
                // если элемент с таким id существует, то обновляем статус и isActive
                return [
                  ...prev.slice(0, index),
                  {
                    status: status ? "Включается" : "Остановлен",
                    isActive: status,
                    id,
                  },
                  ...prev.slice(index + 1),
                ];
              } else {
                // иначе, просто добавляем новый элемент с isActive и статусом
                return [
                  ...prev,
                  {
                    status: status ? "Включается" : "Остановлен",
                    isActive: status,
                    id,
                  },
                ];
              }
            });
          }
        });
      };

      return (
        <TableRow key={index}>
          {/* ID */}
          <TableCell
            className="p-0 text-center before:max-sm:!text-white before:max-sm:!font-pn-semibold"
            data-label="ID"
          >
            <div className="flex items-center max-sm:w-full max-sm:justify-between font-pn-semibold sm:font-pn-regular text-[15px] sm:text-sm flex-row-reverse sm:flex-col gap-2 text-white sm:text-gray-600">
              <div className="max-sm:!pl-3.5">{id}</div>
            </div>
          </TableCell>

          {/* ДАТА */}
          <TableCell
            className="p-0 text-sm text-left flex max-sm:gap-2 sm:flex-col sm:text-center text-gray-600 max-sm:bg-white max-sm:!rounded-none"
            data-label="Дата"
          >
            <p>{creation_date?.time}</p>
            <p>{creation_date?.date}</p>
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

          {/* УСЛУГА */}
          <TableCell
            className="p-0 text-sm text-gray-600 text-left sm:text-center max-sm:bg-white max-sm:!rounded-none"
            data-label="Услуга"
          >
            <div
              dangerouslySetInnerHTML={{ __html: service }}
              className="whitespace-nowrap"
            />
          </TableCell>

          {/* Заказов */}
          <TableCell
            className="p-0 text-sm text-gray-600 text-left sm:text-center max-sm:bg-white max-sm:!rounded-none"
            data-label="Заказов"
          >
            {ordersCreatedCount}
          </TableCell>

          {/* Управление */}
          <TableCell
            className="p-0 text-sm text-gray-600 text-left sm:text-center max-sm:bg-white max-sm:!rounded-none"
            data-label="Управление"
          >
            <ToggleSwitch
              onChange={handleToggleIsActive}
              checked={isActiveSwitch}
            />
          </TableCell>

          {/* Статус */}
          <TableCell
            className="p-0 text-sm text-gray-600 text-left sm:text-center max-sm:bg-white max-sm:!rounded-b-xl max-sm:!rounded-t-none"
            data-label="Статус"
          >
            {status === "Отслеживается" && !findElem ? status : statusSwitch}
          </TableCell>
        </TableRow>
      );
    })
  );
};
