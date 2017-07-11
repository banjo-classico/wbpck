const actionTypes = {
  selectTime: "SELECT_TIME",
  clearSelection: "CLEAR_SELECT_TIME",
  selectDay: "SELECT_DAY",
  fetchPracticeInfo: "FETCH_PRACTICE_INFO",
  fetchPracticeInfoSuccess: "FETCH_PRACTICE_INFO_SUCCESS",
  fetchPracticeInfoFailure: "FETCH_PRACTICE_INFO_FAILURE",
  clearFetchPracticeInfo: "FETCH_PRACTICE_INFO_CLEAR",
  fetchDoctorAppointments: "FETCH_DOCTOR_APPOINTMENTS",
  fetchDoctorAppointmentsSuccess: "FETCH_DOCTOR_APPOINTMENTS_SUCCESS",
  fetchDoctorAppointmentsFailure: "FETCH_DOCTOR_APPOINTMENTS_FAILURE",
};

const actions = {
  selectTime: (doctorId, appointmentId, time) => ({
    type: actionTypes.selectTime,
    payload: {
      doctorId,
      appointmentId,
      time,
    },
  }),
  clearSelection: () => ({
    type: actionTypes.clearSelection,
  }),
  selectDay: (practiceId, time, dayNum, doctorName) => ({
    type: actionTypes.selectDay,
    payload: {
      time,
      practiceId,
      dayNum,
      doctorName,
    },
  }),
  fetchPracticeInfo: (id) => ({
    type: actionTypes.fetchPracticeInfo,
    payload: {
      id,
    },
  }),
  fetchPracticeInfoSuccess: (practice) => ({
    type: actionTypes.fetchPracticeInfoSuccess,
    payload: {
      practice,
    },
  }),
  fetchPracticeInfoFailure: (error) => ({
    type: actionTypes.fetchPracticeInfoFailure,
    error: true,
    payload: {
      error,
    },
  }),
  clearFetchPracticeInfo: () => ({
    type: actionTypes.clearFetchPracticeInfo,
  }),
  fetchDoctorAppointments: (day, practiceId, dayNum, doctorName) => ({
    type: actionTypes.fetchDoctorAppointments,
    payload: {
      day,
      practiceId,
      dayNum,
      doctorName,
    },
  }),
  fetchDoctorAppointmentsSuccess: (doctors, dayNum, doctorName) => ({
    type: actionTypes.fetchDoctorAppointmentsSuccess,
    payload: {
      doctors,
      dayNum,
      doctorName,
    },
  }),
  fetchDoctorAppointmentsFailure: (error) => ({
    type: actionTypes.fetchDoctorAppointmentsFailure,
    error: true,
    payload: {
      error,
    },
  }),
};

export {
  actions,
  actionTypes,
};
