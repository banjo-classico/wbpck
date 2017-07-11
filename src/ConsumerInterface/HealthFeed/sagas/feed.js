import { call, put } from "redux-saga/effects";
import { takeEvery } from "redux-saga";

import { actions, actionTypes } from "../actions/actions";
import { GenericParserHttp } from "../../../libs/Http";

const api = (id) => GenericParserHttp.get("consumer/feed", { token: id })
  .then(({ body }) => body);

function* getFeed({ payload: { id } }) {
  try {
    const feed = yield call(api, id);
    yield put(actions.getFeedSuccess(feed));
  } catch (err) {
    yield put(actions.getFeedFailure(err));
  }
}

function* feedSaga() {
  yield* takeEvery(actionTypes.getFeed, getFeed);
}

export {
  feedSaga,
};
