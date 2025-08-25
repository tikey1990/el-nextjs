import PropTypes from "prop-types";
import React from "react";

/**
 * Компонент вызова метода API
 * @param {string} name - Название метода
 * @returns {Element}
 * @constructor
 */
export const CallApiMethod = ({ name }) => {
    return (
        <>
            <h2 className="text-[22px] mt-8 sm:text-2xl text-gray-600 font-pn-boldit sm:font-pn-extraboldit" id={name}>
                {name}
            </h2>

            <div className="flex flex-col gap-4">
                <p className="text-base font-pn-semibold text-gray-600 sm:max-w-[712px]">
                    Для вызова методов API необходимо осуществить запрос типа POST на указанный адрес передав необходимые параметры в виде
                    json-строки, в заголовке <span className="text-primary-500">Content-type</span> должно передаваться{" "}
                    <span className="text-primary-500">application/json</span>:
                </p>

                <div className="rounded-lg bg-gray-600 px-4 py-[14px] text-base font-pn-regular">https://easyliker.ru/api</div>
            </div>

            <div className="flex flex-col gap-4 mt-9 sm:mt-10">
                <p className="text-[18px] sm:text-[20px] font-pn-boldit text-gray-600">Успешный результат в виде</p>

                <div className="rounded-lg bg-gray-600 px-4 py-[14px] text-base font-pn-regular">
                    {"{response: результат работы метода}"}
                </div>
            </div>

            <div className="flex flex-col gap-4 sm:mt-10">
                <p className="text-[18px] sm:text-[20px] font-pn-boldit text-gray-600">Ошибки</p>

                <div className="rounded-lg bg-gray-600 px-4 py-[14px] text-base font-pn-regular">{"{error: тип ошибки}"}</div>
            </div>
        </>
    );
};

CallApiMethod.propTypes = {
    /**
     * Название секции
     */
    name: PropTypes.string.isRequired,
};
