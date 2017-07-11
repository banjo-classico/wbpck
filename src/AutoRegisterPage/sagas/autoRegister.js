import { put, call, take } from "redux-saga/effects";
import { takeEvery } from "redux-saga";

import { actionTypes, actions as autoRegisterActions } from "../actions/actions";
import { actions as registerActions } from "../../ConsumerInterface/RegisterPage/actions/actions";
import { actionTypes as loginActionTypes } from "../../ConsumerInterface/EntryPage/actions/actions";
import { GenericParserHttp } from "../../libs/Http";

// @TODO extract into common function
const api = (user) =>
  GenericParserHttp.post("consumer/register", { data: user })
    .then(({ body }) => body);
function* autoRegisterUser(action) {
  const user = {
    SessionId: action.payload.sessionId,
    Username: action.payload.email,
    Password: action.payload.password,
  };
  try {
    const registeredUser = yield call(api, user);
    yield put(registerActions.registerSuccess(registeredUser, false));
    yield take(loginActionTypes.loginSuccess);
    yield put(autoRegisterActions.autoRegisterUserSuccess());
  } catch (err) {
    yield put(autoRegisterActions.autoRegisterUserFailure(err));
  }
}

function* autoRegisterUserSaga() {
  yield* takeEvery(actionTypes.autoRegisterUser, autoRegisterUser);
}

export {
  autoRegisterUserSaga,
};
