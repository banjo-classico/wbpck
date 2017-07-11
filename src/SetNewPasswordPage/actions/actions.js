const actionTypes = {
  checkPasswordToken: "CHECK_SET_NEW_PASSWORD_TOKEN",
  checkPasswordTokenSuccess: "CHECK_SET_NEW_PASSWORD_TOKEN_SUCCESS",
  checkPasswordTokenFailure: "CHECK_SET_NEW_PASSWORD_TOKEN_FAILURE",
  clearCheckPasswordToken: "CHECK_PASSWORD_TOKEN_CLEAR",
  setNewPassword: "SET_NEW_PASSWORD",
  setNewPasswordFailure: "SET_NEW_PASSWORD_FAILURE",
  setNewPasswordSuccess: "SET_NEW_PASSWORD_SUCCESS",
  clearSetPassword: "SET_NEW_PASSWORD_CLEAR",
};

const actions = {
  checkPasswordToken: (token) => ({
    type: actionTypes.checkPasswordToken,
    payload: {
      Token: token,
    },
  }),
  checkPasswordTokenSuccess: () => ({
    type: actionTypes.checkPasswordTokenSuccess,
  }),
  checkPasswordTokenFailure: (error) => ({
    type: actionTypes.checkPasswordTokenFailure,
    error: true,
    payload: {
      error,
    },
  }),
  setNewPassword: (newPassword, token) => ({
    type: actionTypes.setNewPassword,
    payload: {
      NewPassword: newPassword,
      Token: token,
    },
  }),
  setNewPasswordFailure: error => ({
    type: actionTypes.setNewPasswordFailure,
    error: true,
    payload: {
      error,
    },
  }),
  setNewPasswordSuccess: () => ({
    type: actionTypes.setNewPasswordSuccess,
  }),
  clearSetPassword: () => ({
    type: actionTypes.clearSetPassword,
  }),
};

export {
  actionTypes,
  actions,
};
