import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { replace } from "react-router-redux";
import { values } from "lodash/fp";
import Alert from "../../libs/Alert";

import ProtectedComponent from "../protectedComponent";
import { routeConfig } from "../../routes";
import { isDesktop } from "../../config";


// APPOINTMENT PAGE CHECK
const appointmentPageMapStateToProps = (state) => ({
  predicate: state.fetchConfirmedAppointmentsReducer.appointments.length > 0,
});
const appointmentPageMapDispatchToProps = (dispatch) => ({
  protectorFn: () => bindActionCreators(replace, dispatch)(routeConfig.home.getBrowserPath()),
});
const AppointmentPageCheck = connect(
  appointmentPageMapStateToProps,
  appointmentPageMapDispatchToProps,
)(ProtectedComponent);

// AUTO REGISTER CHECK
const autoRegisterPageMapStateToProps = (state) => ({
  predicate: state.sessionReducer.sessionId &&
  (
    state.appointmentConfirmationReducer.confirmed ||
    state.appointmentConfirmationReducer.checking
  ) &&
  state.loginReducer.token === null,
});
const autoRegisterPageMapDispatchToProps = (dispatch) => ({
  protectorFn: () => bindActionCreators(replace, dispatch)(routeConfig.home.getBrowserPath()),
});
const AutoRegisterPageCheck = connect(
  autoRegisterPageMapStateToProps,
  autoRegisterPageMapDispatchToProps,
)(ProtectedComponent);

// BOOKING UNAVAILABLE CHECK
const bookingUnavailablePageMapStateToProps = (state) => ({
  predicate: state.appointmentConfirmationReducer.error ||
    state.submitAppointmentReducer.error,
});
const bookingUnavailablePageMapDispatchToProps = (dispatch) => ({
  protectorFn: () => bindActionCreators(replace, dispatch)(routeConfig.home.getBrowserPath()),
});
const BookingUnavailablePageCheck = connect(
  bookingUnavailablePageMapStateToProps,
  bookingUnavailablePageMapDispatchToProps,
)(ProtectedComponent);

// CANCEL APPOINTMENT CHECK
const cancelAppointmentMapStateToProps = appointmentPageMapStateToProps;

const cancelAppointmentMapDispatchToProps = (dispatch) => ({
  protectorFn: () => bindActionCreators(replace, dispatch)(routeConfig.home.getBrowserPath()),
});
const CancelAppointmentPageCheck = connect(
  cancelAppointmentMapStateToProps,
  cancelAppointmentMapDispatchToProps,
)(ProtectedComponent);

// CANCEL CONFIRMED CHECK
const cancelConfirmedMapStateToProps = (state) => ({
  predicate: state.confirmCancellationReducer.cancelled,
});

const cancelConfirmedMapDispatchToProps = (dispatch) => ({
  protectorFn: () => bindActionCreators(replace, dispatch)(routeConfig.home.getBrowserPath()),
});
const CancelConfirmedPageCheck = connect(
  cancelConfirmedMapStateToProps,
  cancelConfirmedMapDispatchToProps,
)(ProtectedComponent);

// CONFIRMCODE CHECK
const confirmCodeMapStateToProps = (state) => ({
  predicate: state.feelingPageReducer.skip || state.feelingPageReducer.feelings.length > 0,
});
const confirmCodeMapDispatchToProps = (dispatch) => ({
  protectorFn: () =>
    bindActionCreators(replace, dispatch)(routeConfig.reasonForVisit.getBrowserPath()),
});
const ConfirmCodeCheck = connect(
  confirmCodeMapStateToProps,
  confirmCodeMapDispatchToProps
)(ProtectedComponent);

// FEELING CHECK
const feelingPageMapStateToProps = (state) => ({
  predicate: (
    values(state.patientDetailsReducer.patientDetails).length > 0 &&
  state.practiceAppointmentReducer.selectedTime.time !== null
  ) ||
  (
    state.loginReducer.token !== null &&
    state.practiceAppointmentReducer.selectedTime.doctorId !== "" &&
    state.practiceAppointmentReducer.selectedTime.time !== null
  ),
});
const feelingPageMapDispatchToProps = (dispatch) => ({
  protectorFn: () =>
    bindActionCreators(replace, dispatch)(routeConfig.patientDetails.getBrowserPath()),
});
const FeelingCheck = connect(
  feelingPageMapStateToProps,
  feelingPageMapDispatchToProps
)(ProtectedComponent);

