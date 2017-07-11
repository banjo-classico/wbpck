import { combineReducers } from "redux";
import { routerReducer as routing } from "react-router-redux";

// import consumerInterfaceReducers from "../ConsumerInterface/consumerInterfaceReducers";
// import vAppointmentReducers from "../vAppointment/vAppointmentReducers";
/* eslint-disable max-len */
import confirmCancellationReducer from "../ConsumerInterface/Deleter/reducers/confirmCancellationReducer";
import addDependantReducer from "../ConsumerInterface/DependantsPage/reducers/addDependantReducer";
import countdownReducer from "../vAppointment/ConfirmationCodePage/reducers/countdownReducer";
import appointmentsCTAReducer from "../ConsumerInterface/Appointments/reducers/appointmentsCTAReducer";
import checkEnrollmentReducer from "../vAppointment/PatientSelectionPage/reducers/checkEnrollmentReducer";
import doctorProfileReducer from "../vAppointment/DoctorProfilePage/reducers/doctorProfileReducer";
import deactivationReducer from "../ConsumerInterface/DeactivateAccountPage/reducers/deactivationReducer";
import deletionReducer from "../ConsumerInterface/Deleter/reducers/deletionReducer";
import dependantsCTAReducer from "../ConsumerInterface/DependantsPage/reducers/dependantsCTAReducer";
import feedReducer from "../ConsumerInterface/HealthFeed/reducers/feedReducer";
import fetchDependantsReducer from "../ConsumerInterface/DependantsPage/reducers/fetchDependantsReducer";
import multiDayAppointmentsReducer from "../vAppointment/PracticeProfilePage/reducers/multiDayAppointmentsReducer";
import practiceAppointmentReducer from "../vAppointment/PracticeBookingPage/reducers/practiceAppointmentReducer";
import practiceBookingPageReducer from "../vAppointment/PracticeBookingPage/reducers/practiceBookingPageReducer";
import loginReducer from "../ConsumerInterface/EntryPage/reducers/loginReducer";
import mainShellReducer from "../ConsumerInterface/MainShell/reducers/mainShellReducer";
import profileReducer from "../ConsumerInterface/MainShell/reducers/profileReducer";
import editProfileReducer from "../ConsumerInterface/EditProfilePage/reducers/editProfileReducer";
import guardianDetailsReducer from "../vAppointment/GuardianshipPage/reducers/guardianDetailsReducer";
import patientDetailsReducer from "../vAppointment/PatientDetailsPage/reducers/patientDetailsReducer";
import feelingPageReducer from "../vAppointment/FeelingPage/reducers/feelingPageReducer";
import confirmCodeReducer from "../vAppointment/ConfirmationCodePage/reducers/confirmCodeReducer";
import sessionReducer from "../vAppointment/ConfirmationCodePage/reducers/sessionReducer";
import submitAppointmentReducer from "../vAppointment/CheckoutPage/reducers/submitAppointmentReducer";
import appointmentConfirmationReducer from "../vAppointment/CheckoutPage/reducers/appointmentConfirmationReducer";
import checkUsernameReducer from "../ConsumerInterface/RegisterPage/reducers/checkUsernameReducer";
import registerPatientInfoReducer from "../ConsumerInterface/RegisterPage/reducers/registerPatientInfoReducer";
import registerUserCodeReducer from "../ConsumerInterface/RegisterPage/reducers/registerUserCodeReducer";
import requestNewPasswordReducer from "../vAppointment/RequestNewPasswordPage/reducers/requestNewPasswordReducer";
import changePasswordReducer from "../ConsumerInterface/PasswordChangePage/reducers/changePasswordReducer";
import fetchConfirmedAppointmentsReducer from "../ConsumerInterface/Appointments/reducers/fetchConfirmedAppointmentsReducer";
import fetchPastAppointmentsReducer from "../ConsumerInterface/Appointments/reducers/fetchPastAppointmentsReducer";
import practiceListingReducer from "../ConsumerInterface/PracticeListings/reducers/practiceListingReducer";
import practiceSelectionReducer from "../ConsumerInterface/AddNewPracticePage/reducers/practiceSelectionReducer";
import pickUpOptionsReducer from "../vScript/PickUpSelection/reducers/pickUpOptionsReducer";
import sendMessageToSupportReducer from "../ConsumerInterface/SupportPage/reducers/sendMessageToSupportReducer";
import submitCancellationReducer from "../ConsumerInterface/Deleter/reducers/submitCancellationReducer";
import practiceLinkingReducer from "../ConsumerInterface/AddNewPracticePage/reducers/practiceLinkingReducer";
import practiceUnlinkingReducer from "../ConsumerInterface/PracticeListings/reducers/practiceUnlinkingReducer";
import practiceProfileReducer from "../vAppointment/PracticeProfilePage/reducers/practiceProfileReducer";
import practiceProfilePopUpReducer from "../vAppointment/PracticeProfilePage/reducers/practiceProfilePopUpReducer";
import removeDependantReducer from "../ConsumerInterface/DependantsPage/reducers/removeDependantReducer";
import appScrollReducer from "../App/reducers/appScrollReducer";
import appStylesReducer from "../App/reducers/appStyleReducer";
import autoRegisterReducer from "../AutoRegisterPage/reducers/autoRegisterReducer";
import checkPasswordTokenReducer from "../SetNewPasswordPage/reducers/checkPasswordTokenReducer";
import expiredSessionReducer from "../components/ExpiredSession/reducers/expiredSessionReducer";
import headerReducer from "../components/header/reducers/headerReducer";
import menuReducer from "../components/Menu/reducers/menuReducer";
import setNewPasswordReducer from "../SetNewPasswordPage/reducers/setNewPasswordReducer";
import preLoadDependantReducer from "../ConsumerInterface/AddDependantPage/reducers/preLoadDependantReducer";
import scriptReducer from "../vScript/RequestScript/reducers/scriptReducer";
import scriptMenuReducer from "../vScript/RequestScript/reducers/scriptMenuReducer";
import scriptDetailsReducer from "../vScript/RequestScript/reducers/scriptDetailsReducer";
/* eslint-enable max-len */

