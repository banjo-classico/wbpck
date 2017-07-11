import { actionTypes } from "../actions/actions";

const INITIAL_STATE = {
  isFetching: false,
  error: null,
  appointments: [],
};

const fetchConfirmedAppointmentsReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case actionTypes.getConfirmedAppointments:
      return {
        ...state,
        error: null,
        isFetching: true,
      };
    case actionTypes.getConfirmedAppointmentsSuccess:
      return {
        isFetching: false,
        error: null,
        appointments: action.payload.appointment,
      };
    case actionTypes.getConfirmedAppointmentsFailure:
      return {
        ...state,
        isFetching: false,
        error: action.payload.error,
      };
    case actionTypes.clearConfirmedAppointments:
      return INITIAL_STATE;
    default: {
      return state;
    }
  }
};

export default fetchConfirmedAppointmentsReducer;
