const actionTypes = {
  checkPassword: "DEACTIVATION_CHECK_PASSWORD",
  checkPasswordSuccess: "DEACTIVATION_CHECK_PASSWORD_SUCCESS",
  checkPasswordFailure: "DEACTIVATION_CHECK_PASSWORD_FAILURE",
  clearCheckPassword: "DEACTIVATION_CHECK_PASSWORD_CLEAR",
  deactivateAccount: "DEACTIVATE_ACCOUNT",
  deactivateAccountSuccess: "DEACTIVATE_ACCOUNT_SUCCESS",
  deactivateAccountFailure: "DEACTIVATE_ACCOUNT_FAILURE",
  clearDeactivateAccount: "DEACTIVATE_ACCOUNT_CLEAR",
};

const actions = {
  checkPassword: (password, token) => ({
    type: actionTypes.checkPassword,
    payload: {
      password,
      token,
    },
  }),
  checkPasswordSuccess: (accessToken) => ({
    type: actionTypes.checkPasswordSuccess,
    payload: {
      accessToken,
    },
  }),
  checkPasswordFailure: (error) => ({
    type: actionTypes.checkPasswordFailure,
    payload: {
      error,
    },
  }),
  clearCheckPassword: () => ({
    type: actionTypes.clearCheckPassword,
  }),
  deactivateAccount: (token, accessToken, reason) => ({
    type: actionTypes.deactivateAccount,
    payload: {
      token,
      accessToken,
      reason,
    },
  }),
  deactivateAccountSuccess: () => ({
    type: actionTypes.deactivateAccountSuccess,
  }),
  deactivateAccountFailure: (error) => ({
    type: actionTypes.deactivateAccountFailure,
    payload: {
      error,
    },
  }),
  clearDeactivateAccount: () => ({
    type: actionTypes.clearDeactivateAccount,
  }),
};

export {
  actions,
  actionTypes,
};
