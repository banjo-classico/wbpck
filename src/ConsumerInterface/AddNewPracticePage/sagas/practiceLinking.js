import { call, put } from "redux-saga/effects";
import { takeEvery } from "redux-saga";
import { push } from "react-router-redux";

import { actions, actionTypes } from "../actions/practiceLinkingActions";
import { GenericParserHttp } from "../../../libs/Http";
import { routeConfig } from "../../../routes";

const api = (id, token) =>
  GenericParserHttp.post("consumer/practice", { data: { PracticeId: id }, token })
    .then(({ status }) => ({ isMatched: status !== 206, isUsingVensa: status !== 204 }));

function* linkPractice({ payload: { practice, token } }) {
  try {
    const { isMatched, isUsingVensa } = yield call(api, practice.PracticeId, token);
    yield put(actions.linkPracticeSuccess(practice, isMatched, isUsingVensa));
    yield put(push(routeConfig.practiceListings.getBrowserPath()));
  } catch (err) {
    yield put(actions.linkPracticeFailure(err));
  }
}

function* linkPracticeSaga() {
  yield* takeEvery(actionTypes.linkPractice, linkPractice);
}

export {
  linkPracticeSaga,
};
