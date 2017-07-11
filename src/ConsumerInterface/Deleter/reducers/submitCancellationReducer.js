import { actionTypes } from "../actions/cancelAppointmentActions";

const INITIAL_STATE = {
  cancelled: false,
  isFetching: false,
  error: null,
  isChecking: false,
  ableToCancel: false,
  ableToCancelError: null,
  cancelData: {},
};

const submitCancellationReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case actionTypes.checkAbleToCancel: {
      return {
        isChecking: true,
        ableToCancel: false,
        ableToCancelError: null,
        cancelData: {},
      };
    }
    case actionTypes.ableToCancelSuccess: {
      return {
        isChecking: false,
        ableToCancel: true,
        ableToCancelError: null,
        cancelData: action.payload.data,
      };
    }
    case actionTypes.ableToCancelFailure: {
      return {
        isChecking: false,
        ableToCancel: false,
        ableToCancelError: action.payload.error,
        cancelData: {},
      };
    }
    case actionTypes.clearCancelCheckState: {
      return {
        ...state,
        isChecking: false,
        ableToCancel: false,
        ableToCancelError: null,
      };
    }
    case actionTypes.cancelAppointment: {
      return {
        isFetching: true,
        cancelled: false,
        error: null,
      };
    }
    case actionTypes.cancelAppointmentSuccess: {
      return {
        isFetching: false,
        cancelled: true,
        error: null,
      };
    }
    case actionTypes.cancelAppointmentFailure: {
      return {
        isFetching: false,
        cancelled: false,
        error: action.payload.error,
      };
    }
    default: {
      return state;
    }
  }
};

export default submitCancellationReducer;
