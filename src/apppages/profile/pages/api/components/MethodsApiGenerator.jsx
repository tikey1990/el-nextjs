import dracula from "react-syntax-highlighter/dist/cjs/styles/prism/dracula.js";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { DecoratorIntersectionObserver } from "@decorators";
import { Disclosure, Transition } from "@headlessui/react";
import { HiChevronRight } from "react-icons/hi";
import React, { useEffect } from "react";
import {
  Table,
  TableBody,
  TableHead,
  TableHeadCell,
  TableRow,
} from "flowbite-react";
import PropTypes from "prop-types";

import {
  renderParamsQuery,
  renderErrorsQuery,
  classDecorators,
} from "../utils";

/**
 * Компонент генерации методов api
 * @param {function} register - Функция регистрации элемента
 * @param {string} name - Название метода
 * @param {string} subtitle - Подзаголовок секции
 * @param {[]} dataParamsQuery - Данные параметров запроса
 * @param {[]} dataErrors - Данные возможных ошибок
 * @param {string} successResponse - Код успешного ответа
 * @returns {Element}
 * @constructor
 */
export const MethodsApiGenerator = ({
  successResponse,
  dataParamsQuery,
  dataErrors,
  subtitle,
  register,
  name,
}) => {
  useEffect(() => {
    // Получаем якорь из URL адреса
    const hash = window.location.hash;
    const decodedHash = decodeURIComponent(hash).substring(1);
    // Проверяем, есть ли якорь в URL адресе
    if (decodedHash !== "") {
      // Находим элемент на странице с соответствующим id
      const element = document.getElementById(decodedHash);
      // Проверяем, найден ли элемент
      if (element) {
        // Прокручиваем страницу к найденному элементу
        element.scrollIntoView();
      }
    }
  }, []);

  return (
    <DecoratorIntersectionObserver
      className={classDecorators}
      register={register}
      name={name}
    >
      {/* Заголовок */}
      <p className="text-2xl text-primary-500 font-pn-extraboldit" id={name}>
        {name} <span className="text-gray-600">- {subtitle}</span>
      </p>

      {/* Параметры запроса: */}
      <div className="flex flex-col justify-between gap-4">
        <p className="text-[18px] sm:text-[20px] font-pn-boldit text-gray-600">
          Параметры запроса:
        </p>

        <Table className="w-full !rounded-b-2xl">
          <TableHead>
            <TableRow>
              <TableHeadCell className="normal-case">Параметры</TableHeadCell>
              <TableHeadCell className="normal-case !pl-4 sm:!pl-5">
                Описание
              </TableHeadCell>
            </TableRow>
          </TableHead>
          <TableBody className="outline outline-1 outline-[#E8EBF1] -translate-y-[1px] -outline-offset-1 rounded-b-2xl">
            {renderParamsQuery(dataParamsQuery)}
          </TableBody>
        </Table>
      </div>

      {/* Успешный ответ */}
      <div className="flex flex-col justify-between gap-4">
        <p className="text-[18px] sm:text-[20px] text-gray-600 font-pn-boldit">
          Успешный ответ
        </p>

        <SyntaxHighlighter
          className="rounded-lg"
          language="json"
          style={dracula}
          wrapLongLines
        >
          {successResponse}
        </SyntaxHighlighter>
      </div>

      {/* Возможные ошибки */}
      <div className="flex flex-col justify-between gap-4">
        <Disclosure>
          {({ open }) => (
            <div
              className={`w-full ring-1 ring-[#E8EBF1] ${open ? "rounded-xl" : "rounded-xl"}`}
            >
              <Disclosure.Button
                className={`flex w-full flex-row items-center justify-between font-pn-semibold bg-white px-5 py-4 text-base text-primary-500 ${
                  open
                    ? "rounded-t-xl bg-gradient-blue-500 text-white"
                    : "rounded-xl"
                }`}
              >
                Возможные ошибки
                <HiChevronRight
                  className={`h-5 w-5 fill-primary-500 ${open && "rotate-90 fill-white transform"}`}
                />
              </Disclosure.Button>

              <Transition
                leaveFrom="transform scale-100 opacity-100 blur-0"
                enterFrom="transform scale-95 opacity-0 blur-md"
                enterTo="transform scale-100 opacity-100 blur-0"
                leaveTo="transform scale-95 opacity-0 blur-md"
                enter="transition ease-out duration-200"
                leave="transition ease-in duration-150"
              >
                <Disclosure.Panel>
                  {renderErrorsQuery(dataErrors)}
                </Disclosure.Panel>
              </Transition>
            </div>
          )}
        </Disclosure>
      </div>
    </DecoratorIntersectionObserver>
  );
};

MethodsApiGenerator.propTypes = {
  /**
   * Код успешного ответа
   */
  successResponse: PropTypes.string.isRequired,

  /**
   * Данные параметров запроса
   */
  dataParamsQuery: PropTypes.array.isRequired,

  /**
   * Данные возможных ошибок
   */
  dataErrors: PropTypes.array.isRequired,

  /**
   * Подзаголовок секции
   */
  subtitle: PropTypes.string.isRequired,

  /**
   * Название секции
   */
  register: PropTypes.func.isRequired,

  /**
   * Название секции
   */
  name: PropTypes.string.isRequired,
};
