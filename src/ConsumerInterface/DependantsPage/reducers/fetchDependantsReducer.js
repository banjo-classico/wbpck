import { actionTypes } from "../actions/actions";

const INITIAL_STATE = {
  isFetching: false,
  error: null,
  dependants: [],
};

const fetchDependantsReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case actionTypes.fetchDependants:
      return {
        ...state,
        error: null,
        isFetching: true,
      };
    case actionTypes.fetchDependantsSuccess:
      return {
        isFetching: false,
        error: null,
        dependants: action.payload.dependants,
      };
    case actionTypes.fetchDependantsFailure:
      return {
        ...state,
        isFetching: false,
        error: action.payload.error,
      };
    case actionTypes.clearDependants:
      return INITIAL_STATE;
    default: {
      return state;
    }
  }
};

export default fetchDependantsReducer;
