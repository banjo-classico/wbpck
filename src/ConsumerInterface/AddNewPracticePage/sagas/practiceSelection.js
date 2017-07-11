import { call, put } from "redux-saga/effects";
import { takeEvery } from "redux-saga";

import { actions, actionTypes } from "../actions/actions";
import { GenericParserHttp } from "../../../libs/Http";

const api = () => GenericParserHttp.get("consumer/practice/all")
  .then(({ body }) => body);

function* getPractices() {
  try {
    const practices = yield call(api);
    yield put(actions.getAllPracticesSuccess(practices));
  } catch (err) {
    yield put(actions.getAllPracticesError(err));
  }
}

function* getPracticesSaga() {
  yield* takeEvery(actionTypes.getAllPractices, getPractices);
}

export {
  getPracticesSaga,
};
