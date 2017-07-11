import { call, put } from "redux-saga/effects";
import { takeEvery } from "redux-saga";

import { GenericParserHttp } from "../../../libs/Http";
import { actions, actionTypes } from "../actions/codeConfirmationActions";

const api = (id) => GenericParserHttp.get(`consumer/appointment/session/${id}/verify`);

function* confirmCode({ payload: { sessionId } }) {
  try {
    yield call(api, sessionId);
    yield put(actions.sendToConfirmSuccess());
  } catch (err) {
    yield put(actions.sendToConfirmFailure());
  }
}

function* confirmCodeSaga() {
  yield* takeEvery(actionTypes.sendToConfirm, confirmCode);
}

export {
  confirmCodeSaga,
};
