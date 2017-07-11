import {
  fetchConnectedPracticesSaga,
  fetchAllPracticesSaga,
} from "./RequestScript/sagas/fetchScriptPractices";
import { getMatchingPracticesSaga } from "./RequestScript/sagas/fuzzySearch";
import { fetchDoctorsSaga } from "./RequestScript/sagas/fetchDoctors";
import {
  getCurrentRequestsSaga,
  getPastRequestsSaga,
} from "./RequestScript/sagas/getScripts";
import { getScriptDetailsSaga } from "./RequestScript/sagas/getScriptDetails";
import { getPickUpOptionsSaga } from "./PickUpSelection/sagas/getPickUpOptions";
import { addPharmacySaga } from "./AddPharmacy/sagas/addPharmacy";

const vScriptSagas = [].concat(
  fetchAllPracticesSaga,
  fetchConnectedPracticesSaga,
  fetchDoctorsSaga,
  getCurrentRequestsSaga,
  getMatchingPracticesSaga,
  getPastRequestsSaga,
  getPickUpOptionsSaga,
  addPharmacySaga,
  getScriptDetailsSaga,
);

export {
  vScriptSagas,
};
