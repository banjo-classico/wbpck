const actionTypes = {
  fetchConnectedPractices: "SCRIPT_FETCH_PRACTICES",
  fetchConnectedPracticesSuccess: "SCRIPT_FETCH_PRACTICES_SUCCESS",
  fetchConnectedPracticesFailure: "SCRIPT_FETCH_PRACTICES_FAILURE",
  fetchDoctors: "SCRIPT_FETCH_DOCTORS",
  fetchDoctorsSuccess: "SCRIPT_FETCH_DOCTORS_SUCCESS",
  fetchDoctorsFailure: "SCRIPT_FETCH_DOCTORS_FAILURE",
  setInfo: "SCRIPT_SET_INFO",
};

const actions = {
  fetchConnectedPractices: (id) => ({
    type: actionTypes.fetchConnectedPractices,
    payload: {
      id,
    },
  }),
  fetchConnectedPracticesSuccess: (practices) => ({
    type: actionTypes.fetchConnectedPracticesSuccess,
    payload: {
      practices,
    },
  }),
  fetchConnectedPracticesFailure: (error) => ({
    type: actionTypes.fetchConnectedPracticesFailure,
    payload: { error },
    error: true,
  }),
  fetchDoctors: (id, token) => ({
    type: actionTypes.fetchDoctors,
    payload: {
      id,
      token,
    },
  }),
  fetchDoctorsSuccess: (doctors) => ({
    type: actionTypes.fetchDoctorsSuccess,
    payload: {
      doctors,
    },
  }),
  fetchDoctorsFailure: (error) => ({
    type: actionTypes.fetchDoctorsFailure,
    payload: { error },
    error: true,
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
