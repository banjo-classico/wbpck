import { call, put, select } from "redux-saga/effects";
import { takeEvery } from "redux-saga";

import HttpLib from "../../../libs/Http";
import Alert from "../../../libs/Alert";
import { actions, actionTypes } from "../actions/actions";
import { getToken } from "../../../selectors/loginSelectors";

const changePasswordParserHttp = new HttpLib(
  () => "Change failed. Please check your old password is correct.",
  Alert.info
);

const api = (Password, NewPassword, token) =>
  changePasswordParserHttp.post(
    "consumer/password", { data: { Password, NewPassword }, token }
  );

function* changePassword({ payload: { Password, NewPassword } }) {
  try {
    const token = yield select(getToken);
    yield call(api, Password, NewPassword, token);
    yield put(actions.changeUserPasswordSuccess());
  } catch (err) {
    yield put(actions.changeUserPasswordFailure(err));
  }
}

function* changePasswordSaga() {
  yield* takeEvery(actionTypes.changeUserPassword, changePassword);
}

export {
  changePasswordSaga,
};
