import { call, put } from "redux-saga/effects";
import { takeEvery } from "redux-saga";
import { push } from "react-router-redux";

import { actions, actionTypes } from "../actions/actions";
import { GenericParserHttp } from "../../../libs/Http";
import { routeConfig } from "../../../routes";

const api = (dependant, token) =>
  GenericParserHttp.post("consumer/dependant", { data: dependant, token })
    .then(({ body }) => body);

const avatarApi = (file, token, id) =>
  GenericParserHttp.postImage(`consumer/dependant/${id ? (`${id}/`) : ""}avatar`, { file, token })
    .then(({ body }) => body);

function* addDependant({ payload: { dependant, token } }) {
  try {
    yield call(api, dependant, token);
    yield put(actions.addDependantSuccess());
    yield put(push(routeConfig.dependants.getBrowserPath()));
  } catch (err) {
    yield put(actions.addDependantFailure(err));
  }
}

function* addAvatar({ payload: { file, token, id } }) {
  try {
    yield call(avatarApi, file, token, id);
    yield put(actions.addAvatarSuccess());
    yield put(actions.fetchDependants(token));
  } catch (err) {
    yield put(actions.addAvatarFailure(err));
  }
}

function* addDependantSaga() {
  yield* takeEvery(actionTypes.addDependant, addDependant);
}

function* addAvatarDependantSaga() {
  yield* takeEvery(actionTypes.addAvatar, addAvatar);
}

export {
  addDependantSaga,
  addAvatarDependantSaga,
};
