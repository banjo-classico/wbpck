import { actionTypes } from "../actions/menuActions";
import { actionTypes as searchActionTypes } from "../actions/searchActions";

const INITIAL_STATE = {
  isFetchingConnected: false,
  connectedPracticesError: null,
  connectedPractices: [],
  isFetchingAll: false,
  allPracticesError: null,
  allPractices: [],
  isSearching: false,
  matchedPractices: [],
  value: "",
  isFetchingDoctors: false,
  doctorError: null,
  doctors: [],
};

const scriptMenuReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case actionTypes.fetchConnectedPractices:
      return {
        ...state,
        isFetchingConnected: true,
        connectedPractices: [],
        connectedPracticesError: null,
      };
    case actionTypes.fetchConnectedPracticesSuccess:
      return {
        ...state,
        isFetchingConnected: false,
        connectedPractices: action.payload.practices,
        connectedPracticesError: null,
      };
    case actionTypes.fetchConnectedPracticesFailure:
      return {
        ...state,
        isFetchingConnected: false,
        connectedPracticesError: action.payload.error,
      };
    case searchActionTypes.fetchAllPractices:
      return {
        ...state,
        isFetchingAll: true,
        allPractices: [],
        allPracticesError: null,
      };
    case searchActionTypes.fetchAllPracticesSuccess:
      return {
        ...state,
        isFetchingAll: false,
        allPractices: action.payload.practices,
        allPracticesError: null,
      };
    case searchActionTypes.fetchAllPracticesFailure:
      return {
        ...state,
        isFetchingAll: false,
        allPracticesError: action.payload.error,
      };
    case searchActionTypes.searchPractices:
      return {
        ...state,
        isSearching: true,
        matchedPractices: [],
        value: action.payload.query,
      };
    case searchActionTypes.searchPracticesSuccess:
      return {
        ...state,
        isSearching: false,
        matchedPractices: action.payload.practices,
      };
    case searchActionTypes.clearPracticeSelection:
      return {
        ...state,
        isSearching: false,
        matchedPractices: [],
        value: "",
      };
    case actionTypes.fetchDoctors:
      return {
        ...state,
        isFetchingDoctors: true,
        doctors: [],
        doctorsError: null,
      };
    case actionTypes.fetchDoctorsSuccess:
      return {
        ...state,
        isFetchingDoctors: false,
        doctors: action.payload.doctors,
        doctorsError: null,
      };
    case actionTypes.fetchDoctorsFailure:
      return {
        ...state,
        isFetchingDoctors: false,
        doctorsError: action.payload.error,
      };
    default:
      return state;
  }
};

export default scriptMenuReducer;
