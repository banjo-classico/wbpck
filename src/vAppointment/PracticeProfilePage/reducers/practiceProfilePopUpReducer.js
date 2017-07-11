import { compose, omit, mapValues } from "lodash/fp";
import { actionTypes } from "../actions/popUpActions";
import {
  filterDoctorAppointments,
} from "../../PracticeBookingPage/reducers/practiceAppointmentReducer";

const filterAppointments = (doctors, id) => compose(
    mapValues(c => c[0].AvailableSlots),
    mapValues(c => c.filter(s => s.PmsUserId === id)),
    omit(["hasMorningAppointments", "hasAfternoonAppointments", "hasEveningAppointments"]),
  )(doctors);

const INITIAL_STATE = {
  mainComponent: null,
  sideComponent: null,
  isFetching: false,
  appointmentError: null,
  doctorProfileAppointments: {},
  showPopUp: false,
  shouldHideButton: false,
};

const PracticeProfilePopUpReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case actionTypes.setMainComponent: {
      return {
        ...state,
        mainComponent: action.payload.mainComponent,
        shouldHideButton: action.payload.shouldHideButton,
      };
    }
    case actionTypes.setSideComponent: {
      return {
        ...state,
        sideComponent: action.payload.sideComponent,
      };
    }
    case actionTypes.clearMainComponent: {
      return {
        ...state,
        mainComponent: null,
        shouldHideButton: false,
      };
    }
    case actionTypes.clearSideComponent: {
      return {
        ...state,
        sideComponent: null,
      };
    }
    case actionTypes.getDoctorProfileAppointments: {
      return {
        ...state,
        isFetching: true,
        doctorProfileAppointments: {},
        error: null,
      };
    }
    case actionTypes.getDoctorProfileAppointmentsSuccess: {
      return {
        ...state,
        isFetching: false,
        error: null,
        doctorProfileAppointments: {
          ...filterAppointments(
            { ...filterDoctorAppointments(action.payload.doctors) },
            action.payload.id
          ),
        },
      };
    }
    case actionTypes.getDoctorProfileAppointmentsFailure: {
      return {
        ...state,
        isFetching: false,
        error: action.payload.error,
        doctorProfileAppointments: {},
      };
    }
    case actionTypes.togglePopUp: {
      return {
        ...state,
        showPopUp: !state.showPopUp,
      };
    }
    case actionTypes.closePopUp: {
      return {
        ...state,
        showPopUp: false,
      };
    }
    default: {
      return state;
    }
  }
};

export default PracticeProfilePopUpReducer;
