import React from "react";
import { Route, IndexRedirect, Redirect } from "react-router";
import { map } from "lodash/fp";

import { vScriptRoutes } from "./routes-vScript";
import App from "./App";
import AccountVerificationPage from "./ConsumerInterface/AccountVerificationPage";
import AddDependantPage from "./ConsumerInterface/AddDependantPage";
import AutoRegisterPage from "./AutoRegisterPage";
import BookingUnavailablePage from "./vAppointment/BookingUnavailablePage";
import CheckoutPage from "./vAppointment/CheckoutPage";
import DeactivateAccountPage from "./ConsumerInterface/DeactivateAccountPage";
import DependantsPage from "./ConsumerInterface/DependantsPage";
import DoctorProfilePage from "./vAppointment/DoctorProfilePage";
import EditProfilePage from "./ConsumerInterface/EditProfilePage";
import EntryPage from "./ConsumerInterface/EntryPage";
import FeelingPage from "./vAppointment/FeelingPage";
import GuestBookingErrorPage from "./vAppointment/GuestBookingErrorPage";
import MainShell from "./ConsumerInterface/MainShell";
import MessagesPage from "./ConsumerInterface/MessagesPage";
import GuardianshipPage from "./vAppointment/GuardianshipPage";
import LoginTriage from "./vAppointment/LoginTriage";
import PatientDetailsPage from "./vAppointment/PatientDetailsPage";
// eslint-disable-next-line max-len
import RequestNewPasswordPageWrapper from "./vAppointment/RequestNewPasswordPage/components/DesktopWrapper";
import RequestNewPasswordPage from "./vAppointment/RequestNewPasswordPage";
import PasswordChangePage from "./ConsumerInterface/PasswordChangePage";
import PracticeBookingPage from "./vAppointment/PracticeBookingPage";
import PracticeListings from "./ConsumerInterface/PracticeListings";
import RegisterPage from "./ConsumerInterface/RegisterPage";
import PracticeProfilePage from "./vAppointment/PracticeProfilePage";
import PracticePreviewPage from "./ConsumerInterface/PracticePreviewPage";
import PatientSelectionPage from "./vAppointment/PatientSelectionPage";
import SetNewPasswordPage from "./SetNewPasswordPage";
import SignInPage from "./vAppointment/SignInPage";
import SmsFailurePage from "./vAppointment/SmsFailurePage";
import SupportPage from "./ConsumerInterface/SupportPage";
import SupportPageTwo from "./SupportPageTwo";
import AddNewPracticePage from "./ConsumerInterface/AddNewPracticePage";
import { AppointmentConfirmationCodePage } from "./vAppointment/ConfirmationCodePage/connect";
import {
  AutoRegisterPageCheck,
  BookingUnavailablePageCheck,
  ConfirmCodeCheck,
  FeelingCheck,
  GuestBookingErrorCheck,
  IsLoggedInCheck,
  LoginPageCheck,
  PatientDetailsCheck,
  PatientSelectionCheck,
  PracticeBookingPageCheck,
  RegisterPageCheck,
  SignInPageCheck,
  SubmitCheck,
  SupportPageTwoCheck,
} from "./components/pageEntryCheckers";
import { actions as practiceActions } from "./vAppointment/PracticeBookingPage/actions/actions";

import { isDesktop } from "./config";

const ProtectedAddDependantPage = () => (
  <IsLoggedInCheck><AddDependantPage /></IsLoggedInCheck>
);
const ProtectedAppointmentConfirmationCodePage = () => (
  <ConfirmCodeCheck><AppointmentConfirmationCodePage /></ConfirmCodeCheck>
);
const ProtectedAutoRegisterPage = () =>
  <AutoRegisterPageCheck><AutoRegisterPage /></AutoRegisterPageCheck>;
