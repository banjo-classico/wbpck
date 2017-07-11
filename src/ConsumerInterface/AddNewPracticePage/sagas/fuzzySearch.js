import { call, put, take, fork, cancel } from "redux-saga/effects";
import { filter } from "fuzzaldrin";
import { actions, actionTypes } from "../actions/actions";

const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));
const api = (practices, searchTerm) =>
  new Promise((res) => res(filter(practices, searchTerm, { key: "Name", maxResults: 15 })));

function* getMatchingPractices({ payload: { query, practices } }) {
  try {
    if (!query) {
      yield put(actions.searchPracticesSuccess([]));
    } else {
      yield call(delay, 500);
      const matchedPractices = yield call(api, practices, query);
      yield put(actions.searchPracticesSuccess(matchedPractices));
    }
  } catch (err) {
    // this should never happen
  }
}

function* getMatchingPracticesSaga() {
  let task;
  // eslint-disable-next-line no-constant-condition
  while (true) {
    const action = yield take(actionTypes.searchPractices);
    if (task) {
      yield cancel(task);
    }
    task = yield fork(getMatchingPractices, action);
  }
}

export {
  getMatchingPracticesSaga,
};
