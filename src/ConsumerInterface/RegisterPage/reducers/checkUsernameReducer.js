import { actionTypes } from "../actions/checkUsernameActions";

const INITIAL_STATE = {
  checking: false,
  isValid: false,
  error: null,
  usedEmail: "",
};

const checkUsernameReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case actionTypes.checkUsername:
      return {
        checking: true,
        isValid: false,
        error: null,
        usedEmail: "",
      };
    case actionTypes.checkUsernameSuccess:
      return {
        checking: false,
        isValid: true,
        error: null,
        usedEmail: "",
      };
    case actionTypes.checkUsernameFailure:
      return {
        ...state,
        checking: false,
        isValid: false,
        error: action.payload.error,
      };
    case actionTypes.setUsedEmail:
      return {
        ...state,
        error: null,
        usedEmail: action.payload.email,
      };
    case actionTypes.clearCheckUserState:
      return INITIAL_STATE;
    default: {
      return state;
    }
  }
};

export default checkUsernameReducer;
