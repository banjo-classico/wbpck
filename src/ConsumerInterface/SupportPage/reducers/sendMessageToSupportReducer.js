import { actionTypes } from "../actions/actions";

const INITIAL_STATE = {
  message: "",
  isSending: false,
  error: null,
  success: false,
};

const sendMessageToSupportReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case actionTypes.addMessageToState: {
      return {
        ...state,
        message: action.payload.message,
      };
    }
    case actionTypes.sendMessageToSupport: {
      return {
        ...state,
        isSending: true,
        error: null,
        success: false,
      };
    }
    case actionTypes.sendMessageToSupportFailure: {
      return {
        message: "",
        isSending: false,
        error: action.payload.error,
        success: false,
      };
    }
    case actionTypes.sendMessageToSupportSuccess: {
      return {
        message: "",
        isSending: false,
        error: null,
        success: true,
      };
    }
    case actionTypes.clearSupport: {
      return INITIAL_STATE;
    }
    default: {
      return state;
    }
  }
};

export default sendMessageToSupportReducer;
