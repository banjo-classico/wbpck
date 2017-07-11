const actionTypes = {
  setScrollPosition: "SET_APP_CONTENT_SCROLL_POSITION",
  clearScrollPosition: "CLEAR_APP_CONTENT_SCROLL_POSITION",
  setTrackScrollPosition: "SET_TRACK_APP_CONTENT_SCROLL_POSITION",
};

const actions = {
  setScrollPosition: scrollTop => ({
    type: actionTypes.setScrollPosition,
    payload: {
      scrollTop,
    },
  }),
  setTrackScrollPosition: shouldTrack => ({
    type: actionTypes.setTrackScrollPosition,
    payload: {
      shouldTrack,
    },
  }),
  clearScrollPosition: () => ({
    type: actionTypes.clearScrollPosition,
  }),
};

export {
  actions,
  actionTypes,
};
