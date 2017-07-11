import { call, put } from "redux-saga/effects";
import { takeEvery } from "redux-saga";

import { actions, actionTypes } from "../actions/actions";
import { GenericParserHttp } from "../../../libs/Http";

const api = (id, token) => GenericParserHttp.delete(`consumer/dependant/${id}`, { token });

function* removeDependant({ payload: { id, token } }) {
  try {
    yield call(api, id, token);
    yield put(actions.removeDependantSuccess());
    yield put(actions.fetchDependants(token));
  } catch (err) {
    yield put(actions.removeDependantFailure(err));
  }
}

function* removeDependantSaga() {
  yield* takeEvery(actionTypes.removeDependant, removeDependant);
}

export {
  removeDependantSaga,
};
