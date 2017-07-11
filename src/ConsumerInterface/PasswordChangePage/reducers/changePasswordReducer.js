import { actionTypes } from "../actions/actions";

const INITIAL_STATE = {
  isRequesting: false,
  error: null,
  success: false,
};

const changePasswordReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case actionTypes.changeUserPassword: {
      return {
        isRequesting: true,
        error: null,
        success: false,
      };
    }
    case actionTypes.changeUserPasswordFailure: {
      return {
        isRequesting: false,
        error: action.payload.error,
        success: false,
      };
    }
    case actionTypes.changeUserPasswordSuccess: {
      return {
        isRequesting: false,
        error: null,
        success: true,
      };
    }
    case actionTypes.clearChangePassword: {
      return INITIAL_STATE;
    }
    default: {
      return state;
    }
  }
};

export default changePasswordReducer;
