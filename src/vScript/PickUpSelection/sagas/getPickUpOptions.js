import { call, put } from "redux-saga/effects";
import { takeEvery } from "redux-saga";

import { actions, actionTypes } from "../actions/actions";
import { GenericParserHttp } from "../../../libs/Http";

const api = (orgId, token) =>
  GenericParserHttp.get(`consumer/prescription/${orgId}/pricing`, { token })
    .then(({ body }) => body);

function* getPickUpOptions({ payload: { orgId, token } }) {
  try {
    const options = yield call(api, orgId, token);
    yield put(actions.fetchPickUpOptionsSuccess(options));
  } catch (err) {
    yield put(actions.fetchPickUpOptionsFailure(err));
  }
}

function* getPickUpOptionsSaga() {
  yield* takeEvery(actionTypes.fetchPickUpOptions, getPickUpOptions);
}

export {
  getPickUpOptionsSaga,
};