const ProtectedBookingUnavailablePage = () => (
  <BookingUnavailablePageCheck><BookingUnavailablePage /></BookingUnavailablePageCheck>
);
const ProtectedCheckoutPage = () => <SubmitCheck><CheckoutPage /></SubmitCheck>;
const ProtectedPatientDetailsPage = () => (
  <PatientDetailsCheck><PatientDetailsPage /></PatientDetailsCheck>
);
const ProtectedDeactivateAccountPage = () => (
  <IsLoggedInCheck><DeactivateAccountPage /></IsLoggedInCheck>
);
const ProtectedDependantsPage = () => (
  <IsLoggedInCheck><DependantsPage /></IsLoggedInCheck>
);
const ProtectedGuardianshipPage = () => (
  <PatientDetailsCheck><GuardianshipPage /></PatientDetailsCheck>
);
const ProtectedPatientSelectionPage = () => (
  <PatientSelectionCheck><PatientSelectionPage /></PatientSelectionCheck>
);
const ProtectedEditProfilePage = () => <IsLoggedInCheck><EditProfilePage /></IsLoggedInCheck>;
const ProtectedEntryPage = (props) => <LoginPageCheck><EntryPage {...props} /></LoginPageCheck>;
const ProtectedFeelingPage = () => <FeelingCheck><FeelingPage /></FeelingCheck>;
const ProtectedGuestBookingErrorPage = () =>
  <GuestBookingErrorCheck><GuestBookingErrorPage /></GuestBookingErrorCheck>;
const ProtectedMainShell = () => <IsLoggedInCheck><MainShell /></IsLoggedInCheck>;
const ProtectedMessagesPage = () => <IsLoggedInCheck><MessagesPage /></IsLoggedInCheck>;
const ProtectedPasswordChangePage = () =>
  <IsLoggedInCheck><PasswordChangePage /></IsLoggedInCheck>;
const ProtectedPracticeBookingPage = props =>
  <PracticeBookingPageCheck><PracticeBookingPage {...props} /></PracticeBookingPageCheck>;
const ProtectedPracticeListings = () => <IsLoggedInCheck><PracticeListings /></IsLoggedInCheck>;
const ProtectedAccountVerificationPage = () => (
  <IsLoggedInCheck><AccountVerificationPage /></IsLoggedInCheck>
);
const ProtectedAddNewPracticePage = () =>
  <IsLoggedInCheck><AddNewPracticePage /></IsLoggedInCheck>;
const ProtectedRegisterPage = () => <RegisterPageCheck><RegisterPage /></RegisterPageCheck>;
const ProtectedSignInPage = () => <SignInPageCheck><SignInPage /></SignInPageCheck>;
const ProtectedLoginTriage = () => <SignInPageCheck><LoginTriage /></SignInPageCheck>;
const ProtectedSmsFailurePage = () => <ConfirmCodeCheck><SmsFailurePage /></ConfirmCodeCheck>;
const ProtectedSupportPageTwo = () => <SupportPageTwoCheck><SupportPageTwo /></SupportPageTwoCheck>;

const clearPracticeInfo = (store) => () => store.dispatch(practiceActions.clearFetchPracticeInfo());

