import { call, put } from "redux-saga/effects";
import { takeEvery } from "redux-saga";

import { actions, actionTypes } from "../actions/actions";
import { GenericParserHttp } from "../../../libs/Http";

const checkPasswordApi = (password, token) =>
  GenericParserHttp.post("consumer/password/verify", { data: { password }, token })
  .then(({ body }) => body);

const api = (token, accessToken, Reason) =>
  GenericParserHttp.delete("consumer", { data: { Reason, token: accessToken }, token })
  .then(({ body }) => body);

function* checkPassword({ payload: { password, token } }) {
  try {
    const accessToken = yield call(checkPasswordApi, password, token);
    yield put(actions.checkPasswordSuccess(accessToken));
  } catch (err) {
    yield put(actions.checkPasswordFailure(err));
  }
}
function* deactivateAccount({ payload: { token, accessToken, reason } }) {
  try {
    yield call(api, token, accessToken, reason);
    yield put(actions.deactivateAccountSuccess());
  } catch (err) {
    yield put(actions.deactivateAccountFailure(err));
  }
}

function* checkPasswordSaga() {
  yield* takeEvery(actionTypes.checkPassword, checkPassword);
}
function* deactivateAccountSaga() {
  yield* takeEvery(actionTypes.deactivateAccount, deactivateAccount);
}

export {
  checkPasswordSaga,
  deactivateAccountSaga,
};
