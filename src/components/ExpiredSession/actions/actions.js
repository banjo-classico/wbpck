const actionTypes = {
  showExpiredSession: "EXPIRED_SESSION_POPUP",
  refreshSession: "EXPIRED_SESSION_REFRESH",
  expiredSessionSuccess: "EXPIRED_SESSION_SUCCESS",
  expiredSessionFailure: "EXPIRED_SESSION_FAILURE",
};

const actions = {
  showExpiredSession: () => ({
    type: actionTypes.showExpiredSession,
  }),
  refreshSession: (email, password) => ({
    type: actionTypes.refreshSession,
    payload: { email, password },
  }),
  expiredSessionSuccess: () => ({
    type: actionTypes.expiredSessionSuccess,
  }),
  expiredSessionFailure: () => ({
    type: actionTypes.expiredSessionFailure,
    error: true,
  }),
};

export {
  actions,
  actionTypes,
};
