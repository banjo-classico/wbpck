import { actionTypes } from "../actions/actions";

const INITIAL_STATE = {
  isFetching: false,
  success: false,
  error: null,
};

const autoRegisterReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case actionTypes.autoRegisterUser: {
      return {
        isFetching: true,
        success: false,
        error: null,
      };
    }
    case actionTypes.autoRegisterUserSuccess: {
      return {
        isFetching: false,
        success: true,
        error: null,
      };
    }
    case actionTypes.autoRegisterUserFailure: {
      return {
        isFetching: false,
        success: false,
        error: action.payload.error,
      };
    }
    default: {
      return state;
    }
  }
};

export default autoRegisterReducer;
