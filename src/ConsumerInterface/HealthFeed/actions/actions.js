const actionTypes = {
  getFeed: "GET_FEED",
  getFeedSuccess: "GET_FEED_SUCCESS",
  getFeedFailure: "GET_FEED_FAILURE",
  clearFeed: "CLEAR_FEED",
};

const actions = {
  getFeed: (id) => ({
    type: actionTypes.getFeed,
    payload: {
      id,
    },
  }),
  getFeedSuccess: (feed) => ({
    type: actionTypes.getFeedSuccess,
    payload: {
      feed,
    },
  }),
  getFeedFailure: (error) => ({
    type: actionTypes.getFeedFailure,
    payload: {
      error,
    },
  }),
  clearFeed: () => ({
    type: actionTypes.clearFeed,
  }),
};

export {
  actions,
  actionTypes,
};
