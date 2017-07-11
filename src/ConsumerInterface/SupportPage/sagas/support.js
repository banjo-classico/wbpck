import { call, put, select } from "redux-saga/effects";
import { takeEvery } from "redux-saga";

import { GenericParserHttp } from "../../../libs/Http";
import { getToken } from "../../../selectors/loginSelectors.js";

import { actions, actionTypes } from "../actions/actions";

const api = (Message, Id, Name, Email, token) =>
  GenericParserHttp.post(
    `consumer/feedback${!token ? "/guest" : ""}`, { data: { Message, Id, Name, Email }, token }
  );

function* sendMessageToSupport({ payload: { message, id, name, email } }) {
  try {
    const token = yield select(getToken);
    yield call(api, message, id, name, email, token);
    yield put(actions.sendMessageToSupportSuccess());
  } catch (err) {
    yield put(actions.sendMessageToSupportFailure(err));
  }
}

function* sendMessageToSupportSaga() {
  yield* takeEvery(actionTypes.sendMessageToSupport, sendMessageToSupport);
}

export {
  sendMessageToSupportSaga,
};
