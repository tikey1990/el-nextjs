"use client";
import { useTransition, animated } from "react-spring";
import React, { useState } from "react";
import classnames from "classnames";
import PropTypes from "prop-types";

/**
 * Компонент всплывающего окна.
 * @param {{}} children - Содержимое всплывающего окна.
 * @param {Element} nodePopup - Содержимое всплывающего окна.
 * @param {string} direction - Направление всплытия: 'top', 'left', 'right', 'bottom'.
 * @param {{}} props - Дополнительные props.
 * @returns {JSX.Element}
 * @constructor
 */
const Tooltip = ({ direction = "top", nodePopup, children, ...props }) => {
  const [isHovering, setIsHovering] = useState(false);

  const transitions = useTransition(isHovering, {
    enter: { transform: getTransform(direction, false), opacity: 1 },
    leave: { transform: getTransform(direction, true), opacity: 0 },
    from: { transform: getTransform(direction, true), opacity: 0 },
    config: { duration: 200 },
  });

  function getTransform(direction, isInitial) {
    switch (direction) {
      case "bottom":
        return isInitial ? "translateY(10px)" : "translateY(0)";
      case "left":
        return isInitial ? "translateX(-10px)" : "translateX(0)";
      case "right":
        return isInitial ? "translateX(10px)" : "translateX(0)";
      default: // "top"
        return isInitial ? "translateY(-10px)" : "translateY(0)";
    }
  }

  const tooltipPositionClass = classnames({
    "top-7 left-1/2 transform -translate-x-1/2 mt-2 absolute z-[70]":
      direction === "bottom",
    "bottom-7 left-1/2 transform -translate-x-1/2 mb-2 absolute z-[70]":
      direction === "top",
    "left-7 top-1/2 transform -translate-y-1/2 ml-2 absolute z-[70]":
      direction === "right",
    "right-7 top-1/2 transform -translate-y-1/2 mr-2 absolute z-[70]":
      direction === "left",
  });

  const tooltipArrowClass = classnames({
    "before:rotate-180 before:bottom-0 before:left-1/2 before:-translate-x-1/2 before:translate-y-[100%]":
      direction === "top",
    "before:rotate-90 before:right-0 before:translate-y-[calc(50%+2px)] before:translate-x-[100%]":
      direction === "left",
    "before:rotate-90 before:left-0": direction === "right",
    "before:rotate-0 before:top-0": direction === "bottom",
  });

  return (
    <div
      className={classnames("relative cursor-pointer")}
      onMouseLeave={() => setIsHovering(false)}
      onMouseEnter={() => setIsHovering(true)}
      {...props}
    >
      {children}
      <div className={tooltipPositionClass}>
        {transitions(
          (styles, item) =>
            item && (
              <animated.div
                // eslint-disable-next-line react/prop-types
                className={`bg-white shadow-tooltip min-w-[210px] z-[20] text-gray-500 font-pn-semibold text-[13px] text-center max-w-[220px] py-2 px-4 rounded-lg before:content-[''] before:absolute before:w-0 before:h-0 before:border-8 before:border-transparent before:border-b-white before:rounded-sm ${tooltipArrowClass} ${props.classNamePopup}`}
                style={styles}
              >
                {nodePopup}
              </animated.div>
            ),
        )}
      </div>
    </div>
  );
};

Tooltip.propTypes = {
  direction: PropTypes.oneOf(["top", "left", "right", "bottom"]),
  nodePopup: PropTypes.node.isRequired,
  children: PropTypes.node.isRequired,
  props: PropTypes.object,
};

export default Tooltip;
