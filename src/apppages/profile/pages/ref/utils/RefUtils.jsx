import { useGetRefDataQuery } from "@features";
import * as yup from "yup";

import { dataRefStats } from "../config";

/**
 * Рендер статистики реф. системы
 * @returns {unknown[]}
 */
export const renderStats = () => {
    const query = useGetRefDataQuery();
    const { data } = query;

    return dataRefStats(data?.data)?.map((elem, index) => (
        <div
            className="flex h-[52px] text-gray-600 text-[15px] sm:text-[16px] font-pn-semibold w-full flex-row items-center gap-2 rounded-[10px] bg-white p-4 ring-1 ring-[#E8EBF1] sm:h-[54px] sm:gap-4"
            key={index}
        >
            <div className="z-1 relative flex items-center justify-center rounded-full">{elem.icon}</div>
            {elem.name}
            <p className="text-primary-500 font-pn-bold text-[16px] ml-auto">{elem.count}</p>
        </div>
    ));
};

/**
 * Схема валидации для изменения реферального кода
 */
export const refCodeSchemeValidation = yup.object({
    newRefCode: yup
        .string()
        .required("Это поле должно быть заполнено!")
        .matches(/^[A-Za-z0-9]*$/, "Разрешены только латинские буквы и цифры"),
});
