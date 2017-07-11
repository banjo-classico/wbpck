import { actionTypes } from "../actions/actions";

const INITIAL_STATE = {
  showCta: true,
};

const dependantsCTAReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case actionTypes.toggleCta: {
      return {
        showCta: !state.showCta,
      };
    }
    case actionTypes.showCta: {
      return {
        showCta: true,
      };
    }
    case actionTypes.hideCta: {
      return {
        showCta: false,
      };
    }
    default: {
      return state;
    }
  }
};

export default dependantsCTAReducer;
