import { Table, TableCell, TableRow } from "flowbite-react";
import classNames from "classnames";
import React from "react";

/**
 * Рендер параметров запроса
 * @param {[]} data - Данные параметров запроса
 * @returns {*}
 */
export const renderParamsQuery = (data) =>
  Array.isArray(data) &&
  data?.map((elem, index) => (
    <TableRow key={index}>
      <TableCell className="sm:whitespace-nowrap">{elem?.param}</TableCell>
      <TableCell>{elem?.description}</TableCell>
    </TableRow>
  ));

/**
 * Рендер возможных ошибок
 * @param {[]} data - Данные возможных ошибок
 * @returns {*}
 */
export const renderErrorsQuery = (data) =>
  Array.isArray(data) &&
  data?.map((elem, index) => (
    <div
      className="border-bz flex flex-row text-base sm:justify-between gap-4 text-gray-600 items-center border-b border-[#E8EBF1] p-4 sm:px-5 sm:py-4 last:border-none"
      key={index}
    >
      <div className="w-[40%] sm:w-[50%] break-words">{elem?.param}</div>
      <p className="text-left sm:text-right">{elem?.description}</p>
    </div>
  ));

export const classDecorators = classNames(
  "w-full flex h-auto flex-col gap-6 rounded-2xl bg-white py-6 px-5 sm:p-10",
);
