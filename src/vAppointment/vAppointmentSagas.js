import { practiceInfoSaga } from "./PracticeBookingPage/sagas/practiceInfo";
import { doctorAppointmentsSaga } from "./PracticeBookingPage/sagas/doctorAppointments";
import {
  doctorProfileAppointmentsSaga,
} from "./PracticeProfilePage/sagas/getDoctorProfileAppointments";
import { getMultiDayAppointmentsSaga } from "./PracticeProfilePage/sagas/getMultiDayAppointments";
import { doctorProfileSaga } from "./DoctorProfilePage/sagas/doctorProfile";
import { dayChangedSaga } from "./PracticeBookingPage/sagas/dayChanged";
import { createSessionSaga } from "./ConfirmationCodePage/sagas/createSession";
import { confirmCodeSaga } from "./ConfirmationCodePage/sagas/confirmCode";
import { countdownSaga } from "./ConfirmationCodePage/sagas/countdown";
import { sendCodeSaga } from "./ConfirmationCodePage/sagas/sendCode";
import { checkEnrollmentSaga } from "./PatientSelectionPage/sagas/checkEnrollmentSaga";
import { submitAppointmentSaga } from "./CheckoutPage/sagas/submitAppointment";
import {
  appointmentConfirmationSaga,
  requestConfirmationSaga,
} from "./CheckoutPage/sagas/checkConfirmation";
import { requestNewPasswordSaga } from "./RequestNewPasswordPage/sagas/requestNewPassword";
import { changePhoneSaga } from "./ConfirmationCodePage/sagas/changePhone";
import { practiceProfileSaga } from "./PracticeProfilePage/sagas/getPracticeProfile";

const vAppointmentSagas = [].concat(
  appointmentConfirmationSaga,
  changePhoneSaga,
  checkEnrollmentSaga,
  confirmCodeSaga,
  countdownSaga,
  createSessionSaga,
  dayChangedSaga,
  doctorAppointmentsSaga,
  doctorProfileAppointmentsSaga,
  doctorProfileSaga,
  getMultiDayAppointmentsSaga,
  practiceInfoSaga,
  practiceProfileSaga,
  requestConfirmationSaga,
  requestNewPasswordSaga,
  sendCodeSaga,
  submitAppointmentSaga,
);

export {
  vAppointmentSagas,
};
