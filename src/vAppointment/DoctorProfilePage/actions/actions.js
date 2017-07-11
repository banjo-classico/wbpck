const actionTypes = {
  fetchDoctorProfile: "DOCTOR_PROFILE_FETCH",
  fetchDoctorProfileSuccess: "DOCTOR_PROFILE_FETCH_SUCCESS",
  fetchDoctorProfileFailure: "DOCTOR_PROFILE_FETCH_FAILURE",
};

const fetchDoctorProfile = (id) => ({
  type: actionTypes.fetchDoctorProfile,
  payload: {
    id,
  },
});
const fetchDoctorProfileSuccess = (doctor) => ({
  type: actionTypes.fetchDoctorProfileSuccess,
  payload: {
    doctor,
  },
});
const fetchDoctorProfileFailure = (error) => ({
  type: actionTypes.fetchDoctorProfileFailure,
  payload: {
    error,
  },
});

const actions = {
  fetchDoctorProfile,
  fetchDoctorProfileSuccess,
  fetchDoctorProfileFailure,
};

export {
  actions,
  actionTypes,
};
