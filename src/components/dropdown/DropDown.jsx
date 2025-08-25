"use client";
import React, { useLayoutEffect, useState, useRef } from "react";
import { useSpring, animated } from "react-spring";
import PropTypes from "prop-types";

/**
 * Компонент выпадающего списка (Dropdown).
 * Использует библиотеку react-transition-group для анимаций.
 *
 * @param {Object} props - Свойства компонента.
 * @param {ReactNode} props.children - Дочерние элементы.
 * @param {function} props.label - Текст кнопки для открытия списка.
 * @returns {JSX.Element}
 */
export const DropDown = ({ children, label, ...props }) => {
  const [show, setShow] = useState(false);
  const contentRef = useRef(null);
  const [contentHeight, setContentHeight] = useState(60);

  useLayoutEffect(() => {
    if (contentRef.current) {
      setContentHeight(contentRef.current.scrollHeight);
    }
  }, [contentRef, show]);

  const animation = useSpring({
    to: {
      paddingTop: show ? "10px" : "0px",
      height: show ? contentHeight : 0,
      opacity: show ? 1 : 0,
    },
    from: { paddingTop: "0px", opacity: 0, height: 0 },
    config: { duration: 200 },
  });

  const animationText = useSpring({
    to: {
      height: show ? contentHeight : 0,
      opacity: show ? 1 : 0,
    },
    from: { opacity: 0, height: 0 },
    config: { duration: 70 },
  });

  const handleClick = () => {
    setShow(!show);
  };

  return (
    <div
      {...props}
      className="rounded-xl bg-white sm:shadow-block2 cursor-pointer max-sm:border-b border-b-gray-200 sm:px-[25px] sm:py-5 py-4"
      onClick={handleClick}
    >
      <button className="w-full overflow-hidden">{label(show)}</button>
      <animated.div
        className="bg-white pl-4"
        style={animation}
        ref={contentRef}
      >
        {children(animationText)}
      </animated.div>
    </div>
  );
};

DropDown.propTypes = {
  children: PropTypes.func.isRequired,
  label: PropTypes.func.isRequired,
};
