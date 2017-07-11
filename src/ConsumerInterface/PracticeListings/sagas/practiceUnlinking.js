import { call, put } from "redux-saga/effects";
import { takeEvery } from "redux-saga";

import { actions, actionTypes } from "../actions/actions";
import { GenericParserHttp } from "../../../libs/Http";

const api = (id, token) =>
  GenericParserHttp.delete("consumer/practice", { data: { PracticeId: id }, token });

function* unlinkPractice({ payload: { practice, token } }) {
  try {
    yield call(api, practice.PracticeId, token);
    yield put(actions.unlinkPracticeSuccess(practice));
    yield put(actions.getPracticeListings(token));
  } catch (err) {
    yield put(actions.unlinkPracticeFailure(err));
  }
}

function* unlinkPracticeSaga() {
  yield* takeEvery(actionTypes.unlinkPractice, unlinkPractice);
}

export {
  unlinkPracticeSaga,
};
