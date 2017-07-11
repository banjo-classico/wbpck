const actionTypes = {
  cancelAppointment: "CANCEL_APPOINTMENT",
  cancelAppointmentSuccess: "CANCEL_APPOINTMENT_SUCCESS",
  cancelAppointmentFailure: "CANCEL_APPOINTMENT_FAILURE",
  checkForConfirmCancel: "CANCEL_APPOINTMENT_CHECK_FOR_CONFIRMATION",
  confirmCancelSuccess: "CANCEL_APPOINTMENT_CONFIRM_SUCCESS",
  confirmCancelFailure: "CANCEL_APPOINTMENT_CONFIRM_FAILURE",
  confirmCancelPollStart: "CANCEL_APPOINTMENT_CONFIRM_POLL_START",
  confirmCancelPollEnd: "CANCEL_APPOINTMENT_CONFIRM_POLL_END",
  clearConfirmCancelState: "CANCEL_APPOINTMENT_CLEAR_STATE",
  setIsBusy: "CANCEL_APPOINTMENT_SET_IS_BUSY",
  checkAbleToCancel: "CANCEL_APPOINTMENT_CHECK_ABLE_TO_CANCEL",
  ableToCancelSuccess: "CANCEL_APPOINTMENT_ABLE_TO_CANCEL_SUCCESS",
  ableToCancelFailure: "CANCEL_APPOINTMENT_ABLE_TO_CANCEL_FAILURE",
  clearCancelCheckState: "CANCEL_APPOINTMENT_CLEAR_ABLE_TO_CANCEL_STATE",
};

const actions = {
  cancelAppointment: (sessionId, reason) => ({
    type: actionTypes.cancelAppointment,
    payload: {
      sessionId,
      reason,
    },
  }),
  cancelAppointmentSuccess: () => ({
    type: actionTypes.cancelAppointmentSuccess,
  }),
  cancelAppointmentFailure: (error) => ({
    type: actionTypes.cancelAppointmentFailure,
    error: true,
    payload: { error },
  }),
  checkForConfirmCancel: (sessionId) => ({
    type: actionTypes.checkForConfirmCancel,
    payload: { sessionId },
  }),
  confirmCancelSuccess: () => ({
    type: actionTypes.confirmCancelSuccess,
  }),
  confirmCancelFailure: (error) => ({
    type: actionTypes.confirmCancelFailure,
    error: true,
    payload: { error },
  }),
  confirmCancelPollStart: (sessionId) => ({
    type: actionTypes.confirmCancelPollStart,
    payload: { sessionId },
  }),
  confirmCancelPollEnd: (cancelled, error) => ({
    type: actionTypes.confirmCancelPollEnd,
    // eslint-disable-next-line no-unneeded-ternary
    error: error ? true : false,
    payload: { cancelled, error },
  }),
  clearConfirmCancelState: () => ({
    type: actionTypes.clearConfirmCancelState,
  }),
  setIsBusy: () => ({
    type: actionTypes.setIsBusy,
  }),
  checkAbleToCancel: (sessionId, reason) => ({
    type: actionTypes.checkAbleToCancel,
    payload: {
      sessionId,
      reason,
    },
  }),
  ableToCancelSuccess: (data) => ({
    type: actionTypes.ableToCancelSuccess,
    payload: {
      data,
    },
  }),
  ableToCancelFailure: (error) => ({
    type: actionTypes.ableToCancelFailure,
    payload: {
      error,
    },
  }),
  clearCancelCheckState: () => ({
    type: actionTypes.clearCancelCheckState,
  }),
};

export {
  actionTypes,
  actions,
};
