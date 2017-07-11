import MobileDetect from "mobile-detect";
import BrowserDetect from "detect-browser";

const isIOS = () => {
  const a = new MobileDetect(window.navigator.userAgent);
  return a.os() === "iOS";
};

const isIE = () => BrowserDetect.name === "ie";
const isSaf = () => BrowserDetect.name === "safari";

export {
  isIOS,
  isIE,
  isSaf,
};
