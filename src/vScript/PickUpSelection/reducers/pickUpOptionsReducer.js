import { actionTypes } from "../actions/actions";

const INITIAL_STATE = {
  isFetching: false,
  options: [],
  error: null,
};

const pickUpOptionsReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case actionTypes.fetchPickUpOptions: {
      return {
        isFetching: true,
        options: [],
        error: null,
      };
    }
    case actionTypes.fetchPickUpOptionsSuccess: {
      return {
        isFetching: false,
        options: action.payload.options,
        error: null,
      };
    }
    case actionTypes.fetchPickUpOptionsFailure: {
      return {
        isFetching: false,
        options: [],
        error: action.payload.error,
      };
    }
    default: {
      return state;
    }
  }
};

export default pickUpOptionsReducer;
