import React from "react";
import { call, put, select } from "redux-saga/effects";
import { takeEvery } from "redux-saga";
import { push } from "react-router-redux";

import HttpLib from "../../../libs/Http";
import Alert from "../../../libs/Alert";
import { actions, actionTypes } from "../actions/sessionActions";
import { actions as popUpActions } from "../../PracticeProfilePage/actions/popUpActions";
import {
  actions as confirmActions,
} from "../../ConfirmationCodePage/actions/codeConfirmationActions";
import { AppointmentConfirmationCodePage } from "../../ConfirmationCodePage/connect";
import CheckoutPage from "../../CheckoutPage";
import GuestBookingErrorPage from "../../GuestBookingErrorPage";
import { getToken } from "../../../selectors/loginSelectors";
import { routeConfig } from "../../../routes";
import { isDesktop } from "../../../config";


const parseError = (err) => {
  if (err.status === 403) {
    return {
      error: "No Booking allowed",
      shouldAlert: false,
    };
  }
  return {
    error: "An Unexpected Error Occurred.<br/>Please Try Again.",
    shouldAlert: true,
  };
};

const alertMethod = (error) => {
  if (error.shouldAlert) {
    return Alert.error(error.error);
  }
  return () => {};
};

const createSessionParserHttp = new HttpLib(
  parseError,
  alertMethod
);

const bookForMyselfApi = (data, token) => {
  const requiredData = {
    ...data,
    InitiatorFirstName: data.FirstName,
    InitiatorLastName: data.LastName,
    InitiatorDateOfBirth: data.DateOfBirth,
    InitiatorMobile: data.Mobile,
    FirstName: undefined,
    LastName: undefined,
    DateOfBirth: undefined,
    Mobile: undefined,
  };
  const url = `consumer/appointment/session${!token ? "/guest" : ""}`;
  return createSessionParserHttp.post(url, { data: requiredData, token })
    .then(({ body: { SessionId } }) => SessionId);
};

const bookForSomeoneElseApi = (data, token) => {
  const url = `consumer/appointment/${token ? "session/other" : "/session/guest"}`;
  return createSessionParserHttp.post(url, { data, token })
    .then(({ body: { SessionId } }) => SessionId);
};


const getIsVerified = (state) => state.profileReducer.profile.MobileVerified;

// create session
function* getSession({ payload }) {
  try {
    const token = yield select(getToken);
    const sessionId = yield call(
      payload.IsBookingForSomeoneElse ? bookForSomeoneElseApi : bookForMyselfApi,
      payload,
      token
    );
    yield put(actions.createSessionSuccess(sessionId));
    const isVerified = yield select(getIsVerified);
    if (!isVerified) {
      yield put(confirmActions.sendToConfirm(sessionId));
      yield put(isDesktop() ?
        popUpActions.setMainComponent(<AppointmentConfirmationCodePage />, true) :
        push(routeConfig.confirmAppointmentCode.getBrowserPath())
      );
    } else {
      yield put(popUpActions.clearSideComponent());
      yield put(isDesktop() ?
        popUpActions.setMainComponent(<CheckoutPage />, true) :
        push(routeConfig.checkout.getBrowserPath())
      );
    }
  } catch (err) {
    if (err.status === 403) {
      yield put(actions.createGuestBookingError(err.response.body));
      yield put(popUpActions.clearSideComponent());
      yield put(isDesktop() ?
        popUpActions.setMainComponent(<GuestBookingErrorPage />) :
        push(routeConfig.guestBookingError.getBrowserPath())
      );
    } else {
      yield put(actions.createSessionFailure(err));
    }
  }
}

function* createSessionSaga() {
  yield* takeEvery(actionTypes.createSession, getSession);
}

export {
  createSessionSaga,
};
