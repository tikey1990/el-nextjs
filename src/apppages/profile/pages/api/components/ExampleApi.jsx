import dracula from "react-syntax-highlighter/dist/cjs/styles/prism/one-dark.js";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import React, { useState } from "react";
import classNames from "classnames";
import PropTypes from "prop-types";

import { dataCodeLanguagesExampleApi, languagesData } from "../config";
import { classDecorators } from "../utils";

/**
 * Компонент примера API
 * @param {string} name - Название метода
 * @returns {JSX.Element}
 * @constructor
 */
export const ExampleApi = ({ name }) => {
    const [activeTab, setActiveTab] = useState(languagesData[0]);

    const handleClickLanguage = (elem) => setActiveTab(elem);

    const renderTabs = () => {
        return (
            Array.isArray(languagesData) &&
            languagesData?.map((elem, index) => (
                <p
                    className={`flex w-[calc(100%/4)] p-2 cursor-pointer sm:!rounded-t-xl text-gray-600 text-sm sm:text-base font-pn-semibold items-center justify-center sm:px-10 sm:py-3 hover:bg-white sm:mt-0 sm:w-auto ${
                        activeTab === elem ? "bg-white" : "bg-[#D4D9E2]"
                    } ${index === 0 && "rounded-tl-xl"} ${index === languagesData.length - 1 && "rounded-tr-xl"}`}
                    onClick={() => handleClickLanguage(elem)}
                    key={index}
                >
                    {elem}
                </p>
            ))
        );
    };

    return (
        <>
            <div className="flex flex-row rounded-xl sm:gap-1">{renderTabs()}</div>
            <div className={classNames(classDecorators, "max-sm:rounded-t-none sm:rounded-tl-none")}>
                <div className="flex flex-col justify-between sm:flex-row">
                    <h2 className="text-gray-600 text-[18px] sm:text-[20px] font-pn-boldit" id={name}>
                        {name}
                    </h2>
                </div>

                <SyntaxHighlighter className="rounded-lg" language="python" style={dracula} wrapLongLines>
                    {dataCodeLanguagesExampleApi?.[`${activeTab}`]}
                </SyntaxHighlighter>
            </div>
        </>
    );
};

ExampleApi.propTypes = {
    /**
     * Название секции
     */
    name: PropTypes.string.isRequired,
};
