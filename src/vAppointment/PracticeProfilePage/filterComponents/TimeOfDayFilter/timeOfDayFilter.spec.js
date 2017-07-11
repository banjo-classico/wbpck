import React from "react";
import chai, { expect } from "chai";
import dirtyChai from "dirty-chai";
import { shallow } from "enzyme";
import moment from "moment";

chai.use(dirtyChai);

import TimeOfDayFilter, { getOptions } from "./index";

describe("Testing Component: TimeOfDayFilter", () => {
  let timeOfDayFilter;
  let toggleOptionsSpy;
  let handleOptionClickSpy;
  let props;
  let instance;

  beforeEach(() => {
    props = {
      filterMorning: sinon.spy(),
      filterAfternoon: sinon.spy(),
      filterEvening: sinon.spy(),
    };
    timeOfDayFilter = shallow(<TimeOfDayFilter {...props} />);
    instance = timeOfDayFilter.instance()
    toggleOptionsSpy = sinon.spy(instance, 'toggleOptions')
    handleOptionClickSpy = sinon.spy(instance, 'handleOptionClick')
  });
  describe("Method - toggleOptions", () => {
    it("should toggle the state of showOptions", () => {
      expect(instance.state.showOptions).to.be.false()
      instance.toggleOptions()
      expect(instance.state.showOptions).to.be.true()
    })
  })
  describe("Method - handleOptionClick", () => {
    it("should run toggleOptions method", () => {
      instance.handleOptionClick("Morning")
      sinon.assert.calledOnce(toggleOptionsSpy)
    })
    it("should set currentFilter in state to arg is passed in", () => {
      instance.handleOptionClick("Morning")
      expect(instance.state.currentFilter).to.equal("Morning")
    })
    it("should run filter prop fn with arg if it's not 'Anytime", () => {
      instance.handleOptionClick("Afternoon")
      sinon.assert.calledOnce(props.filterAfternoon)
    })
    it("should run filterMorning prop fn if arg is 'Anytime", () => {
      instance.handleOptionClick("Anytime")
      sinon.assert.calledOnce(props.filterMorning)
    })
  })
});

describe("Function: getOptions", () => {
  it("should return array of options without arg included", () => {
    let value = getOptions("Morning")
    expect(value).to.eql(["Anytime", "Afternoon", "Evening"])
    value = getOptions("Afternoon")
    expect(value).to.eql(["Anytime", "Morning", "Evening"])
  })
});
