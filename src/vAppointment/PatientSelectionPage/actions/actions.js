const actionTypes = {
  checkEnrolledPatient: "CHECK_PATIENT_IS_ENROLLED",
  enrolledPatientSuccess: "CHECK_PATIENT_IS_ENROLLED_SUCCESS",
  enrolledPatientFailure: "CHECK_PATIENT_IS_ENROLLED_FAILURE",
  clearState: "CHECK_PATIENT_IS_ENROLLED_CLEAR_STATE",
};

const actions = {
  checkEnrolledPatient: (firstName, lastName, dateOfBirth, phone, time, orgId, doctorId) => ({
    type: actionTypes.checkEnrolledPatient,
    payload: {
      firstName,
      lastName,
      dateOfBirth,
      phone,
      time,
      orgId,
      doctorId,
    },
  }),
  enrolledPatientSuccess: () => ({
    type: actionTypes.enrolledPatientSuccess,
  }),
  enrolledPatientFailure: (error) => ({
    type: actionTypes.enrolledPatientFailure,
    payload: {
      error,
    },
  }),
  clearState: () => ({
    type: actionTypes.clearState,
  }),
};

export {
  actions,
  actionTypes,
};
