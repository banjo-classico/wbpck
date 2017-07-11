import { call, fork, race, take, put, select } from "redux-saga/effects";
import chai, { expect } from "chai";
import dirtyChai from "dirty-chai";
import createPoll, { timeOut, checkPollHanging, poll } from "./Polling"
import { findIndex, forEach } from "lodash/fp";
import delay from "./Delay";

chai.use(dirtyChai);

describe("Function: createPoll", () => {
  it("should return an object with two generator functions", () => {
    expect(createPoll({}).initialisePoll).to.be.ok()
    expect(createPoll({}).executePoll).to.be.ok()
  })
})

describe("Generator: initialisePoll", () => {
  let pollRoundtripCompleteActionType;
  let endStates;
  let timeoutMillis;
  let hangingTimeoutMillis;
  let initialisePoll;
  beforeEach(() => {
    timeoutMillis = 500;
    hangingTimeoutMillis = 400;
    endStates = ["firstString", "secondString"];
    pollRoundtripCompleteActionType = "SOME_STRING";
  })
  it("should fork timeOut if we have timeoutMillis", () => {
    initialisePoll = createPoll({timeoutMillis}).initialisePoll
    const generator = initialisePoll()
    const timeOutFork = generator.next().value.FORK
    expect(timeOutFork.fn).to.equal(timeOut)
  })
  it("should not fork timeOut if we don't have timeoutMillis", () => {
    initialisePoll = createPoll({}).initialisePoll
    const generator = initialisePoll()
    const timeOutFork = generator.next().value.FORK
    expect(timeOutFork).to.be.undefined()
  })
  it("should fork checkPollHanging if we have hangingTimeoutMillis", () => {
    initialisePoll = createPoll({hangingTimeoutMillis}).initialisePoll
    const generator = initialisePoll()
    const checkHangingFork = generator.next().value.FORK
    expect(checkHangingFork.fn).to.equal(checkPollHanging)
  })
  it("should not fork checkPollHanging if we don't have hangingTimeoutMillis", () => {
    initialisePoll = createPoll({}).initialisePoll
    const generator = initialisePoll()
    const checkHangingFork = generator.next().value.FORK
    expect(checkHangingFork).to.be.undefined()
  })
  it("should fork timeOut and checkPollHanging if we have timeoutMillis and hangingTimeoutMillis", () => {
    initialisePoll = createPoll({timeoutMillis, hangingTimeoutMillis}).initialisePoll
    const generator = initialisePoll()
    const timeOutFork = generator.next().value.FORK
    const checkHangingFork = generator.next().value.FORK
    expect(timeOutFork.fn).to.equal(timeOut)
    expect(checkHangingFork.fn).to.equal(checkPollHanging)
  })
  it("should run a race after the forks", () => {
    initialisePoll = createPoll({timeoutMillis, hangingTimeoutMillis}).initialisePoll
    const generator = initialisePoll()
    generator.next()
    generator.next()
    const next = generator.next()
    expect(next.value.RACE).to.be.ok();
  })
  it("should call the poll fn during race", () => {
    initialisePoll = createPoll({timeoutMillis, hangingTimeoutMillis}).initialisePoll
    const generator = initialisePoll()
    generator.next()
    generator.next()
    const next = generator.next()
    const calledFn = next.value.RACE.keepPolling.CALL.fn
    expect(calledFn).to.equal(poll);
  })
  it("should take each endState in race", () => {
    initialisePoll = createPoll({timeoutMillis, hangingTimeoutMillis, endStates}).initialisePoll
    const generator = initialisePoll()
    generator.next()
    generator.next()
    const next = generator.next()
    const raceObj = next.value.RACE
    delete raceObj.keepPolling
    forEach(i => {
      expect(findIndex(p => p === i.TAKE.pattern, endStates)).to.not.equal(-1)
    }, raceObj)
  })
  it("should finish if one of endStates wins race", () => {
    initialisePoll = createPoll({timeoutMillis, hangingTimeoutMillis, endStates}).initialisePoll
    const generator = initialisePoll()
    generator.next()
    generator.next()
    generator.next()
    const next = generator.next({keepPolling: undefined, otherKey: endStates[0]})
    expect(next.done).to.be.true()
  })
  it("should take pollRoundtripCompleteActionType if keepPolling wins race", () => {
    initialisePoll = createPoll({timeoutMillis, hangingTimeoutMillis, endStates, pollRoundtripCompleteActionType}).initialisePoll
    const generator = initialisePoll()
    generator.next()
    generator.next()
    generator.next()
    const next = generator.next({})
    expect(next.value.TAKE.pattern).to.equal(pollRoundtripCompleteActionType)
  })
  it("should keep racing until one of endStates wins race", () => {
    initialisePoll = createPoll({timeoutMillis, hangingTimeoutMillis, endStates, pollRoundtripCompleteActionType}).initialisePoll
    let next;
    const generator = initialisePoll()
    generator.next()
    generator.next()
    generator.next()
    next = generator.next({})
    expect(next.done).to.be.false()
    next = generator.next()
    expect(next.value.RACE).to.be.ok()
    next = generator.next({})
    expect(next.done).to.be.false()
    next = generator.next()
    expect(next.value.RACE).to.be.ok()
    next = generator.next({someKey: endStates[1]})
    expect(next.done).to.be.true()
  })
})

