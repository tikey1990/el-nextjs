import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeadCell,
  TableRow,
} from "flowbite-react";
import React from "react";

/**
 * Компонент таблицы реферальной системы
 * @returns {JSX.Element}
 * @constructor
 */
export const RefTable = () => {
  return (
    <div className="flex flex-col gap-5 w-full sm:max-w-[537px] max-sm:bg-white max-sm:shadow-content max-sm:px-5 max-sm:py-6 max-sm:rounded-2xl">
      <p className="font-pn-boldit text-[18px] sm:text-[20px] text-gray-600">
        Реферальная программа
      </p>

      {/* Таблица */}
      <Table className="!rounded-b-2xl">
        <TableHead>
          <TableRow>
            <TableHeadCell className="text-center sm:w-[40%]">
              Бонус
            </TableHeadCell>
            <TableHeadCell className="text-center">
              Количество активных рефералов
            </TableHeadCell>
          </TableRow>
        </TableHead>
        <TableBody className="outline outline-1 outline-[#E8EBF1] -translate-y-[1px] -outline-offset-1 rounded-b-2xl">
          <TableRow>
            <TableCell className="text-center max-sm:!border-b max-sm:!border-[#E8EBF1]">
              5%
            </TableCell>
            <TableCell className="text-center max-sm:!border-b max-sm:!border-[#E8EBF1]">
              1
            </TableCell>
          </TableRow>
          <TableRow className="text-center">
            <TableCell className="text-center max-sm:!border-b max-sm:!border-[#E8EBF1]">
              10%
            </TableCell>
            <TableCell className="text-center max-sm:!border-b max-sm:!border-[#E8EBF1]">
              5
            </TableCell>
          </TableRow>
          <TableRow className="text-center">
            <TableCell>15%</TableCell>
            <TableCell>10</TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </div>
  );
};
