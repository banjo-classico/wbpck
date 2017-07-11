import { call, put, race, take, fork } from "redux-saga/effects";
import { compose, map, reduce, some } from "lodash/fp";

import delay from "./Delay";

function* timeOut(timeoutMillis, timeoutActionCreator, errorActionCreator, endStateTakes) {
  try {
    const results = yield race({
      timeout: call(delay, timeoutMillis),
      ...endStateTakes,
    });
    if (results.timeout) {
      yield put(timeoutActionCreator());
    }
  } catch (err) {
    if (errorActionCreator) {
      yield put(errorActionCreator(err));
    }
  }
}

function* checkPollHanging(
  timeoutMillis,
  hangingActionCreator,
  errorActionCreator,
  endStateTakes
) {
  try {
    const results = yield race({
      isHanging: call(delay, timeoutMillis),
      ...endStateTakes,
    });
    if (results.isHanging) {
      yield put(hangingActionCreator());
    }
  } catch (err) {
    if (errorActionCreator) {
      yield put(errorActionCreator(err));
    }
  }
}

function* poll(action, pollTimeMillis, pollActionCreator, errorActionCreator) {
  try {
    yield delay(pollTimeMillis || 0);
    yield put(pollActionCreator(action));
  } catch (err) {
    if (errorActionCreator) {
      yield put(errorActionCreator(err));
    }
    return;
  }
}

const createInitialisePollGenerator = ({
  pollTimeMillis,
  pollActionCreator,
  pollRoundtripCompleteActionType,
  endStates,
  timeoutMillis,
  timeoutActionCreator,
  hangingTimeoutMillis,
  hangingActionCreator,
  errorActionCreator,
}) => function* initialisePoll(action) {
  const endStateTakes = compose(
      reduce((cur, next) => ({ ...cur, [Math.random()]: next }), {}),
      map(s => take(s)),
    )(endStates);
  if (timeoutMillis) {
    yield fork(timeOut, timeoutMillis, timeoutActionCreator, errorActionCreator, endStateTakes);
  }
  if (hangingTimeoutMillis) {
    yield fork(
        checkPollHanging,
        hangingTimeoutMillis,
        hangingActionCreator,
        errorActionCreator,
        endStateTakes
      );
  }
    // eslint-disable-next-line no-constant-condition
  while (true) {
    const results = yield race({
      keepPolling: call(poll, action, pollTimeMillis, pollActionCreator, errorActionCreator),
      ...endStateTakes,
    });
    if (some(_ => _, { ...results, keepPolling: undefined })) break;
    yield take(pollRoundtripCompleteActionType);
  }
};

const createExecutePollGenerator = ({
  pollFn,
  pollRoundtripCompleteActionCreator,
  pollFinishedActionCreator,
  pollErrorActionCreator,
  pollRoundtripGenerator,
  pollFinishedGenerator,
  pollErrorGenerator,
  checkKeepPollingFn,
  checkFinishedPollingFn,
  checkErrorPollingFn,
  errorActionCreator,
}) => function* executePoll(action) {
  try {
    const response = yield call(pollFn, action);
    if (checkKeepPollingFn(response)) {
      yield put(pollRoundtripCompleteActionCreator(response));
      if (pollRoundtripGenerator) yield* pollRoundtripGenerator(response);
    } else if (checkFinishedPollingFn(response)) {
      yield put(pollFinishedActionCreator(response));
      if (pollFinishedGenerator) yield* pollFinishedGenerator(response);
    } else if (checkErrorPollingFn(response)) {
      yield put(pollErrorActionCreator(response));
      if (pollErrorGenerator) yield* pollErrorGenerator(response);
    } else {
      yield put(errorActionCreator(response));
      if (pollErrorGenerator) yield* pollErrorGenerator(response);
    }
  } catch (err) {
    if (errorActionCreator) {
      yield put(errorActionCreator(err));
      if (pollErrorGenerator) yield* pollErrorGenerator(err);
    }
  }
};

const createPoll = ({
  pollFn,
  pollTimeMillis,
  pollActionCreator,
  pollRoundtripCompleteActionType,
  pollRoundtripCompleteActionCreator,
  pollFinishedActionCreator,
  pollErrorActionCreator,
  pollRoundtripGenerator,
  pollFinishedGenerator,
  pollErrorGenerator,
  checkKeepPollingFn,
  checkFinishedPollingFn,
  checkErrorPollingFn,
  endStates,
  timeoutMillis,
  timeoutActionCreator,
  hangingTimeoutMillis,
  hangingActionCreator,
  errorActionCreator,
}) => ({
  initialisePoll: createInitialisePollGenerator({
    pollTimeMillis,
    pollActionCreator,
    pollRoundtripCompleteActionType,
    endStates,
    timeoutMillis,
    timeoutActionCreator,
    hangingTimeoutMillis,
    hangingActionCreator,
    errorActionCreator,
  }),
  executePoll: createExecutePollGenerator({
    pollFn,
    pollRoundtripCompleteActionCreator,
    pollFinishedActionCreator,
    pollErrorActionCreator,
    pollRoundtripGenerator,
    pollFinishedGenerator,
    pollErrorGenerator,
    checkKeepPollingFn,
    checkFinishedPollingFn,
    checkErrorPollingFn,
    errorActionCreator,
  }),
});

export default createPoll;
export {
  // for testing
  timeOut,
  checkPollHanging,
  poll,
};
