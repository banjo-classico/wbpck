import { actionTypes } from "../actions/actions";

const INITIAL_STATE = {
  name: "",
  surname: "",
  birthday: "",
  phone: "",
};

const guardianDetailsReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case actionTypes.addDetails: {
      return {
        ...state,
        ...action.payload,
      };
    }
    case actionTypes.changePhone: {
      return {
        ...state,
        phone: action.payload.mobile,
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

export default guardianDetailsReducer;
