const actionTypes = {
  addAppStyles: "ADD_APP_STYLES",
  clearAppStyles: "CLEAR_APP_STYLES",
  removeAppStyles: "REMOVE_APP_STYLES",
  toggleShrinkApp: "TOGGLE_SHRINK_APP",
};

const actions = {
  addAppStyles: (classNames) => ({
    type: actionTypes.addAppStyles,
    payload: { classNames },
  }),
  clearAppStyles: () => ({
    type: actionTypes.clearAppStyles,
  }),
  removeAppStyles: (classNames) => ({
    type: actionTypes.removeAppStyles,
    payload: { classNames },
  }),
  toggleShrinkApp: () => ({
    type: actionTypes.toggleShrinkApp,
  }),
};

export {
  actions,
  actionTypes,
};
