const actionTypes = {
  createSession: "CREATE_SESSION",
  createSessionSuccess: "CREATE_SESSION_SUCCESS",
  createSessionFailure: "CREATE_SESSION_FAILURE",
  createGuestBookingError: "CREATE_GUEST_BOOKING_ERROR",
  clearSession: "CLEAR_SESSION",
};

const createSession = ({
  firstName,
  lastName,
  dateOfBirth,
  mobile,
  organisationId,
  pmsUserId,
  appointmentId,
  time,
  note,
  sessionId,
  initiatorFirstName,
  initiatorLastName,
  initiatorDateOfBirth,
  initiatorMobile,
  isBookingForSomeoneElse,
  dependantId,
}) => ({
  type: actionTypes.createSession,
  payload: {
    OrganisationId: organisationId,
    PmsUserId: pmsUserId,
    AppointmentId: appointmentId,
    Time: time,
    Note: note,
    SessionId: sessionId,
    Mobile: mobile,
    FirstName: firstName,
    LastName: lastName,
    DateOfBirth: dateOfBirth,
    InitiatorFirstName: initiatorFirstName,
    InitiatorLastName: initiatorLastName,
    InitiatorDateOfBirth: initiatorDateOfBirth,
    InitiatorMobile: initiatorMobile,
    IsBookingForSomeoneElse: isBookingForSomeoneElse,
    DependantId: dependantId,
  },
});
const createSessionSuccess = (sessionId) => ({
  type: actionTypes.createSessionSuccess,
  payload: {
    sessionId,
  },
});
const createSessionFailure = (error) => ({
  type: actionTypes.createSessionFailure,
  error: true,
  payload: {
    error,
  },
});
const createGuestBookingError = (error) => ({
  type: actionTypes.createGuestBookingError,
  error: true,
  payload: {
    error,
  },
});
const clearSession = () => ({
  type: actionTypes.clearSession,
});

const actions = {
  createSession,
  createSessionSuccess,
  createSessionFailure,
  createGuestBookingError,
  clearSession,
};

export {
  actionTypes,
  actions,
};
