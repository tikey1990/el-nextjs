"use client";
import { FormProvider } from "react-hook-form";
import PropTypes from "prop-types";

/**
 * Провайдер react hook form
 * @constructor
 */
export const RHFProvider = ({ withDevTools, children, methods, ...props }) => {
  return (
    <FormProvider {...methods}>
      <form {...props}>{children}</form>
    </FormProvider>
  );
};

RHFProvider.propTypes = {
  /**
   * Нужны ли de tools
   */
  withDevTools: PropTypes.bool,

  methods: PropTypes.object,

  /**
   * Ребенок
   */
  children: PropTypes.node,
};

RHFProvider.defaultProps = {
  withDevTools: false,
  children: "",
};
