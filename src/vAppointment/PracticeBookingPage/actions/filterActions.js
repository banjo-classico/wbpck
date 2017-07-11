const filterTypes = {
  morning: "MORNING",
  afternoon: "AFTERNOON",
  evening: "EVENING",
};

const actionTypes = {
  filterMorning: "FILTER_PRACTICE_BOOKINGS_MORNING",
  filterAfternoon: "FILTER_PRACTICE_BOOKINGS_AFTERNOON",
  filterEvening: "FILTER_PRACTICE_BOOKINGS_EVENING",
  clearFilter: "CLEAR_FILTER_PRACTICE_BOOKINGS",
};

const filterMorning = () => ({
  type: actionTypes.filterMorning,
});

const filterAfternoon = () => ({
  type: actionTypes.filterAfternoon,
});

const filterEvening = () => ({
  type: actionTypes.filterEvening,
});

const clearFilter = () => ({
  type: actionTypes.clearFilter,
});

const actions = {
  filterMorning,
  filterAfternoon,
  filterEvening,
  clearFilter,
};

export {
  actions,
  actionTypes,
  filterTypes,
};
