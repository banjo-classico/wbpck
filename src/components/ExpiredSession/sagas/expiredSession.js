import { put, take } from "redux-saga/effects";
import { takeEvery } from "redux-saga";

import {
  actions as refreshSessionActions,
  actionTypes as refreshSessionActionTypes,
} from "../actions/actions";

import {
  actions as loginActions,
  actionTypes as loginActionTypes,
} from "../../../ConsumerInterface/EntryPage/actions/actions";

function* expiredSession({ payload: { password, email } }) {
  try {
    yield put(loginActions.login(email, password));
    yield take(loginActionTypes.loginSuccess);
    yield put(refreshSessionActions.expiredSessionSuccess());
    location.reload();
  } catch (err) {
    yield put(refreshSessionActions.expiredSessionFailure());
  }
}

function* expiredSessionSaga() {
  yield* takeEvery(refreshSessionActionTypes.refreshSession, expiredSession);
}

export {
  expiredSessionSaga,
};
