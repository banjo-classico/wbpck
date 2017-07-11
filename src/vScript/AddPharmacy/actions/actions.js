const actionTypes = {
  addPharmacy: "SCRIPT_ADD_PHARMACY_INFO",
  addPharmacySuccess: "SCRIPT_ADD_PHARMACY_INFO_SUCCESS",
  addPharmacyFailure: "SCRIPT_ADD_PHARMACY_INFO_FAILURE",
};

const addPharmacy = (details, token) => ({
  type: actionTypes.addPharmacy,
  payload: {
    details,
    token,
  },
});
const addPharmacySuccess = () => ({
  type: actionTypes.addPharmacySuccess,
});
const addPharmacyFailure = (err) => ({
  type: actionTypes.addPharmacyFailure,
  error: true,
  payload: {
    err,
  },
});

const actions = {
  addPharmacy,
  addPharmacySuccess,
  addPharmacyFailure,
};

export {
  actions,
  actionTypes,
};
