import React from "react";
import chai, { expect } from "chai";
import dirtyChai from "dirty-chai";
import { shallow } from "enzyme";

chai.use(dirtyChai);

import PasswordChange from "./index";

describe("Testing Component: PasswordChange", () => {
  let passwordChange;
  let instance;

  describe("On - Init", () => {
    it("should start with empty state", () => {
      passwordChange = shallow(<PasswordChange />);
      instance = passwordChange.instance()
      expect(instance.state.newPassword).to.equal("");
      expect(instance.state.confirmPassword).to.equal("");
      expect(instance.state.newPasswordError).to.equal(null);
      expect(instance.state.confirmPasswordError).to.equal(null);
    });
  })

  describe("Method - onNewPasswordChange", () => {
    const event = {
      target: {
        value: "password"
      },
    }
    beforeEach(() => {
      passwordChange = shallow(<PasswordChange />);
      instance = passwordChange.instance()
    })
    it("should set the new password in the state", () => {
      instance.onNewPasswordChange(event)
      expect(instance.state.newPassword).to.equal("password")
      expect(instance.state.newPasswordError).to.equal(null)
      expect(instance.state.confirmPasswordError).to.equal(null)
    })
    it("should clear errors", () => {
      const state = {
        newPassword: "longEnough",
        confirmPassword: "longEnough",
        newPasswordError: "error",
        confirmPasswordError: "anotherError",
      }
      passwordChange.setState(state)
      instance.onNewPasswordChange(event)
      expect(instance.state.confirmPasswordError).to.equal(null)
      expect(instance.state.newPasswordError).to.equal(null)
    })
  })

  describe("Method - onConfirmPasswordChange", () => {
    const event = {
      target: {
        value: "password"
      },
    }
    beforeEach(() => {
      passwordChange = shallow(<PasswordChange />);
      instance = passwordChange.instance()
    })
    it("should set the confirm password in the state", () => {
      instance.onConfirmPasswordChange(event)
      expect(instance.state.confirmPassword).to.equal("password")
    })
    it("should clear confirm password error", () => {
      const state = {
        newPassword: "longEnough",
        confirmPassword: "longEnough",
        newPasswordError: "error",
        confirmPasswordError: "anotherError",
      }
      passwordChange.setState(state)
      instance.onConfirmPasswordChange(event)
      expect(instance.state.confirmPasswordError).to.equal(null)
      expect(instance.state.newPasswordError).to.equal("error")
    })
  })

  describe("Method - onNewPasswordBlur", () => {
    let state;
    beforeEach(() => {
      passwordChange = shallow(<PasswordChange />);
      instance = passwordChange.instance()
    })
    it("should set the new password error if the password is shorter than 6 characters", () => {
      state = {
        newPassword: "short",
        newPasswordError: null,
        confirmPasswordError: null,
      }
      passwordChange.setState(state)
      instance.onNewPasswordBlur()
      expect(instance.state.newPasswordError).to.equal("Your password must be longer than 5 characters.")
      expect(instance.state.confirmPasswordError).to.equal(null)
    })
    it("should not set the new password error if the password is longer than 6 characters", () => {
      state = {
        newPassword: "longEnough",
        newPasswordError: null,
        confirmPasswordError: null,
      }
      passwordChange.setState(state)
      instance.onNewPasswordBlur()
      expect(instance.state.newPasswordError).to.equal(null)
    })
  })

  describe("Method - onConfirmPasswordBlur", () => {
    let state;
    beforeEach(() => {
      passwordChange = shallow(<PasswordChange />);
      instance = passwordChange.instance()
    })
    it("should set the confirm password error if the passwords do not match", () => {
      state = {
        newPassword: "longEnough",
        confirmPassword: "notTheSame",
        newPasswordError: null,
        confirmPasswordError: null,
      }
      passwordChange.setState(state)
      instance.onConfirmPasswordBlur()
      expect(instance.state.confirmPasswordError).to.equal("Your passwords do not match.")
      expect(instance.state.newPasswordError).to.equal(null)
    })
    it("should not set the confirm password error if passwords match", () => {
      state = {
        newPassword: "longEnough",
        confirmPassword: "longEnough",
        newPasswordError: null,
        confirmPasswordError: null,
      }
      passwordChange.setState(state)
      instance.onConfirmPasswordBlur()
      expect(instance.state.confirmPasswordError).to.equal(null)
    })
  })
  describe("Method - clearNewPasswordError", () => {
    it("should set the new password error to null", () => {
      passwordChange = shallow(<PasswordChange />);
      instance = passwordChange.instance()
      const state = {
        newPasswordError: "error",
        confirmPasswordError: null,
      }
      passwordChange.setState(state)
      instance.clearNewPasswordError()
      expect(instance.state.newPasswordError).to.equal(null)
    })
  })
  describe("Method - clearConfirmPasswordError", () => {
    it("should set the new password error to null", () => {
      passwordChange = shallow(<PasswordChange />);
      instance = passwordChange.instance()
      const state = {
        newPasswordError: null,
        confirmPasswordError: "error",
      }
      passwordChange.setState(state)
      instance.clearConfirmPasswordError()
      expect(instance.state.confirmPasswordError).to.equal(null)
    })
  })
  describe("Method - getState", () => {
    it("should return the state", () => {
      passwordChange = shallow(<PasswordChange />);
      instance = passwordChange.instance()
      const state = {
        newPassword: "password",
        confirmPassword: "password",
        newPasswordError: null,
        confirmPasswordError: null,
        isValid: false,
      }
      passwordChange.setState(state)
      const value = instance.getState()
      expect(value).to.deep.equal(state)
    })
  })
});
