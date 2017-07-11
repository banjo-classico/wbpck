import { call, put } from "redux-saga/effects";
import { takeEvery } from "redux-saga";

import { actions, actionTypes } from "../actions/actions";
import { GenericParserHttp } from "../../../libs/Http";

const api = (id, token) => GenericParserHttp.get(`consumer/prescription/${id}`, { token })
  .then(({ body }) => body);

function* getScriptDetails({ payload: { id, token } }) {
  try {
    const details = yield call(api, id, token);
    yield put(actions.fetchScriptDetailsSuccess(details));
  } catch (err) {
    yield put(actions.fetchScriptDetailsFailure(err));
  }
}

function* getScriptDetailsSaga() {
  yield* takeEvery(actionTypes.fetchScriptDetails, getScriptDetails);
}

export {
  getScriptDetailsSaga,
};
