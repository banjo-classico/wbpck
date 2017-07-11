import { actionTypes } from "../actions/actions";

const INITIAL_STATE = {
  confirmed: false,
  isFetching: false,
  error: null,
};

const submitAppointmentReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case actionTypes.submitAppointment: {
      return {
        isFetching: true,
        confirmed: false,
        error: null,
      };
    }
    case actionTypes.submitAppointmentSuccess: {
      return {
        isFetching: false,
        confirmed: true,
        error: null,
      };
    }
    case actionTypes.submitAppointmentFailure: {
      return {
        isFetching: false,
        confirmed: false,
        error: action.payload.error,
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

export default submitAppointmentReducer;
