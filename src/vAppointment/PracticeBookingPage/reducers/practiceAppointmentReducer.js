import { map, filter, compose, some, findIndex } from "lodash/fp";
import moment from "moment";

import { actionTypes } from "../actions/actions";
import { actionTypes as filterActionTypes, filterTypes } from "../actions/filterActions";

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
  const getAppointmentSlots = (filterFn) => map(d => ({
    ...d,
    AvailableSlots: filter(filterFn, d.AvailableSlots),
  }), orderedDoctorAppointments);
  const morningAppointments = getAppointmentSlots(s => moment(s.Time).hour() < 12);
  const afternoonAppointments = getAppointmentSlots(s => {
    const hour = moment(s.Time).hour();
    return hour < 17 && hour >= 12;
  });
  const eveningAppointments = getAppointmentSlots(s => moment(s.Time).hour() >= 17);
  const doctorHasAppointments = (doctor) => doctor.AvailableSlots.length > 0;
  const timeSlotHasAppointents = (timeslot) => compose(
    some(d => d),
    map(doctorHasAppointments),
  )(timeslot);
  return {
    morningAppointments,
    hasMorningAppointments: timeSlotHasAppointents(morningAppointments),
    afternoonAppointments,
    hasAfternoonAppointments: timeSlotHasAppointents(afternoonAppointments),
    eveningAppointments,
    hasEveningAppointments: timeSlotHasAppointents(eveningAppointments),
  };
};

const changeCurrentFilter = (
  currentFilter,
  hasMorningAppointments,
  hasAfternoonAppointments,
  hasEveningAppointments
) => {
  const getFirstAvailableAppointments = () => {
    if (hasMorningAppointments) {
      return filterTypes.morning;
    }
    if (hasAfternoonAppointments) {
      return filterTypes.afternoon;
    }
    if (hasEveningAppointments) {
      return filterTypes.evening;
    }
    return currentFilter;
  };
  switch (currentFilter) {
    case filterTypes.morning:
      return hasMorningAppointments ? currentFilter : getFirstAvailableAppointments();
    case filterTypes.afternoon:
      return hasAfternoonAppointments ? currentFilter : getFirstAvailableAppointments();
    case filterTypes.evening:
      return hasEveningAppointments ? currentFilter : getFirstAvailableAppointments();
    default: return currentFilter;
  }
};


const INITIAL_STATE = {
  selectedTime: {
    time: null,
    doctorId: "",
    appointmentId: "",
  },
  selectedDay: new Date(),
  doctorInfo: {
    isFetching: false,
    error: null,
    doctors: [],
  },
  practiceInfo: {
    isFetching: false,
    error: null,
    practice: {
      Id: "",
      Address: "",
      Name: "",
      IsOnline: true,
    },
  },
  currentFilter: filterTypes.morning,
  days: {
    first: {
      morningAppointments: [],
      hasMorningAppointments: false,
      afternoonAppointments: [],
      hasAfternoonAppointments: false,
      eveningAppointments: [],
      hasEveningAppointments: false,
    },
    second: {
      morningAppointments: [],
      hasMorningAppointments: false,
      afternoonAppointments: [],
      hasAfternoonAppointments: false,
      eveningAppointments: [],
      hasEveningAppointments: false,
    },
    third: {
      morningAppointments: [],
      hasMorningAppointments: false,
      afternoonAppointments: [],
      hasAfternoonAppointments: false,
      eveningAppointments: [],
      hasEveningAppointments: false,
    },
  },
};

const practiceAppointmentReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case actionTypes.selectTime:
      return {
        ...state,
        selectedTime: {
          time: action.payload.time,
          doctorId: action.payload.doctorId,
          appointmentId: action.payload.appointmentId,
        },
      };
    case actionTypes.clearSelection:
      return {
        ...state,
        selectedTime: {
          time: null,
          doctorId: "",
          appointmentId: "",
        },
      };
    case actionTypes.selectDay:
      return {
        ...state,
        selectedDay: action.payload.time,
      };
    case actionTypes.fetchPracticeInfo:
      return {
        ...state,
        practiceInfo: {
          isFetching: true,
          error: null,
          practice: {
            Id: "",
            Address: "",
            Name: "",
          },
        },
      };
    case actionTypes.fetchPracticeInfoSuccess: {
      return {
        ...state,
        practiceInfo: {
          isFetching: false,
          error: null,
          practice: {
            ...state.practiceInfo.practice,
            ...action.payload.practice,
          },
        },
      };
    }
    case actionTypes.fetchPracticeInfoFailure: {
      return {
        ...state,
        practiceInfo: {
          isFetching: false,
          error: action.payload.error,
          practice: {
            ...state.practiceInfo.practice,
          },
        },
      };
    }
    case actionTypes.clearFetchPracticeInfo:
      return {
        ...state,
        practiceInfo: INITIAL_STATE.practiceInfo,
      };
    case actionTypes.fetchDoctorAppointments: {
      return {
        ...state,
        doctorInfo: {
          ...state.doctorInfo,
          isFetching: true,
          error: null,
          // doctors: [],
        },
        days: {
          first: { ...filterDoctorAppointments([]) },
          second: { ...filterDoctorAppointments([]) },
          third: { ...filterDoctorAppointments([]) },
        },
      };
    }
    case actionTypes.fetchDoctorAppointmentsSuccess: {
      const appointments = filterDoctorAppointments(
        action.payload.doctors,
        action.payload.doctorName
      );
      const currentFilter = changeCurrentFilter(
        state.currentFilter,
        appointments.hasMorningAppointments,
        appointments.hasAfternoonAppointments,
        appointments.hasEveningAppointments
      );
      return {
        ...state,
        doctorInfo: {
          isFetching: false,
          error: null,
          doctors: setDoctorOrder(action.payload.doctors, action.payload.doctorName),
        },
        days: {
          ...state.days,
          [action.payload.dayNum]: { ...appointments },
        },
        currentFilter,
      };
    }
    case actionTypes.fetchDoctorAppointmentsFailure: {
      return {
        ...state,
        doctorInfo: {
          isFetching: false,
          error: action.payload.error,
          doctors: [],
        },
        days: {
          first: { ...filterDoctorAppointments([]) },
          second: { ...filterDoctorAppointments([]) },
          third: { ...filterDoctorAppointments([]) },
        },
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

export default practiceAppointmentReducer;
export {
  filterDoctorAppointments,
};
