import { call, put } from "redux-saga/effects";
import { takeEvery } from "redux-saga";

import { GenericParserHttp } from "../../libs/Http";
import { actions, actionTypes } from "../actions/actions";

const api = (NewPassword, Token) =>
  GenericParserHttp.post(
    "consumer/password/reset", { data: { NewPassword, Token } }
  );

function* setNewPassword({ payload: { NewPassword, Token } }) {
  try {
    yield call(api, NewPassword, Token);
    yield put(actions.setNewPasswordSuccess());
  } catch (err) {
    yield put(actions.setNewPasswordFailure(err));
  }
}

function* setNewPasswordSaga() {
  yield* takeEvery(actionTypes.setNewPassword, setNewPassword);
}

export {
  setNewPasswordSaga,
};
