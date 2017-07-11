import React from "react";
import { call, put } from "redux-saga/effects";
import { takeEvery } from "redux-saga";
import { push } from "react-router-redux";

import HttpLib from "../../../libs/Http";
import delay from "../../../libs/Delay";
import { actions, actionTypes } from "../actions/actions";
import { actions as popUpActions } from "../../PracticeProfilePage/actions/popUpActions";
import { isDesktop } from "../../../config";
import { routeConfig } from "../../../routes";
import BookingUnavailablePage from "../../BookingUnavailablePage";

const SubmitAppointmentParserHttp = new HttpLib(() => {}, () => {});
const api = (id) =>
  SubmitAppointmentParserHttp.post(`consumer/appointment/session/${id}/submit`);

function* submitAppointment({ payload: { sessionId } }) {
  try {
    yield call(api, sessionId);
    yield put(actions.submitAppointmentSuccess());
    yield put(actions.confirmationPollStart(sessionId));
  } catch (err) {
    // for animation purposes
    yield call(delay, 3000);
    yield put(actions.submitAppointmentFailure(err));
    yield call(delay, 3000);
    yield put(isDesktop() ?
    popUpActions.setMainComponent(<BookingUnavailablePage />, true) :
    push(routeConfig.bookingUnavailable.getBrowserPath()));
  }
}

function* submitAppointmentSaga() {
  yield* takeEvery(actionTypes.submitAppointment, submitAppointment);
}

export {
  submitAppointmentSaga,
};
