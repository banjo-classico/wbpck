import { call, put, select } from "redux-saga/effects";
import { takeEvery } from "redux-saga";

import { actions, actionTypes } from "../actions/registerUserCodeActions";
import { GenericParserHttp } from "../../../libs/Http";
import { getToken } from "../../../selectors/loginSelectors";

const api = (mobile, token) =>
  GenericParserHttp.post("consumer/verify/mobile", {
    token,
    data: { Mobile: mobile },
  })
    .then(({ body }) => body);

function* resendCode({ payload }) {
  try {
    const token = yield select(getToken);
    yield call(api, payload.mobile, token);
    yield put(actions.resendCodeSuccess());
  } catch (err) {
    yield put(actions.resendCodeFailure(err));
  }
}

function* resendCodeSaga() {
  yield* takeEvery(actionTypes.resendCode, resendCode);
}

export {
  resendCodeSaga,
};
