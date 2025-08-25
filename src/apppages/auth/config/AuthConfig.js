import { utilSchemesValidation } from "@utils";
import * as yup from "yup";

/**
 * Схема валидации для формы регистрации
 */
export const regSchemaValidation = yup.object({
    email: yup.string().required("Поле должно быть заполнено!").matches(/@/, "Поле должно быть вида example@mail.com"),
    password: utilSchemesValidation.password,
});

/**
 * Схема валидации для формы авторизации
 */
export const loginSchemaValidation = yup.object({
    email: yup.string().required("Поле должно быть заполнено!").matches(/@/, "Поле должно быть вида example@mail.com"),
    password: yup.string().required("Поле должно быть заполнено!"),
});

/**
 * Схема валидации для формы восстановления пароля
 */
export const rememberPasswordSchemaValidation = yup.object({
    email: yup.string().required("Поле должно быть заполнено!").matches(/@/, "Поле должно быть вида example@mail.com"),
});
