import { put, call } from "redux-saga/effects";
import { takeEvery } from "redux-saga";
import { push } from "react-router-redux";

import Alert from "../../../libs/Alert";
import { actions, actionTypes } from "../actions/actions";
import { actions as feedActions } from "../../HealthFeed/actions/actions";
import { actions as apptActions } from "../../Appointments/actions/actions";
import HttpLib from "../../../libs/Http";
import { routeConfig } from "../../../routes";

// function* redirect({ payload: { pathname } }) {
//   const path = pathname ? pathname.split("/") : "";
//   if (path && path[1] === "practiceprofile") {
//     yield put(push(routeConfig.practiceProfile.getBrowserPath(path[2])));
//   } else {
//     yield put(push(routeConfig.login.getBrowserPath()));
//   }
// }
const LogoutParserHttp = new HttpLib(
  ({ status }) => {
    if (status === 401) {
      return {
        error: "Unauthorized logout, the user may have been expired a long time ago.",
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


const api = (token) => LogoutParserHttp.post("consumer/logout", { token });

function* logout({ payload: { token, config } }) {
  window.localStorage.removeItem("token");
  try {
    yield call(api, token);
    yield put(feedActions.clearFeed());
    yield put(actions.logoutSuccess());
    yield put(apptActions.clearConfirmedAppointments());
    yield put(apptActions.clearPastAppointments());
    if (config) {
      yield put(push(routeConfig[config.path].getBrowserPath(config.id)));
    } else {
      window.location = "https://login.vensa.com";
    }
  } catch (err) {
    yield put(actions.logoutFailure(err));
  }
}

function* logoutSaga() {
  yield* takeEvery(actionTypes.logout, logout);
}

export {
  logoutSaga,
};