// GUEST BOOKING ERROR CHECK
const guestBookingErrorMapStateToProps = (state) => ({
  predicate: state.sessionReducer.guestBookingError !== null ||
  state.checkEnrollmentReducer.error !== null,
});

const guestBookingErrorMapDispatchToProps = (dispatch) => ({
  protectorFn: () => bindActionCreators(replace, dispatch)(routeConfig.home.getBrowserPath()),
});

const GuestBookingErrorCheck = connect(
  guestBookingErrorMapStateToProps,
  guestBookingErrorMapDispatchToProps,
)(ProtectedComponent);

// IS LOGGED IN CHECK
const isLoggedInMapStateToProps = (state) => ({
  predicate: state.loginReducer.token !== null,
});
const isLoggedInMapDispatchToProps = (dispatch) => ({
  protectorFn: () => bindActionCreators(replace, dispatch)(routeConfig.login.getBrowserPath()),
});
const IsLoggedInCheck = connect(
  isLoggedInMapStateToProps,
  isLoggedInMapDispatchToProps
)(ProtectedComponent);

// LOGIN PAGE CHECK
const loginPageMapStateToProps = (state) => ({
  predicate: state.loginReducer.token === null,
});
const loginPageMapDispatchToProps = (dispatch) => ({
  protectorFn: () => bindActionCreators(replace, dispatch)(routeConfig.home.getBrowserPath()),
});
const LoginPageCheck = connect(
  loginPageMapStateToProps,
  loginPageMapDispatchToProps
)(ProtectedComponent);

// PATIENT DETAILS CHECK
const patientDetailsMapStateToProps = (state) => ({
  predicate: state.practiceAppointmentReducer.selectedTime.doctorId !== ""
  && state.practiceAppointmentReducer.selectedTime.time !== null,
});

const patientDetailsMapDispatchToProps = (dispatch) => ({
  protectorFn: () => bindActionCreators(replace, dispatch)(routeConfig.home.getBrowserPath()),
});
const PatientDetailsCheck = connect(
  patientDetailsMapStateToProps,
  patientDetailsMapDispatchToProps
)(ProtectedComponent);

// PATIENT SELETCTION CHECK
const patientSelectionPageMapStateToProps = state => ({
  predicate: state.practiceAppointmentReducer.selectedTime.doctorId !== ""
    && state.practiceAppointmentReducer.selectedTime.time !== null
    && state.loginReducer.token !== null,
});

const patientSelectionPageMapDispatchToProps = (dispatch) => ({
  protectorFn: () => {
    bindActionCreators(replace, dispatch)(routeConfig.signIn.getBrowserPath());
  },
});

const PatientSelectionCheck = connect(
  patientSelectionPageMapStateToProps,
  patientSelectionPageMapDispatchToProps,
)(ProtectedComponent);

// PRACTICE BOOKING CHECK
const practiceBookingPageMapStateToProps = (state) => ({
  predicate: !isDesktop() && (state.practiceAppointmentReducer.practiceInfo.practice.IsOnline ||
    state.practiceAppointmentReducer.practiceInfo.isFetching),
});
const practiceBookingPageMapDispatchToProps = (dispatch) => ({
  protectorFn: isDesktop() ?
    (id) => bindActionCreators(replace, dispatch)(routeConfig.practiceProfile.getBrowserPath(id)) :
    () => {
      Alert.info("Sorry, this practice is currently offline. Please try again later.");
      bindActionCreators(replace, dispatch)(routeConfig.practiceListings.getBrowserPath());
    },
});
const PracticeBookingPageCheck = connect(
  practiceBookingPageMapStateToProps,
  practiceBookingPageMapDispatchToProps,
)(ProtectedComponent);

