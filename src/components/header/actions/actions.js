const actionTypes = {
  setHeading: "SET_HEADING",
  clearHeading: "CLEAR_HEADING",
  addStyles: "ADD_STYLES",
  clearStyles: "CLEAR_STYLES",
  removeStyles: "REMOVE_STYLES",
  setSecondLine: "SET_HEADER_SECOND_LINE",
  clearSecondLine: "CLEAR_HEADER_SECOND_LINE",
  displayHeaderIcons: "DISPLAY_HEADER_ICONS",
  addCustomIcon: "ADD_CUSTOM_ICON_HEADER",
  clearCustomIcon: "CLEAR_CUSTOM_ICON_HEADER",
  overrideBackArrow: "OVERRIDE_BACK_ARROW",
  clearBackArrow: "CLEAR_BACK_ARROW",
};

const setHeading = heading => ({
  type: actionTypes.setHeading,
  payload: { heading },
});

const clearHeading = () => ({
  type: actionTypes.clearHeading,
});

const addStyles = (
  headerClassNames = [],
  arrowClassNames = [],
  menuIconClassNames = [],
  helpClassNames = [],
  messagesClassNames = [],
) => ({
  type: actionTypes.addStyles,
  payload: {
    headerClassNames,
    arrowClassNames,
    menuIconClassNames,
    helpClassNames,
    messagesClassNames,
  },
});

const clearStyles = () => ({
  type: actionTypes.clearStyles,
});

const removeStyles = (
  headerClassNames = [],
  arrowClassNames = [],
  menuIconClassNames = [],
  helpClassNames = [],
  messagesClassNames = [],
) => ({
  type: actionTypes.removeStyles,
  payload: {
    headerClassNames,
    arrowClassNames,
    menuIconClassNames,
    helpClassNames,
    messagesClassNames,
  },
});

const setSecondLine = secondLine => ({
  type: actionTypes.setSecondLine,
  payload: {
    secondLine,
  },
});

const clearSecondLine = () => ({
  type: actionTypes.clearSecondLine,
});

const displayHeaderIcons = (
  display = { menu: true, arrow: false, help: false, messages: true }
) => ({
  type: actionTypes.displayHeaderIcons,
  payload: {
    menu: display.menu,
    arrow: display.arrow,
    help: display.help,
    messages: display.messages,
  },
});
const addCustomIcon = customIcon => ({
  type: actionTypes.addCustomIcon,
  payload: {
    customIcon,
  },
});
const clearCustomIcon = () => ({
  type: actionTypes.clearCustomIcon,
});
const overrideBackArrow = backArrowFn => ({
  type: actionTypes.overrideBackArrow,
  payload: {
    backArrowFn,
  },
});
const clearBackArrow = () => ({
  type: actionTypes.clearBackArrow,
});

const actions = {
  setHeading,
  clearHeading,
  addStyles,
  clearStyles,
  removeStyles,
  setSecondLine,
  clearSecondLine,
  displayHeaderIcons,
  addCustomIcon,
  clearCustomIcon,
  overrideBackArrow,
  clearBackArrow,
};

export {
  actionTypes,
  actions,
};
