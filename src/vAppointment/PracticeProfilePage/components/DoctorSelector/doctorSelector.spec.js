import React from "react";
import chai, { expect } from "chai";
import dirtyChai from "dirty-chai";
import { shallow } from "enzyme";

chai.use(dirtyChai);

import DoctorSelector, { getOptions } from "./index";

describe("Testing Component: DoctorSelector", () => {
  let doctorSelector;
  let toggleOptionsSpy;
  let handleOptionClickSpy;
  let props;
  let instance;

  beforeEach(() => {
    props = {
      doctors: ["1", "2", "3"],
    };
    doctorSelector = shallow(<DoctorSelector {...props} />);
    instance = doctorSelector.instance()
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
      instance.handleOptionClick("option")
      sinon.assert.calledOnce(toggleOptionsSpy)
    })
    it("should set currentFilter in state to arg passed in", () => {
      instance.handleOptionClick("option")
      expect(instance.state.currentFilter).to.equal("option")
    })
  })
});

describe("Function: getOptions", () => {
  let doctors;
  let value;

  it("should remove current doctor from doctors array", () => {
    doctors = [{Name: "Bob", PmsUserId: "1"}, {Name: "Linda", PmsUserId: "2"}];
    value = getOptions("Bob", doctors)
    expect(value[1].name).to.equal("Linda")
    expect(value[1].id).to.equal("2")
    value = getOptions("Linda", doctors)
    expect(value[1].name).to.equal("Bob")
    expect(value[1].id).to.equal("1")
  })
});
