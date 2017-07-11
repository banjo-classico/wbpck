const actionTypes = {
  setCountdownTimer: "SET_CONFIRM_CODE_COUNTDOWN_TIMER",
};


const actions = {
  setCountdownTimer: () => ({
    type: actionTypes.setCountdownTimer,
  }),
};

export {
  actions,
  actionTypes,
};
