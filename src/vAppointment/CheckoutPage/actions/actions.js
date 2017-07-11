const actionTypes = {
  setIsBusy: "APPOINTMENT_CONFIRMATION_SET_IS_BUSY",
  submitAppointment: "SUBMIT_APPOINTMENT",
  submitAppointmentSuccess: "SUBMIT_APPOINTMENT_SUCCESS",
  submitAppointmentFailure: "SUBMIT_APPOINTMENT_FAILURE",
  checkForConfirmation: "CHECK_FOR_CONFIRMATION",
  confirmationSuccess: "APPOINTMENT_CONFIRMATION_SUCCESS",
  confirmationFailure: "APPOINTMENT_CONFIRMATION_FAILURE",
  confirmationPollStart: "APPOINTMENT_CONFIRMATION_POLL_START",
  confirmationPollEnd: "APPOINTMENT_CONFIRMATION_POLL_END",
  clearConfirmationState: "CLEAR_APPOINTMENT_CONFIRMATION_STATE",
};
const setIsBusy = () => ({
  type: actionTypes.setIsBusy,
});
const submitAppointment = (sessionId) => ({
  type: actionTypes.submitAppointment,
  payload: { sessionId },
});
const submitAppointmentSuccess = () => ({
  type: actionTypes.submitAppointmentSuccess,
});
const submitAppointmentFailure = (error) => ({
  type: actionTypes.submitAppointmentFailure,
  error: true,
  payload: { error },
});
const checkForConfirmation = (sessionId) => ({
  type: actionTypes.checkForConfirmation,
  payload: { sessionId },
});
const confirmationSuccess = () => ({
  type: actionTypes.confirmationSuccess,
});
const confirmationFailure = (error) => ({
  type: actionTypes.confirmationFailure,
  error: true,
  payload: { error },
});
const confirmationPollStart = (sessionId) => ({
  type: actionTypes.confirmationPollStart,
  payload: { sessionId },
});
const confirmationPollEnd = (confirmed, error) => ({
  type: actionTypes.confirmationPollEnd,
  // eslint-disable-next-line no-unneeded-ternary
  error: error ? true : false,
  payload: { confirmed, error },
});
const clearConfirmationState = () => ({
  type: actionTypes.clearConfirmationState,
});

const actions = {
  setIsBusy,
  submitAppointment,
  submitAppointmentSuccess,
  submitAppointmentFailure,
  checkForConfirmation,
  confirmationSuccess,
  confirmationFailure,
  confirmationPollStart,
  confirmationPollEnd,
  clearConfirmationState,
};

export {
  actionTypes,
  actions,
};
