const actionTypes = {
  setReason: "DELETER_SET_REASON_FOR_CANCELATION",
  toggleDeleter: "DELETER_TOGGLE",
};

const actions = {
  setReason: (reason) => ({
    type: actionTypes.setReason,
    payload: {
      reason,
    },
  }),
  toggleDeleter: () => ({
    type: actionTypes.toggleDeleter,
  }),
};

export {
  actions,
  actionTypes,
};
