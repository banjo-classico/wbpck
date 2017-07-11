const actionTypes = {
  addMessageToState: "ADD_MESSAGE_TO_SUPPORT_STATE",
  sendMessageToSupport: "SEND_MESSAGE_TO_SUPPORT",
  sendMessageToSupportSuccess: "SEND_MESSAGE_TO_SUPPORT_SUCCESS",
  sendMessageToSupportFailure: "SEND_MESSAGE_TO_SUPPORT_FAILURE",
  clearSupport: "CLEAR_SUPPORT_STATE",
};

const addMessageToState = (message) => ({
  type: actionTypes.addMessageToState,
  payload: { message },
});
const sendMessageToSupport = (message, id, name, email) => ({
  type: actionTypes.sendMessageToSupport,
  payload: { message, id, name, email },
});
const sendMessageToSupportSuccess = () => ({
  type: actionTypes.sendMessageToSupportSuccess,
});
const sendMessageToSupportFailure = error => ({
  type: actionTypes.sendMessageToSupportFailure,
  error: true,
  payload: {
    error,
  },
});
const clearSupport = () => ({
  type: actionTypes.clearSupport,
});

const actions = {
  addMessageToState,
  sendMessageToSupport,
  sendMessageToSupportSuccess,
  sendMessageToSupportFailure,
  clearSupport,
};

export {
  actions,
  actionTypes,
};
