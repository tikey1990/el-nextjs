"use client";
import { useEffect, useState } from "react";

/**
 * Хук для debounce значения
 * @param {any} value - Значение
 * @param {number} delay - Задержка
 * @returns {unknown}
 */
export const useDebounceValue = (value, delay) => {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    setDebouncedValue(value);

    const timerId = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(timerId);
    };
  }, [value, delay]);

  return debouncedValue;
};
