import { call, put } from "redux-saga/effects";
import { takeEvery } from "redux-saga";

import HttpLib from "../../../libs/Http";
import Alert from "../../../libs/Alert";

import { actions, actionTypes } from "../actions/actions";

const RequestPasswordParserHttp = new HttpLib(
  ({ status }) => {
    if (status === 404) {
      return {
        error: "Email is not registered",
        shouldAlert: false,
      };
    }
    return {
      error: "Unexpected Error Occurred. Please Try Again.",
      shouldAlert: true,
    };
  },
  (err) => {
    if (err.shouldAlert) {
      Alert.error(err.error);
    }
  }
);
const api = (Email) =>
  RequestPasswordParserHttp.post("consumer/password/sendtoken", { data: { Email } });

function* requestNewPassword({ payload: { email } }) {
  try {
    yield call(api, email);
    yield put(actions.requestNewPasswordSuccess());
  } catch (err) {
    yield put(actions.requestNewPasswordFailure(err));
  }
}

function* requestNewPasswordSaga() {
  yield* takeEvery(actionTypes.requestNewPassword, requestNewPassword);
}

export {
  requestNewPasswordSaga,
};
