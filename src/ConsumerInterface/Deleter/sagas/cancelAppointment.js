import { call, put, select } from "redux-saga/effects";
import { takeEvery } from "redux-saga";

import HttpLib from "../../../libs/Http";
import { actions, actionTypes } from "../actions/cancelAppointmentActions";
import { getToken } from "../../../selectors/loginSelectors";

const NoErrorParserHttp = new HttpLib(() => {}, () => {});
const api = (id, token, Reason) => NoErrorParserHttp.delete(
    `consumer/appointment/session/${id}`,
    { data: { Reason }, token }
  );

const checkApi = (id, token, Reason) => NoErrorParserHttp.post(
  `consumer/appointment/session/${id}/abletocancel`,
  { data: { Reason }, token }
).then(({ body }) => body);

function* cancelAppointment({ payload: { sessionId, reason } }) {
  try {
    const token = yield (select(getToken));
    yield call(api, sessionId, token, reason);
    yield put(actions.cancelAppointmentSuccess());
    yield put(actions.confirmCancelPollStart(sessionId));
  } catch (err) {
    yield put(actions.cancelAppointmentFailure(err));
  }
}

function* checkAbleToCancel({ payload: { sessionId, reason } }) {
  try {
    const token = yield (select(getToken));
    const cancelData = yield call(checkApi, sessionId, token, reason);
    yield put(actions.ableToCancelSuccess(cancelData));
  } catch (err) {
    yield put(actions.ableToCancelFailure(err));
  }
}

function* cancelAppointmentSaga() {
  yield* takeEvery(actionTypes.cancelAppointment, cancelAppointment);
}

function* ableToCancelSaga() {
  yield takeEvery(actionTypes.checkAbleToCancel, checkAbleToCancel);
}

export {
  cancelAppointmentSaga,
  ableToCancelSaga,
};