const routeConfig = {
  ...vScriptRoutes,
  accountVerification: {
    component: ProtectedAccountVerificationPage,
    routerPath: "/accountverification",
    getBrowserPath: () => "/accountverification",
  },
  addDependant: {
    component: ProtectedAddDependantPage,
    routerPath: "/adddependant",
    getBrowserPath: () => "/adddependant",
  },
  addPractice: {
    component: ProtectedAddNewPracticePage,
    routerPath: "/addpractice",
    getBrowserPath: () => "/addpractice",
  },
  bookingUnavailable: {
    component: ProtectedBookingUnavailablePage,
    routerPath: "/bookingunavailable",
    getBrowserPath: () => "/bookingunavailable",
  },
  checkout: {
    component: ProtectedCheckoutPage,
    routerPath: "/checkout",
    getBrowserPath: () => "/checkout",
  },
  confirmAppointmentCode: {
    component: ProtectedAppointmentConfirmationCodePage,
    routerPath: "/confirmcode",
    getBrowserPath: () => "/confirmcode",
  },
  deactivateAccount: {
    component: ProtectedDeactivateAccountPage,
    routerPath: "/deactivateaccount",
    getBrowserPath: () => "/deactivateaccount",
  },
  dependants: {
    component: ProtectedDependantsPage,
    routerPath: "/dependants",
    getBrowserPath: () => "/dependants",
  },
  doctorProfile: {
    component: DoctorProfilePage,
    routerPath: "/practiceprofile/:orgid/doctorprofile/:id",
    getBrowserPath: (orgid, doctorid) => `/practiceprofile/${orgid}/doctorprofile/${doctorid}`,
  },
  editProfile: {
    component: ProtectedEditProfilePage,
    routerPath: "/editprofile",
    getBrowserPath: () => "/editprofile",
  },
  guardianship: {
    component: ProtectedGuardianshipPage,
    routerPath: "/patientdetails/minor",
    getBrowserPath: () => "/patientdetails/minor",
  },
  guestBookingError: {
    component: ProtectedGuestBookingErrorPage,
    routerPath: "/guestbookingerror",
    getBrowserPath: () => "/guestbookingerror",
  },
  guestRegister: {
    component: ProtectedAutoRegisterPage,
    routerPath: "/guestregister",
    getBrowserPath: () => "/guestregister",
  },
  home: {
    component: ProtectedMainShell,
    routerPath: "/home",
    getBrowserPath: () => "/home",
  },
  login: {
    component: ProtectedEntryPage,
    routerPath: "/login",
    getBrowserPath: () => "/login",
  },
  loginTriage: {
    component: ProtectedLoginTriage,
    routerPath: "/guestorlogin",
    getBrowserPath: () => "/guestorlogin",
  },
  messages: {
    component: ProtectedMessagesPage,
    routerPath: "/messages",
    getBrowserPath: () => "/messages",
  },
  passwordChange: {
    component: ProtectedPasswordChangePage,
    routerPath: "/passwordchange",
    getBrowserPath: () => "/passwordchange",
  },
  passwordReset: {
    component: isDesktop() ? RequestNewPasswordPageWrapper : RequestNewPasswordPage,
    routerPath: "/passwordreset",
    getBrowserPath: () => "/passwordreset",
  },
  patientDetails: {
    component: ProtectedPatientDetailsPage,
    routerPath: "/patientdetails",
    getBrowserPath: () => "/patientdetails",
  },
  practiceBooking: {
    component: ProtectedPracticeBookingPage,
    routerPath: "/practicebooking/:id",
    getBrowserPath: (id) => `/practicebooking/${id}`,
    onEnter: clearPracticeInfo,
  },
  practiceProfile: {
    component: PracticeProfilePage,
    routerPath: "/practiceprofile/:id",
    getBrowserPath: (id) => `/practiceprofile/${id}`,
  },
  practicePreview: {
    component: PracticePreviewPage,
    routerPath: "/practicepreview/:id",
    getBrowserPath: (id) => `/practicepreview/${id}`,
  },
  practiceListings: {
    component: ProtectedPracticeListings,
    routerPath: "/practicelistings",
    getBrowserPath: () => "/practicelistings",
  },
  patientSelection: {
    component: ProtectedPatientSelectionPage,
    routerPath: "/patientselection",
    getBrowserPath: () => "/patientselection",
  },
  reasonForVisit: {
    component: ProtectedFeelingPage,
    routerPath: "/reasonforvisit",
    getBrowserPath: () => "/reasonforvisit",
  },
  register: {
    component: ProtectedRegisterPage,
    routerPath: "/register",
    getBrowserPath: () => "/register",
  },
  setNewPassword: {
    component: SetNewPasswordPage,
    routerPath: "/setnewpassword/:token",
    getBrowserPath: (token) => `/setnewpassword/${token}`,
  },
  signIn: {
    component: ProtectedSignInPage,
    routerPath: "/signin",
    getBrowserPath: () => "/signin",
  },
  smsIntercept: {
    component: ProtectedSmsFailurePage,
    routerPath: "/smsintercept",
    getBrowserPath: () => "/smsintercept",
  },
  support: {
    component: SupportPage,
    routerPath: "/support",
    getBrowserPath: () => "/support",
  },
  supportGuest: {
    component: ProtectedSupportPageTwo,
    routerPath: "/support/details",
    getBrowserPath: () => "/support/details",
  },
};

const routes = (store) => (
  <Route component={App}>
    <Route path="/">
      <IndexRedirect to={routeConfig.home.getBrowserPath()} />
      {
        map(({ component, routerPath, onEnter }) =>
          <Route
            path={routerPath}
            onEnter={onEnter && onEnter(store)}
            component={component}
            key={routerPath}
          />, routeConfig)
      }
      <Redirect from="*" to={routeConfig.home.getBrowserPath()} />
    </Route>
  </Route>
);

export default routes;
export {
  routeConfig,
};
