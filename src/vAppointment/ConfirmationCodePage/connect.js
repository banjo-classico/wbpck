import React from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { push } from "react-router-redux";
import { throttle } from "lodash/fp";

// eslint-disable-next-line max-len
import { actions as profileActions } from "../../ConsumerInterface/MainShell/actions/profileActions";
import { actions as popUpActions } from "../PracticeProfilePage/actions/popUpActions";
import ConfirmationCodePage from "./index";
import CheckoutPage from "../CheckoutPage";
import { actions as headerActions } from "../../components/header/actions/actions";
import { actions as detailsActions } from "../PatientDetailsPage/actions/actions";
import { actions as confirmActions } from "../ConfirmationCodePage/actions/codeConfirmationActions";
import { actions as guardianActions } from "../GuardianshipPage/actions/actions";
// eslint-disable-next-line max-len
import { sessionDispatch, allSessionProps, isBookingForSomeoneElse } from "../../selectors/sessionSelectors";
import { routeConfig } from "../../routes";
import { isDesktop } from "../../config";

const throttleForTime = throttle(500);

const getCountdownTime = (state) => ({
  countdownStartTime: state.countdownReducer.startTime,
  milliSecondsToWait: state.countdownReducer.milliSecondsToWait,
});
const getAppointmentMobile = (state) => {
  if (state.loginReducer.token) {
    return state.profileReducer.profile.Mobile;
  }
  if (isBookingForSomeoneElse(state)) {
    return state.guardianDetailsReducer.phone;
  }
  return state.patientDetailsReducer.patientDetails.phone;
};

const getAppointmentChangePhone = (
  state,
  changePhoneUser,
  changePhoneSession,
  changePhoneGuardian
) => {
  if (state.isBookingForSomeoneElse) {
    return changePhoneGuardian;
  }
  if (state.token) {
    return changePhoneUser;
  }
  return changePhoneSession;
};

const mapAppointmentStateToProps = (state) => ({
  token: state.loginReducer.token,
  mobile: getAppointmentMobile(state),
  sendCodeIsFetching: state.confirmCodeReducer.sendCode.isFetching,
  sessionId: state.sessionReducer.sessionId,
  shouldPush: state.confirmCodeReducer.sendCode.success,
  isWhite: false,
  totalPages: 3,
  currentIndex: 2,
  ...getCountdownTime(state),
  isBookingForSomeoneElse: isBookingForSomeoneElse(state),
  isError: state.confirmCodeReducer.sendCode.error &&
    state.confirmCodeReducer.sendCode.error.status === 400,
});
const mergeProps = (stateProps, dispatchProps) => ({
  ...stateProps,
  ...dispatchProps,
  changePhone: getAppointmentChangePhone(
    stateProps,
    dispatchProps.changePhoneUser,
    dispatchProps.changePhoneSession,
    dispatchProps.changePhoneGuardian
  ),
});
const mapAppointmentDispatchToProps = (dispatch) => ({
  setHeading: bindActionCreators(headerActions.setHeading, dispatch),
  addHeaderStyles: bindActionCreators(headerActions.addStyles, dispatch),
  clearHeading: bindActionCreators(headerActions.clearHeading, dispatch),
  displayHeaderIcons: bindActionCreators(headerActions.displayHeaderIcons, dispatch),
  changePhoneSession: bindActionCreators(detailsActions.changePhone, dispatch),
  changePhoneUser: bindActionCreators(profileActions.changePhone, dispatch),
  changePhoneGuardian: bindActionCreators(guardianActions.changePhone, dispatch),
  createFn: sessionDispatch(dispatch)(allSessionProps),
  sendCode: bindActionCreators(confirmActions.sendCode, dispatch),
  clearSideComponent: bindActionCreators(popUpActions.clearSideComponent, dispatch),
  pushProp: () => {
    // eslint-disable-next-line max-len
    if (isDesktop()) bindActionCreators(popUpActions.setMainComponent, dispatch)(<CheckoutPage />, true);
    else bindActionCreators(push, dispatch)(routeConfig.checkout.getBrowserPath());
  },
  clickHere: () => bindActionCreators(push, dispatch)(routeConfig.smsIntercept.getBrowserPath()),
  clearError: throttleForTime(bindActionCreators(confirmActions.clearSendCodeError, dispatch)),
});

// eslint-disable-next-line max-len
const AppointmentConfirmationCodePage = connect(mapAppointmentStateToProps, mapAppointmentDispatchToProps, mergeProps)(ConfirmationCodePage);

export {
  AppointmentConfirmationCodePage,
};
