import { actionTypes } from "../actions/actions";

const INITIAL_STATE = {
  firstName: "",
  surname: "",
  dateOfBirth: null,
  email: "",
  mobile: "",
  password: "",
  id: "",
  isFetching: false,
  error: null,
};

const registerPatientInfoReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case actionTypes.setFirstName:
      return {
        ...state,
        firstName: action.payload.firstName,
      };
    case actionTypes.setSurname:
      return {
        ...state,
        surname: action.payload.surname,
      };
    case actionTypes.setDateOfBirth:
      return {
        ...state,
        dateOfBirth: action.payload.dateOfBirth,
      };
    case actionTypes.setMobile:
      return {
        ...state,
        mobile: action.payload.mobile,
      };
    case actionTypes.setEmail:
      return {
        ...state,
        email: action.payload.email,
      };
    case actionTypes.setPassword:
      return {
        ...state,
        password: action.payload.password,
      };
    case actionTypes.register:
      return {
        ...state,
        isFetching: true,
      };
    case actionTypes.registerSuccess:
      return {
        ...state,
        ...action.payload,
        isFetching: false,
      };
    case actionTypes.registerFailure:
      return {
        ...state,
        isFetching: false,
        error: action.payload.err,
      };
    case actionTypes.clearRegisterData:
      return INITIAL_STATE;
    default: {
      return state;
    }
  }
};

export default registerPatientInfoReducer;
