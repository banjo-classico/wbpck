const actionTypes = {
  setComponentIndex: "MAIN_SHELL_SET_COMPONENT_INDEX",
  clearComponentIndex: "MAIN_SHELL_CLEAR_COMPONENT_INDEX",
};

const actions = {
  setComponentIndex: (index) => ({
    type: actionTypes.setComponentIndex,
    payload: {
      index,
    },
  }),
  clearComponentIndex: () => ({
    type: actionTypes.clearComponentIndex,
  }),
};

export {
  actions,
  actionTypes,
};
