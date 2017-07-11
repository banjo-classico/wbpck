import { put, select } from "redux-saga/effects";
import { takeEvery } from "redux-saga";

// eslint-disable-next-line max-len
import { actionTypes as profileActionTypes } from "../../../ConsumerInterface/MainShell/actions/profileActions";
import { actions as sessionActions } from "../actions/sessionActions";
import { actionTypes as registerActionTypes } from "../../PatientDetailsPage/actions/actions";
import { actionTypes as guardianActionTypes } from "../../GuardianshipPage/actions/actions";
import { sessionState, isBookingForSomeoneElse } from "../../../selectors/sessionSelectors";
import { getToken } from "../../../selectors/loginSelectors";

function* changePhone(action) {
  const session = yield select(sessionState([]));
  const token = yield select(getToken);
  const isBookingForOther = yield select(isBookingForSomeoneElse);
  const key = isBookingForOther ? "intiatorMobile" : "mobile";
  const sessionData = { ...session, token, [key]: action.payload.mobile };
  yield put(sessionActions.createSession(sessionData));
}

function* changePhoneSaga() {
  yield* takeEvery(
    [
      registerActionTypes.changePhone,
      profileActionTypes.changePhone,
      guardianActionTypes.changePhone,
    ],
    changePhone
  );
}

export {
  changePhoneSaga,
};
