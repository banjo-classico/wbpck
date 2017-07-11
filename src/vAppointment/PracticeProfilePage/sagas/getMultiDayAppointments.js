import { call, put } from "redux-saga/effects";
import { takeEvery } from "redux-saga";
import { keys, map, compose } from "lodash/fp";
import moment from "moment";

import { actions, actionTypes } from "../actions/appointmentActions";
import { GenericParserHttp } from "../../../libs/Http";

const api = (orgId, startDay, days) => {
  const dayString = moment(startDay).format("YYYY-MM-DD");
  const doctors = GenericParserHttp.get(`consumer/appointment/${orgId}/${dayString}/${days}`)
    .then(({ body }) => body)
    .then(map((doctor) => {
      const parseSlots = (slots) => compose(
          map((s) => ({ Guid: s, Time: slots[s] })),
          keys
        )(slots);
      const multiDays = compose(
        map(m => ({ Day: m, Slots: parseSlots(doctor.AvailableSlots[m]) })),
        keys
      )(doctor.AvailableSlots);
      return { ...doctor, AvailableSlots: multiDays };
    }));
  return doctors;
};

function* getMultiDayAppointments({ payload: { practiceId, startDay, days, doctorName } }) {
  try {
    const doctors = yield call(api, practiceId, startDay, days);
    yield put(actions.fetchMultiDayAppointmentsSuccess(doctors, doctorName));
  } catch (err) {
    yield put(actions.fetchMultiDayAppointmentsFailure(err));
  }
}

function* getMultiDayAppointmentsSaga() {
  yield* takeEvery(actionTypes.fetchMultiDayAppointments, getMultiDayAppointments);
}

export {
  getMultiDayAppointmentsSaga,
};
