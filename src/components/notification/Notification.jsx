"use client";
import { HiCheckCircle, HiXCircle } from "react-icons/hi";
import { Transition, Portal } from "@headlessui/react";
import React, { useEffect, useState } from "react";
import { VAR_IS_MODE_PROD } from "@vars";
import { Toast } from "flowbite-react";
import classNames from "classnames";
import PropTypes from "prop-types";

/**
 * Компонент уведомления
 * @param {string | object} message - Текст уведомления
 * @param {string} type - Тип уведомления
 * @param {time} delay - Время
 * @param {boolean} show - Показывать ли уведомление
 * @returns {JSX.Element}
 * @constructor
 */
export const Notification = ({ message, show, time, type }) => {
  const [display, setDisplay] = useState(false);

  const getMessage = () => {
    if (typeof message === "string") return message;
    else if (React.isValidElement(message)) return message;
    else if (VAR_IS_MODE_PROD) return message?.data?.error;
    else return message?.data;
  };

  useEffect(() => {
    if (show) {
      setDisplay(true);
      const timer = setTimeout(() => {
        setDisplay(false);
      }, time);

      return () => clearTimeout(timer);
    }
    setDisplay(show);
  }, [show]);

  /**
   * Иконка уведомления
   * @returns {JSX.Element}
   * @constructor
   */
  const IconNotification = () => {
    switch (type) {
      case "error":
        return (
          <HiXCircle
            style={{ background: "rgba(119, 29, 29, 0.2)" }}
            className="h-5 w-5 rounded-full fill-red-500"
          />
        );

      case "success":
        return (
          <HiCheckCircle
            className="h-5 w-5 rounded-full fill-green-400"
            style={{ background: "rgba(1, 71, 55, 0.2)" }}
          />
        );

      default:
        return (
          <HiXCircle
            style={{ background: "rgba(119, 29, 29, 0.2)" }}
            className="h-5 w-5 rounded-full fill-red-500"
          />
        );
    }
  };

  /**
   * Фон уведомления
   * @returns {string}
   */
  const bgNotification = () => {
    switch (type) {
      case "error":
        return "rgb(119, 29, 29)";

      case "success":
        return "rgb(1, 71, 55)";

      default:
        return "rgb(119, 29, 29)";
    }
  };

  /**
   * Стиль текста уведомления
   * @returns {string}
   */
  const styleTextNotification = () => {
    switch (type) {
      case "error":
        return "text-red-500";

      case "success":
        return "text-green-400";

      default:
        return "text-red-500";
    }
  };

  /**
   * Классы текста уведомления
   * @type {string}
   */
  const classTextNotification = classNames(
    "ml-3 text-sm font-normal",
    styleTextNotification(),
  );

  return (
    <Portal refName="notification">
      <Transition
        className="w-full fixed right-0 top-0 z-50 max-sm:w-full sm:top-3"
        leave="transition-opacity duration-150"
        enter="transition-opacity duration-75"
        leaveFrom="opacity-100"
        enterTo="opacity-100"
        enterFrom="opacity-0"
        leaveTo="opacity-0"
        show={display}
        appear={true}
      >
        <Toast
          className="w-full max-w-full sm:mx-auto sm:max-w-[400px]"
          style={{ background: bgNotification() }}
        >
          {/* Иконка уведомления */}
          <IconNotification />

          {/* Текст уведомления */}
          <div className={classTextNotification}>{getMessage() ?? ""}</div>

          {/* Кнопка закрытия уведомления */}
          <Toast.Toggle
            className="fill-white !hover:fill-white"
            style={{ background: "transparent" }}
          />
        </Toast>
      </Transition>
    </Portal>
  );
};

Notification.propTypes = {
  /**
   * Сообщение об ошибке
   */
  message: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.object,
    PropTypes.node,
  ]),

  /**
   * Тип уведомления
   */
  type: PropTypes.oneOf(["error", "success"]),

  /**
   * Время
   */
  time: PropTypes.number.isRequired,

  /**
   * Показывать ли уведомление
   */
  show: PropTypes.bool.isRequired,
};

Notification.defaultProps = {
  type: "error",
  show: false,
  message: "",
  time: 3000,
};
