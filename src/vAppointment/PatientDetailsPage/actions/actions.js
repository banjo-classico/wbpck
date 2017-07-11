const actionTypes = {
  addDetails: "PATIENT_DETAILS_ADD_DETAILS",
  changePhone: "PATIENT_DETAILS_CHANGE_PHONE",
  clearDetails: "PATIENT_DETAILS_CLEAR_DETAILS",
};

const addDetails = (details) => ({
  type: actionTypes.addDetails,
  payload: { details },
});
const changePhone = (mobile) => ({
  type: actionTypes.changePhone,
  payload: { mobile },
});
const clearDetails = () => ({
  type: actionTypes.clearDetails,
});

const actions = {
  addDetails,
  changePhone,
  clearDetails,
};

export {
  actionTypes,
  actions,
};
