import { call, put, select } from "redux-saga/effects";
import { takeEvery } from "redux-saga";

import { actions as profileActions } from "../../MainShell/actions/profileActions";
import { actions, actionTypes } from "../actions/actions";
import { GenericParserHttp } from "../../../libs/Http";
import { getToken } from "../../../selectors/loginSelectors";
import { toServerFormat } from "../../../libs/Dates";

const api = (FirstName, LastName, DateOfBirth, Mobile, token) =>
  GenericParserHttp.post(
    "consumer/profile",
    { data: { FirstName, LastName, DateOfBirth, Mobile }, token }
  ).then(({ body }) => body);

const avatarApi = (file, token) =>
  GenericParserHttp.postImage("consumer/avatar", { file, token })
    .then(({ body }) => body);

function* changeProfile({ payload: { firstname, lastname, dateOfBirth, mobile } }) {
  try {
    const token = yield select(getToken);
    yield call(api, firstname, lastname, toServerFormat(dateOfBirth), mobile, token);
    yield put(actions.changeProfileSuccess());
    yield put(profileActions.getProfile(token));
    yield put(profileActions.profileUpdated(firstname, lastname, dateOfBirth, mobile));
  } catch (err) {
    yield put(actions.changeProfileFailure(err));
  }
}

function* addAvatar({ payload: { file, token } }) {
  try {
    yield call(avatarApi, file, token);
    yield put(actions.addAvatarSuccess());
    yield put(profileActions.getProfile(token));
  } catch (err) {
    yield put(actions.addAvatarFailure(err));
  }
}

function* editProfileSaga() {
  yield* takeEvery(actionTypes.changeProfile, changeProfile);
}
function* addAvatarSaga() {
  yield* takeEvery(actionTypes.addAvatar, addAvatar);
}

export {
  editProfileSaga,
  addAvatarSaga,
};
