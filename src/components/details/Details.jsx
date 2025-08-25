"use client";
import { VAR_HAS_PREMIUM_VISUAL_MODE } from "@vars";
import { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { useAuth } from "@hooks";

// Styles
import "./assets/styles/details.scss";

/**
 * Компонент декора
 * @param {number} version - Версия
 * @param {any} refPage - Ref обертки страницы
 * @returns {JSX.Element}
 * @constructor
 */
export const Details = ({ version }) => {
  const [height, setHeight] = useState("100%");
  const { isAuth } = useAuth();
  const isCheckedVisualMode = VAR_HAS_PREMIUM_VISUAL_MODE();

  const newVersion = () => {
    switch (version) {
      case 4:
        return isCheckedVisualMode && isAuth ? 5 : 4;
      default:
        return version;
    }
  };

  useEffect(() => {
    const main = document.querySelector(".main");

    if (main) {
      const observer = new ResizeObserver(([entry]) => {
        const header = document.querySelector(".header");
        const footer = document.querySelector(".footer");
        const footerHeight = footer && footer.clientHeight;
        const heightDetails =
          entry.contentRect.height + footerHeight + header.clientHeight;

        if (document.body.clientHeight > heightDetails)
          setHeight(`${document.body.clientHeight}px`);
        else setHeight(`${heightDetails}px`);
      });

      observer.observe(main);

      return () => observer.unobserve(main);
    }
  }, []);

  return (
    <div id={`details--v${newVersion()}`} style={{ height: height }}></div>
  );
};

Details.propTypes = {
  version: PropTypes.number,
};
