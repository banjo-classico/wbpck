import { actionTypes } from "../actions/actions";

const INITIAL_STATE = {
  checking: false,
  confirmed: false,
  error: null,
  isBusy: false,
};

const confirmationReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case actionTypes.checkForConfirmation: {
      return {
        ...state,
        checking: true,
        confirmed: false,
        error: null,
      };
    }
    case actionTypes.confirmationSuccess: {
      return {
        ...state,
        checking: true,
        confirmed: false,
        error: null,
      };
    }
    case actionTypes.confirmationFailure: {
      return {
        checking: false,
        confirmed: false,
        error: action.payload.error,
        isBusy: false,
      };
    }
    case actionTypes.confirmationPollStart: {
      return {
        checking: true,
        confirmed: false,
        error: null,
        isBusy: false,
      };
    }
    case actionTypes.confirmationPollEnd: {
      return {
        checking: false,
        error: action.payload.error,
        confirmed: action.payload.confirmed,
        isBusy: false,
      };
    }
    case actionTypes.setIsBusy: {
      return {
        ...state,
        isBusy: true,
      };
    }
    case actionTypes.clearConfirmationState: {
      return INITIAL_STATE;
    }
    default: {
      return state;
    }
  }
};

export default confirmationReducer;
