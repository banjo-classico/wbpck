const actionTypes = {
  setMainComponent: "PRACTICE_PROFILE_POP_UP_SET_MAIN",
  clearMainComponent: "PRACTICE_PROFILE_POP_UP_CLEAR_MAIN",
  setSideComponent: "PRACTICE_PROFILE_POP_UP_SET_SIDE",
  clearSideComponent: "PRACTICE_PROFILE_POP_UP_CLEAR_SIDE",
  getDoctorProfileAppointments: "PRACTICE_PROFILE_DOCTOR_POP_UP_GET_APPOINTMENTS",
  getDoctorProfileAppointmentsSuccess: "PRACTICE_PROFILE_DOCTOR_POP_UP_GET_APPOINTMENTS_SUCCESS",
  getDoctorProfileAppointmentsFailure: "PRACTICE_PROFILE_DOCTOR_POP_UP_GET_APPOINTMENTS_FAILURE",
  togglePopUp: "PRACTICE_PROFILE_POP_UP_TOGGLE",
  closePopUp: "PRACTICE_PROFILE_POP_UP_CLOSE",
};

const actions = {
  setMainComponent: (mainComponent, shouldHideButton = false) => ({
    type: actionTypes.setMainComponent,
    payload: {
      mainComponent,
      shouldHideButton,
    },
  }),
  clearMainComponent: () => ({
    type: actionTypes.clearMainComponent,
  }),
  setSideComponent: (sideComponent) => ({
    type: actionTypes.setSideComponent,
    payload: {
      sideComponent,
    },
  }),
  clearSideComponent: () => ({
    type: actionTypes.clearSideComponent,
  }),
  getDoctorProfileAppointments: (day, practiceId, id) => ({
    type: actionTypes.getDoctorProfileAppointments,
    payload: {
      day,
      practiceId,
      id,
    },
  }),
  getDoctorProfileAppointmentsSuccess: (doctors, id) => ({
    type: actionTypes.getDoctorProfileAppointmentsSuccess,
    payload: {
      doctors,
      id,
    },
  }),
  getDoctorProfileAppointmentsFailure: (error) => ({
    type: actionTypes.getDoctorProfileAppointmentsFailure,
    error: true,
    payload: {
      error,
    },
  }),
  togglePopUp: () => ({
    type: actionTypes.togglePopUp,
  }),
  closePopUp: () => ({
    type: actionTypes.closePopUp,
  }),
};

export {
  actions,
  actionTypes,
};
