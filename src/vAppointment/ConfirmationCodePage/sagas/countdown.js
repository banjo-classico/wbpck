import { put } from "redux-saga/effects";
import { takeEvery } from "redux-saga";

// eslint-disable-next-line max-len
import { actionTypes as profileActionTypes } from "../../../ConsumerInterface/MainShell/actions/profileActions";
import { actionTypes as codeConfirmationActionTypes } from "../actions/codeConfirmationActions";
import { actionTypes as patientDetailsActionTypes } from "../../PatientDetailsPage/actions/actions";
import { actionTypes as guardianActionTypes } from "../../GuardianshipPage/actions/actions";
import {
  actionTypes as registerActionTypes,
} from "../../../ConsumerInterface/RegisterPage/actions/registerUserCodeActions";
import { actions } from "../actions/countdownActions";

function* setCountdownTimer() {
  try {
    yield put(actions.setCountdownTimer());
    // eslint-disable-next-line no-empty
  } catch (err) {
  }
}

function* countdownSaga() {
  yield* takeEvery([
    codeConfirmationActionTypes.sendToConfirm,
    patientDetailsActionTypes.changePhone,
    registerActionTypes.sendCodeToVerify,
    profileActionTypes.changePhone,
    guardianActionTypes.changePhone,
  ], setCountdownTimer);
}

export {
  countdownSaga,
};
