import { actionTypes } from "../actions/actions";

const INITIAL_STATE = {
  isRemoving: false,
  success: false,
  error: null,
};

const removeDependantReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case actionTypes.removeDependant: {
      return {
        isRemoving: true,
        success: false,
        error: null,
      };
    }
    case actionTypes.removeDependantSuccess: {
      return {
        isRemoving: false,
        success: true,
        error: null,
      };
    }
    case actionTypes.removeDependantFailure: {
      return {
        isRemoving: false,
        success: false,
        error: action.payload.error,
      };
    }
    case actionTypes.clearRemoveDependant: {
      return {
        isRemoving: false,
        success: false,
        error: null,
      };
    }
    default: {
      return state;
    }
  }
};

export default removeDependantReducer;
