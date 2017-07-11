import { actionTypes } from "../actions/actions";

const INITIAL_STATE = {
  componentIndex: 2,
};

const mainShellReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case actionTypes.setComponentIndex: {
      return {
        componentIndex: action.payload.index,
      };
    }
    case actionTypes.clearComponentIndex: {
      return INITIAL_STATE;
    }
    default: {
      return state;
    }
  }
};

export default mainShellReducer;
