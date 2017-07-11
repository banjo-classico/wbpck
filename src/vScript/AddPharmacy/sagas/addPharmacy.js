import { call, put } from "redux-saga/effects";
import { takeEvery } from "redux-saga";
import { push } from "react-router-redux";

import { actions, actionTypes } from "../actions/actions";
import { GenericParserHttp } from "../../../libs/Http";
import { routeConfig } from "../../../routes";

const api = (details, token) =>
  GenericParserHttp.post(
    "consumer/prescription/pharmacy",
    { data: details, token }
  ).then(({ body }) => body);

function* addPharmacy({ payload: { details, token } }) {
  try {
    yield call(api, details, token);
    yield put(actions.addPharmacySuccess());
    yield put(push(routeConfig.pickUpSelection.getBrowserPath()));
  } catch (err) {
    yield put(actions.addPharmacyFailure(err));
  }
}

function* addPharmacySaga() {
  yield* takeEvery(actionTypes.addPharmacy, addPharmacy);
}

export {
  addPharmacySaga,
};
