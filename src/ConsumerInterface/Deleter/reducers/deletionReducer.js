import { actionTypes } from "../actions/actions";

const INITIAL_STATE = {
  reason: "",
  isOpen: false,
};

const deletionReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case actionTypes.setReason: {
      return {
        ...state,
        reason: action.payload.reason,
      };
    }
    case actionTypes.toggleDeleter: {
      return {
        ...state,
        isOpen: !state.isOpen,
      };
    }
    default: {
      return state;
    }
  }
};

export default deletionReducer;
