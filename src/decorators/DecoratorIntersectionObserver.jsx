"use client";
import React, { useEffect, useRef } from "react";
import PropTypes from "prop-types";

/**
 * Декоратор intersection observer
 * @param {string} name - Название элемента
 * @param {any} register - Функция для регистрации элемента
 * @param {Element | Element[]} children - Дочерний элемент или элементы
 * @param {boolean} isChildrenWrapper - Обернуть ли дочерний элемент в div
 * @param {{}} props - Props
 * @returns {Element}
 * @constructor
 */
export const DecoratorIntersectionObserver = ({
  isChildrenWrapper,
  children,
  register,
  name,
  ...props
}) => {
  const ref = useRef();
  useEffect(() => {
    if (ref.current) {
      register(ref.current, name);
    }
  }, [register, name]);

  return (
    <>
      <div {...props} ref={ref}>
        {children}
      </div>
    </>
  );
};

DecoratorIntersectionObserver.propTypes = {
  /**
   * Дочерний элемент
   */
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,

  /**
   * Функция для регистрации элемента
   */
  register: PropTypes.any.isRequired,

  /**
   * Название элемента
   */
  name: PropTypes.string.isRequired,

  /**
   * Обернуть ли дочерний элемент в div
   */
  isChildrenWrapper: PropTypes.bool,
};

DecoratorIntersectionObserver.defaultProps = {
  isChildrenWrapper: true,
};
