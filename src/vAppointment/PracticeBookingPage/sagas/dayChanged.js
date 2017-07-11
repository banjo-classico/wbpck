import { put } from "redux-saga/effects";
import { takeEvery } from "redux-saga";

import { actions, actionTypes } from "../actions/actions";

function* getAppointments({ payload: { practiceId, time, dayNum, doctorName } }) {
  yield put(actions.fetchDoctorAppointments(time, practiceId, dayNum, doctorName));
}

function* dayChangedSaga() {
  yield* takeEvery(actionTypes.selectDay, getAppointments);
}

export {
  dayChangedSaga,
};
