import moment from "moment";

import { actionTypes } from "../actions/countdownActions";

const INITIAL_STATE = {
  startTime: moment.unix(0),
  milliSecondsToWait: 60000,
};

const countdownReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case actionTypes.setCountdownTimer: {
      return {
        ...state,
        startTime: moment(),
      };
    }
    default: {
      return state;
    }
  }
};

export default countdownReducer;
