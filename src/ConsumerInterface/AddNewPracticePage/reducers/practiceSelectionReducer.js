import { actionTypes } from "../actions/actions";

const INITIAL_STATE = {
  isSearching: false,
  isFetching: false,
  practices: [],
  matchedPractices: [],
  error: null,
  value: "",
};

const practiceSelectionReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case actionTypes.getAllPractices:
      return {
        ...state,
        isFetching: true,
        practices: [],
        error: null,
      };
    case actionTypes.getAllPracticesSuccess:
      return {
        ...state,
        isFetching: false,
        practices: action.payload.practices,
        error: null,
      };
    case actionTypes.getAllPracticesFailure:
      return {
        ...state,
        isFetching: false,
        error: action.payload.error,
      };
    case actionTypes.searchPractices:
      return {
        ...state,
        isSearching: true,
        matchedPractices: [],
        value: action.payload.query,
      };
    case actionTypes.searchPracticesSuccess:
      return {
        ...state,
        isSearching: false,
        matchedPractices: action.payload.practices,
      };
    case actionTypes.clearPracticeSelection:
      return INITIAL_STATE;
    default:
      return state;
  }
};

export default practiceSelectionReducer;
