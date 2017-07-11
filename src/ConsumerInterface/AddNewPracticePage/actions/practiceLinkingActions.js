const actionTypes = {
  linkPractice: "LINK_PRACTICE_TO_USER",
  linkPracticeSuccess: "LINK_PRACTICE_TO_USER_SUCCESS",
  linkPracticeFailure: "LINK_PRACTICE_TO_USER_FAILURE",
};
const actions = {
  linkPractice: (practice, token) => ({
    type: actionTypes.linkPractice,
    payload: {
      practice,
      token,
    },
  }),
  linkPracticeSuccess: (practice, matched, usingVensa) => ({
    type: actionTypes.linkPracticeSuccess,
    payload: {
      practice,
      matched,
      usingVensa,
    },
  }),
  linkPracticeFailure: (error) => ({
    type: actionTypes.linkPracticeFailure,
    error: true,
    payload: {
      error,
    },
  }),
};

export {
  actions,
  actionTypes,
};
