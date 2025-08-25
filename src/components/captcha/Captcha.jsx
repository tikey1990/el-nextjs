"use client";
import { VAR_GOOGLE_RECAPTCHA_KEY, VAR_IS_MODE_PROD } from "@vars";
import { utilSetErrorCaptchaForm } from "@utils";
import ReCAPTCHA from "react-google-recaptcha";
import classNames from "classnames";
import PropTypes from "prop-types";
import { useEffect } from "react";

/**
 * Компонент каптчи
 * @param {{}} recaptchaRef
 * @param {{}} captchaError
 * @param {{}} serverError
 * @param {function} setError
 * @param {function} clearErrors
 * @param {"center" | "right" | "left"} position
 * @returns {Element}
 * @constructor
 */
export const Captcha = ({
  recaptchaRef,
  captchaError,
  serverError,
  clearErrors,
  setError,
  position,
}) => {
  const classWrapperCaptcha = classNames(
    "flex flex-col justify-center gap-3",
    { "w-full items-center": position === "center" },
    { "items-start": position === "left" },
  );

  const onRecaptchaChange = (value) => {
    if (value === null && VAR_IS_MODE_PROD) utilSetErrorCaptchaForm(setError);
    else clearErrors("recaptcha");
  };

  useEffect(() => {
    if (serverError && VAR_IS_MODE_PROD && recaptchaRef?.current) {
      recaptchaRef.current.reset();
    }
  }, [serverError, recaptchaRef]);

  return (
    <>
      {VAR_IS_MODE_PROD && (
        <div className={classWrapperCaptcha}>
          <div>
            <ReCAPTCHA
              style={{ display: "inline-flex" }}
              sitekey={VAR_GOOGLE_RECAPTCHA_KEY}
              onChange={onRecaptchaChange}
              ref={recaptchaRef}
              theme="light"
            />
          </div>
          <p className="jus text-red-500">
            {captchaError?.recaptcha && (
              <p>{captchaError?.recaptcha.message}</p>
            )}
          </p>
        </div>
      )}
    </>
  );
};

Captcha.propTypes = {
  position: PropTypes.oneOf(["center", "right", "left"]),
  recaptchaRef: PropTypes.object.isRequired,
  captchaError: PropTypes.object.isRequired,
  clearErrors: PropTypes.func.isRequired,
  setError: PropTypes.func.isRequired,
  serverError: PropTypes.object,
};

Captcha.defaultProps = {
  position: "center",
};
