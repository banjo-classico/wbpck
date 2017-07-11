const actionTypes = {
  changeUserPassword: "CHANGE_USER_PASSWORD",
  changeUserPasswordFailure: "CHANGE_USER_PASSWORD_FAILURE",
  changeUserPasswordSuccess: "CHANGE_USER_PASSWORD_SUCCESS",
  clearChangePassword: "CHANGE_USER_PASSWORD_CLEAR",
};

const actions = {
  changeUserPassword: (oldPassword, newPassword) => ({
    type: actionTypes.changeUserPassword,
    payload: {
      Password: oldPassword,
      NewPassword: newPassword,
    },
  }),
  changeUserPasswordFailure: error => ({
    type: actionTypes.changeUserPasswordFailure,
    error: true,
    payload: {
      error,
    },
  }),
  changeUserPasswordSuccess: () => ({
    type: actionTypes.changeUserPasswordSuccess,
  }),
  clearChangePassword: () => ({
    type: actionTypes.clearChangePassword,
  }),
};

export {
  actionTypes,
  actions,
};
