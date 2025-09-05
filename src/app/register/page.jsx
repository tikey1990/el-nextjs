"use client";
import {
  utilSetErrorCaptchaForm,
  utilShowHidePassword,
  utilColorInputValid,
  utilHelperText,
  classContainer,
} from "@utils";
import {
  VAR_TEST_RECAPTCHA_VALUE,
  VAR_IS_MODE_PROD,
  VAR_LINK_ROUTES,
} from "@vars";
import {
  useYupValidationResolver,
  useEncryptCaptcha,
  useTypeDevice,
} from "@hooks";
import { regSchemaValidation } from "@apppages/auth/config/index.js";

import { TextInput, Button } from "flowbite-react";
import { useRegisterMutation } from "@features";
import { Captcha, Details } from "@components";
import { useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import { RHFProvider } from "@providers";
import { useState, useRef } from "react";
import { HiMail } from "react-icons/hi";
import Link from "next/link";

import { AuthAnother, SocialBtns } from "@apppages/auth/components";
import { utilAuthLoginWithSocials } from "@apppages/auth/utils";
import { useSearchParams } from "next/navigation";

/**
 * Страница регистрации
 * @returns {JSX.Element}
 * @constructor
 */
const RegPage = () => {
  const { isMobile } = useTypeDevice();
  const { error: authError } = useSelector((state) => state.auth);

  const params = useSearchParams();

  const recaptchaRef = useRef(null);
  const [showPassword, setShowPassword] = useState(false);

  /**
   * Form
   */
  const resolver = useYupValidationResolver(regSchemaValidation);
  const methods = useForm({
    defaultValues: {
      ref_code: params.get("ref") ?? localStorage.getItem("ref"),
    },
    mode: "onSubmit",
    resolver,
  });
  const {
    formState: { dirtyFields, errors },
    handleSubmit,
    clearErrors,
    getValues,
    register,
    setError,
  } = methods;
  const refCodeFormValue = getValues().ref_code;

  // Авторизация через соц сети
  utilAuthLoginWithSocials(refCodeFormValue);

  /**
   * Submit
   */
  const [reg] = useRegisterMutation();
  const onSubmit = (data) => {
    const recaptchaValue = recaptchaRef?.current?.getValue();
    const { encryptedCaptchaKey, key, iv } = useEncryptCaptcha(recaptchaValue);

    if (recaptchaValue && VAR_IS_MODE_PROD) {
      reg({
        ...data,
        ref_code:
          data?.["ref_code"] ??
          params.get("ref") ??
          localStorage.getItem("ref"),
        utm_source: localStorage.getItem("utm_source") ?? "direct_entry",
        captcha: encryptedCaptchaKey,
        isMobile: isMobile,
        ckey: key,
        iv: iv,
      });
    } else if (!recaptchaValue && VAR_IS_MODE_PROD) {
      utilSetErrorCaptchaForm(setError);
    } else {
      reg({
        ...data,
        ref_code:
          data?.["ref_code"] ??
          params.get("ref") ??
          localStorage.getItem("ref"),
        utm_source: localStorage.getItem("utm_source") ?? "direct_entry",
        captcha: VAR_TEST_RECAPTCHA_VALUE,
        isMobile: isMobile,
        ckey: key,
        iv: iv,
      });
      localStorage.removeItem("utm_source");
    }
  };

  return (
    <div className="sm:h-[calc(calc(100vh-131px))]">
      {/* Декор */}
      <Details version={2} />

      {/* Контент страницы */}
      <div
        className={classContainer(
          "flex flex-col sm:gap-10 gap-6 justify-center items-center",
        )}
      >
        <div className="bg-[rgba(89,203,255,0.08)] sm:w-[380px] w-full rounded-4xl backdrop-blur shadow-content">
          <div className="sm:p-10 sm:pb-8 flex pt-[35px] px-[30px] pb-6 flex-col gap-8 text-center">
            <h1 className="font-pn-boldit text-2xl">СОЗДАТЬ АККАУНТ</h1>

            {/* Форма регистрации */}
            <RHFProvider
              onSubmit={handleSubmit(onSubmit)}
              className="flex flex-col gap-4"
              methods={methods}
            >
              {/* Email */}
              <div>
                <TextInput
                  className="[&_.input-default]:!bg-primary-900 [&_.input-failure]:!bg-primary-900 [&_.input-default]:!text-white [&_.input-default]:!ring-[#3F5676] [&_.input-success]:!text-white [&_.input-failure]:!text-white [&_.input-success]:!bg-primary-900"
                  color={utilColorInputValid("email", errors, dirtyFields)}
                  helperText={utilHelperText("email", errors)}
                  placeholder="Введите e-mail"
                  autocomplete="off"
                  rightIcon={HiMail}
                  data-type="auth"
                  name="email"
                  type="email"
                  sizing="lg"
                  id="email"
                  {...register("email")}
                />
              </div>

              {/* Password */}
              <div>
                <TextInput
                  className="[&_.input-default]:!bg-primary-900 [&_.input-failure]:!bg-primary-900 [&_.input-default]:!text-white [&_.input-default]:!ring-[#3F5676] [&_.input-success]:!text-white [&_.input-failure]:!text-white [&_.input-success]:!bg-primary-900"
                  rightIcon={
                    utilShowHidePassword(showPassword, setShowPassword).icon
                  }
                  type={
                    utilShowHidePassword(showPassword, setShowPassword).type
                  }
                  color={utilColorInputValid("password", errors, dirtyFields)}
                  helperText={utilHelperText("password", errors)}
                  placeholder="Введите пароль"
                  autocomplete="off"
                  data-type="auth"
                  name="password"
                  id="password"
                  sizing="lg"
                  {...register("password")}
                />
              </div>

              {/* Ref code */}
              <div>
                <TextInput
                  className="[&_.input-default]:!bg-primary-900 [&_.input-failure]:!bg-primary-900 [&_.input-default]:!text-white [&_.input-default]:!ring-[#3F5676] [&_.input-success]:!text-white [&_.input-failure]:!text-white [&_.input-success]:!bg-primary-900"
                  color={utilColorInputValid("ref_code", errors, dirtyFields)}
                  helperText={utilHelperText("ref_code", errors)}
                  placeholder="Введите реферальный код"
                  autocomplete="off"
                  data-type="auth"
                  name="ref_code"
                  id="ref_code"
                  sizing="lg"
                  type="text"
                  {...register("ref_code")}
                />
              </div>

              {/* Captcha */}
              <Captcha
                recaptchaRef={recaptchaRef}
                clearErrors={clearErrors}
                serverError={authError}
                captchaError={errors}
                setError={setError}
              />

              {/* Button submit */}
              <Button color="primary" type="submit" size="md">
                Создать аккаунт
              </Button>

              {/* Privacy */}
              <p className="inline-flex flex-wrap sm:flex-nowrap flex-col sm:flex-row whitespace-nowrap items-center justify-between text-[13px] font-pn-semibold text-gray-500">
                Регистрируясь, вы принимаете
                <Link
                  className="font-md-moz-fix text-[13px] font-pn-semibold text-white"
                  href={`/${VAR_LINK_ROUTES.agreement}`}
                  rel="noopener noreferrer"
                  target="_blank"
                >
                  Правила сервиса
                </Link>
              </p>
            </RHFProvider>
          </div>

          {/* Войти через */}
          <div className="bg-[rgba(0,159,231,0.04)] flex flex-col rounded-b-4xl sm:flex-row max-sm:gap-4 justify-between sm:py-5 sm:px-[50px] py-4 px-[30px] items-center">
            <p className="font-pn-semibold opacity-80">Войти через:</p>

            {/* Кнопки для входа через соц сети */}
            <SocialBtns />
          </div>
        </div>

        {/* Уже есть аккаунт */}
        <AuthAnother text="Уже есть аккаунт?" textLink="Войти" link="/auth" />
      </div>
    </div>
  );
};

export default RegPage;