describe("Generator: executePoll", () => {
  let pollFn;
  let pollRoundtripCompleteActionCreator;
  let pollFinishedActionCreator;
  let pollErrorActionCreator;
  let pollFinishedGenerator;
  let pollErrorGenerator;
  let pollRoundtripGenerator;
  let checkKeepPollingFn;
  let checkFinishedPollingFn;
  let checkErrorPollingFn;
  let errorActionCreator;
  let executePoll;

  let pollRoundtripCompletedAction;
  let pollFinishedAction;
  let pollErrorAction;
  let errorAction;
  const KEEP_POLLING_RESPONSE = 2
  const FINISHED_POLLING_RESPONSE = 3
  const ERROR_POLLING_RESPONSE = -1
  const POLL_FINISHED_GENERATOR_RESPONSE = 0
  const POLL_ERROR_GENERATOR_RESPONSE = 4
  const POLL_ROUNDTRIP_GENERATOR_RESPONSE = 5

  beforeEach(() => {
    pollFn = () => {};
    checkKeepPollingFn = i => i === KEEP_POLLING_RESPONSE;
    checkFinishedPollingFn = i => i === FINISHED_POLLING_RESPONSE;
    checkErrorPollingFn = i => i === ERROR_POLLING_RESPONSE;
    pollRoundtripCompletedAction = {type: "continue"};
    pollFinishedAction = {type: "finished"};
    pollErrorAction = {type: "error"};
    errorAction = {type: "unexpectedError"};
    pollRoundtripCompleteActionCreator = () => pollRoundtripCompletedAction
    pollFinishedActionCreator = () => pollFinishedAction
    pollErrorActionCreator = () => pollErrorAction
    errorActionCreator = () => errorAction
    pollFinishedGenerator = function*() {yield POLL_FINISHED_GENERATOR_RESPONSE}
    pollErrorGenerator = function*() {yield POLL_ERROR_GENERATOR_RESPONSE}
    pollRoundtripGenerator = function*() {yield POLL_ROUNDTRIP_GENERATOR_RESPONSE}
  })

  it("should call pollFn with action", () => {
    executePoll = createPoll({pollFn}).executePoll
    const generator = executePoll(1)
    const next = generator.next()
    expect(next.value.CALL.fn).to.equal(pollFn)
    expect(next.value.CALL.args[0]).to.equal(1)
  })
  it("should put pollRoundtripCompleteActionCreator if checkKeepPollingFn returns true", () => {
    executePoll = createPoll({pollFn, checkKeepPollingFn, pollRoundtripCompleteActionCreator}).executePoll
    const generator = executePoll()
    generator.next()
    const next = generator.next(KEEP_POLLING_RESPONSE)
    expect(next.value.PUT.action).to.equal(pollRoundtripCompletedAction)
  })
  it("should put pollFinishedActionCreator if checkFinishedPollingFn returns true", () => {
    executePoll = createPoll({
      pollFn,
      checkKeepPollingFn,
      checkFinishedPollingFn,
      pollRoundtripCompleteActionCreator,
      pollFinishedActionCreator,
    }).executePoll
    const generator = executePoll()
    generator.next()
    const next = generator.next(FINISHED_POLLING_RESPONSE)
    expect(next.value.PUT.action).to.equal(pollFinishedAction)
  })
  it("should put pollErrorActionCreator if checkErrorPollingFn returns true", () => {
    executePoll = createPoll({
      pollFn,
      checkKeepPollingFn,
      checkFinishedPollingFn,
      checkErrorPollingFn,
      pollRoundtripCompleteActionCreator,
      pollFinishedActionCreator,
      pollErrorActionCreator,
    }).executePoll
    const generator = executePoll()
    generator.next()
    const next = generator.next(ERROR_POLLING_RESPONSE)
    expect(next.value.PUT.action).to.equal(pollErrorAction)
  })
  it("should put errorActionCreator if response is unexpected", () => {
    executePoll = createPoll({
      pollFn,
      checkKeepPollingFn,
      checkFinishedPollingFn,
      checkErrorPollingFn,
      pollRoundtripCompleteActionCreator,
      pollFinishedActionCreator,
      pollErrorActionCreator,
      errorActionCreator,
    }).executePoll
    const generator = executePoll()
    generator.next()
    const next = generator.next(5)
    expect(next.value.PUT.action).to.equal(errorAction)
  })
  it("should yield pollFinishedGenerator if poll is completed", () => {
    executePoll = createPoll({
      pollFn,
      checkKeepPollingFn,
      checkFinishedPollingFn,
      pollRoundtripCompleteActionCreator,
      pollFinishedActionCreator,
      pollFinishedGenerator,
    }).executePoll
    const generator = executePoll()
    generator.next()
    generator.next(FINISHED_POLLING_RESPONSE)
    const next = generator.next()
    expect(next.value).to.equal(POLL_FINISHED_GENERATOR_RESPONSE)
    expect(next.done).to.be.false()
    expect(generator.next().done).to.be.true()
  })
  it("should yield pollErrorGenerator if poll errors", () => {
    executePoll = createPoll({
      pollFn,
      checkKeepPollingFn,
      checkFinishedPollingFn,
      checkErrorPollingFn,
      pollRoundtripCompleteActionCreator,
      pollFinishedActionCreator,
      pollErrorActionCreator,
      pollErrorGenerator,
    }).executePoll
    const generator = executePoll()
    generator.next()
    generator.next(ERROR_POLLING_RESPONSE)
    const next = generator.next()
    expect(next.value).to.equal(POLL_ERROR_GENERATOR_RESPONSE)
    expect(next.done).to.be.false()
    expect(generator.next().done).to.be.true()
  })
  it("should yield pollRoundtripGenerator at end of roundtrip if provided", () => {
    executePoll = createPoll({
      pollFn,
      checkKeepPollingFn,
      checkFinishedPollingFn,
      checkErrorPollingFn,
      pollRoundtripCompleteActionCreator,
      pollFinishedActionCreator,
      pollErrorActionCreator,
      pollRoundtripGenerator,
    }).executePoll
    const generator = executePoll()
    generator.next()
    generator.next(KEEP_POLLING_RESPONSE)
    const next = generator.next()
    expect(next.value).to.equal(POLL_ROUNDTRIP_GENERATOR_RESPONSE)
    expect(next.done).to.be.false()
    expect(generator.next().done).to.be.true()
  })
  it("should finish if poll is completed and there is no pollFinishedGenerator", () => {
    executePoll = createPoll({
      pollFn,
      checkKeepPollingFn,
      checkFinishedPollingFn,
      pollRoundtripCompleteActionCreator,
      pollFinishedActionCreator,
    }).executePoll
    const generator = executePoll()
    generator.next()
    generator.next(FINISHED_POLLING_RESPONSE)
    const next = generator.next()
    expect(next.value).to.be.undefined()
    expect(next.done).to.be.true()
  })
})

