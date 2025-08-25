import { useSendConfirmEmailMutation, useGetMySettingDataMutation, useChangeEmailMutation } from "@features";
import { utilSchemesValidation, utilColorInputValid, utilHelperText } from "@utils";
import { TextInput, Button, Label } from "flowbite-react";
import { useYupValidationResolver } from "@hooks";
import { IconStatusOk } from "@icons/status";
import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import { RHFProvider } from "@providers";
import React, { useEffect } from "react";
import { HiMail } from "react-icons/hi";
import * as yup from "yup";

/**
 * Компоненты настроек электронной почты
 * @returns {JSX.Element}
 * @constructor
 */
export const SettingsEmail = () => {
    /**
     * Валидация
     */
    const emailSchemaValidation = (field) => {
        return yup.object({
            [field]: utilSchemesValidation.email,
        });
    };
    const resolver = (field) => {
        return useYupValidationResolver(emailSchemaValidation(field));
    };

    /**
     * Store
     */
    const email = useSelector((state) => state.profileSettings.email);
    const emailIsConfirmed = useSelector((state) => state.profileSettings.emailIsConfirmed);

    /**
     * Форма о подтверждении почты
     */
    const methodsConfirmEmail = useForm({ defaultValues: { newEmail: email }, mode: "onChange" }); // Методы формы
    const {
        formState: { dirtyFields: dirtyFieldsConfirmEmail, errors: errorsConfirmEmail },
        handleSubmit: handleSubmitConfirmEmail,
        register: registerConfirmEmail,
    } = methodsConfirmEmail;

    /**
     * Данные о подтверждении почты
     */
    const [confirmEmail] = useSendConfirmEmailMutation();

    /**
     * Форма об изменении почты
     */
    const methodsChangeEmail = useForm({ resolver: resolver("newEmail"), mode: "onChange" }); // Методы формы
    const {
        formState: { dirtyFields: dirtyFieldsChangeEmail, errors: errorsChangeEmail },
        handleSubmit: handleSubmitChangeEmail,
        register: registerChangeEmail,
        reset,
    } = methodsChangeEmail;

    /**
     * Данные об изменении почты
     */
    const [changeEmail, changeEmailQuery] = useChangeEmailMutation();
    const { isLoading: isLoadingChangeEmailQuery, isSuccess: isSuccessChangeEmailQuery } = changeEmailQuery;

    /**
     * Данные настроек
     */
    const [getMySettingData] = useGetMySettingDataMutation();

    /**
     * Слушатель на отправку подтверждения почты
     */
    const handleEmailConfirm = () => {
        confirmEmail({ newEmail: email });
    };

    /**
     * Слушатель изменение почты
     */
    const handleEmailChange = (data) => {
        changeEmail({ newEmail: data.newEmail });
        reset();
    };

    useEffect(() => {
        if (!isLoadingChangeEmailQuery && isSuccessChangeEmailQuery) getMySettingData();
    }, [changeEmailQuery]);

    const IconStatus = () => <IconStatusOk className="z-10" />;

    return (
        <div className="bg-white shadow-content px-5 py-6 flex flex-col gap-8 sm:gap-10 rounded-2xl sm:p-10">
            {/* Подтверждение email */}
            <RHFProvider onSubmit={handleSubmitConfirmEmail(handleEmailConfirm)} methods={methodsConfirmEmail}>
                {/* Email */}
                <div>
                    <div>
                        <Label
                            value={emailIsConfirmed ? "Ваша почта подтверждена" : "Подтвердить почту"}
                            className="mb-2 font-pn-boldit text-gray-600 text-[20px]"
                            htmlFor="newEmail"
                        />
                        <p className="mb-5 text-sm sm:text-[16px] text-left text-gray-500">
                            {utilHelperText(
                                "newEmail",
                                errorsConfirmEmail,
                                emailIsConfirmed ? "" : "На вашу почту будет выслана ссылка для подтверждения"
                            )}
                        </p>
                    </div>

                    <div className="flex flex-row gap-3">
                        <TextInput
                            color={utilColorInputValid("newEmail", errorsConfirmEmail, dirtyFieldsConfirmEmail)}
                            rightIcon={emailIsConfirmed ? IconStatus : HiMail}
                            className="order-[-2] w-[65%] lg:w-[55%]"
                            placeholder={email}
                            name="newEmail"
                            id="newEmail"
                            value={email}
                            type="email"
                            sizing="lg"
                            disabled
                            {...registerConfirmEmail("newEmail")}
                        />

                        {!emailIsConfirmed && (
                            <Button
                                className="order-[-1] w-[30%] lg:w-[25%]"
                                disabled={emailIsConfirmed}
                                color="primary"
                                type="submit"
                                size="sm"
                            >
                                Отправить
                            </Button>
                        )}
                    </div>
                </div>
            </RHFProvider>

            {!emailIsConfirmed && (
                <>
                    {/* Изменение email */}
                    <RHFProvider onSubmit={handleSubmitChangeEmail(handleEmailChange)} methods={methodsChangeEmail}>
                        {/* Email */}
                        <div>
                            <div>
                                <Label
                                    className="mb-2 font-pn-boldit text-gray-600 text-[20px]"
                                    value="Изменить почту"
                                    htmlFor="newEmail"
                                />
                                <p className="mb-5 text-sm sm:text-[16px] text-left text-gray-500">
                                    {utilHelperText("newEmail", errorsChangeEmail, "До подтверждения вы можете изменить свою почту")}
                                </p>
                            </div>

                            <div className="flex flex-row flex-wrap gap-3">
                                <TextInput
                                    color={utilColorInputValid("newEmail", errorsChangeEmail, dirtyFieldsChangeEmail)}
                                    className="order-[-2] w-[65%] lg:w-[55%]"
                                    placeholder="Новая почта"
                                    rightIcon={HiMail}
                                    name="newEmail"
                                    id="newEmail"
                                    type="email"
                                    sizing="lg"
                                    {...registerChangeEmail("newEmail")}
                                />

                                {/* Button submit */}
                                <Button className="order-[-1] w-[30%] lg:w-[25%]" color="primary" type="submit" size="sm">
                                    Изменить
                                </Button>
                            </div>
                        </div>
                    </RHFProvider>
                </>
            )}
        </div>
    );
};
