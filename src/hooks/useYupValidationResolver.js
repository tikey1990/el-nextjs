"use client";
import { useCallback, useRef } from "react";

/**
 * Хук для объявления схемы валидации yup
 * @param validationSchema - Схема валидации
 * @param {number} delay - Задержка валидации
 * @returns {(function(*): Promise<{values: *, errors: {}}|{values: {}, errors: *}|undefined>)|*}
 */
export const useYupValidationResolver = (validationSchema, delay = 0) => {
  const timeoutRef = useRef(null);

  return useCallback(
    async (data) => {
      return new Promise((resolve) => {
        if (timeoutRef.current) {
          clearTimeout(timeoutRef.current);
        }

        timeoutRef.current = setTimeout(async () => {
          try {
            const values = await validationSchema.validate(data, {
              abortEarly: false,
            });

            resolve({
              errors: {},
              values,
            });
          } catch (errors) {
            resolve({
              errors: errors.inner.reduce(
                (allErrors, currentError) => ({
                  ...allErrors,
                  [currentError.path]: {
                    type: currentError.type ?? "validation",
                    message: currentError.message,
                  },
                }),
                {},
              ),
              values: {},
            });
          }
        }, delay);
      });
    },
    [validationSchema, delay],
  );
};