export default combineReducers({
  addDependantReducer,
  appointmentConfirmationReducer,
  appointmentsCTAReducer,
  appScrollReducer,
  appStylesReducer,
  autoRegisterReducer,
  changePasswordReducer,
  checkEnrollmentReducer,
  checkPasswordTokenReducer,
  checkUsernameReducer,
  confirmCancellationReducer,
  confirmCodeReducer,
  countdownReducer,
  deactivationReducer,
  deletionReducer,
  dependantsCTAReducer,
  doctorProfileReducer,
  editProfileReducer,
  expiredSessionReducer,
  feedReducer,
  feelingPageReducer,
  fetchConfirmedAppointmentsReducer,
  fetchDependantsReducer,
  fetchPastAppointmentsReducer,
  guardianDetailsReducer,
  headerReducer,
  loginReducer,
  mainShellReducer,
  menuReducer,
  multiDayAppointmentsReducer,
  patientDetailsReducer,
  pickUpOptionsReducer,
  practiceAppointmentReducer,
  practiceBookingPageReducer,
  practiceLinkingReducer,
  practiceUnlinkingReducer,
  practiceListingReducer,
  practiceProfileReducer,
  practiceProfilePopUpReducer,
  practiceSelectionReducer,
  preLoadDependantReducer,
  profileReducer,
  registerPatientInfoReducer,
  registerUserCodeReducer,
  removeDependantReducer,
  requestNewPasswordReducer,
  routing,
  scriptDetailsReducer,
  scriptMenuReducer,
  scriptReducer,
  sendMessageToSupportReducer,
  sessionReducer,
  setNewPasswordReducer,
  submitAppointmentReducer,
  submitCancellationReducer,
});
