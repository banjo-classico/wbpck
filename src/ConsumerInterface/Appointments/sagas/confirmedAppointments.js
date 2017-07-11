import { call, put } from "redux-saga/effects";
import { takeEvery } from "redux-saga";

import { actions, actionTypes } from "../actions/actions";
import { GenericParserHttp } from "../../../libs/Http";

const api = (id) => GenericParserHttp.get("consumer/appointment/booked", { token: id })
  .then(({ body }) => body);

function* getConfirmedAppointments({ payload: { id } }) {
  try {
    const appointment = yield call(api, id);
    yield put(actions.getConfirmedAppointmentsSuccess(appointment));
  } catch (err) {
    yield put(actions.getConfirmedAppointmentsFailure(err));
  }
}

function* confirmedAppointmentsSaga() {
  yield* takeEvery(actionTypes.getConfirmedAppointments, getConfirmedAppointments);
}

export {
  confirmedAppointmentsSaga,
};
