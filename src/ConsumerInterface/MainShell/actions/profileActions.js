const actionTypes = {
  getProfile: "GET_PROFILE",
  getProfileSuccess: "GET_PROFILE_SUCCESS",
  getProfileFailure: "GET_PROFILE_FAILURE",
  clearProfile: "CLEAR_PROFILE",
  changePhone: "CHANGE_PROFILE_PHONE",
  userIsVerified: "USER_IS_VERIFIED",
  profileUpdated: "PROFILE_UPDATED",
};

const actions = {
  getProfile: (token) => ({
    type: actionTypes.getProfile,
    payload: {
      token,
    },
  }),
  getProfileSuccess: (profile) => ({
    type: actionTypes.getProfileSuccess,
    payload: {
      profile,
    },
  }),
  getProfileFailure: (err) => ({
    type: actionTypes.getProfileFailure,
    error: true,
    payload: {
      err,
    },
  }),
  clearProfile: () => ({
    type: actionTypes.clearProfile,
  }),
  changePhone: (mobile) => ({
    type: actionTypes.changePhone,
    payload: {
      mobile,
    },
  }),
  userIsVerified: () => ({
    type: actionTypes.userIsVerified,
  }),
  profileUpdated: (FirstName, LastName, DateOfBirth, Mobile) => ({
    type: actionTypes.profileUpdated,
    payload: {
      FirstName,
      LastName,
      DateOfBirth,
      Mobile,
    },
  }),
};
export {
  actionTypes,
  actions,
};
