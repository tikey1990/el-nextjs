"use client";
import { useLayoutEffect, useState } from "react";
import { createPortal } from "react-dom";
import PropTypes from "prop-types";

import { createWrapperAndAppendToBody } from "../";

/**
 * Утилита для создания портала
 */
export const ReactPortal = ({ wrapperId, children }) => {
  const [wrapperElement, setWrapperElement] = useState(null);

  useLayoutEffect(() => {
    let element = document.getElementById(wrapperId);
    let systemCreated = false;

    if (!element) {
      systemCreated = true;
      element = createWrapperAndAppendToBody(wrapperId);
    }
    setWrapperElement(element);

    return () => {
      if (systemCreated && element.parentNode) {
        element.parentNode.removeChild(element);
      }
    };
  }, [wrapperId]);

  if (wrapperElement === null) return null;

  return createPortal(children, wrapperElement);
};

ReactPortal.propTypes = {
  /**
   * Id обертки
   */
  wrapperId: PropTypes.string,

  /**
   * Ребенок
   */
  children: PropTypes.node,
};

ReactPortal.defaultProps = {
  wrapperId: "react-portal-wrapper",
  children: null,
};
