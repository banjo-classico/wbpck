import React from "react";
import chai, { expect } from "chai";
import dirtyChai from "dirty-chai";
import { shallow } from "enzyme";

chai.use(dirtyChai);

import Countdown from "./index";

describe("Testing Component: Countdown", () => {
  let countdown;
  let instance;
  let clock;

  before(() => {
    clock = sinon.useFakeTimers()
  })
  after(() => {
    clock.restore()
  })

  describe("On - Init", () => {
    it("should set interval to 1000 if none provided", () => {
      countdown = shallow(<Countdown milliSecondsRemaining={2000}/>);
      instance = countdown.instance()
      expect(instance.props.interval).to.equal(1000)
    });
    it("should save the interval id", () => {
      countdown = shallow(<Countdown milliSecondsRemaining={2000}/>);
      instance = countdown.instance()
      instance.componentDidMount()
      expect(instance.interval).to.not.be.undefined()
    })
    it("should run the tick method after each interval of time", () => {
      countdown = shallow(<Countdown milliSecondsRemaining={10000}/>);
      instance = countdown.instance()
      instance.componentDidMount()
      const tickSpy = sinon.spy(instance, 'tick')
      instance.componentDidMount()
      clock.tick(1000)
      sinon.assert.calledOnce(tickSpy)
      clock.tick(1000)
      sinon.assert.calledTwice(tickSpy)
      clock.tick(1000)
      expect(tickSpy.callCount).to.equal(3)
    })
    it("should run the clearInterval when no more time remains", () => {
      countdown = shallow(<Countdown milliSecondsRemaining={3000}/>);
      instance = countdown.instance()
      const tickSpy = sinon.spy(instance, 'tick')
      instance.componentDidMount()
      clock.tick(3000)
      expect(tickSpy.callCount).to.equal(3)
      clock.tick(8000)
      expect(tickSpy.callCount).to.equal(3)
    })
    it("should run the completedCallback function when no more time remains", () => {
      const completedCallbackSpy = sinon.spy()
      countdown = shallow(<Countdown milliSecondsRemaining={3000} completedCallback={completedCallbackSpy}/>);
      instance = countdown.instance()
      instance.componentDidMount()
      sinon.assert.notCalled(completedCallbackSpy)
      clock.tick(1000)
      sinon.assert.notCalled(completedCallbackSpy)
      clock.tick(2000)
      sinon.assert.calledOnce(completedCallbackSpy)
      clock.tick(3000)
      sinon.assert.calledOnce(completedCallbackSpy)
    })
    it("should decrease milliSecondsRemaining", () => {
      countdown = shallow(<Countdown milliSecondsRemaining={3000}/>);
      instance = countdown.instance()
      instance.componentDidMount()
      clock.tick(1000)
      expect(instance.state.milliSecondsRemaining).to.equal(2000)
      clock.tick(1000)
      expect(instance.state.milliSecondsRemaining).to.equal(1000)
      clock.tick(1000)
      expect(instance.state.milliSecondsRemaining).to.equal(0)
    })
    it("should only change state once every interval", () => {
      countdown = shallow(<Countdown milliSecondsRemaining={3000}/>);
      instance = countdown.instance()
      instance.componentDidMount()
      clock.tick(500)
      expect(instance.state.milliSecondsRemaining).to.equal(3000)
      clock.tick(500)
      expect(instance.state.milliSecondsRemaining).to.equal(2000)
    })
    it("should not change milliSecondsRemaining to less than zero", () => {
      countdown = shallow(<Countdown milliSecondsRemaining={3050}/>);
      instance = countdown.instance()
      instance.componentDidMount()
      clock.tick(5000)
      expect(instance.state.milliSecondsRemaining).to.equal(0)
    })
  })
});
