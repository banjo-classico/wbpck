import { call, put } from "redux-saga/effects";
import { takeEvery } from "redux-saga";

import { actions, actionTypes } from "../actions/actions";
import { GenericParserHttp } from "../../../libs/Http";

const api = (id) => GenericParserHttp.get(`consumer/appointment/organisation/${id}`)
  .then(({ body }) => body);

function* getPracticeInfo({ payload: { id } }) {
  try {
    const practiceInfo = yield call(api, id);
    yield put(actions.fetchPracticeInfoSuccess(practiceInfo));
  } catch (err) {
    yield put(actions.fetchPracticeInfoFailure(err));
  }
}

function* practiceInfoSaga() {
  yield* takeEvery(actionTypes.fetchPracticeInfo, getPracticeInfo);
}

export {
  practiceInfoSaga,
};
