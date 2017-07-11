const actionTypes = {
  autoRegisterUser: "AUTO_REGISTER_USER",
  autoRegisterUserSuccess: "AUTO_REGISTER_USER_SUCCESS",
  autoRegisterUserFailure: "AUTO_REGISTER_USER_FAILURE",
};

const autoRegisterUser = (email, sessionId, password) => ({
  type: actionTypes.autoRegisterUser,
  payload: {
    email,
    sessionId,
    password,
  },
});
const autoRegisterUserSuccess = () => ({
  type: actionTypes.autoRegisterUserSuccess,
});
const autoRegisterUserFailure = (error) => ({
  type: actionTypes.autoRegisterUserFailure,
  error: true,
  payload: {
    error,
  },
});

const actions = {
  autoRegisterUser,
  autoRegisterUserSuccess,
  autoRegisterUserFailure,
};

export {
  actionTypes,
  actions,
};
