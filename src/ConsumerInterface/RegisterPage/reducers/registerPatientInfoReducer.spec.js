import React from "react";
import chai, { expect } from "chai";
import dirtyChai from "dirty-chai";
import moment from "moment";

import registerPatientInfoReducer from "./registerPatientInfoReducer";
import { actions } from "../actions/actions";

chai.use(dirtyChai);

describe("Testing registerPatientInfoReducer: ", () => {
  let initState;
  beforeEach(() => {
    initState = registerPatientInfoReducer(undefined, { type: "init" });
  });
  describe("INITIAL_STATE", () => {
    describe("On init", () => {
      it("should have a firstName set to empty", () => {
        const state = registerPatientInfoReducer(undefined, { type: "init" });
        expect(state.firstName).to.equal("");
      });
      it("should have a surname set to empty", () => {
        const state = registerPatientInfoReducer(undefined, { type: "init" });
        expect(state.surname).to.equal("");
      });
      it("should have a dateOfBirth set to empty", () => {
        const state = registerPatientInfoReducer(undefined, { type: "init" });
        expect(state.dateOfBirth).to.equal(null);
      });
      it("should have a email set to empty", () => {
        const state = registerPatientInfoReducer(undefined, { type: "init" });
        expect(state.email).to.equal("");
      });
      it("should have a mobile set to empty array", () => {
        const state = registerPatientInfoReducer(undefined, { type: "init" });
        expect(state.mobile).to.deep.equal("");
      });
      it("should have a password set to empty", () => {
        const state = registerPatientInfoReducer(undefined, { type: "init" });
        expect(state.password).to.equal("");
      });
      it("should have a id set to empty", () => {
        const state = registerPatientInfoReducer(undefined, { type: "init" });
        expect(state.id).to.equal("");
      });
      it("should have a isFetching set to false", () => {
        const state = registerPatientInfoReducer(undefined, { type: "init" });
        expect(state.isFetching).to.equal(false);
      });
      it("should have a accept set to empty", () => {
        const state = registerPatientInfoReducer(undefined, { type: "init" });
        expect(state.accept).to.equal(false);
      });
      it("should have a error set to null", () => {
        const state = registerPatientInfoReducer(undefined, { type: "init" });
        expect(state.error).to.equal(null);
      });
    });
  });
  describe("action - setting actions: ", () => {
    it("should set the first name you have set", () => {
      const state = registerPatientInfoReducer(initState, actions.setFirstName("Bruce"));
      expect(state.firstName).to.equals("Bruce");
    });
    it("should set the surname that you have set", () => {
      const state = registerPatientInfoReducer(initState, actions.setSurname("Wayne"));
      expect(state.surname).to.equals("Wayne");
    });
    it("should set the dateOfBirth that you have set", () => {
      const dateOfBirth = moment()
      const state = registerPatientInfoReducer(initState, actions.setDateOfBirth(dateOfBirth));
      expect(state.dateOfBirth).to.deep.equals(dateOfBirth.toDate());
    });
    it("should set the email you have set", () => {
      const state = registerPatientInfoReducer(initState, actions.setEmail("thebatman@batcave.com"));
      expect(state.email).to.equals("thebatman@batcave.com");
    });
    it("should set the mobile you have set", () => {
      const state = registerPatientInfoReducer(initState, actions.setMobile("The bat light"));
      expect(state.mobile).to.deep.equals("The bat light");
    });
    it("should set the password interests you have set", () => {
      const state = registerPatientInfoReducer(initState, actions.setPassword("Alfred"));
      expect(state.password).to.deep.equals("Alfred");
    });
    it("should set the Ts & Cs acceptance to value you give", () => {
      const state = registerPatientInfoReducer(initState, actions.setAcceptTnC(true));
      expect(state.accept).to.deep.equals(true);
    });
  });
  describe("action - registerSuccess: ", () => {
    const profile = {
      Id: "BATBAT",
      Username: "thebatman@batcave.com",
      Password: "Alfred",
      FirstName: "Bruce",
      LastName: "Wayne",
      Mobile: "0800 Nananana Nananana",
      DateOfBirth: "May, 1939",
    }
    it("should set state of values given", () => {
      const state = registerPatientInfoReducer(initState, actions.registerSuccess(profile));
      expect(state.firstName).to.equals("Bruce");
      expect(state.surname).to.equals("Wayne");
      expect(state.email).to.equals("thebatman@batcave.com");
      expect(state.password).to.equals("Alfred");
      expect(state.dateOfBirth).to.equals("May, 1939");
      expect(state.mobile).to.equals("0800 Nananana Nananana");
      expect(state.id).to.equals("BATBAT");
    });
  });
});
