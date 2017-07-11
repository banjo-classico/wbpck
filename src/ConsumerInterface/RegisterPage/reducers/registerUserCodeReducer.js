import { actionTypes } from "../actions/registerUserCodeActions";

const INITIAL_STATE = {
  verifyCode: {
    isFetching: false,
    error: null,
    success: false,
  },
  sendCodeToVerify: {
    isFetching: false,
    error: null,
  },
};

const registerUserCodeReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case actionTypes.verifyCode:
      return {
        ...state,
        verifyCode: {
          error: null,
          isFetching: true,
          success: false,
        },
      };
    case actionTypes.verifyCodeSuccess:
      return {
        ...state,
        verifyCode: {
          error: null,
          isFetching: false,
          success: true,
        },
      };
    case actionTypes.verifyCodeFailure:
      return {
        ...state,
        verifyCode: {
          error: action.payload,
          isFetching: false,
          success: false,
        },
      };
    case actionTypes.clearVerifyCodeError:
      return {
        ...state,
        verifyCode: {
          ...state.verifyCode,
          error: null,
        },
      };
    case actionTypes.sendCodeToVerify:
      return {
        ...state,
        sendCodeToVerify: {
          isFetching: true,
          error: null,
        },
      };
    case actionTypes.sendCodeToVerifySuccess:
      return {
        ...state,
        sendCodeToVerify: {
          isFetching: false,
          error: null,
        },
      };
    case actionTypes.sendCodeToVerifyError:
      return {
        ...state,
        sendCodeToVerify: {
          isFetching: false,
          error: action.payload.err,
        },
      };
    default:
      return state;
  }
};

export default registerUserCodeReducer;
