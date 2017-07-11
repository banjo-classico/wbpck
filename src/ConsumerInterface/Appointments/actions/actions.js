const actionTypes = {
  getConfirmedAppointments: "GET_CONFIRMED_APPOINTMENTS",
  getConfirmedAppointmentsSuccess: "GET_CONFIRMED_APPOINTMENTS_SUCCESS",
  getConfirmedAppointmentsFailure: "GET_CONFIRMED_APPOINTMENTS_FAILURE",
  clearConfirmedAppointments: "CLEAR_CONFIRMED_APPOINTMENTS",
  getPastAppointments: "GET_PAST_APPOINTMENTS",
  getPastAppointmentsSuccess: "GET_PAST_APPOINTMENTS_SUCCESS",
  getPastAppointmentsFailure: "GET_PAST_APPOINTMENTS_FAILURE",
  clearPastAppointments: "CLEAR_PAST_APPOINTMENTS",
  changeCtaFn: "CHANGE_CTA_FN_APPOINTMENTS",
  changeCtaIcon: "CHANGE_CTA_ICON_APPOINTMENTS",
  toggleCta: "TOGGLE_CTA_APPOINTMENTS",
  clearCta: "CLEAR_CTA_APPOINTMENTS",
};

const actions = {
  getConfirmedAppointments: (id) => ({
    type: actionTypes.getConfirmedAppointments,
    payload: {
      id,
    },
  }),
  getConfirmedAppointmentsSuccess: (appointment) => ({
    type: actionTypes.getConfirmedAppointmentsSuccess,
    payload: {
      appointment,
    },
  }),
  getConfirmedAppointmentsFailure: (error) => ({
    type: actionTypes.getConfirmedAppointmentsFailure,
    payload: {
      error,
    },
  }),
  clearConfirmedAppointments: () => ({
    type: actionTypes.clearConfirmedAppointments,
  }),
  getPastAppointments: (id) => ({
    type: actionTypes.getPastAppointments,
    payload: {
      id,
    },
  }),
  getPastAppointmentsSuccess: (appointment) => ({
    type: actionTypes.getPastAppointmentsSuccess,
    payload: {
      appointment,
    },
  }),
  getPastAppointmentsFailure: (error) => ({
    type: actionTypes.getPastAppointmentsFailure,
    payload: {
      error,
    },
  }),
  clearPastAppointments: () => ({
    type: actionTypes.clearPastAppointments,
  }),
  changeCtaFn: (ctaFn) => ({
    type: actionTypes.changeCtaFn,
    payload: {
      ctaFn,
    },
  }),
  changeCtaIcon: (ctaIcon) => ({
    type: actionTypes.changeCtaIcon,
    payload: {
      ctaIcon,
    },
  }),
  toggleCta: () => ({
    type: actionTypes.toggleCta,
  }),
  clearCta: () => ({
    type: actionTypes.clearCta,
  }),
};
export {
  actionTypes,
  actions,
};
