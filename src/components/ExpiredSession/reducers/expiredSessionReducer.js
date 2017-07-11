import { actionTypes } from "../actions/actions";

const INITIAL_STATE = {
  showExpiredSession: false,
};

const expiredSessionReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case actionTypes.showExpiredSession: {
      return {
        showExpiredSession: true,
      };
    }
    case actionTypes.refreshSession: {
      return {
        ...state,
      };
    }
    case actionTypes.expiredSessionSuccess: {
      return {
        showExpiredSession: false,
      };
    }
    case actionTypes.expiredSessionFailure: {
      return {
        showExpiredSession: false,
      };
    }
    default: {
      return state;
    }
  }
};

export default expiredSessionReducer;