describe("Generator: poll", () => {
  let action;
  let pollTimeMillis;
  let pollActionCreator;
  let pollGenerator;

  let pollAction;

  beforeEach(() => {
    action = {type: "action"};
    pollTimeMillis = 500;
    pollAction = {type: "poll"}
    pollActionCreator = () => pollAction;
  })

  it("should delay for pollTimeMillis", () => {
    pollGenerator = poll(action, pollTimeMillis)
    const next = pollGenerator.next()
    expect(next.value).to.deep.equal(delay(pollTimeMillis))
  })
  it("should delay for 0 secs if pollTimeMillis not defined", () => {
    pollGenerator = poll(action)
    const next = pollGenerator.next()
    expect(next.value).to.deep.equal(delay(0))
  })
  it("should put pollAction after delay", () => {
    pollGenerator = poll(action, pollTimeMillis, pollActionCreator)
    pollGenerator.next()
    const next = pollGenerator.next()
    expect(next.value.PUT.action).to.equal(pollAction)
  })

})

describe("Generator: checkPollHanging", () => {
  let timeoutMillis;
  let hangingActionCreator;
  let errorActionCreator;
  let endStateTakes;
  let hangingGenerator;

  const hangingAction = {type: "hangingAction"}
  const errorAction = {type: "errorAction"}

  beforeEach(() => {
    timeoutMillis = 500;
    hangingActionCreator = () => hangingAction;
    errorActionCreator = () => errorAction;
    endStateTakes = {a: take("a"), b: take("b")}
  })

  it("should race between delay and endStateTakes", () => {
    hangingGenerator = checkPollHanging(timeoutMillis, hangingActionCreator, errorActionCreator, endStateTakes)
    const next = hangingGenerator.next()
    expect(next.value.RACE.isHanging).to.deep.equal(call(delay, timeoutMillis))
    expect(next.value.RACE.a).to.deep.equal(endStateTakes.a)
    expect(next.value.RACE.b).to.deep.equal(endStateTakes.b)
  })
  it("should put hangingActionCreator if isHanging wins race", () => {
    hangingGenerator = checkPollHanging(timeoutMillis, hangingActionCreator, errorActionCreator, endStateTakes)
    hangingGenerator.next()
    const next = hangingGenerator.next({isHanging: true})
    expect(next.value.PUT.action).to.equal(hangingAction)
  })
  it("should finish if isHanging loses race", () => {
    hangingGenerator = checkPollHanging(timeoutMillis, hangingActionCreator, errorActionCreator, endStateTakes)
    hangingGenerator.next()
    const next = hangingGenerator.next({isHanging: false})
    expect(next.value).to.be.undefined()
    expect(next.done).to.be.true()
  })

})

