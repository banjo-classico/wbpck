const actionTypes = {
  getPracticeProfile: "GET_PRACTICE_PROFILE",
  getPracticeProfileSuccess: "GET_PRACTICE_PROFILE_SUCCESS",
  getPracticeProfileFailure: "GET_PRACTICE_PROFILE_FAILURE",
};

const actions = {
  getPracticeProfile: (id) => ({
    type: actionTypes.getPracticeProfile,
    payload: {
      id,
    },
  }),
  getPracticeProfileSuccess: (profile) => ({
    type: actionTypes.getPracticeProfileSuccess,
    payload: {
      profile,
    },
  }),
  getPracticeProfileFailure: (error) => ({
    type: actionTypes.getPracticeProfileFailure,
    payload: { error },
    error: true,
  }),
};

export {
  actions,
  actionTypes,
};
