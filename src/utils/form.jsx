"use client";
// Icons
import { HiOutlineEyeOff, HiOutlineEye } from "react-icons/hi";
import { useCallback, useEffect, useState } from "react";
import * as yup from "yup";

/**
 * Утилита для варианта цвета инпута
 * @param {string} name - Имя инпута
 * @param {{}} errors - Ошибки
 * @param {{}} dirtyFields - Измененные поля
 * @returns {string}
 */
export const utilColorInputValid = (name, errors, dirtyFields) =>
  errors?.[`${name}`]
    ? "failure"
    : dirtyFields?.[`${name}`] && !errors?.[`${name}`]
      ? "success"
      : "gray";

/**
 * Утилита для сообщения об ошибке
 * @param {string} name - Имя инпута
 * @param {{}} errors - Ошибки
 * @param {null | string} defaultText
 * @returns {*}
 */
export const utilHelperText = (name, errors, defaultText = null) => {
  if (defaultText) {
    return errors?.[`${name}`] ? errors?.[`${name}`]?.message : defaultText;
  } else {
    return errors?.[`${name}`] && errors?.[`${name}`]?.message;
  }
};

export const utilSchemesValidation = {
  repeatPassword: (field = "password", fieldRepeat = "passwordAgain") => {
    return {
      [`${field}`]: yup
        .string()
        .required("Поле должно быть заполнено!")
        .oneOf([yup.ref(fieldRepeat), null], "Пароли должны совпадать")
        .min(5, "Пароль должен быть не короче 5 символов"),
    };
  },
  email: yup
    .string()
    .required("Поле должно быть заполнено!")
    .matches(/@/, "Поле должно быть вида example@mail.com"),
  password: yup
    .string()
    .required("Поле должно быть заполнено!")
    .min(5, "Пароль должен быть не короче 5 символов"),
};

/**
 * Проставление ошибки для капчи
 * @param {function} setError - Установка ошибок
 */
export const utilSetErrorCaptchaForm = (setError) =>
  setError("recaptcha", {
    message: "Пожалуйста подтвердите, что вы не робот",
    type: "manual",
  });

/**
 * Утилита для input password
 * @param showPassword - State show password
 * @param setShowPassword - State set show password
 * @returns {{}}
 */
export const utilShowHidePassword = (showPassword, setShowPassword) => {
  const handleShow = useCallback(() => setShowPassword(true), [showPassword]);
  const handleHide = useCallback(() => setShowPassword(false), [showPassword]);
  const [state, setState] = useState({});

  const iconClass =
    "text-gray-500 cursor-pointer w-5 h-5 hover:scale-110 hover:transition-all";

  useEffect(() => {
    setState({
      icon: showPassword
        ? () => <HiOutlineEyeOff className={iconClass} onClick={handleHide} />
        : () => <HiOutlineEye className={iconClass} onClick={handleShow} />,
      type: showPassword ? "text" : "password",
    });
  }, [showPassword]);

  return state;
};
