import React, { useEffect } from "react";
import { ReactPortal } from "@utils";
import classNames from "classnames";
import PropTypes from "prop-types";

import { configApiDocs } from "../config";

/**
 * Компонент оглавления документации
 * @param {string | null} currentSection - Текущая секция
 * @returns {JSX.Element}
 * @constructor
 */
export const ApiHeading = ({ currentSection }) => {
    // Данные оглавления документации
    const dataHeadingDocs = Object.values(configApiDocs);

    useEffect(() => {
        history.pushState(null, null, "#" + currentSection);
    }, [currentSection]);
    /**
     * Класс элемента навигации
     * @param {string} elem - Название элемента
     * @returns {string}
     */
    const classHeadingDocsElem = (elem) =>
        classNames(
            "px-4 py-1.5 text-base font-normal text-gray-600 font-pn-semibold list-none rounded-md cursor-pointer hover:bg-gray-600 hover:text-white",
            {
                "bg-gray-600 text-white": currentSection === elem,
            }
        );

    /**
     * Рендер разделов документации
     * @returns {unknown[]}
     */
    const renderHeadingDocs = () =>
        Array.isArray(dataHeadingDocs) &&
        dataHeadingDocs?.map((elem, index) => (
            <a href={`#${elem.name}`} key={index}>
                <li className={classHeadingDocsElem(elem.name)}>{elem.nameDocs}</li>
            </a>
        ));

    return (
        <ReactPortal wrapperId="apiDocs">
            <div className="sticky top-0 hidden h-full w-full flex-col items-stretch gap-5 border border-gray-700 bg-white px-6 py-6 sm:flex min-w-[270px] sm:rounded-2xl">
                <h3 className="text-gray-600 font-pn-bold text-sm uppercase">Оглавление документации</h3>

                {/* Навигация документации */}
                <nav className="flex flex-col gap-1">{renderHeadingDocs()}</nav>
            </div>
        </ReactPortal>
    );
};

ApiHeading.propTypes = {
    /**
     * Текущая секция
     */
    currentSection: PropTypes.string,
};
