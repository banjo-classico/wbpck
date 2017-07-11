import React from "react";
import chai, { expect } from "chai";
import dirtyChai from "dirty-chai";
import { shallow } from "enzyme";
import moment from "moment";

chai.use(dirtyChai);

import HoverButton, { getNumDisplayMonths } from "./index";

describe("Testing Component: HoverButton", () => {
  let hoverButton;
  let props;
  let instance;

  beforeEach(() => {
    props = {
      setMainDay: sinon.spy(),
      handleDateClick: sinon.spy(),
      maxDays: 10,
    };
    hoverButton = shallow(<HoverButton {...props} />);
    instance = hoverButton.instance()
  });
  describe("Method - handleMouseEnter", () => {
    it("should set isHovered to true", () => {
      expect(instance.state.isHovered).to.be.false()
      instance.handleMouseEnter()
      expect(instance.state.isHovered).to.be.true()
    })
  })
  describe("Method - handleMouseLeave", () => {
    it("should set isHovered to false", () => {
      expect(instance.state.isHovered).to.be.false()
      instance.handleMouseEnter()
      expect(instance.state.isHovered).to.be.true()
      instance.handleMouseLeave()
      expect(instance.state.isHovered).to.be.false()
    })
  })
  describe("Method - filterDate", () => {
    it("should return false if arg is before today", () => {
      const value = instance.filterDate(moment().subtract(1, "days"))
      expect(value).to.be.false()
    })
    it("should return false if arg is after maxDays", () => {
      const value = instance.filterDate(moment().add(11, "days"))
      expect(value).to.be.false()
    })
    it("should return true if arg is on or after today, but before maxDays", () => {
      let value = instance.filterDate(moment().add(2, "days"))
      expect(value).to.be.true()
      value = instance.filterDate(moment())
      expect(value).to.be.true()
    })
  })
  describe("Method - handleDateClick", () => {
    it("should run handleDateClick prop fn", () => {
      instance.handleDateClick(moment())
      sinon.assert.calledOnce(props.handleDateClick)
    })
    it("should run setMainDay prop fn", () => {
      instance.handleDateClick(moment())
      sinon.assert.calledOnce(props.setMainDay)
    })
  })
});
