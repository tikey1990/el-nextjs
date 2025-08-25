"use client";
import { isMobile, isTablet, isDesktop } from "react-device-detect";

/**
 *  Хук для определения типа устройства
 */
export const useTypeDevice = () => {
  return {
    isDesktop,
    isMobile,
    isTablet,
  };
};
