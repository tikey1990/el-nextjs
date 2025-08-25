"use client";
import { useEffect } from "react";

/**
 * Хук для блокировки значения min | max
 * @param setValue
 * @param fieldName
 * @param value
 * @param valueMax
 * @param valueMin
 */
export const useLockFormValueToMinOrMax = (
  setValue,
  fieldName,
  value,
  valueMax,
  valueMin,
) => {
  useEffect(() => {
    if (value > valueMax) setValue(fieldName, valueMax);
    else if (value < valueMin) setValue(fieldName, valueMin);
  }, [value]);
};
