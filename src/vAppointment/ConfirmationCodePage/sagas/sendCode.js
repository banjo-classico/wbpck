import { call, put, take, fork, cancel } from "redux-saga/effects";

import HttpLib from "../../../libs/Http";
import Alert from "../../../libs/Alert";
import { actions, actionTypes } from "../actions/codeConfirmationActions";

const SendCodeParserHttp = new HttpLib(
  ({ status }) => ({
    shouldError: status !== 400,
    message: "An Unexpected Error Occurred.<br/>Please Try Again.",
  }),
  ({ shouldError, message }) => { if (shouldError) Alert.error(message); }
);
const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));
const api = (id, Code) => SendCodeParserHttp
  .post(`consumer/appointment/session/${id}/verify`, { data: { Code } });

function* sendCode({ payload: { sessionId, code } }) {
  try {
    yield call(delay, 2000);
    yield put(actions.sendCodeFetching());
    yield call(api, sessionId, code);
    yield put(actions.sendCodeSuccess());
  } catch (err) {
    yield put(actions.sendCodeFailure(err));
  }
}

function* sendCodeSaga() {
  let task;
  // eslint-disable-next-line no-constant-condition
  while (true) {
    const action = yield take(actionTypes.sendCode);
    if (task) {
      yield cancel(task);
    }
    task = yield fork(sendCode, action);
  }
}

export {
  sendCodeSaga,
};
