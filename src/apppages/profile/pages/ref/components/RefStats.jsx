import React from "react";

import { renderStats } from "../utils";

/**
 * Компонент статистики реф. системы
 * @returns {JSX.Element}
 * @constructor
 */
export const RefStats = () => {
    return (
        <div className="flex flex-col gap-6 mb-5 sm:mb-10 max-sm:bg-white max-sm:shadow-content max-sm:px-5 max-sm:py-6 max-sm:rounded-2xl">
            <h1 className="text-2xl font-pn-extraboldit text-gray-600 sm:text-[32px]">Реферальная система</h1>

            <div className="flex flex-col gap-4 xl:flex-row">{renderStats()}</div>
        </div>
    );
};
