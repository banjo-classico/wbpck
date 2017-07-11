import { actionTypes } from "../actions/actions";

const INITIAL_STATE = {
  feelings: "",
  skip: false,
};

const feelingPageReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case actionTypes.addFeelings: {
      return {
        skip: false,
        feelings: action.payload.feelings,
      };
    }
    case actionTypes.skipFeelings: {
      return {
        skip: true,
        feelings: "",
      };
    }
    case actionTypes.clearFeelings: {
      return INITIAL_STATE;
    }
    default: {
      return state;
    }
  }
};

export default feelingPageReducer;
