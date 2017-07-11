import { actionTypes } from "../actions/actions";

const INITIAL_STATE = {
  token: null,
  expiryTime: null,
  isFetching: false,
  error: null,
  email: null,
};

const loginReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case actionTypes.login: {
      return {
        ...state,
        isFetching: true,
        error: null,
      };
    }
    case actionTypes.loginSuccess: {
      return {
        isFetching: false,
        error: null,
        token: action.payload.token,
        expiryTime: action.payload.expiryTime,
        email: action.payload.email,
      };
    }
    case actionTypes.loginError: {
      return {
        ...state,
        isFetching: false,
        error: action.payload.err,
      };
    }
    case actionTypes.clearLoginError: {
      return {
        ...state,
        error: null,
      };
    }
    case actionTypes.logout: {
      return {
        ...state,
        isFetching: false,
        error: null,
        expiryTime: null,
        email: null,
      };
    }
    case actionTypes.logoutSuccess: {
      return {
        isFetching: false,
        error: null,
        token: null,
        expiryTime: null,
        email: null,
      };
    }
    case actionTypes.logoutFailure: {
      return {
        isFetching: false,
        error: null,
        token: null,
        expiryTime: null,
        email: null,
      };
    }
    default: {
      return state;
    }
  }
};

export default loginReducer;
