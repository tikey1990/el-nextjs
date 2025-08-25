"use client";
import { IconStatusError, IconPassShow, IconPassHide } from "@icons/status";
import { ErrorMessage } from "@hookform/error-message";
import { useFormContext } from "react-hook-form";
import classNames from "classnames";
import PropTypes from "prop-types";
import { useState } from "react";

import "./styles/input.scss";

/**
 * Компонент input
 * @returns {JSX.Element}
 * @constructor
 */
export const Input = ({
  hasValidation,
  errorMessage,
  isSuccess,
  options,
  isError,
  name,
  ...props
}) => {
  const {
    formState: { dirtyFields, errors },
    register,
  } = useFormContext();

  // Класс когда поле не проходит валидацию
  const classInputHasError = (hasValidation && errors[name]) || isError;

  // Класс когда поле проходит валидацию
  const classInputIsSuccess =
    (hasValidation && !errors[name] && dirtyFields[name] && !isError) ||
    (isSuccess && !isError);

  const inputClass = classNames(
    "input",
    { "input--error": classInputHasError },
    { "input--success": classInputIsSuccess },
    //  eslint-disable-next-line react/prop-types
    props.className,
  );

  /**
   * рендер нужного элемента
   * @returns {JSX.Element}
   */
  const elementRender = () => {
    //  eslint-disable-next-line react/prop-types
    switch (props.type) {
      case "text":
        return (
          <input
            {...register(name, options)}
            {...props}
            className={inputClass}
          />
        );
      case "textarea":
        return (
          <textarea
            {...register(name, options)}
            {...props}
            className={inputClass}
          />
        );
      case "password":
        // eslint-disable-next-line no-case-declarations
        const [showPassword, setShowPassword] = useState(false);

        // eslint-disable-next-line no-unused-vars,no-case-declarations
        const toggleShowPassword = () => {
          setShowPassword(!showPassword);
        };

        return (
          <div className="input-password">
            <input
              {...register(name, options)}
              {...props}
              type={showPassword ? "text" : "password"}
              className={inputClass}
            />

            <button onClick={toggleShowPassword} type="button">
              {showPassword ? <IconPassHide /> : <IconPassShow />}
            </button>
          </div>
        );
      default:
        return (
          <input
            {...register(name, options)}
            {...props}
            className={inputClass}
          />
        );
    }
  };

  return (
    <>
      {elementRender()}

      {errorMessage && (
        <ErrorMessage
          render={({ message }) => (
            <p className="message-error text text-color-black">
              <IconStatusError /> {message}
            </p>
          )}
          errors={errors}
          name={name}
        />
      )}
    </>
  );
};

Input.propTypes = {
  /**
   * Нужно ли показывать валидацию
   */
  hasValidation: PropTypes.bool,

  /**
   * Компонент ошибки
   * (message) =>
   */
  errorMessage: PropTypes.bool,

  /**
   * Опции RHF
   */
  options: PropTypes.object,

  /**
   * Состояние accept
   */
  isSuccess: PropTypes.bool,

  /**
   * Состояние ошибки
   */
  isError: PropTypes.bool,

  /**
   * Название поля
   */
  name: PropTypes.string,
};

Input.defaultProps = {
  hasValidation: true,
  errorMessage: false,
  isSuccess: false,
  isError: false,
  name: "input",
  options: {},
};
