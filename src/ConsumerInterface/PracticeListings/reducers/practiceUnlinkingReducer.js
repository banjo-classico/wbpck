import { actionTypes } from "../actions/actions";

const INITIAL_STATE = {
  isFetching: false,
  success: false,
  error: null,
};

const practiceUnlinkingReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case actionTypes.unlinkPractice:
      return {
        ...state,
        isFetching: true,
        error: null,
        success: false,
      };
    case actionTypes.unlinkPracticeSuccess:
      return {
        ...state,
        isFetching: false,
        error: null,
        success: true,
      };
    case actionTypes.unlinkPracticeFailure:
      return {
        ...state,
        isFetching: false,
        error: action.payload.error,
        success: false,
      };
    default:
      return state;
  }
};

export default practiceUnlinkingReducer;
