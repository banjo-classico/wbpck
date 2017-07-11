import { call, put } from "redux-saga/effects";
import { takeEvery } from "redux-saga";
import { sortBy, keys, map, compose } from "lodash/fp";
import moment from "moment";

import { actions, actionTypes } from "../actions/popUpActions";
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
    }))
    .then(sortBy(d => -d.AvailableSlots.length));
  return doctors;
};

function* getAppointmentInfo({ payload: { day, practiceId, id } }) {
  try {
    const doctors = yield call(api, practiceId, day);
    yield put(actions.getDoctorProfileAppointmentsSuccess(doctors, id));
  } catch (err) {
    yield put(actions.getDoctorProfileAppointmentsFailure(err));
  }
}

function* doctorProfileAppointmentsSaga() {
  yield* takeEvery(actionTypes.getDoctorProfileAppointments, getAppointmentInfo);
}

export {
  doctorProfileAppointmentsSaga,
};
