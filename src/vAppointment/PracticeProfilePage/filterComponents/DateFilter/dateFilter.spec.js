import React from "react";
import chai, { expect } from "chai";
import dirtyChai from "dirty-chai";
import { shallow } from "enzyme";
import moment from "moment";

chai.use(dirtyChai);

import DateFilter, { getNumDisplayMonths } from "./index";

describe("Testing Component: DateFilter", () => {
  let dateFilter;
  let toggleOptionsSpy;
  let handleOptionClickSpy;
  let handleDateClickSpy;
  let props;
  let instance;

  beforeEach(() => {
    props = {
      maxDays: 10,
      setMainDay: sinon.spy(),
    };
    dateFilter = shallow(<DateFilter {...props} />);
    instance = dateFilter.instance()
    toggleOptionsSpy = sinon.spy(instance, 'toggleOptions')
    handleOptionClickSpy = sinon.spy(instance, 'handleOptionClick')
    handleDateClickSpy = sinon.spy(instance, 'handleDateClick')

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
      instance.handleOptionClick("option")
      sinon.assert.calledOnce(toggleOptionsSpy)
    })
    it("should set currentFilter in state to 'Next three days' if that is passed in", () => {
      instance.handleOptionClick("Next three days")
      expect(instance.state.currentFilter).to.equal("Next three days")
    })
    it("should run setMainDay fn if 'Next three days' is passed in", () => {
      instance.handleOptionClick("Next three days")
      sinon.assert.calledOnce(props.setMainDay)
    })
  })
  describe("Method - handleDateClick", () => {
    it("should run toggleOptions method", () => {
      instance.handleDateClick(moment())
      sinon.assert.calledOnce(toggleOptionsSpy)
    })
    it("should set currentFilter in state to date that is passed in", () => {
      instance.handleDateClick(moment())
      expect(instance.state.currentFilter).to.equal(moment().format("MMMM YYYY"))
    })
  })
});

describe("Function: getNumDisplayMonths", () => {
  it("should subtract arg1 from arg2 if arg1 is less or equal, and return value plus 1", () => {
    let value = getNumDisplayMonths(1, 3)
    expect(value).to.equal(3)
    value = getNumDisplayMonths(4, 8)
    expect(value).to.equal(5)
  })
  it("should subtract arg1 from 13 if arg1 is more than arg2, and return value plus arg2", () => {
    let value = getNumDisplayMonths(3, 1)
    expect(value).to.equal(11)
    value = getNumDisplayMonths(8, 4)
    expect(value).to.equal(9)
  })
});
