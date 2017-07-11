import { call, put } from "redux-saga/effects";
import { takeEvery } from "redux-saga";

import { actions, actionTypes } from "../actions/menuActions";
import {
  actions as searchActions,
  actionTypes as searchActionTypes,
} from "../actions/searchActions";
import { GenericParserHttp } from "../../../libs/Http";

const connectedApi = (token) =>
  GenericParserHttp.get("consumer/prescription/organisation", { token })
  .then(({ body }) => body);

const allApi = (token) => GenericParserHttp.get("consumer/prescription/organisation/all", { token })
  .then(({ body }) => body);

function* fetchConnectedPractices({ payload: { id } }) {
  try {
    const practices = yield call(connectedApi, id);
    yield put(actions.fetchConnectedPracticesSuccess(practices));
  } catch (err) {
    yield put(actions.fetchConnectedPracticesFailure(err));
  }
}

function* fetchAllPractices({ payload: { token } }) {
  try {
    const practices = yield call(allApi, token);
    yield put(searchActions.fetchAllPracticesSuccess(practices));
  } catch (err) {
    yield put(searchActions.fetchAllPracticesFailure(err));
  }
}

function* fetchConnectedPracticesSaga() {
  yield* takeEvery(actionTypes.fetchConnectedPractices, fetchConnectedPractices);
}

function* fetchAllPracticesSaga() {
  yield* takeEvery(searchActionTypes.fetchAllPractices, fetchAllPractices);
}

export {
  fetchConnectedPracticesSaga,
  fetchAllPracticesSaga,
};
