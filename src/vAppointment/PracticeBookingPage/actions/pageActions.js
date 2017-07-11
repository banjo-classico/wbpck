const actionTypes = {
  setClearStateOnMount: "PRACTICE_BOOKING_SET_CLEAR_STATE_ON_MOUNT",
  setOnTimeSelectedFn: "PRACTICE_BOOKING_SET_ON_TIME_SELECTED_FN",
  clearState: "PRACTICE_BOOKING_PAGE_CLEAR_STATE",
  setDateTimePickerIsShowing: "SET_DATETIME_PICKER_IS_SHOWING",
};

const actions = {
  setClearStateOnMount: shouldClearStateOnMount => ({
    type: actionTypes.setClearStateOnMount,
    payload: {
      shouldClearStateOnMount,
    },
  }),
  setOnTimeSelectedFn: onTimeSelectedFn => ({
    type: actionTypes.setOnTimeSelectedFn,
    payload: {
      onTimeSelectedFn,
    },
  }),
  clearState: () => ({
    type: actionTypes.clearState,
  }),
  setDateTimePickerIsShowing: dateTimePickerIsShowing => ({
    type: actionTypes.setDateTimePickerIsShowing,
    payload: { dateTimePickerIsShowing },
  }),
};

export {
  actions,
  actionTypes,
};
