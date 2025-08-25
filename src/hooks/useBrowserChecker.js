import {
  isChrome,
  isEdge,
  isFirefox,
  isIE,
  isOpera,
  isSafari,
} from "react-device-detect";

export const useBrowserChecker = () => {
  return {
    isFirefox,
    isSafari,
    isChrome,
    isOpera,
    isBlink: isChrome || isOpera,
    isEdge,
    isIE,
  };
};
