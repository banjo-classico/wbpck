const actionTypes = {
  fetchMultiDayAppointments: "FETCH_MULTI_DAY_APPOINTMENTS",
  fetchMultiDayAppointmentsSuccess: "FETCH_MULTI_DAY_APPOINTMENTS_SUCCESS",
  fetchMultiDayAppointmentsFailure: "FETCH_MULTI_DAY_APPOINTMENTS_FAILURE",
};

const actions = {
  fetchMultiDayAppointments: (practiceId, startDay, days, doctorName) => ({
    type: actionTypes.fetchMultiDayAppointments,
    payload: {
      practiceId,
      startDay,
      days,
      doctorName,
    },
  }),
  fetchMultiDayAppointmentsSuccess: (doctors, doctorName) => ({
    type: actionTypes.fetchMultiDayAppointmentsSuccess,
    payload: {
      doctors,
      doctorName,
    },
  }),
  fetchMultiDayAppointmentsFailure: (error) => ({
    type: actionTypes.fetchMultiDayAppointmentsFailure,
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
