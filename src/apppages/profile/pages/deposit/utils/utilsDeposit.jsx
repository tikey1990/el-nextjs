import * as yup from "yup";

/**
 * Схема валидации дял формы пополнения баланса
 */
export const validationSchemeDeposit = yup.object({
    sum: yup
        .number()
        .typeError("Поле должно быть заполнено!")
        .required("Поле должно быть заполнено!")
        .positive("Сумма должна быть положительной")
        .min(1, "Минимальная сумма пополнения 1р")
        .max(100000000, "Максимальная сумма пополнения за раз 100млн р"),
});

/**
 * Схема валидации для промокода
 */
export const validationSchemePromo = yup.object({
    promo: yup.string().required("Поле должно быть заполнено!"),
});
