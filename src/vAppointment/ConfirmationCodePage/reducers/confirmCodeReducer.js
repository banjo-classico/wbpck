import { actionTypes } from "../actions/codeConfirmationActions";

const INITIAL_STATE = {
  requestCode: {
    isFetching: false,
    error: false,
    success: false,
  },
  sendCode: {
    isFetching: false,
    error: null,
    success: false,
  },
};

const confirmCodeReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case actionTypes.sendToConfirm: {
      return {
        ...state,
        requestCode: {
          isFetching: true,
          error: false,
          success: false,
        },
      };
    }
    case actionTypes.sendToConfirmSuccess: {
      return {
        ...state,
        requestCode: {
          isFetching: false,
          error: false,
          success: true,
        },
      };
    }
    case actionTypes.sendToConfirmFailure: {
      return {
        ...state,
        requestCode: {
          isFetching: false,
          error: true,
          success: false,
        },
      };
    }
    case actionTypes.sendCode: {
      return {
        ...state,
        sendCode: {
          isFetching: false,
          error: null,
          success: false,
        },
      };
    }
    case actionTypes.sendCodeFetching: {
      return {
        ...state,
        sendCode: {
          isFetching: true,
          error: null,
          success: false,
        },
      };
    }
    case actionTypes.sendCodeSuccess: {
      return {
        ...state,
        sendCode: {
          isFetching: false,
          error: null,
          success: true,
        },
      };
    }
    case actionTypes.sendCodeFailure: {
      return {
        ...state,
        sendCode: {
          isFetching: false,
          error: action.payload,
          success: false,
        },
      };
    }
    case actionTypes.clearSendCodeError: {
      return {
        ...state,
        sendCode: {
          ...state.sendCode,
          error: null,
        },
      };
    }
    case actionTypes.clearConfirmCode: {
      return INITIAL_STATE;
    }
    default: {
      return state;
    }
  }
};

export default confirmCodeReducer;
