import { bindActionCreators } from "redux";
import { find } from "lodash/fp";
// eslint-disable-next-line max-len
import { actions as sessionActions } from "../vAppointment/ConfirmationCodePage/actions/sessionActions";
import {
  actions as confirmCodeActions,
} from "../vAppointment/ConfirmationCodePage/actions/codeConfirmationActions";
import { actions as feelingActions } from "../vAppointment/FeelingPage/actions/actions";
import { actions as bookingActions } from "../vAppointment/PracticeBookingPage/actions/actions";
import { actions as registerActions } from "../ConsumerInterface/RegisterPage/actions/actions";
// eslint-disable-next-line max-len
import { actions as patientDetailsActions } from "../vAppointment/PatientDetailsPage/actions/actions";
import { actions as guardianActions } from "../vAppointment/GuardianshipPage/actions/actions";
import { actions as checkoutActions } from "../vAppointment/CheckoutPage/actions/actions";

const clearAppointmentData = (dispatch) => () => {
  bindActionCreators(sessionActions.clearSession, dispatch)();
  bindActionCreators(feelingActions.clearFeelings, dispatch)();
  bindActionCreators(confirmCodeActions.clearConfirmCode, dispatch)();
  bindActionCreators(bookingActions.clearSelection, dispatch)();
  bindActionCreators(registerActions.clearRegisterData, dispatch)();
  bindActionCreators(patientDetailsActions.clearDetails, dispatch)();
  bindActionCreators(guardianActions.clearState, dispatch)();
  bindActionCreators(checkoutActions.clearConfirmationState, dispatch)();
};

const findDoctor = (id, doctors) => find(({ PmsUserId }) => PmsUserId === id, doctors);

export {
  clearAppointmentData,
  findDoctor,
};
