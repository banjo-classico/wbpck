import { call, put, select } from "redux-saga/effects";
import { takeEvery } from "redux-saga";

import { actions, actionTypes } from "../actions/registerUserCodeActions";
import { GenericParserHttp } from "../../../libs/Http";
import { getToken } from "../../../selectors/loginSelectors";

const api = (mobile, token) =>
  GenericParserHttp.post("consumer/verify/mobile", { token, data: { Mobile: mobile } })
  .then(({ body }) => body);

function* sendCodeToVerify({ payload: { mobile } }) {
  try {
    const token = yield select(getToken);
    yield call(api, mobile, token);
    yield put(actions.sendCodeToVerifySuccess());
  } catch (err) {
    yield put(actions.sendCodeToVerifyFailure(err));
  }
}

function* sendCodeToVerifySaga() {
  yield* takeEvery(actionTypes.sendCodeToVerify, sendCodeToVerify);
}

export {
  sendCodeToVerifySaga,
};
