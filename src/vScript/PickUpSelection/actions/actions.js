const actionTypes = {
  fetchPickUpOptions: "SCRIPT_FETCH_PICK_UP_OPTIONS",
  fetchPickUpOptionsSuccess: "SCRIPT_FETCH_PICK_UP_OPTIONS_SUCCESS",
  fetchPickUpOptionsFailure: "SCRIPT_FETCH_PICK_UP_OPTIONS_FAILURE",
};

const actions = {
  fetchPickUpOptions: (orgId, token) => ({
    type: actionTypes.fetchPickUpOptions,
    payload: {
      orgId,
      token,
    },
  }),
  fetchPickUpOptionsSuccess: (options) => ({
    type: actionTypes.fetchPickUpOptionsSuccess,
    payload: {
      options,
    },
  }),
  fetchPickUpOptionsFailure: (error) => ({
    type: actionTypes.fetchPickUpOptionsFailure,
    payload: {
      error,
    },
  }),
};

export {
  actions,
  actionTypes,
};
