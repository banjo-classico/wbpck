import { call, put } from "redux-saga/effects";
import { takeEvery } from "redux-saga";
import { push } from "react-router-redux";

import { actions, actionTypes } from "../actions/actions";
import {
  actions as checkActions, actionTypes as checkActionTypes,
} from "../actions/checkUsernameActions";
import HttpLib, { GenericParserHttp } from "../../../libs/Http";
import Alert from "../../../libs/Alert";
import { routeConfig } from "../../../routes";

const api = (user) =>
  GenericParserHttp.post("consumer/register", { data: user })
    .then(({ body }) => body);

const CheckParserHttp = new HttpLib(
      ({ status }) => {
        if (status === 409) {
          return {
            error: "Email already exists",
            status,
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
const checkAPI = (email) => CheckParserHttp.get(`consumer/username/${email}/check`);

function* registerUser({ payload: user }) {
  try {
    const registeredUser = yield call(api, user);
    yield put(actions.registerSuccess(registeredUser, true));
    yield put(push(routeConfig.home.getBrowserPath()));
  } catch (err) {
    yield put(actions.registerFailure(err));
  }
}

function* checkUsername({ payload: { email } }) {
  try {
    yield call(checkAPI, email);
    yield put(checkActions.checkUsernameSuccess());
    yield put(actions.setEmail(email));
  } catch (err) {
    yield put(checkActions.checkUsernameFailure(err));
    if (err.status === 409) {
      yield put(checkActions.setUsedEmail(email));
    }
  }
}

function* checkUsernameSaga() {
  yield* takeEvery(checkActionTypes.checkUsername, checkUsername);
}

function* registerUserSaga() {
  yield* takeEvery(actionTypes.register, registerUser);
}

export {
  checkUsernameSaga,
  registerUserSaga,
};
