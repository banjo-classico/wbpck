import { map, filter, compose, findIndex } from "lodash/fp";
import moment from "moment";

import { actionTypes } from "../actions/appointmentActions";
import {
  actionTypes as filterActionTypes,
  filterTypes,
} from "../../PracticeBookingPage/actions/filterActions";

const setDoctorOrder = (doctors, str) => {
  if (!str) return doctors;
  const oldIndex = compose(
    findIndex(d => d.Name.toLowerCase().includes(str))
  )(doctors);
  if (doctors.length <= 0) {
    let k = 0 - doctors.length;
    while ((k--) + 1) {
      doctors.push(undefined);
    }
  }
  doctors.splice(0, 0, doctors.splice(oldIndex, 1)[0]);
  return doctors;
};

const filterDoctorAppointments = (doctorAppointments, doctorName) => {
  const orderedDoctorAppointments = setDoctorOrder(doctorAppointments, doctorName);
  const runFilter = (filterFn, slots) => compose(
      filter(filterFn),
    )(slots);
  const partitionSlots = (day) => ({
    day: day.Day,
    morning: runFilter(s => moment(s.Time).hour() < 12, day.Slots),
    afternoon: runFilter(s => {
      const hour = moment(s.Time).hour();
      return hour < 17 && hour >= 12;
    }, day.Slots),
    evening: runFilter(s => moment(s.Time).hour() > 17, day.Slots),
  });
  const mapThroughDays = (days) => compose(
      map(s => partitionSlots(s))
    )(days);
  const filteredDoctorAppointments = map(
    d => ({ ...d, AvailableSlots: mapThroughDays(d.AvailableSlots) }), orderedDoctorAppointments);
  return filteredDoctorAppointments;
};

const filterOutAppointments = (appointments) => compose(
    map(a => ({
      Description: a.Description,
      Type: a.Type,
      Name: a.Name,
      ProfilePictureURL: a.ProfilePictureURL,
      PmsUserId: a.PmsUserId,
    }))
  )(appointments);

const INITIAL_STATE = {
  isFetching: false,
  error: null,
  doctors: [],
  doctorInfo: {
    doctors: [],
  },
  currentFilter: filterTypes.morning,
};

const multiDayAppointmentsReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case actionTypes.fetchMultiDayAppointments: {
      return {
        ...state,
        isFetching: true,
        error: null,
        // doctors: filterDoctorAppointments([]),
      };
    }
    case actionTypes.fetchMultiDayAppointmentsSuccess: {
      const appointments = filterDoctorAppointments(
        action.payload.doctors,
        action.payload.doctorName
      );
      const currentFilter = state.currentFilter;
      return {
        isFetching: false,
        error: null,
        doctors: appointments,
        doctorInfo: {
          doctors: filterOutAppointments(appointments),
        },
        currentFilter,
      };
    }
    case actionTypes.fetchMultiDayAppointmentsFailure: {
      return {
        ...state,
        isFetching: false,
        error: action.payload.error,
        doctors: filterDoctorAppointments([]),
      };
    }
    case filterActionTypes.filterMorning: {
      return {
        ...state,
        currentFilter: filterTypes.morning,
      };
    }
    case filterActionTypes.filterAfternoon: {
      return {
        ...state,
        currentFilter: filterTypes.afternoon,
      };
    }
    case filterActionTypes.filterEvening: {
      return {
        ...state,
        currentFilter: filterTypes.evening,
      };
    }
    case filterActionTypes.clearFilter: {
      return {
        ...state,
        currentFilter: filterTypes.morning,
      };
    }
    default: {
      return state;
    }
  }
};

export default multiDayAppointmentsReducer;
export {
  filterDoctorAppointments,
};
