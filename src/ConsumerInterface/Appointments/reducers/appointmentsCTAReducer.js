import { actionTypes } from "../actions/actions";
import PlusIcon from "../../../svgs/plus.svg";

const INITIAL_STATE = {
  ctaFn: () => {},
  ctaIcon: PlusIcon,
  showCta: true,
};

const appointmentsCTAReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case actionTypes.changeCtaFn: {
      return {
        ...state,
        ctaFn: action.payload.ctaFn,
      };
    }
    case actionTypes.changeCtaIcon: {
      return {
        ...state,
        ctaIcon: action.payload.ctaIcon,
      };
    }
    case actionTypes.toggleCta: {
      return {
        ...state,
        showCta: !state.showCta,
      };
    }
    case actionTypes.clearCta: {
      return INITIAL_STATE;
    }
    default: {
      return state;
    }
  }
};

export default appointmentsCTAReducer;
