import { compose, map, filter } from "lodash/fp";

import { actionTypes } from "../actions/actions";

const findVerifiedStatus = (feed) => {
  const a = filter(f => f.Type === "MobileNotVerified")(feed);
  return a.length > 0;
};

const getAppointments = (feed) => compose(
    map(a => a.Item),
    filter(f => f.Type === "Appointment"),
  )(feed);


const INITIAL_STATE = {
  isFetching: false,
  error: null,
  feed: [],
  isMobileVerified: false,
};

const feedReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case actionTypes.getFeed:
      return {
        ...state,
        error: null,
        isFetching: true,
      };
    case actionTypes.getFeedSuccess:
      return {
        isFetching: false,
        error: null,
        feed: getAppointments(action.payload.feed),
        isMobileVerified: findVerifiedStatus(action.payload.feed),
      };
    case actionTypes.getFeedFailure:
      return {
        ...state,
        isFetching: false,
        error: action.payload.error,
      };
    case actionTypes.clearFeed:
      return INITIAL_STATE;
    default: {
      return state;
    }
  }
};

export default feedReducer;