describe("Generator: timeOut", () => {
  let timeoutMillis;
  let timeoutActionCreator;
  let errorActionCreator;
  let endStateTakes;
  let timeoutGenerator;

  const timeoutAction = {type: "timeoutAction"}

  beforeEach(() => {
    timeoutMillis = 500;
    timeoutActionCreator = () => timeoutAction;
    errorActionCreator = () => {};
    endStateTakes = {a: take("a"), b: take("b")}
  })

  it("should race between delay and endStateTakes", () => {
    timeoutGenerator = timeOut(timeoutMillis, timeoutActionCreator, errorActionCreator, endStateTakes)
    const next = timeoutGenerator.next()
    expect(next.value.RACE.timeout).to.deep.equal(call(delay, timeoutMillis))
    expect(next.value.RACE.a).to.deep.equal(endStateTakes.a)
    expect(next.value.RACE.b).to.deep.equal(endStateTakes.b)
  })
  it("should put timeoutActionCreator if timeout wins race", () => {
    timeoutGenerator = timeOut(timeoutMillis, timeoutActionCreator, errorActionCreator, endStateTakes)
    timeoutGenerator.next()
    const next = timeoutGenerator.next({timeout: true})
    expect(next.value.PUT.action).to.equal(timeoutAction)
  })
  it("should finish if timeout loses race", () => {
    timeoutGenerator = timeOut(timeoutMillis, timeoutActionCreator, errorActionCreator, endStateTakes)
    timeoutGenerator.next()
    const next = timeoutGenerator.next({timeout: false})
    expect(next.value).to.be.undefined()
    expect(next.done).to.be.true()
  })

})
