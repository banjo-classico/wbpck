import { call, put } from "redux-saga/effects";
import { takeEvery } from "redux-saga";

import { actions, actionTypes } from "../actions/actions";
import { GenericParserHttp } from "../../../libs/Http";

const api = (id) => GenericParserHttp.get(`consumer/organisation/${id}`)
  .then(({ body }) => body);

function* getPracticeProfile({ payload: { id } }) {
  try {
    const practiceProfile = yield call(api, id);
    yield put(actions.getPracticeProfileSuccess(practiceProfile));
  } catch (err) {
    yield put(actions.getPracticeProfileFailure(err));
  }
}

function* practiceProfileSaga() {
  yield* takeEvery(actionTypes.getPracticeProfile, getPracticeProfile);
}

export {
  practiceProfileSaga,
};
