const actionTypes = {
  sendToConfirm: "SEND_TO_CONFIRM",
  sendToConfirmSuccess: "SEND_TO_CONFIRM_SUCCESS",
  sendToConfirmFailure: "SEND_TO_CONFIRM_FAILURE",
  sendCode: "SEND_CODE_FOR_CONFIRMATION",
  sendCodeFetching: "SEND_CODE_FETCHING",
  sendCodeSuccess: "SEND_CODE_FOR_CONFIRMATION_SUCCESS",
  sendCodeFailure: "SEND_CODE_FOR_CONFIRMATION_FAILURE",
  clearSendCodeError: "SEND_CODE_FOR_CONFIRMATION_CLEAR_ERROR",
  clearConfirmCode: "CLEAR_CONFIRM_CODE",
};

const sendToConfirm = (sessionId) => ({
  type: actionTypes.sendToConfirm,
  payload: { sessionId },
});
const sendToConfirmSuccess = () => ({
  type: actionTypes.sendToConfirmSuccess,
});
const sendToConfirmFailure = () => ({
  type: actionTypes.sendToConfirmFailure,
  error: true,
});
const sendCode = (sessionId, code) => ({
  type: actionTypes.sendCode,
  payload: { sessionId, code },
});
const sendCodeFetching = () => ({
  type: actionTypes.sendCodeFetching,
});
const sendCodeSuccess = () => ({
  type: actionTypes.sendCodeSuccess,
});
const sendCodeFailure = (error) => ({
  type: actionTypes.sendCodeFailure,
  error: true,
  payload: error,
});
const clearSendCodeError = () => ({
  type: actionTypes.clearSendCodeError,
});
const clearConfirmCode = () => ({
  type: actionTypes.clearConfirmCode,
});
const actions = {
  sendToConfirm,
  sendToConfirmSuccess,
  sendToConfirmFailure,
  sendCode,
  sendCodeFetching,
  sendCodeSuccess,
  sendCodeFailure,
  clearSendCodeError,
  clearConfirmCode,
};

export {
  actionTypes,
  actions,
};
