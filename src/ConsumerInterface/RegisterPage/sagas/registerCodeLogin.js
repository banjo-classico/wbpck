import { takeEvery } from "redux-saga";
import { put, take, call } from "redux-saga/effects";
import { push } from "react-router-redux";

import { actions as profileActions } from "../../MainShell/actions/profileActions";
import Alert from "../../../libs/Alert";
import HttpLib from "../../../libs/Http";
import { routeConfig } from "../../../routes";
import { actionTypes } from "../actions/actions";
import {
  actions as verifyCodeActions,
  actionTypes as verifyCodeActionTypes,
} from "../actions/registerUserCodeActions";

import {
  actions as loginActions,
  actionTypes as loginActionTypes,
} from "../../EntryPage/actions/actions";

const verifyCodeHttpParser = new HttpLib(
  ({ status }) => ({
    shouldError: status !== 400,
    message: "An Unexpected Error Occurred.<br/>Please Try Again.",
  }),
  ({ shouldError, message }) => { if (shouldError) Alert.error(message); }
);
const verifyCodeApi = (token, code) =>
  verifyCodeHttpParser.post("consumer/verify", {
    token,
    data: { Code: code },
  });
const delay = (ms) => new Promise(resolve => window.setTimeout(() => resolve(true), ms));

function* sendConfirmCode({ payload }) {
  try {
    yield put(loginActions.login(payload.email, payload.password));
    yield take(loginActionTypes.loginSuccess);
  } catch (err) {
    Alert.error("An Unexpected Error Occurred.<br/>Please Try Again.");
  }
}

function* verifyCode({ payload }) {
  try {
    yield delay(3000);
    yield call(verifyCodeApi, payload.token, payload.code);
    yield put(verifyCodeActions.verifyCodeSuccess());
    yield put(push(routeConfig.home.getBrowserPath()));
    yield put(profileActions.userIsVerified());
  } catch (err) {
    yield put(verifyCodeActions.verifyCodeFailure(err));
  }
}

function* userSuccessSaga() {
  yield* takeEvery(actionTypes.registerSuccess, sendConfirmCode);
}

function* confirmUserRegistrationCodeSaga() {
  yield* takeEvery(verifyCodeActionTypes.verifyCode, verifyCode);
}

export {
  userSuccessSaga,
  confirmUserRegistrationCodeSaga,
};
