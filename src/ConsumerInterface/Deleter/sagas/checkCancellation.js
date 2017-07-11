import { put } from "redux-saga/effects";
import { takeLatest } from "redux-saga";

import { actions, actionTypes } from "../actions/cancelAppointmentActions";
import { actions as appointmentActions } from "../../Appointments/actions/actions";
import { actions as deleterActions } from "../actions/actions";
import { GenericParserHttp } from "../../../libs/Http";
import delay from "../../../libs/Delay";
import createPoll from "../../../libs/Polling";

// key => status
// {
//  0: "Booking Pending",
//  1: "Booked",
//  2: "Failed",
//  3: "Cancellation Pending",
//  4: "Cancelled",
// }
const POLL_TIMEOUT_MILLIS = 30000;
const HANGING_TIMEOUT_MILLIS = 50000;
const POLL_INTERVAL = 3000;

const api = ({ payload: { sessionId } }) =>
  GenericParserHttp
    .get(`consumer/appointment/session/${sessionId}/check`)
    .then(({ body }) => body);

function* finishedPolling() {
  yield delay(3000);
  window.location.reload();
}
function* finishedWithError() {
  yield delay(3000);
  yield put(deleterActions.toggleDeleter());
  yield put(appointmentActions.toggleCta());
}

const { initialisePoll, executePoll } = createPoll({
  pollFn: api,
  pollRoundtripCompleteActionCreator: actions.confirmCancelSuccess,
  // eslint-disable-next-line max-len
  pollErrorActionCreator: ({ Status }) => actions.confirmCancelPollEnd(false, { status: 400, message: Status }),
  pollFinishedActionCreator: () => actions.confirmCancelPollEnd(true, null),
  pollFinishedGenerator: finishedPolling,
  pollErrorGenerator: finishedWithError,
  checkKeepPollingFn: ({ Status }) => Status === 3 || Status === 1,
  checkFinishedPollingFn: ({ Status }) => Status === 4,
  checkErrorPollingFn: ({ Status }) => Status === 2,
  errorActionCreator: actions.confirmCancelFailure,
  pollTimeMillis: POLL_INTERVAL,
  pollActionCreator: ({ payload: { sessionId } }) => actions.checkForConfirmCancel(sessionId),
  pollRoundtripCompleteActionType: actionTypes.confirmCancelSuccess,
  endStates: [actionTypes.confirmCancelPollEnd, actionTypes.confirmCancelFailure],
  timeoutMillis: POLL_TIMEOUT_MILLIS,
  timeoutActionCreator: () => actions.confirmCancelFailure({ status: -1, message: "timeout" }),
  hangingTimeoutMillis: HANGING_TIMEOUT_MILLIS,
  hangingActionCreator: actions.setIsBusy,
});

function* requestConfirmCancelSaga() {
  yield* takeLatest(actionTypes.checkForConfirmCancel, executePoll);
}

function* confirmCancellationSaga() {
  yield* takeLatest(actionTypes.confirmCancelPollStart, initialisePoll);
}

export {
  confirmCancellationSaga,
  requestConfirmCancelSaga,
};
