const actionTypes = {
  fetchDependants: "FETCH_DEPENDANTS",
  fetchDependantsSuccess: "FETCH_DEPENDANTS_SUCCESS",
  fetchDependantsFailure: "FETCH_DEPENDANTS_FAILURE",
  clearDependants: "CLEAR_DEPENDANTS",
  toggleCta: "TOGGLE_CTA_DEPENDANTS",
  showCta: "SHOW_CTA_DEPENDANTS",
  hideCta: "HIDE_CTA_DEPENDANTS",
  addDependant: "ADD_DEPENDANT",
  addDependantSuccess: "ADD_DEPENDANT_SUCCESS",
  addDependantFailure: "ADD_DEPENDANT_FAILURE",
  removeDependant: "REMOVE_DEPENDANT",
  removeDependantSuccess: "REMOVE_DEPENDANT_SUCCESS",
  removeDependantFailure: "REMOVE_DEPENDANT_FAILURE",
  clearRemoveDependant: "REMOVE_DEPENDANT_CLEAR_STATE",
  addAvatar: "ADD_AVATAR_DEPENDANT",
  addAvatarSuccess: "ADD_AVATAR_DEPENDANT_SUCCESS",
  addAvatarFailure: "ADD_AVATAR_DEPENDANT_FAILURE",
};

const actions = {
  fetchDependants: (id) => ({
    type: actionTypes.fetchDependants,
    payload: {
      id,
    },
  }),
  fetchDependantsSuccess: (dependants) => ({
    type: actionTypes.fetchDependantsSuccess,
    payload: {
      dependants,
    },
  }),
  fetchDependantsFailure: (error) => ({
    type: actionTypes.fetchDependantsFailure,
    payload: {
      error,
    },
  }),
  clearDependants: () => ({
    type: actionTypes.clearDependants,
  }),
  toggleCta: () => ({
    type: actionTypes.toggleCta,
  }),
  showCta: () => ({
    type: actionTypes.showCta,
  }),
  hideCta: () => ({
    type: actionTypes.hideCta,
  }),
  addDependant: (dependant, token) => ({
    type: actionTypes.addDependant,
    payload: {
      dependant,
      token,
    },
  }),
  addDependantSuccess: () => ({
    type: actionTypes.addDependantSuccess,
  }),
  addDependantFailure: (error) => ({
    type: actionTypes.addDependantFailure,
    payload: {
      error,
    },
  }),
  removeDependant: (id, token) => ({
    type: actionTypes.removeDependant,
    payload: {
      id,
      token,
    },
  }),
  removeDependantSuccess: () => ({
    type: actionTypes.removeDependantSuccess,
  }),
  removeDependantFailure: (error) => ({
    type: actionTypes.removeDependantFailure,
    payload: {
      error,
    },
  }),
  clearRemoveDependant: () => ({
    type: actionTypes.clearRemoveDependant,
  }),
  addAvatar: (file, token, id) => ({
    type: actionTypes.addAvatar,
    payload: {
      file,
      token,
      id,
    },
  }),
  addAvatarSuccess: () => ({
    type: actionTypes.addAvatarSuccess,
  }),
  addAvatarFailure: (error) => ({
    type: actionTypes.addAvatarFailure,
    payload: {
      error,
    },
  }),
};
export {
  actionTypes,
  actions,
};
