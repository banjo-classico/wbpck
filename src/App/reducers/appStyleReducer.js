import { difference } from "lodash/fp";

import { actionTypes } from "../actions/actions";

const INITIAL_STATE = {
  classNames: [],
  shrink: false,
};

const appStylesReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case actionTypes.addAppStyles:
      return {
        ...state,
        classNames: [...state.classNames, ...action.payload.classNames],
      };
    case actionTypes.clearAppStyles:
      return INITIAL_STATE;
    case actionTypes.removeAppStyles:
      return {
        ...state,
        classNames: difference(state.classNames, action.payload.classNames),
      };
    case actionTypes.toggleShrinkApp:
      return {
        ...state,
        shrink: !state.shrink,
      };
    default:
      return state;
  }
};

export default appStylesReducer;
