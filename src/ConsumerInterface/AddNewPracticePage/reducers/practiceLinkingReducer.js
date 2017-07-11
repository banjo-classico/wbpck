import { actionTypes } from "../actions/practiceLinkingActions";

const INITIAL_STATE = {
  isFetching: false,
  success: false,
  practice: {},
  matched: false,
  usingVensa: false,
  error: null,
};

const practiceLinkingReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case actionTypes.linkPractice:
      return {
        ...state,
        isFetching: true,
        practice: {},
        error: null,
        success: false,
        usingVensa: false,
        matched: false,
      };
    case actionTypes.linkPracticeSuccess:
      return {
        ...state,
        isFetching: false,
        practice: action.payload.practice,
        error: null,
        success: true,
        matched: action.payload.matched,
        usingVensa: action.payload.usingVensa,
      };
    case actionTypes.linkPracticeFailure:
      return {
        ...state,
        isFetching: false,
        error: action.payload.error,
        success: false,
        usingVensa: false,
        matched: false,
      };
    default:
      return state;
  }
};

export default practiceLinkingReducer;
