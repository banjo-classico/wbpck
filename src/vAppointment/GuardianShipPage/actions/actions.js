const actionTypes = {
  addDetails: "GUARDIAN_DETAILS_ADD_DETAILS",
  changePhone: "GUARDIAN_DETAILS_CHANGE_PHONE",
  clearState: "GUARDIAN_DETAILS_CLEAR_STATE",
};

const actions = {
  addDetails: (name, surname, birthday, phone) => ({
    type: actionTypes.addDetails,
    payload: {
      name,
      surname,
      birthday,
      phone,
    },
  }),
  changePhone: (mobile) => ({
    type: actionTypes.changePhone,
    payload: {
      mobile,
    },
  }),
  clearState: () => ({
    type: actionTypes.clearState,
  }),
};


export {
  actions,
  actionTypes,
};
