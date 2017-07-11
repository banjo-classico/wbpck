import { actionTypes } from "../actions/pageActions";

const INITIAL_STATE = {
  shouldClearStateOnMount: true,
  onTimeSelectedFn: null,
  dateTimePickerIsShowing: false,
};

const PracticeBookingPageReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case actionTypes.setClearStateOnMount: {
      return {
        ...state,
        shouldClearStateOnMount: action.payload.shouldClearStateOnMount,
      };
    }
    case actionTypes.setOnTimeSelectedFn: {
      return {
        ...state,
        onTimeSelectedFn: action.payload.onTimeSelectedFn,
      };
    }
    case actionTypes.clearState: {
      return INITIAL_STATE;
    }
    case actionTypes.setDateTimePickerIsShowing: {
      return {
        ...state,
        dateTimePickerIsShowing: action.payload.dateTimePickerIsShowing,
      };
    }
    default: {
      return state;
    }
  }
};

export default PracticeBookingPageReducer;
