"use client";
import { useFormContext } from "react-hook-form";
import classNames from "classnames";
import PropTypes from "prop-types";
import { useEffect } from "react";

import { IconSwitch } from "./assets/icons";
import "./assets/styles/switch.scss";

/**
 * Компонент switch
 * @returns {JSX.Element}
 * @constructor
 */
export const Switch = ({
  position,
  children,
  options,
  label,
  name,
  ...props
}) => {
  const { register, setValue } = useFormContext();

  // eslint-disable-next-line react/prop-types
  const labelClass = classNames(
    "switch",
    { "enter-done": props.checked },
    { "exit-done": !props.checked },
    label.className,
  );

  useEffect(() => {
    // eslint-disable-next-line react/prop-types
    setValue(name, props.checked);
  }, []);

  return (
    <label className={labelClass} {...label}>
      {position === "left" && children}

      <input type="checkbox" {...register(name, options)} {...props} />
      <span className="switch__slider">
        <IconSwitch />
      </span>

      {position === "right" && children}
    </label>
  );
};

Switch.propTypes = {
  /**
   * Позиция ребенка
   */
  position: PropTypes.oneOf(["left", "right"]),

  /**
   * Опции RHF
   */
  options: PropTypes.object,

  /**
   * Ребенок
   */
  children: PropTypes.node,

  /**
   * Параметры label
   */
  label: PropTypes.object,

  /**
   * Название поля
   */
  name: PropTypes.string,
};

Switch.defaultProps = {
  children: "Switch",
  position: "right",
  name: "switch",
  options: {},
  label: {},
};
