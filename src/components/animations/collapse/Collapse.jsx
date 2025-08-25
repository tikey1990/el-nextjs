"use client";
import { useSpring, animated } from "react-spring";
import PropTypes from "prop-types";

/**
 * Represents a collapsing component.
 *
 * @typedef {Object} Collapse
 * @property {boolean} isCollapsed - Indicates whether the component is collapsed or not.
 * @property {*} children - The content to be displayed when the component is not collapsed.
 */
export const AnimCollapse = ({ isCollapsed, children, ...props }) => {
  const animation = useSpring({
    from: { opacity: isCollapsed ? 1 : 0 },
    height: isCollapsed ? 0 : "auto",
    opacity: isCollapsed ? 0 : 1,
  });

  return (
    <animated.div style={animation} {...props}>
      {children}
    </animated.div>
  );
};

AnimCollapse.propTypes = {
  isCollapsed: PropTypes.bool,
  children: PropTypes.any,
  props: PropTypes.object,
};
