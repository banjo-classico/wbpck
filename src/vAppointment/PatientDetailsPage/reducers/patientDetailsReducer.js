import { actionTypes } from "../actions/actions";

const INITIAL_STATE = {
  patientDetails: {},
};

const patientDetailsReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case actionTypes.addDetails: {
      return {
        ...state,
        patientDetails: { ...state.patientDetails, ...action.payload.details },
      };
    }
    case actionTypes.changePhone: {
      return {
        ...state,
        patientDetails: { ...state.patientDetails, phone: action.payload.mobile },
      };
    }
    case actionTypes.clearDetails: {
      return INITIAL_STATE;
    }
    default: {
      return state;
    }
  }
};

export default patientDetailsReducer;
