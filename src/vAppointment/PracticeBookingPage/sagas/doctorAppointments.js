import { call, put } from "redux-saga/effects";
import { takeEvery } from "redux-saga";
import { keys, map, compose } from "lodash/fp";
import moment from "moment";

import { actions, actionTypes } from "../actions/actions";
import { GenericParserHttp } from "../../../libs/Http";

const api = (orgId, day) => {
  const dayString = moment(day).format("YYYY-MM-DD");
  const doctors = GenericParserHttp.get(`consumer/appointment/${orgId}/${dayString}`)
    .then(({ body }) => body)
    .then(map((doctor) => {
      const availableSlots = compose(
        map((s) => ({ Guid: s, Time: doctor.AvailableSlots[s] })),
        keys
      )(doctor.AvailableSlots);
      return { ...doctor, AvailableSlots: availableSlots };
    }));
    // .then(sortBy(d => -d.AvailableSlots.length));
  return doctors;
};

function* getAppointmentInfo({ payload: { day, practiceId, dayNum, doctorName } }) {
  try {
    const doctors = yield call(api, practiceId, day);
    yield put(actions.fetchDoctorAppointmentsSuccess(doctors, dayNum, doctorName));
  } catch (err) {
    yield put(actions.fetchDoctorAppointmentsFailure(err));
  }
}

function* doctorAppointmentsSaga() {
  yield* takeEvery(actionTypes.fetchDoctorAppointments, getAppointmentInfo);
}

export {
  doctorAppointmentsSaga,
};
