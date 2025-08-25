"use client";

import {
  utilSetErrorCaptchaForm,
  utilRefreshLoginToken,
  utilShowHidePassword,
  utilColorInputValid,
  utilHelperText,
} from "@utils";
import {
  VAR_TEST_RECAPTCHA_VALUE,
  VAR_IS_MODE_PROD,
  VAR_LINK_ROUTES,
} from "@vars";
import { useYupValidationResolver, useEncryptCaptcha, useAuth } from "@hooks";

import React, { useEffect, useState, useRef } from "react";
import { useRecoveryPasswordMutation } from "@features";
import { TextInput, Button } from "flowbite-react";
import { Captcha, Modal } from "@components";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { RHFProvider } from "@providers";

import { recoveryPasswordSchemaValidation } from "../utils";
import { useParams, useRouter, useSearchParams } from "next/navigation";

/**
 * Компонент восстановления пароля
 * @constructor
 */
export const HomeRecoveryPassword = () => {
  const params = useSearchParams();
  const dispatch = useDispatch();
  const router = useRouter();

  const recaptchaRef = useRef(null);
  const { isAuth } = useAuth();
  const [modal, setModal] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [showPasswordAgain, setShowPasswordAgain] = useState(false);

  /**
   * Форма
   */
  const resolver = useYupValidationResolver(recoveryPasswordSchemaValidation);
  const methods = useForm({ mode: "onChange", resolver });
  const {
    formState: { dirtyFields, errors },
    handleSubmit,
    clearErrors,
    setError,
    register,
  } = methods;

  /**
   * Отправка запроса на восстановление пароля
   */
  const [recoveryPassword, recoveryPasswordQuery] =
    useRecoveryPasswordMutation();
  const { isSuccess, isLoading, error, data } = recoveryPasswordQuery;

  // Ключ восстановления пароля из get параметра
  const recoveryKey = params.get("recovery_key");

  /**
   * Если запрос на восстановление прошел успешно - делаем reset формы и закрываем модалку
   */
  useEffect(() => {
    if (!isLoading && isSuccess) {
      setModal(false);
      utilRefreshLoginToken(data?.data, dispatch);
      router.push(`/${VAR_LINK_ROUTES.profile}/${VAR_LINK_ROUTES.orders}`); // Делаем редирект на страницу профиля со всеми заказами
    }
  }, [recoveryPasswordQuery]);

  /**
   * Submit form
   */
  const onSubmit = (data) => {
    const recaptchaValue = recaptchaRef?.current?.getValue();
    const { encryptedCaptchaKey, key, iv } = useEncryptCaptcha(recaptchaValue);

    if (recaptchaValue && VAR_IS_MODE_PROD) {
      recoveryPassword({
        ...data,
        captcha: encryptedCaptchaKey,
        key: recoveryKey,
        ckey: key,
        iv: iv,
      });
    } else if (!recaptchaValue && VAR_IS_MODE_PROD) {
      utilSetErrorCaptchaForm(setError);
    } else {
      recoveryPassword({
        ...data,
        captcha: VAR_TEST_RECAPTCHA_VALUE,
        ckey: "aw9d78aw98d7aw8d79a8",
        iv: "awd9a8w7daw6d7awd67",
        key: recoveryKey,
      });
    }
  };

  return (
    <>
      {/* Модальное окно с формой */}
      {!isAuth && recoveryKey && (
        <Modal
          className="w-[400px] max-sm:max-h-[calc(100vh-2rem)] max-sm:w-[90%] max-sm:overflow-y-scroll max-sm:scrollbar-hidden max-sm:scroll-m-10 sm:-translate-y-[70px]"
          setOpenModal={setModal}
          openModal={modal}
        >
          {/* Заголовок */}
          <h3 className="mb-8 text-2xl text-gray-600 font-pn-boldit">
            Восстановление пароля
          </h3>

          <RHFProvider
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col gap-5"
            methods={methods}
          >
            {/* Password */}
            <div>
              <TextInput
                rightIcon={
                  utilShowHidePassword(showPassword, setShowPassword).icon
                }
                type={utilShowHidePassword(showPassword, setShowPassword).type}
                color={utilColorInputValid("password", errors, dirtyFields)}
                helperText={utilHelperText("password", errors)}
                placeholder="Введите новый пароль"
                autoComplete="current-password"
                className="ym-record-keys"
                name="password"
                id="password"
                sizing="lg"
                {...register("password")}
              />
            </div>

            {/* passwordAgain */}
            <div>
              <TextInput
                rightIcon={
                  utilShowHidePassword(showPasswordAgain, setShowPasswordAgain)
                    .icon
                }
                type={
                  utilShowHidePassword(showPasswordAgain, setShowPasswordAgain)
                    .type
                }
                color={utilColorInputValid(
                  "passwordAgain",
                  errors,
                  dirtyFields,
                )}
                helperText={utilHelperText("passwordAgain", errors)}
                placeholder="Введите новый пароль еще раз"
                autoComplete="new-password"
                className="ym-record-keys"
                name="passwordAgain"
                id="passwordAgain"
                sizing="lg"
                {...register("passwordAgain")}
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
      )}
    </>
  );
};
