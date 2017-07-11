const actionTypes = {
  showMenu: "SHOW_MENU",
  hideMenu: "HIDE_MENU",
  toggleMenu: "TOGGLE_MENU",
};

const actions = {
  showMenu: () => ({
    type: actionTypes.showMenu,
  }),
  hideMenu: () => ({
    type: actionTypes.hideMenu,
  }),
  toggleMenu: () => ({
    type: actionTypes.toggleMenu,
  }),
};

export {
  actionTypes,
  actions,
};
