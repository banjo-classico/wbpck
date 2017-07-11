import { actionTypes } from "../actions/actions";

const INITIAL_STATE = {
  isRequesting: false,
  error: null,
  success: false,
};

const requestNewPasswordReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case actionTypes.requestNewPassword: {
      return {
        isRequesting: true,
        error: null,
        success: false,
      };
    }
    case actionTypes.requestNewPasswordFailure: {
      return {
        isRequesting: false,
        error: action.payload.error,
        success: false,
      };
    }
    case actionTypes.requestNewPasswordSuccess: {
      return {
        isRequesting: false,
        error: null,
        success: true,
      };
    }
    case actionTypes.clearState: {
      return INITIAL_STATE;
    }
    default: {
      return state;
    }
  }
};

export default requestNewPasswordReducer;
