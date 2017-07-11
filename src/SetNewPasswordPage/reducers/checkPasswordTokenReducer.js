import { actionTypes } from "../actions/actions";

const INITIAL_STATE = {
  isChecking: false,
  error: null,
  success: false,
};

const checkPasswordTokenReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case actionTypes.checkPasswordToken: {
      return {
        isChecking: true,
        error: null,
        success: false,
      };
    }
    case actionTypes.checkPasswordTokenFailure: {
      return {
        isChecking: false,
        error: action.payload.error,
        success: false,
      };
    }
    case actionTypes.checkPasswordTokenSuccess: {
      return {
        isChecking: false,
        error: null,
        success: true,
      };
    }
    case actionTypes.clearCheckPasswordToken: {
      return INITIAL_STATE;
    }
    default: {
      return state;
    }
  }
};

export default checkPasswordTokenReducer;
