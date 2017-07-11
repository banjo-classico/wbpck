import React from "react";
import { put, select } from "redux-saga/effects";
import { takeLatest } from "redux-saga";
import { push } from "react-router-redux";

import { actions, actionTypes } from "../actions/actions";
import { actions as popUpActions } from "../../PracticeProfilePage/actions/popUpActions";
import { GenericParserHttp } from "../../../libs/Http";
import createPoll from "../../../libs/Polling";
import { getToken } from "../../../selectors/loginSelectors";
import { routeConfig } from "../../../routes";
import { isDesktop } from "../../../config";
import delay from "../../../libs/Delay";
import BookingUnavailablePage from "../../BookingUnavailablePage";

const POLL_TIMEOUT_MILLIS = 300000;
const HANGING_TIMEOUT_MILLIS = 30000;
const POLL_INTERVAL = 3000;

const api = ({ payload: { sessionId } }) =>
GenericParserHttp
.get(`consumer/appointment/session/${sessionId}/check`)
.then(({ body }) => body);

function* finishedPolling() {
  yield delay(3000);
  const token = yield (select(getToken));
  if (isDesktop()) {
    yield put(popUpActions.closePopUp());
  }
  if (token) yield put(push(routeConfig.home.getBrowserPath()));
  else yield put(push(routeConfig.guestRegister.getBrowserPath()));
}

function* errorPolling() {
  yield delay(4000);
  yield put(
    isDesktop() ?
    popUpActions.setMainComponent(<BookingUnavailablePage />, true) :
    push(routeConfig.bookingUnavailable.getBrowserPath())
  );
}

const { initialisePoll, executePoll } = createPoll({
  pollFn: api,
  pollRoundtripCompleteActionCreator: actions.confirmationSuccess,
  pollErrorActionCreator: () => actions.confirmationPollEnd(false, { status: 400 }),
  pollFinishedActionCreator: () => actions.confirmationPollEnd(true, null),
  pollFinishedGenerator: finishedPolling,
  pollErrorGenerator: errorPolling,
  checkKeepPollingFn: ({ Status }) => Status === 0,
  checkFinishedPollingFn: ({ Status }) => Status === 1,
  checkErrorPollingFn: ({ Status }) => Status === 2 || Status === 4,
  errorActionCreator: actions.confirmationFailure,
  pollTimeMillis: POLL_INTERVAL,
  pollActionCreator: ({ payload: { sessionId } }) => actions.checkForConfirmation(sessionId),
  pollRoundtripCompleteActionType: actionTypes.confirmationSuccess,
  endStates: [actionTypes.confirmationPollEnd, actionTypes.confirmationFailure],
  timeoutMillis: POLL_TIMEOUT_MILLIS,
  timeoutActionCreator: () => actions.confirmationFailure({ status: -1, message: "timeout" }),
  hangingTimeoutMillis: HANGING_TIMEOUT_MILLIS,
  hangingActionCreator: actions.setIsBusy,
});

function* requestConfirmationSaga() {
  yield* takeLatest(actionTypes.checkForConfirmation, executePoll);
}

function* appointmentConfirmationSaga() {
  yield* takeLatest(actionTypes.confirmationPollStart, initialisePoll);
}

export {
  appointmentConfirmationSaga,
  requestConfirmationSaga,
};
