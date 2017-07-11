/**
 * Created by VPaiva on 27/04/2017.
 */
import { actionTypes } from "../actions/actions";

const INITIAL_STATE = {
  dependant: null,
};

const preLoadDependantReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case actionTypes.preloadDependantData:
      return {
        dependant: action.payload.dependant,
      };
    case actionTypes.clearDependantData:
      return INITIAL_STATE;
    default:
      return state;
  }
};

export default preLoadDependantReducer;

