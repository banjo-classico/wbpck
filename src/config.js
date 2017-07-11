const API_PREFIX = "/api/";
const MOBILE_SIZE = 1023;
const DESKTOP_SIZE = 1024;
const GOOGLE_API_KEY = "AIzaSyDpLxcQ4o7mE7PtFftyRxzauI4xFN81t5s";

const isMobile = () => (window.innerWidth <= MOBILE_SIZE);
const isDesktop = () => !isMobile();

export {
  API_PREFIX,
  MOBILE_SIZE,
  DESKTOP_SIZE,
  GOOGLE_API_KEY,
  isMobile,
  isDesktop,
};
