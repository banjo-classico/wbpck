const actionTypes = {
  setFirstName: "EDIT_PROFILE_SET_FIRSTNAME",
  setLastName: "EDIT_PROFILE_SET_LASTNAME",
  setDateOfBirth: "EDIT_PROFILE_SET_DATE_OF_BIRTH",
  setMobile: "EDIT_PROFILE_SET_MOBILE",
  addAvatar: "EDIT_PROFILE_ADD_AVATAR",
  addAvatarSuccess: "EDIT_PROFILE_ADD_AVATAR_SUCCESS",
  addAvatarFailure: "EDIT_PROFILE_ADD_AVATAR_FAILURE",
  changeProfile: "EDIT_PROFILE_CHANGE_PROFILE",
  changeProfileSuccess: "EDIT_PROFILE_CHANGE_PROFILE_SUCCESS",
  changeProfileFailure: "EDIT_PROFILE_CHANGE_PROFILE_FAILURE",
  clearEditProfile: "EDIT_PROFILE_CLEAR",
  initEditProfile: "EDIT_PROFILE_INIT",
};

const setFirstName = (name) => ({
  type: actionTypes.setFirstName,
  payload: {
    name,
  },
});
const setLastName = (name) => ({
  type: actionTypes.setLastName,
  payload: {
    name,
  },
});
const setDateOfBirth = (date) => ({
  type: actionTypes.setDateOfBirth,
  payload: {
    date,
  },
});
const setMobile = (mobile) => ({
  type: actionTypes.setMobile,
  payload: {
    mobile,
  },
});
const addAvatar = (file, token) => ({
  type: actionTypes.addAvatar,
  payload: {
    file,
    token,
  },
});
const addAvatarSuccess = () => ({
  type: actionTypes.addAvatarSuccess,
});
const addAvatarFailure = () => ({
  type: actionTypes.addAvatarFailure,
});
const changeProfile = (firstname, lastname, dateOfBirth, mobile) => ({
  type: actionTypes.changeProfile,
  payload: {
    firstname,
    lastname,
    dateOfBirth,
    mobile,
  },
});
const changeProfileSuccess = () => ({
  type: actionTypes.changeProfileSuccess,
});
const changeProfileFailure = (err) => ({
  type: actionTypes.changeProfileFailure,
  error: true,
  payload: {
    err,
  },
});
const clearEditProfile = () => ({
  type: actionTypes.clearEditProfile,
});
const initEditProfile = (firstname, lastname, dateOfBirth, mobile, email, avatar) => ({
  type: actionTypes.initEditProfile,
  payload: {
    firstname,
    lastname,
    dateOfBirth,
    mobile,
    email,
    avatar,
  },
});

const actions = {
  setFirstName,
  setLastName,
  setDateOfBirth,
  setMobile,
  addAvatar,
  addAvatarSuccess,
  addAvatarFailure,
  changeProfile,
  changeProfileSuccess,
  changeProfileFailure,
  clearEditProfile,
  initEditProfile,
};

export {
  actionTypes,
  actions,
};
