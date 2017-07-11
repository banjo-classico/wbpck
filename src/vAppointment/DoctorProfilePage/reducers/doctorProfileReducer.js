import { actionTypes } from "../actions/actions";

const INITIAL_STATE = {
  isFetching: false,
  error: null,
  doctor: {
    Picture: "",
    Name: "",
    Title: "",
    Description: "",
    Language: [],
    MedicalInterests: [],
    Education: [],
    PracticeAffiliations: [],
    Id: "",
    OrganisationId: "",
  },
};

const doctorProfileReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case actionTypes.fetchDoctorProfile: {
      return {
        ...state,
        isFetching: true,
        error: null,
      };
    }
    case actionTypes.fetchDoctorProfileSuccess: {
      return {
        isFetching: false,
        error: null,
        doctor: action.payload.doctor,
      };
    }
    case actionTypes.fetchDoctorProfileFailure: {
      return {
        ...state,
        isFetching: false,
        error: action.payload,
      };
    }
    default: {
      return state;
    }
  }
};

export default doctorProfileReducer;
