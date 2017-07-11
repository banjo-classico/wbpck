import React from "react";
import { connect } from "react-redux";
import chai, { expect } from "chai";
import dirtyChai from "dirty-chai";
import { shallow } from "enzyme";
import moment from "moment";

chai.use(dirtyChai);

import {DoctorAppointments} from "./index";

describe("Testing Component: DoctorAppointments", () => {
  let doctorAppointments;
  let getAppointmentsSpy;
  let filterFnStub
  let props;
  let instance;

  beforeEach(() => {
    props = {
      sessionId: "1",
      getAppointments: sinon.spy(),
      togglePopUp: sinon.spy(),
      setMainComponent: sinon.spy(),
      setSideComponent: sinon.spy(),
      clearEnrollmentCheck: sinon.spy(),
      routeParams: {id: "1"},
      showPopUp: false,
      doctors: ["1", "2", "3"],
    };
    doctorAppointments = shallow(<DoctorAppointments {...props} />);
    instance = doctorAppointments.instance()
    getAppointmentsSpy = sinon.spy(instance, 'getAppointments')
    filterFnStub = sinon.stub().returns("1")

  });
  describe("Method - getAppointments", () => {
    it("should run the getAppointments prop three times starting with start day", () => {
      sinon.assert.calledThrice(props.getAppointments)
    })
  })
  describe("Method - setMainDay", () => {
    it("should set the main day in the state to the argument passed in", () => {
      const day = moment().add(1, "days")
      instance.setMainDay(day)
      const value = instance.state.mainDay
      expect(value).to.equal(day)
    })
    it("should run getAppointments method", () => {
      const day = moment().add(1, "days")
      instance.setMainDay(day)
      sinon.assert.calledOnce(getAppointmentsSpy)
    })
  })
  describe("Method - moveDays", () => {
    it("should set mainDay in state to one day ahead if arg is 'forward'", () => {
      const day = moment()
      expect(instance.state.mainDay.format("d")).to.equal(day.format("d"))
      instance.moveDays("forward")
      expect(instance.state.mainDay.format("d")).to.equal(day.add(1, "days").format("d"))
    })
    it("should set mainDay in state to one day back if arg is 'back'", () => {
      const day = moment()
      expect(instance.state.mainDay.format("d")).to.equal(day.format("d"))
      instance.moveDays("back")
      expect(instance.state.mainDay.format("d")).to.equal(day.subtract(1, "days").format("d"))
    })
    it("should run getAppointments method with new mainDay", () => {
      const day = instance.state.mainDay
      instance.moveDays("forward")
      sinon.assert.calledOnce(getAppointmentsSpy)
      sinon.assert.calledWith(getAppointmentsSpy, day.add(1, "days"))
    })
  })
  describe("Method - togglePopUp", () => {
    beforeEach(() => {
      instance.togglePopUp("main", "side", "123")
    });
    it("should run the togglePopUp fn from props", () => {
      sinon.assert.calledOnce(props.togglePopUp)
    })
    it("should toggle the shownDoctorId to either given id or null", () => {
      expect(instance.state.shownDoctorId).to.equal("123")
      instance.togglePopUp()
      expect(instance.state.shownDoctorId).to.equal(null)
    })
    it("should run setComponent fns if showPopUp prop is false", () => {
      sinon.assert.calledOnce(props.setMainComponent)
      sinon.assert.calledWith(props.setMainComponent, "main")
      sinon.assert.calledOnce(props.setSideComponent)
      sinon.assert.calledWith(props.setSideComponent, "side")
    })
    it("should run clearEnrollmentCheck fn if showPopUp prop is true", () => {
      doctorAppointments = shallow(<DoctorAppointments {...props} showPopUp={true} />);
      instance = doctorAppointments.instance()
      instance.togglePopUp()
      sinon.assert.calledOnce(props.clearEnrollmentCheck)
    })
  })
  describe("Method - filterDoctors", () => {
    it("should run the filter fn passed in", () => {
      instance.filterDoctors(filterFnStub, "string")
      sinon.assert.calledOnce(filterFnStub)
      sinon.assert.calledWith(filterFnStub, props.doctors)
    })
    it("should set the filteredDoctors to props.doctors if there is no string", () => {
      instance.filterDoctors(filterFnStub, "123")
      expect(instance.state.filteredDoctors).to.equal("1")
      instance.filterDoctors(filterFnStub, "")
      expect(instance.state.filteredDoctors).to.equal(props.doctors)
    })
    it("should set the filterStr to string arg", () => {
      instance.filterDoctors(filterFnStub, "123")
      expect(instance.state.filterStr).to.equal("123")
    })
  })
});
