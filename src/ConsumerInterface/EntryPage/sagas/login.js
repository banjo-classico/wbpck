import { call, put } from "redux-saga/effects";
import { takeEvery } from "redux-saga";
import moment from "moment";

import HttpLib from "../../../libs/Http";
import Alert from "../../../libs/Alert";
import { actions, actionTypes } from "../actions/actions";

const LOGIN_FAIL = "Oops, it looks like your email or your password is not right.";
const UNEXPECTED_ERROR = "An Unexpected Error Occurred.<br/>Please Try Again.";
// eslint-disable-next-line max-len
const LOCKED_OUT = "You have entered an incorrect username or password too many times.<br/>Please try again later.";

const loginParserHttp = new HttpLib(
  ({ status, response: { body } }) => {
    if (status === 400) {
      if (body.error === "unauthorized") {
        return LOGIN_FAIL;
      }
      if (body.error === "locked") {
        return LOCKED_OUT;
      }
    }
    return UNEXPECTED_ERROR;
  },
  Alert.error,
  "",
);

function login(email, password) {
  return loginParserHttp.post("/token", {
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    data: {
      grant_type: "password",
      username: email,
      password,
    },
  }).then((
    { body: { access_token: accessToken, expires_in: expiresInSeconds } }
  ) => ({ accessToken, expiresInSeconds }));
}

function* addUser({ payload: { email, password } }) {
  try {
    const { accessToken, expiresInSeconds } = yield call(login, email, password);
    yield put(actions.loginSuccess(
      accessToken,
      // we say the token expires two minutes before it actually expires
      moment().add(expiresInSeconds - 120, "seconds").toDate(),
      email,
    ));
  } catch (err) {
    yield put(actions.loginError(err));
  }
}

function* loginSaga() {
  yield* takeEvery(actionTypes.login, addUser);
}

export {
  loginSaga,
};
