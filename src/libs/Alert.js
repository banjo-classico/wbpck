import Alert from "react-s-alert";

const error = (message, config = {}) =>
  Alert.error(message, { ...config, customFields: { error: true } });
const warning = (message, config = {}) =>
  Alert.warning(message, { ...config, customFields: { warning: true } });
const info = (message, config = {}) =>
  Alert.info(message, { ...config, customFields: { info: true } });
const success = (message, config = {}) =>
  Alert.success(message, { ...config, customFields: { success: true } });

const alert = {
  error,
  warning,
  info,
  success,
};

export default alert;
