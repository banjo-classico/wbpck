import React from "react";
import chai, { expect } from "chai";
import dirtyChai from "dirty-chai";
import { shallow, mount } from "enzyme";

chai.use(dirtyChai);

import TnC from "./index";

describe("Testing Component: TnC", () => {
  let tnC;
  let instance;

  describe("On - Init", () => {
    it("should set state values to false", () => {
      tnC = shallow(<TnC />);
      instance = tnC.instance()
      expect(instance.state.showTnC).to.be.false();
      expect(instance.state.showPrivacyPolicy).to.be.false();
    });
  })
  describe("Method - handleTnC", () => {
    beforeEach(() => {
      tnC = shallow(<TnC />);
      instance = tnC.instance()
    })
    it("should toggle showTnC", () => {
      instance.handleTnC()
      expect(instance.state.showTnC).to.be.true()
      instance.handleTnC()
      expect(instance.state.showTnC).to.be.false()
    })
    it("should not change showPrivacyPolicy", () => {
      instance.handleTnC()
      expect(instance.state.showPrivacyPolicy).to.be.false()
      instance.handleTnC()
      expect(instance.state.showPrivacyPolicy).to.be.false()
    })
  })
  describe("Method - handlePrivacyPolicy", () => {
    beforeEach(() => {
      tnC = shallow(<TnC />);
      instance = tnC.instance()
    })
    it("should toggle showPrivacyPolicy", () => {
      instance.handlePrivacyPolicy()
      expect(instance.state.showPrivacyPolicy).to.be.true()
      instance.handlePrivacyPolicy()
      expect(instance.state.showPrivacyPolicy).to.be.false()
    })
    it("should not change showTnC", () => {
      instance.handlePrivacyPolicy()
      expect(instance.state.showTnC).to.be.false()
      instance.handlePrivacyPolicy()
      expect(instance.state.showTnC).to.be.false()
    })
  })
});
