import { call, put } from "redux-saga/effects";
import { takeEvery } from "redux-saga";

import { actions, actionTypes } from "../actions/actions";
import { GenericParserHttp } from "../../../libs/Http";

const api = (id) => GenericParserHttp.get("consumer/dependant", { token: id })
  .then(({ body }) => body);

function* fetchDependants({ payload: { id } }) {
  try {
    const dependants = yield call(api, id);
    yield put(actions.fetchDependantsSuccess(dependants));
  } catch (err) {
    yield put(actions.fetchDependantsFailure(err));
  }
}

function* fetchDependantsSaga() {
  yield* takeEvery(actionTypes.fetchDependants, fetchDependants);
}

export {
  fetchDependantsSaga,
};
