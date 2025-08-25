import { useFormContext } from "react-hook-form";
import { useEffect, useState } from "react";

import { configDataDiscountInitialState } from "../config";

/**
 * Хук дял вычисления скидки
 */
export const useDepositDiscount = () => {
    /**
     * Форма
     */
    const methods = useFormContext();
    const { watch } = methods;

    /**
     * Данные для расчета скидки
     */
    const [discount, setDiscount] = useState(configDataDiscountInitialState);

    // Сумма пополнения
    const sumValue = watch("sum");
    const discountProgress = (sumValue / discount.valuePercentCurrent) * 100; // Прогресс бар скидки

    useEffect(() => {
        if (sumValue < 5000)
            setDiscount({
                ...discount,
                valueNext: 5000 - sumValue,
                valuePercentCurrent: 5000,
                valuePercentNext: 10000,
                valuePercent: 3,
                value: 0,
            });
        else if (sumValue >= 5000 && sumValue < 10000)
            setDiscount({
                ...discount,
                valueNext: 10000 - sumValue,
                valuePercentCurrent: 10000,
                valuePercentNext: 30000,
                valuePercent: 5,
                value: 3,
            });
        else if (sumValue >= 10000 && sumValue < 30000)
            setDiscount({
                ...discount,
                valueNext: 30000 - sumValue,
                valuePercentCurrent: 30000,
                valuePercentNext: 100000,
                valuePercent: 10,
                value: 5,
            });
        else if (sumValue >= 30000 && sumValue < 100000)
            setDiscount({
                ...discount,
                valueNext: 100000 - sumValue,
                valuePercentCurrent: 100000,
                valuePercentNext: 200000,
                valuePercent: 15,
                value: 10,
            });
        else if (sumValue >= 100000 && sumValue < 200000)
            setDiscount({
                ...discount,
                valueNext: 200000 - sumValue,
                valuePercentCurrent: 200000,
                valuePercentNext: 0,
                valuePercent: 20,
                value: 15,
            });
        else
            setDiscount({
                ...discount,
                valuePercentCurrent: 0,
                valuePercentNext: 0,
                valuePercent: 0,
                valueNext: 0,
                value: 20,
            });
    }, [sumValue]);

    return { discountProgress, discount };
};
