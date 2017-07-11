import { actionTypes } from "../actions/cancelAppointmentActions";

const INITIAL_STATE = {
  checking: false,
  cancelled: false,
  error: null,
  isBusy: false,
};

const confirmCancellationReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case actionTypes.checkForConfirmCancel: {
      return {
        ...state,
        checking: true,
        cancelled: false,
        error: null,
      };
    }
    case actionTypes.confirmCancelSuccess: {
      return {
        ...state,
        checking: true,
        cancelled: false,
        error: null,
      };
    }
    case actionTypes.confirmCancelFailure: {
      return {
        checking: false,
        cancelled: false,
        error: action.payload.error,
        isBusy: false,
      };
    }
    case actionTypes.confirmCancelPollStart: {
      return {
        checking: true,
        cancelled: false,
        error: null,
        isBusy: false,
      };
    }
    case actionTypes.confirmCancelPollEnd: {
      return {
        checking: false,
        error: action.payload.error,
        cancelled: action.payload.cancelled,
        isBusy: false,
      };
    }
    case actionTypes.setIsBusy: {
      return {
        ...state,
        isBusy: true,
      };
    }
    case actionTypes.clearConfirmCancelState: {
      return INITIAL_STATE;
    }
    default: {
      return state;
    }
  }
};

export default confirmCancellationReducer;
