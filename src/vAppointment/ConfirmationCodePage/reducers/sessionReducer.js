import { actionTypes } from "../actions/sessionActions";

const INITIAL_STATE = {
  sessionId: undefined,
  isFetching: false,
  error: null,
  guestBookingError: null,
};

const sessionReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case actionTypes.createSession: {
      return {
        ...state,
        isFetching: true,
        error: null,
        guestBookingError: null,
      };
    }
    case actionTypes.createSessionSuccess: {
      return {
        sessionId: action.payload.sessionId,
        isFetching: false,
        error: null,
        guestBookingError: null,
      };
    }
    case actionTypes.createSessionFailure: {
      return {
        ...state,
        isFetching: false,
        error: action.payload.error,
        guestBookingError: null,
      };
    }
    case actionTypes.createGuestBookingError: {
      return {
        ...state,
        guestBookingError: action.payload.error,
        isFetching: false,
      };
    }
    case actionTypes.clearSession: {
      return INITIAL_STATE;
    }
    default: {
      return state;
    }
  }
};

export default sessionReducer;
