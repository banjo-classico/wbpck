import { call, put } from "redux-saga/effects";
import { takeEvery } from "redux-saga";

import { actions, actionTypes } from "../actions/menuActions";
import { GenericParserHttp } from "../../../libs/Http";

const api = (id, token) => GenericParserHttp.get(`consumer/prescription/${id}/pmsuser`, { token })
  .then(({ body }) => body);

function* fetchDoctors({ payload: { id, token } }) {
  try {
    const doctors = yield call(api, id, token);
    yield put(actions.fetchDoctorsSuccess(doctors));
  } catch (err) {
    yield put(actions.fetchDoctorsFailure(err));
  }
}

function* fetchDoctorsSaga() {
  yield* takeEvery(actionTypes.fetchDoctors, fetchDoctors);
}

export {
  fetchDoctorsSaga,
};
