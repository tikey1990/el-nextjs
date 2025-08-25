import { utilSetErrorCaptchaForm, utilColorInputValid, utilHelperText } from "@utils";
import { useYupValidationResolver, useEncryptCaptcha } from "@hooks";
import { VAR_TEST_RECAPTCHA_VALUE, VAR_IS_MODE_PROD } from "@vars";
import { useSendRecoveryEmailMutation } from "@features";
import { TextInput, Button } from "flowbite-react";
import { Captcha, Modal } from "@components";
import { useForm } from "react-hook-form";
import { RHFProvider } from "@providers";
import { HiMail } from "react-icons/hi";
import PropTypes from "prop-types";
import { useRef } from "react";

import { rememberPasswordSchemaValidation } from "../config";

/**
 * Компонент модального окна восстановления пароля
 * @param openModal
 * @param setOpenModal
 * @returns {JSX.Element}
 * @constructor
 */
export const AuthModalRememberPass = ({ setOpenModal, openModal }) => {
    const recaptchaRef = useRef(null);

    /**
     * Форма
     */
    const resolver = useYupValidationResolver(rememberPasswordSchemaValidation);
    const methods = useForm({ mode: "onChange", resolver });
    const {
        formState: { dirtyFields, errors },
        handleSubmit,
        clearErrors,
        setError,
        register,
    } = methods;

    /**
     * Отправка данных о восстановлении пароля
     */
    const [sendRecoveryEmail, sendRecoveryEmailQuery] = useSendRecoveryEmailMutation();
    const { error } = sendRecoveryEmailQuery;

    /**
     * Submit
     */
    const onSubmit = (data) => {
        const recaptchaValue = recaptchaRef?.current?.getValue();
        const { encryptedCaptchaKey, key, iv } = useEncryptCaptcha(recaptchaValue);

        if (recaptchaValue && VAR_IS_MODE_PROD) {
            sendRecoveryEmail({ ...data, captcha: encryptedCaptchaKey, ckey: key, iv: iv });
            setOpenModal(false);
        } else if (!recaptchaValue && VAR_IS_MODE_PROD) {
            utilSetErrorCaptchaForm(setError);
        } else {
            sendRecoveryEmail({ ...data, captcha: VAR_TEST_RECAPTCHA_VALUE, ckey: key, iv: iv });
        }
    };

    return (
        <Modal
            className="max-sm:max-h-[calc(100vh-2rem)] max-sm:w-[90%] max-sm:overflow-y-scroll max-sm:scrollbar-hidden max-sm:scroll-m-10 sm:-translate-y-[50px]"
            setOpenModal={setOpenModal}
            openModal={openModal}
        >
            {/* Заголовок */}
            <h3 className="mb-8 text-2xl text-gray-600 font-pn-boldit">Восстановление пароля</h3>

            {/* Форма */}
            <RHFProvider onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-5" methods={methods}>
                {/* Email */}
                <div>
                    <TextInput
                        color={utilColorInputValid("email", errors, dirtyFields)}
                        helperText={utilHelperText("email", errors)}
                        placeholder="Введите Email"
                        rightIcon={HiMail}
                        type="email"
                        name="email"
                        sizing="lg"
                        id="email"
                        {...register("email")}
                    />
                </div>

                {/* Captcha */}
                <Captcha
                    recaptchaRef={recaptchaRef}
                    clearErrors={clearErrors}
                    captchaError={errors}
                    setError={setError}
                    serverError={error}
                />

                {/* Button submit */}
                <Button color="primary" type="submit" size="md">
                    Восстановить
                </Button>
            </RHFProvider>
        </Modal>
    );
};

AuthModalRememberPass.propTypes = {
    /**
     * Функция изменения состояния модального окна
     */
    setOpenModal: PropTypes.func.isRequired,

    /**
     * Состояние модального окна
     */
    openModal: PropTypes.bool.isRequired,
};
