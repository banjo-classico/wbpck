import { actionTypes } from "../actions/actions";

const INITIAL_STATE = {
  isChecking: false,
  error: null,
  isEnrolled: false,
};

const checkEnrollmentReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case actionTypes.checkEnrolledPatient: {
      return {
        isChecking: true,
        error: null,
        isEnrolled: false,
      };
    }
    case actionTypes.enrolledPatientSuccess: {
      return {
        isChecking: false,
        error: null,
        isEnrolled: true,
      };
    }
    case actionTypes.enrolledPatientFailure: {
      return {
        isChecking: false,
        error: action.payload.error,
        isEnrolled: false,
      };
    }
    case actionTypes.clearState: {
      return INITIAL_STATE;
    }
    default: {
      return state;
    }
  }
};

export default checkEnrollmentReducer;
