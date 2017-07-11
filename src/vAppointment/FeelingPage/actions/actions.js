const actionTypes = {
  addFeelings: "ADD_FEELINGS",
  skipFeelings: "SKIP_FEELINGS",
  clearFeelings: "CLEAR_FEELINGS",
};

const addFeelings = (feelings) => ({
  type: actionTypes.addFeelings,
  payload: { feelings },
});

const skipFeelings = () => ({
  type: actionTypes.skipFeelings,
});

const clearFeelings = () => ({
  type: actionTypes.clearFeelings,
});

const actions = {
  addFeelings,
  skipFeelings,
  clearFeelings,
};

export {
  actions,
  actionTypes,
};
