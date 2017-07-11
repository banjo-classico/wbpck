import { actionTypes } from "../actions/scrollActions";

const INITIAL_STATE = {
  shouldTrack: false,
  scrollTop: 0,
};

const appScrollReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case actionTypes.setScrollPosition: {
      return {
        ...state,
        scrollTop: action.payload.scrollTop,
      };
    }
    case actionTypes.setTrackScrollPosition: {
      return {
        ...state,
        shouldTrack: action.payload.shouldTrack,
      };
    }
    case actionTypes.clearScrollPosition: {
      return INITIAL_STATE;
    }
    default: {
      return state;
    }
  }
};

export default appScrollReducer;
