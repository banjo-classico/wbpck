import { call, put } from "redux-saga/effects";
import { takeEvery } from "redux-saga";

import { actions, actionTypes } from "../actions/actions";
import { GenericParserHttp } from "../../../libs/Http";

const api = (id) => GenericParserHttp.get(`consumer/organisation/doctor/${id}`)
  .then(({ body }) => body);

function* getDoctorProfile({ payload: { id } }) {
  try {
    const doctorProfile = yield call(api, id);
    yield put(actions.fetchDoctorProfileSuccess(doctorProfile));
  } catch (err) {
    yield put(actions.fetchDoctorProfileFailure(err));
  }
}

function* doctorProfileSaga() {
  yield* takeEvery(actionTypes.fetchDoctorProfile, getDoctorProfile);
}

export {
  doctorProfileSaga,
};
