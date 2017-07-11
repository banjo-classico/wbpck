import { addDependantSaga, addAvatarDependantSaga } from "./DependantsPage/sagas/addDependant";
import { cancelAppointmentSaga, ableToCancelSaga } from "./Deleter/sagas/cancelAppointment";
import { changePasswordSaga } from "./PasswordChangePage/sagas/changePassword";
import { confirmedAppointmentsSaga } from "./Appointments/sagas/confirmedAppointments";
import {
  checkPasswordSaga,
  deactivateAccountSaga,
} from "./DeactivateAccountPage/sagas/deactivateAccount";
import { feedSaga } from "./HealthFeed/sagas/feed";
import { fetchDependantsSaga } from "./DependantsPage/sagas/fetchDependants";
import { getPracteListingsSaga } from "./PracticeListings/sagas/practiceListing";
import { logoutSaga } from "./EntryPage/sagas/logout";
import { loginSaga } from "./EntryPage/sagas/login";
import { profileSaga } from "./MainShell/sagas/profile";
import { editProfileSaga, addAvatarSaga } from "./EditProfilePage/sagas/editProfile";
import {
  getProfileSaga,
  clearProfileSaga,
  resetEditProfileSaga,
} from "./MainShell/sagas/getProfile";
import {
  confirmCancellationSaga,
  requestConfirmCancelSaga,
} from "./Deleter/sagas/checkCancellation";
import { pastAppointmentsSaga } from "./Appointments/sagas/pastAppointments";
import { registerUserSaga, checkUsernameSaga } from "./RegisterPage/sagas/register";
import { resendCodeSaga } from "./RegisterPage/sagas/resendCode";
import {
  userSuccessSaga,
  confirmUserRegistrationCodeSaga,
} from "./RegisterPage/sagas/registerCodeLogin";
import { removeDependantSaga } from "./DependantsPage/sagas/removeDependant";
import { sendCodeToVerifySaga } from "./RegisterPage/sagas/sendCodeToVerify";
import { unlinkPracticeSaga } from "./PracticeListings/sagas/practiceUnlinking";
import { getPracticesSaga } from "./AddNewPracticePage/sagas/practiceSelection";
import { getMatchingPracticesSaga } from "./AddNewPracticePage/sagas/fuzzySearch.js";
import { linkPracticeSaga } from "./AddNewPracticePage/sagas/practiceLinking";
import { sendMessageToSupportSaga } from "./SupportPage/sagas/support";
import { tokenStorageSaga } from "./EntryPage/sagas/tokenStorage";

const consumerInterfaceSagas = [].concat(
  ableToCancelSaga,
  addAvatarDependantSaga,
  addAvatarSaga,
  addDependantSaga,
  cancelAppointmentSaga,
  changePasswordSaga,
  checkPasswordSaga,
  checkUsernameSaga,
  clearProfileSaga,
  confirmCancellationSaga,
  confirmedAppointmentsSaga,
  confirmUserRegistrationCodeSaga,
  deactivateAccountSaga,
  editProfileSaga,
  feedSaga,
  fetchDependantsSaga,
  getMatchingPracticesSaga,
  getPracteListingsSaga,
  unlinkPracticeSaga,
  getPracticesSaga,
  getProfileSaga,
  linkPracticeSaga,
  loginSaga,
  logoutSaga,
  pastAppointmentsSaga,
  profileSaga,
  registerUserSaga,
  requestConfirmCancelSaga,
  removeDependantSaga,
  resendCodeSaga,
  resetEditProfileSaga,
  sendCodeToVerifySaga,
  sendMessageToSupportSaga,
  tokenStorageSaga,
  userSuccessSaga,
);

export {
  consumerInterfaceSagas,
};
