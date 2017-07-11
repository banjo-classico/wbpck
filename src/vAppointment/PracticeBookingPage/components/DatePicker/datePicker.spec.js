import React from "react";
import chai, { expect } from "chai";
import dirtyChai from "dirty-chai";
import { shallow, mount } from "enzyme";
import moment from "moment";

chai.use(dirtyChai);

import {DatePicker} from "./index";

describe("Testing Component: DatePicker", () => {
  let datePicker;
  let instance;
  let baseProps;

  beforeEach(() => {
    baseProps = {
      selectedDate: moment(),
      maxDays: 30,
      selectDay: () => {},
      practiceId: "someString",
      currentFilter: "morning",
      hasMorningAppointments: true,
      hasAfternoonAppointments: true,
      hasEveningAppointments: false,
      filterMorning: () => {},
      filterAfternoon: () => {},
      filterEvening: () => {},
      onMorningClick: () => {},
      onAfterNoonClick: () => {},
      onEveningClick: () => {},

    }
  })

  describe("Method - toggleShown", () => {
    let scrollToSpy;
    beforeEach(() => {
      scrollToSpy = sinon.stub()
      datePicker = shallow(<DatePicker {...baseProps} />);
      instance = datePicker.instance()
      instance.calendar = {scrollTo: scrollToSpy}
      datePicker.setState({shown: false})
    })
    it("should toggle the shown state", () => {
      instance.toggleShown()
      expect(instance.state.shown).to.be.true()
      instance.toggleShown()
      expect(instance.state.shown).to.be.false()
    })
    it("should run the scrollTo function when state of shown is false", () => {
      instance.toggleShown()
      sinon.assert.notCalled(scrollToSpy)
      instance.toggleShown()
      sinon.assert.calledOnce(scrollToSpy)
    })
  })
  describe("Method - selectDate", () => {
    let onClickSpy;
    let scrollToSpy;
    beforeEach(() => {
      datePicker = shallow(<DatePicker {...baseProps} />);
      instance = datePicker.instance()
      scrollToSpy = sinon.stub()
      onClickSpy = sinon.spy(instance, "onClick")
      instance.calendar = {scrollTo: scrollToSpy}
    })
    it("should run the onClick function", () => {
      const date = moment()
      instance.selectDate(date)
      sinon.assert.calledWith(onClickSpy, date)
      sinon.assert.calledOnce(onClickSpy)
    })
    it("should set the shown state to false", () => {
      const date = moment()
      datePicker.setState({shown: true})
      instance.selectDate(date)
      expect(instance.state.shown).to.be.false()
    })
    it("should run scrollTo function", () => {
      const date = moment()
      instance.selectDate(date)
      sinon.assert.calledOnce(scrollToSpy)
    })
  })
  describe("Method - changeMonth", () => {
    let fnToRunSpy;
    beforeEach(() => {
      datePicker = shallow(<DatePicker {...baseProps} />);
      instance = datePicker.instance()
      fnToRunSpy = sinon.spy()
      datePicker.setState({fnToRun: fnToRunSpy})
    })
    it("should run the fnToRun function if there are more than zero times to run", () => {
      datePicker.setState({timesToRun: 3})
      instance.changeMonth()
      sinon.assert.calledOnce(fnToRunSpy)
    })
    it("should not run the fnToRun function if timesToRun is zero", () => {
      datePicker.setState({timesToRun: 0})
      instance.changeMonth()
      sinon.assert.notCalled(fnToRunSpy)
    })
    it("should decrease the timesToRun by 1", () => {
      datePicker.setState({timesToRun: 3})
      instance.changeMonth()
      expect(instance.state.timesToRun).to.equal(2)
    })
    it("should not decrease timesToRun if it is already 0", () => {
      datePicker.setState({timesToRun: 0})
      instance.changeMonth()
      expect(instance.state.timesToRun).to.equal(0)
    })
  })
  describe("Method - onMonthChanged", () => {
    let increaseMonthSpy;
    let decreaseMonthSpy;
    let changeMonthStub;

    beforeEach(() => {
      datePicker = shallow(<DatePicker {...baseProps} />);
      instance = datePicker.instance()
      increaseMonthSpy = 1
      decreaseMonthSpy = 2
      instance.datepicker = {refs: {calendar: {refs: {instance: {increaseMonth: increaseMonthSpy, decreaseMonth: decreaseMonthSpy}}}}}
      changeMonthStub = sinon.stub(instance, "changeMonth")
    })
    it("should set numTimesRun to absolute value of parameter", () => {
      instance.onMonthChanged(-1)
      expect(instance.state.timesToRun).to.equal(1)
    })
    it("should set increase as fnToRun if month is positive", () => {
      instance.onMonthChanged(6)
      expect(instance.state.fnToRun).to.equal(increaseMonthSpy)
    })
    it("should set decrease as fnToRun if month is negative", () => {
      instance.onMonthChanged(-1)
      expect(instance.state.fnToRun).to.equal(decreaseMonthSpy)
    })
    it("should not set increase or decrease as fnToRun if 0", () => {
      instance.onMonthChanged(0)
      expect(instance.state.fnToRun).to.not.equal(increaseMonthSpy)
      expect(instance.state.fnToRun).to.not.equal(decreaseMonthSpy)
    })
    it("should run changeMonth method", () => {
      instance.onMonthChanged(2)
      sinon.assert.calledOnce(changeMonthStub)
    })
  })
  describe("Method - filterDate", () => {
    beforeEach(() => {
      datePicker = shallow(<DatePicker {...baseProps} maxDays={10}/>);
      instance = datePicker.instance()
    })
    it("should return false on any date before today", () => {
      const aDate = moment("01/01/2000", "DD/MM/YYYY")
      expect(instance.filterDate(aDate)).to.be.false()
    })
    it("should return true if date is today", () => {
      const aDate = moment()
      expect(instance.filterDate(aDate)).to.be.true()
    })
    it("should return true if date is within max number of days", () => {
      const aDate = moment().add(10, "days")
      expect(instance.filterDate(aDate)).to.be.true()
    })
    it("should return false if date is after max number of days", () => {
      const aDate = moment().add(11, "days")
      expect(instance.filterDate(aDate)).to.be.false()
    })
  })
});
