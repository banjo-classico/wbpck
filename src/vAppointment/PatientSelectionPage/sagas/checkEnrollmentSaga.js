import { call, put } from "redux-saga/effects";
import { takeEvery } from "redux-saga";
import { push } from "react-router-redux";

import HttpLib from "../../../libs/Http";
import Alert from "../../../libs/Alert";
import { toServerFormat } from "../../../libs/Dates";
import { isDesktop } from "../../../config";
import { routeConfig } from "../../../routes";

import { actions, actionTypes } from "../actions/actions";

const checkEnrollmentParserHttp = new HttpLib(
  ({ status }) => {
    if (status === 403) {
      return {
        error: "User is not enrolled with this practice",
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

const api = (FirstName, LastName, DateOfBirth, Mobile, Time, orgId, doctorId) =>
  checkEnrollmentParserHttp.post(
    `consumer/appointment/${orgId}/${doctorId}/abletobook`,
    { data: { FirstName, LastName, DateOfBirth, Mobile, Time } }
  ).then(({ body }) => body);
function* checkEnrolledPatient(
  { payload: { firstName, lastName, dateOfBirth, phone, time, orgId, doctorId } }
) {
  try {
    yield call(api, firstName, lastName, toServerFormat(dateOfBirth), phone, time, orgId, doctorId);
    yield put(actions.enrolledPatientSuccess());
  } catch (err) {
    if (err.status === 403) {
      yield put(actions.enrolledPatientFailure(err.response.body));
      if (!isDesktop()) {
        yield put(push(routeConfig.guestBookingError.getBrowserPath()));
      }
    }
  }
}

function* checkEnrollmentSaga() {
  yield* takeEvery(actionTypes.checkEnrolledPatient, checkEnrolledPatient);
}

export {
  checkEnrollmentSaga,
};
