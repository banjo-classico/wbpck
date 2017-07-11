import { call, put } from "redux-saga/effects";
import { takeEvery } from "redux-saga";

import { actions, actionTypes } from "../actions/actions";
import { GenericParserHttp } from "../../../libs/Http";

const api = (id) => GenericParserHttp.get("consumer/appointment/booked/past", { token: id })
  .then(({ body }) => body);
// const delay = (ms) => new Promise(resolve => window.setTimeout(() => resolve(true), ms));

function* getPastAppointments({ payload: { id } }) {
  try {
    // yield delay(3000);
    const appointment = yield call(api, id);
    yield put(actions.getPastAppointmentsSuccess(appointment));
  } catch (err) {
    yield put(actions.getPastAppointmentsFailure(err));
  }
}

function* pastAppointmentsSaga() {
  yield* takeEvery(actionTypes.getPastAppointments, getPastAppointments);
}

export {
  pastAppointmentsSaga,
};
