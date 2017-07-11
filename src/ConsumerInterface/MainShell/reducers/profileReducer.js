// using alias
import { actionTypes } from "../actions/profileActions";

const INITIAL_STATE = {
  profile: {},
  isFetching: false,
  error: null,
};

const profileReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case actionTypes.getProfile:
      return {
        ...state,
        isFetching: true,
        error: null,
      };
    case actionTypes.getProfileSuccess:
      return {
        profile: action.payload.profile,
        isFetching: false,
        error: null,
      };
    case actionTypes.getProfileFailure:
      return {
        ...state,
        isFetching: false,
        error: action.payload.err,
      };
    case actionTypes.clearProfile:
      return {
        ...state,
        profile: {},
      };
    case actionTypes.changePhone:
      return {
        ...state,
        profile: { ...state.profile, Mobile: action.payload.mobile },
      };
    case actionTypes.userIsVerified:
      return {
        ...state,
        profile: { ...state.profile, MobileVerified: true },
      };
    case actionTypes.profileUpdated:
      return {
        ...state,
        profile: {
          ...state.profile,
          ...action.payload,
          MobileVerified: state.profile.Mobile === action.payload.Mobile ?
            state.profile.MobileVerified
            : false,
        },
      };
    default:
      return state;
  }
};

export default profileReducer;
