const actionTypes = {
  verifyCode: "VERIFY_USER_REGISTRATION_CODE",
  verifyCodeSuccess: "VERIFY_USER_REGISTRATION_CODE_SUCCESS",
  verifyCodeFailure: "VERIFY_USER_REGISTRATION_CODE_FAILURE",
  clearVerifyCodeError: "VERIFY_USER_REGISTRATION_CODE_CLEAR_ERROR",
  resendCode: "VERIFY_USER_REGISTRATION_RESEND_CODE",
  resendCodeSuccess: "VERIFY_USER_REGISTRATION_RESEND_CODE_SUCCESS",
  resendCodeFailure: "VERIFY_USER_REGISTRATION_RESEND_CODE_FAILURE",
  sendCodeToVerify: "SEND_CODE_TO_VERFIFY",
  sendCodeToVerifySuccess: "SEND_CODE_TO_VERFIFY_SUCCESS",
  sendCodeToVerifyFailure: "SEND_CODE_TO_VERFIFY_FAILURE",
};

const verifyCode = (token, code) => ({
  type: actionTypes.verifyCode,
  payload: {
    token,
    code,
  },
});
const verifyCodeSuccess = () => ({
  type: actionTypes.verifyCodeSuccess,
});
const verifyCodeFailure = (err) => ({
  type: actionTypes.verifyCodeFailure,
  error: true,
  payload: err,
});
const clearVerifyCodeError = () => ({
  type: actionTypes.clearVerifyCodeError,
});
const resendCode = (mobile) => ({
  type: actionTypes.resendCode,
  payload: {
    mobile,
  },
});
const resendCodeSuccess = () => ({
  type: actionTypes.resendCodeSuccess,
});
const resendCodeFailure = (err) => ({
  type: actionTypes.resendCodeFailure,
  error: true,
  payload: {
    err,
  },
});
const sendCodeToVerify = (mobile) => ({
  type: actionTypes.sendCodeToVerify,
  payload: {
    mobile,
  },
});
const sendCodeToVerifySuccess = () => ({
  type: actionTypes.sendCodeToVerifySuccess,
});

const sendCodeToVerifyFailure = (error) => ({
  type: actionTypes.sendCodeToVerifyFailure,
  error: true,
  payload: {
    error,
  },
});
const actions = {
  verifyCode,
  verifyCodeSuccess,
  verifyCodeFailure,
  clearVerifyCodeError,
  resendCode,
  resendCodeSuccess,
  resendCodeFailure,
  sendCodeToVerify,
  sendCodeToVerifySuccess,
  sendCodeToVerifyFailure,
};


export {
  actions,
  actionTypes,
};
