import { utilSchemesValidation, utilRefreshLoginToken, utilShowHidePassword, utilColorInputValid, utilHelperText } from "@utils";
import { useChangePasswordMutation } from "@features";
import { TextInput, Button } from "flowbite-react";
import React, { useEffect, useState } from "react";
import { useYupValidationResolver } from "@hooks";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { RHFProvider } from "@providers";
import * as yup from "yup";

/**
 * Компоненты настроек пароля
 * @returns {JSX.Element}
 * @constructor
 */
export const SettingsPassword = () => {
    const dispatch = useDispatch();
    const [showPassword, setShowPassword] = useState(false);
    const [showPasswordAgain, setShowPasswordAgain] = useState(false);
    const [showPasswordOld, setShowPasswordOld] = useState(false);

    /**
     * Валидация формы
     */
    const passwordSchemaValidation = yup.object({
        newPassword: utilSchemesValidation.password,
        oldPassword: utilSchemesValidation.password,
        ...utilSchemesValidation.repeatPassword("newPasswordAgain", "newPassword"),
    });
    const resolver = useYupValidationResolver(passwordSchemaValidation);

    /**
     * Форма
     */
    const methods = useForm({ mode: "onChange", resolver });
    const {
        formState: { dirtyFields, errors },
        handleSubmit,
        clearErrors,
        setError,
        register,
        watch,
        reset,
    } = methods;

    /**
     * Store
     */
    const [changePassword, changePasswordQuery] = useChangePasswordMutation();
    const { isSuccess, isLoading, data } = changePasswordQuery;

    /**
     * Слушатель на отправку формы о смене пароля
     */
    const handleSubmitPassword = (data) => {
        changePassword({ ...data });
    };

    // Сбрасываем форму при успешной операции
    useEffect(() => {
        if (!isLoading && isSuccess) {
            reset();
            utilRefreshLoginToken(data?.data, dispatch);
        }
    }, [changePasswordQuery]);

    const newPassword = watch("newPassword");
    const newPasswordAgain = watch("newPasswordAgain");

    useEffect(() => {
        if (newPassword !== newPasswordAgain) {
            setError("newPasswordAgain", {
                message: "Пароли должны совпадать",
                type: "manual",
            });
        } else {
            clearErrors("newPasswordAgain");
        }
    }, [newPassword, newPasswordAgain, setError, clearErrors]);

    return (
        <div className="bg-white shadow-content w-full px-5 py-6 z-10 rounded-2xl sm:p-10">
            {/* Заголовок */}
            <h2 className="mb-5 font-pn-boldit text-gray-600 text-[20px]">Изменить пароль</h2>

            <RHFProvider onSubmit={handleSubmit(handleSubmitPassword)} className="flex flex-col gap-3 sm:gap-4" methods={methods}>
                {/* Старый пароль */}
                <div>
                    <TextInput
                        rightIcon={utilShowHidePassword(showPassword, setShowPassword).icon}
                        color={utilColorInputValid("oldPassword", errors, dirtyFields)}
                        type={utilShowHidePassword(showPassword, setShowPassword).type}
                        helperText={utilHelperText("oldPassword", errors)}
                        placeholder="Введите старый пароль"
                        className="ym-record-keys"
                        name="oldPassword"
                        id="oldPassword"
                        sizing="lg"
                        {...register("oldPassword")}
                    />
                </div>

                {/* Новый пароль */}
                <div>
                    <TextInput
                        rightIcon={utilShowHidePassword(showPasswordAgain, setShowPasswordAgain).icon}
                        type={utilShowHidePassword(showPasswordAgain, setShowPasswordAgain).type}
                        color={utilColorInputValid("newPassword", errors, dirtyFields)}
                        helperText={utilHelperText("newPassword", errors)}
                        placeholder="Введите новый пароль"
                        className="ym-record-keys"
                        name="newPassword"
                        id="newPassword"
                        sizing="lg"
                        {...register("newPassword")}
                    />
                </div>

                {/* Новый пароль еще раз */}
                <div>
                    <TextInput
                        rightIcon={utilShowHidePassword(showPasswordOld, setShowPasswordOld).icon}
                        type={utilShowHidePassword(showPasswordOld, setShowPasswordOld).type}
                        color={utilColorInputValid("newPasswordAgain", errors, dirtyFields)}
                        helperText={utilHelperText("newPasswordAgain", errors)}
                        placeholder="Введите новый пароль ещё раз"
                        className="ym-record-keys"
                        name="newPasswordAgain"
                        id="newPasswordAgain"
                        sizing="lg"
                        {...register("newPasswordAgain")}
                    />
                </div>

                {/* Button submit */}
                <Button className="sm:mr-auto max-sm:mt-2 max-sm:w-full" color="primary" type="submit" size="sm">
                    Сохранить
                </Button>
            </RHFProvider>
        </div>
    );
};
