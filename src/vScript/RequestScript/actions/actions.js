const actionTypes = {
  fetchCurrentRequests: "SCRIPT_FETCH_CURRENT_REQUESTS",
  fetchCurrentRequestsSuccess: "SCRIPT_FETCH_CURRENT_REQUESTS_SUCCESS",
  fetchCurrentRequestsFailure: "SCRIPT_FETCH_CURRENT_REQUESTS_FAILURE",
  fetchPastRequests: "SCRIPT_FETCH_PAST_REQUESTS",
  fetchPastRequestsSuccess: "SCRIPT_FETCH_PAST_REQUESTS_SUCCESS",
  fetchPastRequestsFailure: "SCRIPT_FETCH_PAST_REQUESTS_FAILURE",
  fetchScriptDetails: "SCRIPT_FETCH_REQUEST_DETAILS",
  fetchScriptDetailsSuccess: "SCRIPT_FETCH_REQUEST_DETAILS_SUCCESS",
  fetchScriptDetailsFailure: "SCRIPT_FETCH_REQUEST_DETAILS_FAILURE",
  removeScript: "SCRIPT_REMOVE",
  setInfo: "SCRIPT_SET_INFO",
};

const actions = {
  fetchCurrentRequests: (token) => ({
    type: actionTypes.fetchCurrentRequests,
    payload: {
      token,
    },
  }),
  fetchCurrentRequestsSuccess: (requests) => ({
    type: actionTypes.fetchCurrentRequestsSuccess,
    payload: {
      requests,
    },
  }),
  fetchCurrentRequestsFailure: (error) => ({
    type: actionTypes.fetchCurrentRequestsFailure,
    payload: {
      error,
    },
  }),
  fetchPastRequests: (token) => ({
    type: actionTypes.fetchPastRequests,
    payload: {
      token,
    },
  }),
  fetchPastRequestsSuccess: (requests) => ({
    type: actionTypes.fetchPastRequestsSuccess,
    payload: {
      requests,
    },
  }),
  fetchPastRequestsFailure: (error) => ({
    type: actionTypes.fetchPastRequestsFailure,
    payload: {
      error,
    },
  }),
  fetchScriptDetails: (id, token) => ({
    type: actionTypes.fetchScriptDetails,
    payload: {
      id,
      token,
    },
  }),
  fetchScriptDetailsSuccess: (details) => ({
    type: actionTypes.fetchScriptDetailsSuccess,
    payload: {
      details,
    },
  }),
  fetchScriptDetailsFailure: (error) => ({
    type: actionTypes.fetchScriptDetailsFailure,
    payload: {
      error,
    },
  }),
  removeScript: (id, token) => ({
    type: actionTypes.removeScript,
    payload: {
      id,
      token,
    },
  }),
  setInfo: (id, value) => ({
    type: actionTypes.setInfo,
    payload: {
      id,
      value,
    },
  }),
};

export {
  actions,
  actionTypes,
};
