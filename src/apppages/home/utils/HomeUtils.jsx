import { utilSchemesValidation } from "@utils";
import * as yup from "yup";

/**
 * Схема валидации для формы восстановления пароля
 */
export const recoveryPasswordSchemaValidation = yup.object({
    password: utilSchemesValidation.password,
    ...utilSchemesValidation.repeatPassword("passwordAgain", "password"),
});
