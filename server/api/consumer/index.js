import appointment from "./appointment";
import check from "./password/check";
import confirmedAppointments from "./confirmedAppointments";
import dependants from "./dependants";
import doctor from "./practices/doctor";
import feed from "./feed";
import organisation from "./appointment/organisation";
import organisationList from "./appointment/organisationList";
import pastAppointments from "./pastAppointments";
import practices from "./practices/practices";
import profile from "./profile/profile";
import profiles from "./practices/profiles";
import registerUser from "./register/register";
import appointmentRange from "./appointmentRange";
import connectedPractices from "./script/connectedPractices";
import allPractices from "./script/allPractices";
import getDoctors from "./script/doctors";
import pickUpOptions from "./script/pickUpOptions";
import currentRequests from "./script/currentRequests";
import pastRequests from "./script/pastRequests";
import getScriptDetails from "./script/scriptDetails";

const consumer = {
  appointment: {
    appointment,
    appointmentRange,
    organisation,
    organisationList,
  },
  confirmedAppointments,
  feed,
  dependants,
  pastAppointments,
  profile,
  registerUser,
  practices: {
    practices,
    doctor,
    profiles,
  },
  password: {
    check,
  },
  script: {
    connectedPractices,
    currentRequests,
    allPractices,
    getDoctors,
    getScriptDetails,
    pastRequests,
    pickUpOptions,
  },
};

export default consumer;
