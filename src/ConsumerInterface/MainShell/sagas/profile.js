import { call, put } from "redux-saga/effects";
import { takeEvery } from "redux-saga";

import {
  actions as profileActions, actionTypes as profileActionTypes,
} from "../actions/profileActions";
import { actions as editProfileActions } from "../../EditProfilePage/actions/actions";
import { GenericParserHttp } from "../../../libs/Http";

const api = (token) => GenericParserHttp.get("consumer/profile", { token })
  .then(({ body }) => body)
  .then(profile => ({ ...profile, DateOfBirth: profile.DateOfBirth.split("T")[0] }));

function* getProfile({ payload: { token } }) {
  try {
    const profile = yield call(api, token);
    yield put(profileActions.getProfileSuccess(profile));
    yield put(editProfileActions.initEditProfile(
      profile.FirstName,
      profile.LastName,
      profile.DateOfBirth,
      profile.Mobile,
      profile.Email,
      profile.AvatarUrl,
    ));
  } catch (err) {
    yield put(profileActions.getProfileFailure(err));
  }
}

function* profileSaga() {
  yield* takeEvery(profileActionTypes.getProfile, getProfile);
}

export {
  profileSaga,
};
