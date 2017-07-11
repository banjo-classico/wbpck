import { actionTypes } from "../actions/actions";

const INITIAL_STATE = {
  setInfoError: null,
  patient: {},
  practice: {},
  doctor: {},
  reason: "",
  medications: [],
  pricing: {},
};

const scriptDetailsReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case actionTypes.setInfo:
      return {
        ...state,
        [action.payload.id]: action.payload.value,
        setInfoError: null,
      };
    default:
      return state;
  }
};

export default scriptDetailsReducer;
