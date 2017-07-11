const actionTypes = {
  fetchAllPractices: "SCRIPT_FETCH_ALL_PRACTICES",
  fetchAllPracticesSuccess: "SCRIPT_FETCH_ALL_PRACTICES_SUCCESS",
  fetchAllPracticesFailure: "SCRIPT_FETCH_ALL_PRACTICES_FAILURE",
  searchPractices: "SEARCH_ALL_PRACTICES",
  searchPracticesSuccess: "SEARCH_ALL_PRACTICES_SUCCESS",
  clearPracticeSelection: "SEARCH_ALL_PRACTICES_CLEAR",
};

const actions = {
  fetchAllPractices: (token) => ({
    type: actionTypes.fetchAllPractices,
    payload: {
      token,
    },
  }),
  fetchAllPracticesSuccess: (practices) => ({
    type: actionTypes.fetchAllPracticesSuccess,
    payload: {
      practices,
    },
  }),
  fetchAllPracticesFailure: (error) => ({
    type: actionTypes.fetchAllPracticesFailure,
    payload: { error },
    error: true,
  }),
  searchPractices: (practices, query) => ({
    type: actionTypes.searchPractices,
    payload: {
      query,
      practices,
    },
  }),
  searchPracticesSuccess: (practices) => ({
    type: actionTypes.searchPracticesSuccess,
    payload: {
      practices,
    },
  }),
  clearPracticeSelection: () => ({
    type: actionTypes.clearPracticeSelection,
  }),
};

export {
  actions,
  actionTypes,
};
