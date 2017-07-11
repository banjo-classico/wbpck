import { call, put } from "redux-saga/effects";
import { takeEvery } from "redux-saga";

import { GenericParserHttp } from "../../../libs/Http";
import { actions, actionTypes } from "../actions/actions";

const api = (token) =>
  GenericParserHttp.get("consumer/practice", { token })
    .then(({ body }) => body);

function* getPracticeListings({ payload: { token } }) {
  try {
    const practices = yield call(api, token);
    yield put(actions.getPracticeListingsSuccess(practices));
  } catch (err) {
    yield put(actions.getPracticeListingsFailure(err));
  }
}

function* getPracteListingsSaga() {
  yield* takeEvery(actionTypes.getPracticeListings, getPracticeListings);
}

export {
  getPracteListingsSaga,
};
