import React from "react";
import { difference } from "lodash/fp";

import Logo from "../components/Logo";
import { actionTypes } from "../actions/actions";

const INITIAL_STATE = {
  heading: <Logo />,
  secondLine: null,
  headerClassNames: [],
  arrowClassNames: [],
  menuIconClassNames: [],
  helpClassNames: [],
  messagesClassNames: [],
  showMenu: true,
  showArrow: false,
  showHelp: false,
  showMessages: true,
  backArrowFn: null,
  customIcon: null,
};

const headerReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case actionTypes.setHeading: {
      return {
        ...state,
        heading: action.payload.heading,
      };
    }
    case actionTypes.clearHeading: {
      return {
        ...state,
        heading: INITIAL_STATE.heading,
      };
    }
    case actionTypes.addStyles: {
      return {
        ...state,
        headerClassNames: [...state.headerClassNames, ...action.payload.headerClassNames],
        arrowClassNames: [...state.arrowClassNames, ...action.payload.arrowClassNames],
        menuIconClassNames: [...state.menuIconClassNames, ...action.payload.menuIconClassNames],
        helpClassNames: [...state.helpClassNames, ...action.payload.helpClassNames],
        messagesClassNames: [...state.messagesClassNames, ...action.payload.messagesClassNames],
      };
    }
    case actionTypes.clearStyles: {
      return {
        ...state,
        headerClassNames: [],
        arrowClassNames: [],
        menuIconClassNames: [],
        helpClassNames: [],
        messagesClassNames: [],
      };
    }
    case actionTypes.removeStyles:
      return {
        ...state,
        headerClassNames: difference(state.headerClassNames, action.payload.headerClassNames),
        arrowClassNames: difference(state.arrowClassNames, action.payload.arrowClassNames),
        menuIconClassNames: difference(state.menuIconClassNames, action.payload.menuIconClassNames),
        helpClassNames: difference(state.helpClassNames, action.payload.helpClassNames),
        messagesClassNames: difference(state.messagesClassNames, action.payload.messagesClassNames),
      };
    case actionTypes.setSecondLine: {
      return {
        ...state,
        secondLine: action.payload.secondLine,
      };
    }
    case actionTypes.clearSecondLine: {
      return {
        ...state,
        secondLine: INITIAL_STATE.secondLine,
      };
    }
    case actionTypes.displayHeaderIcons: {
      return {
        ...state,
        showMenu: action.payload.menu,
        showArrow: action.payload.arrow,
        showHelp: action.payload.help,
        showMessages: action.payload.messages,
      };
    }
    case actionTypes.addCustomIcon: {
      return {
        ...state,
        customIcon: action.payload.customIcon,
      };
    }
    case actionTypes.clearCustomIcon: {
      return {
        ...state,
        customIcon: null,
      };
    }
    case actionTypes.overrideBackArrow: {
      return {
        ...state,
        backArrowFn: action.payload.backArrowFn,
      };
    }
    case actionTypes.clearBackArrow: {
      return {
        ...state,
        backArrowFn: null,
      };
    }
    default: {
      return state;
    }
  }
};

export default headerReducer;
