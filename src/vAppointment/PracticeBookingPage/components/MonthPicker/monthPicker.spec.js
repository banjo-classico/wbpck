import React from "react";
import chai, { expect } from "chai";
import dirtyChai from "dirty-chai";
import { shallow, mount } from "enzyme";
import moment from "moment";

chai.use(dirtyChai);

import MonthPicker from "./index";

describe("Testing Component: MonthPicker", () => {
  let monthPicker;
  let instance;
  let baseProps;
  let onMonthChangedSpy;
  let onClickSpy;

  beforeEach(() => {
    onMonthChangedSpy = sinon.stub()
    onClickSpy = sinon.stub()
    baseProps = {
      onMonthChanged: onMonthChangedSpy,
      onClick: onClickSpy,
      isShown: false,
      selectedDate: moment("01/07/2016", "DD/MM/YYYY"),
      maxDays: 50,
    }
  })

  describe("Method - onMonthClicked", () => {
    beforeEach(() => {
      monthPicker = shallow(<MonthPicker {...baseProps} />);
      instance = monthPicker.instance()
      monthPicker.setState({currentMonth: moment("20/07/2016", "DD/MM/YYYY")})
    })
    it("should call onClick method if clicked month is same as current month ", () => {
      instance.onMonthClicked(moment("15/07/2016", "DD/MM/YYYY"))()
      sinon.assert.calledOnce(onClickSpy)
      sinon.assert.notCalled(onMonthChangedSpy)
    })
    it("should set the state of currentMonth to clicked month", () => {
      const date = moment("01/03/2016", "DD/MM/YYYY")
      instance.onMonthClicked(date)()
      expect(instance.state.currentMonth.month()).to.equal(date.month())
    })
    it("should run the onMonthChanged function with correct number of months when going back within the same year", () => {
      let date = moment("01/03/2016", "DD/MM/YYYY")
      instance.onMonthClicked(date)()
      sinon.assert.calledOnce(onMonthChangedSpy)
      sinon.assert.calledWith(onMonthChangedSpy, -4)
    })
    it("should run the onMonthChanged function with correct number of months when going back across two years", () => {
      let date = moment("01/08/2015", "DD/MM/YYYY")
      instance.onMonthClicked(date)()
      sinon.assert.calledOnce(onMonthChangedSpy)
      sinon.assert.calledWith(onMonthChangedSpy, -11)
    })
    it("should run the onMonthChanged function with correct number of months when going forward within the same year", () => {
      let date = moment("01/10/2016", "DD/MM/YYYY")
      instance.onMonthClicked(date)()
      sinon.assert.calledOnce(onMonthChangedSpy)
      sinon.assert.calledWith(onMonthChangedSpy, 3)
    })
    it("should run the onMonthChanged function with correct number of months when going forward across two years", () => {
      let date = moment("01/02/2017", "DD/MM/YYYY")
      instance.onMonthClicked(date)()
      sinon.assert.calledOnce(onMonthChangedSpy)
      sinon.assert.calledWith(onMonthChangedSpy, 7)
    })
  })
});
