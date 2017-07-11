import moment from "moment";
import { takeEvery } from "redux-saga";
import { call, race, put, take } from "redux-saga/effects";
import { actionTypes } from "../actions/actions";
// eslint-disable-next-line max-len
import { actions as expiredSessionActions } from "../../../components/ExpiredSession/actions/actions";

const delayWithDone = (ms) => new Promise(resolve => setTimeout(() => resolve("done"), ms));

function* setToken({ payload }) {
  yield window.localStorage.setItem("token", JSON.stringify(payload));
  const timeLeftMilliseconds = Math.max(
    moment(payload.expiryTime).diff(moment(), "milliseconds"), 0
  );
  const logoutOrExpire = yield race({
    logout: take(actionTypes.logout),
    expire: call(delayWithDone, timeLeftMilliseconds),
  });
  if (logoutOrExpire.expire) {
    yield put(expiredSessionActions.showExpiredSession());
  }
}

function* tokenStorageSaga() {
  yield* takeEvery(actionTypes.loginSuccess, setToken);
}

export {
  tokenStorageSaga,
};
