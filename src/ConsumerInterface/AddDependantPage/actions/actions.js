/**
 * Created by VPaiva on 27/04/2017.
 */
const actionTypes = {
  preloadDependantData: "PRELOAD_DEPENDANT_DATA",
  clearDependantData: "CLEAR_DEPENDANT_DATA",
};

const actions = {
  preloadDependantData: (dependant) => ({
    type: actionTypes.preloadDependantData,
    payload: {
      dependant,
    },
  }),
  clearDependantData: () => ({
    type: actionTypes.clearDependantData,
  }),
};

export {
  actionTypes,
  actions,
};