// REGISTER CONFIRM CODE CHECK
const registerConfirmCodeMapStateToProps = (state) => ({
  predicate: (state.registerPatientInfoReducer.firstName.length > 0 &&
    state.registerPatientInfoReducer.surname.length > 0 &&
    state.registerPatientInfoReducer.dateOfBirth !== null &&
    state.registerPatientInfoReducer.email.length > 0 &&
    state.registerPatientInfoReducer.mobile.length > 0) ||
    (!state.profileReducer.profile.MobileVerified && state.loginReducer.token),
});
const registerConfirmCodeMapDispatchToProps = (dispatch) => ({
  protectorFn: () => bindActionCreators(replace, dispatch)(routeConfig.login.getBrowserPath()),
});
const RegisterConfirmCodeCheck = connect(
  registerConfirmCodeMapStateToProps,
  registerConfirmCodeMapDispatchToProps
)(ProtectedComponent);

// REGISTER PAGE CHECK
const registerPageMapStateToProps = (state) => ({
  predicate: state.loginReducer.token === null,
});
const registerPageMapDispatchToProps = (dispatch) => ({
  protectorFn: () => bindActionCreators(replace, dispatch)(routeConfig.home.getBrowserPath()),
});
const RegisterPageCheck = connect(
  registerPageMapStateToProps,
  registerPageMapDispatchToProps,
)(ProtectedComponent);

// REGISTER PROMPT CHECK
const registerPromptPageMapStateToProps = (state) => ({
  predicate: state.loginReducer.token === null,
});
const registerPromptPageMapDispatchToProps = (dispatch) => ({
  protectorFn: () => bindActionCreators(replace, dispatch)(routeConfig.home.getBrowserPath()),
});
const RegisterPromptCheck = connect(
  registerPromptPageMapStateToProps,
  registerPromptPageMapDispatchToProps,
)(ProtectedComponent);

// SIGNIN CHECK
const signInPageMapStateToProps = (state) => ({
  predicate: state.practiceAppointmentReducer.selectedTime.doctorId !== ""
    && state.practiceAppointmentReducer.selectedTime.time !== null,
});

const signInPageMapDispatchToProps = (dispatch) => ({
  protectorFn: () => bindActionCreators(replace, dispatch)(routeConfig.home.getBrowserPath()),
});
const SignInPageCheck = connect(
  signInPageMapStateToProps,
  signInPageMapDispatchToProps
)(ProtectedComponent);

// SUBMITAPPOINTMENT CHECK
const submitMapStateToProps = (state) => ({
  predicate: state.sessionReducer.sessionId !== undefined &&
    (
      state.confirmCodeReducer.sendCode.success ||
      state.profileReducer.profile.MobileVerified
    ),
});
const submitMapDispatchToProps = (dispatch) => ({
  protectorFn: () =>
    bindActionCreators(replace, dispatch)(routeConfig.confirmAppointmentCode.getBrowserPath()),
});
const SubmitCheck = connect(
  submitMapStateToProps,
  submitMapDispatchToProps
)(ProtectedComponent);

// SUPPORT PAGE TWO CHECK
const supportPageTwoMapStateToProps = state => ({
  predicate: !state.loginReducer.token &&
    state.sendMessageToSupportReducer.message.length > 0,
});
const supportPageTwoMapDispatchToProps = dispatch => ({
  protectorFn: () => bindActionCreators(replace, dispatch)(routeConfig.support.getBrowserPath()),
});
const SupportPageTwoCheck = connect(
  supportPageTwoMapStateToProps,
  supportPageTwoMapDispatchToProps
)(ProtectedComponent);

export {
  AppointmentPageCheck,
  AutoRegisterPageCheck,
  BookingUnavailablePageCheck,
  CancelAppointmentPageCheck,
  CancelConfirmedPageCheck,
  ConfirmCodeCheck,
  FeelingCheck,
  GuestBookingErrorCheck,
  IsLoggedInCheck,
  LoginPageCheck,
  PatientDetailsCheck,
  PatientSelectionCheck,
  PracticeBookingPageCheck,
  RegisterPageCheck,
  RegisterConfirmCodeCheck,
  RegisterPromptCheck,
  SignInPageCheck,
  SubmitCheck,
  SupportPageTwoCheck,
};
