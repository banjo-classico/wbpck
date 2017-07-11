import { actionTypes } from "../actions/actions";

const INITIAL_STATE = {
  isFetching: false,
  error: null,
  profile: {},
};

const practiceProfileReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case actionTypes.getPracticeProfile:
      return {
        ...state,
        isFetching: true,
        profile: {},
        error: null,
      };
    case actionTypes.getPracticeProfileSuccess:
      return {
        ...state,
        isFetching: false,
        profile: action.payload.profile,
        error: null,
      };
    case actionTypes.getPracticeProfileFailure:
      return {
        ...state,
        isFetching: false,
        error: action.payload.error,
      };
    default:
      return state;
  }
};

export default practiceProfileReducer;
