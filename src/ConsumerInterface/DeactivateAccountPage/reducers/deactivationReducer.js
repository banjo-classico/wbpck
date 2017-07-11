import { actionTypes } from "../actions/actions";

const INITIAL_STATE = {
  isChecking: false,
  passwordValid: false,
  passwordError: null,
  isDeactivating: false,
  deactivated: false,
  deactivationError: null,
  accessToken: "",
};

const deactivationReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case actionTypes.checkPassword: {
      return {
        ...state,
        isChecking: true,
        passwordValid: false,
        passwordError: null,
      };
    }
    case actionTypes.checkPasswordSuccess: {
      return {
        ...state,
        isChecking: false,
        passwordValid: true,
        passwordError: null,
        accessToken: action.payload.accessToken,
      };
    }
    case actionTypes.checkPasswordFailure: {
      return {
        ...state,
        isChecking: false,
        passwordValid: false,
        passwordError: action.payload.error,
      };
    }
    case actionTypes.clearCheckPassword: {
      return {
        ...state,
        isChecking: false,
        passwordValid: false,
        passwordError: null,
      };
    }
    case actionTypes.deactivateAccount: {
      return {
        ...state,
        isDeactivating: true,
        deactivated: false,
        deactivationError: null,
      };
    }
    case actionTypes.deactivateAccountSuccess: {
      return {
        ...state,
        isDeactivating: false,
        deactivated: true,
        deactivationError: null,
      };
    }
    case actionTypes.deactivateAccountFailure: {
      return {
        ...state,
        isDeactivating: false,
        deactivated: false,
        deactivationError: action.payload.error,
      };
    }
    case actionTypes.clearDeactivateAccount: {
      return {
        ...state,
        isDeactivating: false,
        deactivated: false,
        deactivationError: null,
      };
    }
    default: {
      return state;
    }
  }
};

export default deactivationReducer;
