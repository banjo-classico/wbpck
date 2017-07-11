const actionTypes = {
  getPracticeListings: "GET_PRACTICE_LISTINGS",
  getPracticeListingsSuccess: "GET_PRACTICE_LISTINGS_SUCCESS",
  getPracticeListingsFailure: "GET_PRACTICE_LISTINGS_FAILURE",
  unlinkPractice: "UNLINK_PRACTICE_FROM_USER",
  unlinkPracticeSuccess: "UNLINK_PRACTICE_FROM_USER_SUCCESS",
  unlinkPracticeFailure: "UNLINK_PRACTICE_FROM_USER_FAILURE",
};

const getPracticeListings = (token) => ({
  type: actionTypes.getPracticeListings,
  payload: {
    token,
  },
});

const getPracticeListingsSuccess = (practices) => ({
  type: actionTypes.getPracticeListingsSuccess,
  payload: {
    practices,
  },
});

const getPracticeListingsFailure = (error) => ({
  type: actionTypes.getPracticeListingsFailure,
  error: true,
  payload: {
    error,
  },
});

const unlinkPractice = (practice, token) => ({
  type: actionTypes.unlinkPractice,
  payload: {
    practice,
    token,
  },
});
const unlinkPracticeSuccess = (practice) => ({
  type: actionTypes.unlinkPracticeSuccess,
  payload: {
    practice,
  },
});
const unlinkPracticeFailure = (error) => ({
  type: actionTypes.unlinkPracticeFailure,
  error: true,
  payload: {
    error,
  },
});


const actions = {
  getPracticeListings,
  getPracticeListingsSuccess,
  getPracticeListingsFailure,
  unlinkPractice,
  unlinkPracticeSuccess,
  unlinkPracticeFailure,
};

export {
  actions,
  actionTypes,
};
