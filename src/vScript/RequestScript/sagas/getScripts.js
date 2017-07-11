import { call, put } from "redux-saga/effects";
import { takeEvery } from "redux-saga";

import { actions, actionTypes } from "../actions/actions";
import { GenericParserHttp } from "../../../libs/Http";

const api = (type, token) => GenericParserHttp.get(`consumer/prescription/${type}`, { token })
  .then(({ body }) => body);

function* getCurrentRequests({ payload: { token } }) {
  try {
    const requests = yield call(api, "current", token);
    yield put(actions.fetchCurrentRequestsSuccess(requests));
  } catch (err) {
    yield put(actions.fetchCurrentRequestsFailure(err));
  }
}

function* getPastRequests({ payload: { token } }) {
  try {
    const requests = yield call(api, "past", token);
    yield put(actions.fetchPastRequestsSuccess(requests));
  } catch (err) {
    yield put(actions.fetchPastRequestsFailure(err));
  }
}

function* getCurrentRequestsSaga() {
  yield* takeEvery(actionTypes.fetchCurrentRequests, getCurrentRequests);
}

function* getPastRequestsSaga() {
  yield* takeEvery(actionTypes.fetchPastRequests, getPastRequests);
}

export {
  getCurrentRequestsSaga,
  getPastRequestsSaga,
};
