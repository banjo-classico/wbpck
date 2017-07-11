import { actionTypes } from "../actions/actions";

const INITIAL_STATE = {
  isSetting: false,
  error: null,
  success: false,
};

const setNewPasswordReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case actionTypes.setNewPassword: {
      return {
        isSetting: true,
        error: null,
        success: false,
      };
    }
    case actionTypes.setNewPasswordFailure: {
      return {
        isSetting: false,
        error: action.payload.error,
        success: false,
      };
    }
    case actionTypes.setNewPasswordSuccess: {
      return {
        isSetting: false,
        error: null,
        success: true,
      };
    }
    case actionTypes.clearSetPassword: {
      return INITIAL_STATE;
    }
    default: {
      return state;
    }
  }
};

export default setNewPasswordReducer;
