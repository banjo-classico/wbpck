import { bindActionCreators } from "redux";
import { pick, difference, compose, keys, map, reduce } from "lodash/fp";

// eslint-disable-next-line max-len
import { actions as sessionActions } from "../vAppointment/ConfirmationCodePage/actions/sessionActions";

const isBookingForSomeoneElse = state =>
  state.guardianDetailsReducer.name.length > 0 ||
  (
    state.loginReducer.token &&
    state.patientDetailsReducer.patientDetails.name
  );

const allSessionProps = [
  "token",
  "firstName",
  "lastName",
  "dateOfBirth",
  "mobile",
  "dependantId",
  "organisationId",
  "pmsUserId",
  "appointmentId",
  "time",
  "note",
  "sessionId",
  "initiatorFirstName",
  "initiatorLastName",
  "initiatorDateOfBirth",
  "initiatorMobile",
  "isBookingForSomeoneElse",
];

const sessionState = (excludeKeys) => (state) => {
  const session = {
    firstName: state.patientDetailsReducer.patientDetails.name,
    lastName: state.patientDetailsReducer.patientDetails.surname,
    dateOfBirth: state.patientDetailsReducer.patientDetails.birthday,
    mobile: state.patientDetailsReducer.patientDetails.phone || state.profileReducer.profile.Mobile,
    dependantId: state.patientDetailsReducer.patientDetails.dependantId,
    organisationId: state.practiceAppointmentReducer.practiceInfo.practice.Id,
    pmsUserId: state.practiceAppointmentReducer.selectedTime.doctorId,
    appointmentId: state.practiceAppointmentReducer.selectedTime.appointmentId,
    time: state.practiceAppointmentReducer.selectedTime.time,
    note: state.feelingPageReducer.feelings,
    sessionId: state.sessionReducer.sessionId,
    initiatorFirstName: state.guardianDetailsReducer.name,
    initiatorLastName: state.guardianDetailsReducer.surname,
    initiatorDateOfBirth: state.guardianDetailsReducer.birthday,
    initiatorMobile: state.guardianDetailsReducer.phone,
    isBookingForSomeoneElse: isBookingForSomeoneElse(state),
  };
  const keysToAdd = compose(
    difference,
    keys,
  )(session)(excludeKeys);
  return pick(keysToAdd)(session);
};

const sessionDispatch = (dispatch) => {
  const createSession = bindActionCreators(sessionActions.createSession, dispatch);
  const createFn = (propsToAdd) => (props) => () => {
    compose(
      createSession,
      reduce((sum, { key, value }) => ({ ...sum, [key]: value }), {}),
      map((prop) => ({ key: prop, value: props[prop] })),
    )(propsToAdd);
  };
  return createFn;
};


export {
  sessionState,
  sessionDispatch,
  allSessionProps,
  isBookingForSomeoneElse,
};
