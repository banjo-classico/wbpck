const actionTypes = {
  getAllPractices: "GET_ALL_PRACTICES",
  getAllPracticesSuccess: "GET_ALL_PRACTICES_SUCCESS",
  getAllPracticesFailure: "GET_ALL_PRACTICES_FAILURE",
  searchPractices: "SEARCH_ALL_PRACTICES",
  searchPracticesSuccess: "SEARCH_ALL_PRACTICES_SUCCESS",
  clearPracticeSelection: "SEARCH_ALL_PRACTICES_CLEAR",
};

const actions = {
  getAllPractices: () => ({
    type: actionTypes.getAllPractices,
  }),
  getAllPracticesSuccess: (practices) => ({
    type: actionTypes.getAllPracticesSuccess,
    payload: {
      practices,
    },
  }),
  getAllPracticesError: (error) => ({
    type: actionTypes.getAllPracticesFailure,
    error: true,
    payload: {
      error,
    },
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
