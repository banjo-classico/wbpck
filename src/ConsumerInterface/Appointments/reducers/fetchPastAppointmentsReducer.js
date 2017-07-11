import { actionTypes } from "../actions/actions";

const INITIAL_STATE = {
  isFetching: false,
  error: null,
  appointments: [],
};

const fetchPastAppointmentsReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case actionTypes.getPastAppointments:
      return {
        ...state,
        error: null,
        isFetching: true,
      };
    case actionTypes.getPastAppointmentsSuccess:
      return {
        isFetching: false,
        error: null,
        appointments: action.payload.appointment,
      };
    case actionTypes.getPastAppointmentsFailure:
      return {
        ...state,
        isFetching: false,
        error: null,
      };
    case actionTypes.clearPastAppointments:
      return INITIAL_STATE;
    default: {
      return state;
    }
  }
};

export default fetchPastAppointmentsReducer;
