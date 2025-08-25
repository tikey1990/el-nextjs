"use client";
import {
  utilSetErrorCaptchaForm,
  utilShowHidePassword,
  utilColorInputValid,
  utilHelperText,
  classContainer,
} from "@utils";
import { useYupValidationResolver, useEncryptCaptcha } from "@hooks";
import { VAR_TEST_RECAPTCHA_VALUE, VAR_IS_MODE_PROD } from "@vars";
import { TextInput, Button } from "flowbite-react";
import { Captcha, Details } from "@components";
import { useLoginMutation } from "@features";
import { useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import { useState, useRef } from "react";
import { RHFProvider } from "@providers";
import { HiMail } from "react-icons/hi";

import {
  AuthModalRememberPass,
  AuthAnother,
  SocialBtns,
} from "@apppages/auth/components";
import { utilAuthLoginWithSocials } from "@apppages/auth/utils";
import { loginSchemaValidation } from "@apppages/auth/config";

/**
 * Страница авторизации
 * @returns {JSX.Element}
 * @constructor
 */
const LoginPage = () => {
  const { error: authError } = useSelector((state) => state.auth);

  const recaptchaRef = useRef(null);
  const [showPassword, setShowPassword] = useState(false);
  const [openModal, setOpenModal] = useState(false); // Состояние модального окна

  /**
   * Form
   */
  const resolver = useYupValidationResolver(loginSchemaValidation);
  const methods = useForm({ mode: "onSubmit", resolver });
  const {
    formState: { dirtyFields, errors },
    handleSubmit,
    clearErrors,
    setError,
    register,
  } = methods;

  // Авторизация через соц сети
  utilAuthLoginWithSocials();

  /**
   * Submit
   */
  const [login] = useLoginMutation();
  const onSubmit = (data) => {
    const recaptchaValue = recaptchaRef?.current?.getValue();
    const { encryptedCaptchaKey, key, iv } = useEncryptCaptcha(recaptchaValue);

    if (recaptchaValue && VAR_IS_MODE_PROD) {
      login({ ...data, captcha: encryptedCaptchaKey, ckey: key, iv: iv });
    } else if (!recaptchaValue && VAR_IS_MODE_PROD) {
      utilSetErrorCaptchaForm(setError);
    } else {
      login({ ...data, captcha: VAR_TEST_RECAPTCHA_VALUE, ckey: key, iv: iv });
    }
  };

  return (
    <div className="sm:h-[calc(calc(100vh-131px))]">
      {/* Декор */}
      <Details version={2} />

      {/* Модальное окно восстановления пароля */}
      <AuthModalRememberPass
        setOpenModal={setOpenModal}
        openModal={openModal}
      />

      {/* Контент страницы */}
      <div
        className={classContainer(
          "flex flex-col sm:gap-10 gap-6 justify-center items-center",
        )}
      >
        <div className="bg-[rgba(89,203,255,0.08)] sm:w-[380px] w-full rounded-4xl backdrop-blur shadow-content">
          <div className="sm:p-10 sm:pb-8 flex pt-[35px] px-[30px] pb-6 flex-col gap-8 text-center">
            <h1 className="font-pn-boldit text-2xl">ВОЙТИ В АККАУНТ</h1>

            {/* Форма авторизации */}
            <RHFProvider
              onSubmit={handleSubmit(onSubmit)}
              className="flex flex-col gap-4"
              methods={methods}
            >
              {/* Email */}
              <div>
                <TextInput
                  className="[&_.input-default]:!bg-primary-900 [&_.input-failure]:!bg-primary-900 [&_.input-success]:!bg-primary-900 [&_.input-success]:!text-white [&_.input-failure]:!text-white [&_.input-default]:!text-white [&_.input-default]:!ring-[#3F5676]"
                  color={utilColorInputValid("email", errors, dirtyFields)}
                  helpertext={utilHelperText("email", errors)}
                  placeholder="Введите e-mail"
                  autoComplete="email"
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
                  className="[&_.input-default]:!bg-primary-900 ym-record-keys [&_.input-success]:!bg-primary-900 [&_.input-failure]:!bg-primary-900 [&_.input-default]:!text-white [&_.input-success]:!text-white [&_.input-failure]:!text-white [&_.input-default]:!ring-[#3F5676]"
                  rightIcon={
                    utilShowHidePassword(showPassword, setShowPassword).icon
                  }
                  type={
                    utilShowHidePassword(showPassword, setShowPassword).type
                  }
                  color={utilColorInputValid("password", errors, dirtyFields)}
                  helpertext={utilHelperText("password", errors)}
                  autoComplete="current-password"
                  placeholder="Введите пароль"
                  data-type="auth"
                  name="password"
                  id="password"
                  sizing="lg"
                  {...register("password")}
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
                Войти
              </Button>

              {/* Remember submit */}
              <p
                className="cursor-pointer text-center text-base font-pn-semibold text-primary-500"
                onClick={() => setOpenModal(true)}
              >
                Забыли пароль?
              </p>
            </RHFProvider>
          </div>

          {/* Войти через */}
          <div className="bg-[rgba(0,159,231,0.04)] flex flex-col sm:flex-row max-sm:gap-4 rounded-b-4xl justify-between sm:py-5 sm:px-[50px] py-4 px-[30px] items-center">
            <p className="font-pn-semibold opacity-80">Войти через:</p>

            {/* Кнопки для входа через соц сети */}
            <SocialBtns />
          </div>
        </div>

        {/* Еще нет аккаунта */}
        <AuthAnother
          text="Еще нет аккаунта?"
          textLink="Создать"
          link="/register"
        />
      </div>
    </div>
  );
};

export default LoginPage;
