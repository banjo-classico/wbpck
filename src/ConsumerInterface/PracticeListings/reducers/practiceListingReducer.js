import { actionTypes } from "../actions/actions";

const INITIAL_STATE = {
  practices: [],
  isFetching: false,
  error: null,
};

const practiceListingReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case actionTypes.getPracticeListings:
      return {
        practices: [],
        isFetching: true,
        error: null,
      };
    case actionTypes.getPracticeListingsSuccess:
      return {
        practices: action.payload.practices,
        isFetching: false,
        error: null,
      };
    case actionTypes.getPracticeListingsFailure:
      return {
        ...state,
        isFetching: false,
        error: action.payload.error,
      };
    default:
      return state;
  }
};

export default practiceListingReducer;
