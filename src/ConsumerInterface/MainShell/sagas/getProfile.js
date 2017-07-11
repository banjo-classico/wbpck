import { put, select } from "redux-saga/effects";
import { takeEvery } from "redux-saga";

import { actions } from "../actions/profileActions";
import { actionTypes as loginActionTypes } from "../../EntryPage/actions/actions";
import {
  actions as editProfileActions,
  actionTypes as editProfileActionTypes,
} from "../../EditProfilePage/actions/actions";

const getProfileState = (state) => state.profileReducer.profile;

function* getProfile(action) {
  yield put(actions.getProfile(action.payload.token));
}

function* resetEditProfile() {
  const profile = yield select(getProfileState);
  yield put(editProfileActions.initEditProfile(
    profile.FirstName,
    profile.LastName,
    profile.DateOfBirth,
    profile.Mobile,
    profile.Email,
    profile.AvatarUrl,
  ));
}

function* clearProfile() {
  yield put(actions.clearProfile());
}

function* resetEditProfileSaga() {
  yield* takeEvery(editProfileActionTypes.clearEditProfile, resetEditProfile);
}

function* clearProfileSaga() {
  yield* takeEvery(loginActionTypes.logout, clearProfile);
}

function* getProfileSaga() {
  yield* takeEvery(loginActionTypes.loginSuccess, getProfile);
}

export {
  getProfileSaga,
  clearProfileSaga,
  resetEditProfileSaga,
};
