import { actionTypes } from "../actions/actions";

const INITIAL_STATE = {
  currentRequests: [],
  pastRequests: [],
  scriptDetails: null,
  isFetchingCurrent: false,
  isFetchingPast: false,
  isFetchingDetails: false,
  currentError: null,
  pastError: null,
  detailsError: null,
};

const scriptReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case actionTypes.fetchCurrentRequests: {
      return {
        ...state,
        isFetchingCurrent: true,
        currentError: null,
      };
    }
    case actionTypes.fetchCurrentRequestsSuccess: {
      return {
        ...state,
        isFetchingCurrent: false,
        currentError: null,
        currentRequests: action.payload.requests,
      };
    }
    case actionTypes.fetchCurrentRequestsFailure: {
      return {
        ...state,
        isFetchingCurrent: false,
        currentError: action.payload.error,
      };
    }
    case actionTypes.fetchPastRequests: {
      return {
        ...state,
        isFetchingPast: true,
        pastError: null,
      };
    }
    case actionTypes.fetchPastRequestsSuccess: {
      return {
        ...state,
        isFetchingPast: false,
        pastError: null,
        pastRequests: action.payload.requests,
      };
    }
    case actionTypes.fetchPastRequestsFailure: {
      return {
        ...state,
        isFetchingPast: false,
        pastError: action.payload.error,
      };
    }
    case actionTypes.fetchScriptDetails: {
      return {
        ...state,
        isFetchingDetails: true,
        detailsError: null,
        scriptDetails: null,
      };
    }
    case actionTypes.fetchScriptDetailsSuccess: {
      return {
        ...state,
        isFetchingDetails: false,
        detailsError: null,
        scriptDetails: action.payload.details,
      };
    }
    case actionTypes.fetchScriptDetailsFailure: {
      return {
        ...state,
        isFetchingDetails: false,
        detailsError: action.payload.error,
        scriptDetails: null,
      };
    }
    default: {
      return state;
    }
  }
};

export default scriptReducer;
