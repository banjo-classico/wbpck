import { actionTypes } from "../actions/actions";

const INITIAL_STATE = {
  isShowing: false,
};

const menuReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case actionTypes.showMenu: {
      return {
        isShowing: true,
      };
    }
    case actionTypes.hideMenu: {
      return {
        isShowing: false,
      };
    }
    case actionTypes.toggleMenu: {
      return {
        isShowing: !state.isShowing,
      };
    }
    default: {
      return state;
    }
  }
};

export default menuReducer;
