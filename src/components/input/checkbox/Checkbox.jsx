"use client";
import { CSSTransition } from "react-transition-group";
import { useFormContext } from "react-hook-form";
import { useState, useRef } from "react";
import classNames from "classnames";
import PropTypes from "prop-types";

import { IconCheckbox } from "./assets/icons";
import "./assets/styles/checkbox.scss";

/**
 * Компонент checkbox
 * @constructor
 */
export const Checkbox = ({
  position,
  children,
  options,
  label,
  name,
  ...props
}) => {
  const checkboxRef = useRef(null);
  const { register } = useFormContext();
  const [checked, setChecked] = useState(false);

  const handleCheckedInput = () => setChecked(!checked);

  const labelClass = classNames("checkbox", label.className);

  return (
    <CSSTransition
      timeout={{ exit: 300, entry: 0 }}
      nodeRef={checkboxRef}
      classNames="checkbox"
      in={checked}
    >
      <label className={labelClass} ref={checkboxRef} {...label}>
        {position === "left" && children}
        <input
          onClick={handleCheckedInput}
          type="checkbox"
          {...register(name, options)}
          {...props}
        />
        <span className="checkbox__check">
          <IconCheckbox />
        </span>
        {position === "right" && children}
      </label>
    </CSSTransition>
  );
};

Checkbox.propTypes = {
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

Checkbox.defaultProps = {
  children: "Checkbox",
  position: "right",
  name: "checkbox",
  options: {},
  label: {},
};
