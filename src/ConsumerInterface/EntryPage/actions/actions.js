const actionTypes = {
  login: "LOGIN",
  loginSuccess: "LOGIN_SUCCESS",
  loginError: "LOGIN_ERROR",
  logout: "LOGOUT",
  logoutSuccess: "LOGOUT_SUCCESS",
  logoutFailure: "LOGOUT_FAILURE",
  clearLoginError: "CLEAR_LOGIN_ERROR",
};

const login = (email, password) => ({
  type: actionTypes.login,
  payload: { email, password },
});

const loginSuccess = (token, expiryTime, email) => ({
  type: actionTypes.loginSuccess,
  payload: {
    token,
    expiryTime,
    email,
  },
});

const loginError = (err) => ({
  type: actionTypes.loginError,
  payload: { err },
  error: true,
});

const clearLoginError = () => ({
  type: actionTypes.clearLoginError,
});

const logout = (token, config) => ({
  type: actionTypes.logout,
  payload: {
    token,
    config,
  },
});
const logoutSuccess = () => ({
  type: actionTypes.logoutSuccess,
});

const logoutFailure = (err) => ({
  type: actionTypes.logoutFailure,
  payload: { err },
  error: true,
});

const actions = {
  login,
  loginSuccess,
  loginError,
  logout,
  logoutSuccess,
  logoutFailure,
  clearLoginError,
};

export {
  actionTypes,
  actions,
};
