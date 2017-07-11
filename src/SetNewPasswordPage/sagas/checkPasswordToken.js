import { call, put } from "redux-saga/effects";
import { takeEvery } from "redux-saga";

import HttpLib from "../../libs/Http";
import Alert from "../../libs/Alert";
import { actions, actionTypes } from "../actions/actions";

const checkPasswordTokenParserHttp = new HttpLib(
  () => "Expired Link",
  Alert.info
);

const api = (Token) =>
  checkPasswordTokenParserHttp
  .post("consumer/password/checktoken", { data: { Token } })
  .then(({ body }) => body);

function* checkPasswordToken({ payload: { Token } }) {
  try {
    yield call(api, Token);
    yield put(actions.checkPasswordTokenSuccess());
  } catch (err) {
    yield put(actions.checkPasswordTokenFailure(err));
  }
}

function* checkPasswordTokenSaga() {
  yield* takeEvery(actionTypes.checkPasswordToken, checkPasswordToken);
}

export {
  checkPasswordTokenSaga,
};
