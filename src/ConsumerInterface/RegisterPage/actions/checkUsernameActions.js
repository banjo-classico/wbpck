const actionTypes = {
  checkUsername: "CHECK_USERNAME",
  checkUsernameSuccess: "CHECK_USERNAME_SUCCESS",
  checkUsernameFailure: "CHECK_USERNAME_FAILURE",
  clearCheckUserState: "CHECK_USERNAME_CLEAR_STATE",
  setUsedEmail: "CHECK_USERNAME_SET_USED_EMAIL",
};

const checkUsername = (email) => ({
  type: actionTypes.checkUsername,
  payload: {
    email,
  },
});

const checkUsernameSuccess = () => ({
  type: actionTypes.checkUsernameSuccess,
});

const checkUsernameFailure = (error) => ({
  type: actionTypes.checkUsernameFailure,
  error: true,
  payload: {
    error,
  },
});
const setUsedEmail = (email) => ({
  type: actionTypes.setUsedEmail,
  payload: {
    email,
  },
});
const clearCheckUserState = () => ({
  type: actionTypes.clearCheckUserState,
});

const actions = {
  checkUsername,
  checkUsernameSuccess,
  checkUsernameFailure,
  clearCheckUserState,
  setUsedEmail,
};

export {
  actionTypes,
  actions,
};
