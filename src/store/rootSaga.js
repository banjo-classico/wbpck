// import { loginSaga } from "../ConsumerInterface/EntryPage/sagas/login";
// import { logoutSaga } from "../ConsumerInterface/EntryPage/sagas/logout";
// import { tokenStorageSaga } from "../ConsumerInterface/EntryPage/sagas/tokenStorage";
// import { profileSaga, editProfileSaga } from "../ConsumerInterface/Appointments/sagas/profile";
// import {
//   getProfileSaga,
//   clearProfileSaga,
//   resetEditProfileSaga,
// } from "../ConsumerInterface/Appointments/sagas/getProfile";
// import { practiceInfoSaga } from "../PracticeBookingPage/sagas/practiceInfo";
// import { doctorAppointmentsSaga } from "../PracticeBookingPage/sagas/doctorAppointments";
// import {
//   doctorProfileAppointmentsSaga,
// } from "../PracticeProfilePage/sagas/getDoctorProfileAppointments";
// import { doctorProfileSaga } from "../DoctorProfilePage/sagas/doctorProfile";
// import { dayChangedSaga } from "../PracticeBookingPage/sagas/dayChanged";
// import { createSessionSaga } from "../ConfirmationCodePage/sagas/createSession";
// import { confirmCodeSaga } from "../ConfirmationCodePage/sagas/confirmCode";
// import { countdownSaga } from "../ConfirmationCodePage/sagas/countdown";
// import { sendCodeSaga } from "../ConfirmationCodePage/sagas/sendCode";
// eslint-disable-next-line max-len
// import { cancelAppointmentSaga } from "../ConsumerInterface/CancelAppointmentPage/sagas/cancelAppointment";
// import { checkEnrollmentSaga } from "../PatientSelectionPage/sagas/checkEnrollmentSaga";
// import {
//   confirmCancellationSaga,
//   requestConfirmCancelSaga,
// } from "../ConsumerInterface/Deleter/sagas/checkCancellation";
// import { submitAppointmentSaga } from "../CheckoutPage/sagas/submitAppointment";
// import {
//   appointmentConfirmationSaga,
//   requestConfirmationSaga,
// } from "../CheckoutPage/sagas/checkConfirmation";
// import { requestNewPasswordSaga } from "../RequestNewPasswordPage/sagas/requestNewPassword";
// eslint-disable-next-line max-len
// import { changePasswordSaga } from "../ConsumerInterface/PasswordChangePage/sagas/changePassword";
// eslint-disable-next-line max-len
// import { confirmedAppointmentsSaga } from "../ConsumerInterface/Appointments/sagas/confirmedAppointments";
// import { pastAppointmentsSaga } from "../ConsumerInterface/Appointments/sagas/pastAppointments";
// import { registerUserSaga, checkUsernameSaga } from "../RegisterPage/sagas/register";
// import { resendCodeSaga } from "../RegisterPage/sagas/resendCode";
// import {
//   userSuccessSaga,
//   confirmUserRegistrationCodeSaga,
// } from "../RegisterPage/sagas/registerCodeLogin";
// import { sendCodeToVerifySaga } from "../RegisterPage/sagas/sendCodeToVerify";
// import { changePhoneSaga } from "../ConfirmationCodePage/sagas/changePhone";
// eslint-disable-next-line max-len
// import { getPracteListingsSaga } from "../ConsumerInterface/PracticeListings/sagas/PracticeListing";
// import { getPracticesSaga } from "../PracticeSelectionPage/sagas/practiceSelection";
// import { getMatchingPracticesSaga } from "../PracticeSelectionPage/sagas/fuzzySearch.js";
// import { linkPracticeSaga } from "../PracticeSelectionPage/sagas/practiceLinking";
// import { sendMessageToSupportSaga } from "../SupportPage/sagas/support";
// import { practiceProfileSaga } from "../PracticeProfilePage/sagas/getPracticeProfile";
import { consumerInterfaceSagas } from "../ConsumerInterface/consumerInterfaceSagas";
import { vAppointmentSagas } from "../vAppointment/vAppointmentSagas";
import { vScriptSagas } from "../vScript/vScriptSagas";
import { autoRegisterUserSaga } from "../AutoRegisterPage/sagas/autoRegister";
import { checkPasswordTokenSaga } from "../SetNewPasswordPage/sagas/checkPasswordToken";
import { expiredSessionSaga } from "../components/ExpiredSession/sagas/expiredSession";
import { setNewPasswordSaga } from "../SetNewPasswordPage/sagas/setNewPassword";

const rootSaga = [].concat(
  autoRegisterUserSaga,
  checkPasswordTokenSaga,
  expiredSessionSaga,
  setNewPasswordSaga,
  consumerInterfaceSagas,
  vAppointmentSagas,
  vScriptSagas,
);

export default rootSaga;
