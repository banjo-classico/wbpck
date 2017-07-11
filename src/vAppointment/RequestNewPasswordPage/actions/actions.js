const actionTypes = {
  requestNewPassword: "REQUEST_NEW_PASSWORD",
  requestNewPasswordFailure: "REQUEST_NEW_PASSWORD_FAILURE",
  requestNewPasswordSuccess: "REQUEST_NEW_PASSWORD_SUCCESS",
  clearState: "REQUEST_NEW_PASSWORD_CLEAR_STATE",
};

const actions = {
  requestNewPassword: email => ({
    type: actionTypes.requestNewPassword,
    payload: {
      email,
    },
  }),

  requestNewPasswordFailure: error => ({
    type: actionTypes.requestNewPasswordFailure,
    error: true,
    payload: {
      error,
    },
  }),

  requestNewPasswordSuccess: () => ({
    type: actionTypes.requestNewPasswordSuccess,
  }),

  clearState: () => ({
    type: actionTypes.clearState,
  }),
};

export {
  actionTypes,
  actions,
};
