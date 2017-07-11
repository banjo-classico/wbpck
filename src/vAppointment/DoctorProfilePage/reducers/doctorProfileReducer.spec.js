import React from "react";
import chai, { expect } from "chai";
import dirtyChai from "dirty-chai";

import doctorProfileReducer from "./doctorProfileReducer";
import { actions } from "../actions/actions";

chai.use(dirtyChai);

describe("Testing doctorProfileReducer: ", () => {
  let initState;
  beforeEach(() => {
    initState = doctorProfileReducer(undefined, { type: "init" });
  });
  describe("doctor", () => {
    describe("On init", () => {
      it("should have a Picture set to empty", () => {
        const state = doctorProfileReducer(undefined, { type: "init" });
        expect(state.doctor.Picture).to.equal("");
      });
      it("should have a Name set to empty", () => {
        const state = doctorProfileReducer(undefined, { type: "init" });
        expect(state.doctor.Name).to.equal("");
      });
      it("should have a Title set to empty", () => {
        const state = doctorProfileReducer(undefined, { type: "init" });
        expect(state.doctor.Title).to.equal("");
      });
      it("should have a Description set to empty", () => {
        const state = doctorProfileReducer(undefined, { type: "init" });
        expect(state.doctor.Description).to.equal("");
      });
      it("should have a Language set to empty array", () => {
        const state = doctorProfileReducer(undefined, { type: "init" });
        expect(state.doctor.Language).to.deep.equal([]);
      });
      it("should have a MedicalInterests set to empty", () => {
        const state = doctorProfileReducer(undefined, { type: "init" });
        expect(state.doctor.MedicalInterests).to.deep.equal([]);
      });
      it("should have a Education set to empty", () => {
        const state = doctorProfileReducer(undefined, { type: "init" });
        expect(state.doctor.Education).to.deep.equal([]);
      });
      it("should have a PracticeAffiliations set to empty", () => {
        const state = doctorProfileReducer(undefined, { type: "init" });
        expect(state.doctor.PracticeAffiliations).to.deep.equal([]);
      });
      it("should have a Id set to empty", () => {
        const state = doctorProfileReducer(undefined, { type: "init" });
        expect(state.doctor.Id).to.equal("");
      });
      it("should have a OrganisationId set to empty", () => {
        const state = doctorProfileReducer(undefined, { type: "init" });
        expect(state.doctor.OrganisationId).to.equal("");
      });
    });
  });
  describe("action fetchDoctorProfileSuccess: ", () => {
    const doctor = {
      Picture: "link to picture",
      Name: "House",
      Title: "Doctor",
      Description: "A TV doctor",
      Language: ["English"],
      MedicalInterests: ["Lupus"],
      Education: ["Medical hoohaa"],
      PracticeAffiliations: ["television"],
      Id: "Hugh Laurie",
      OrganisationId: "TV1",
    }
    it("should set the picture you have set", () => {
      const state = doctorProfileReducer(initState, actions.fetchDoctorProfileSuccess(doctor));
      expect(state.doctor.Picture).to.equals("link to picture");
    });
    it("should set the name that you have set", () => {
      const state = doctorProfileReducer(initState, actions.fetchDoctorProfileSuccess(doctor));
      expect(state.doctor.Name).to.equals("House");
    });
    it("should set the title that you have set", () => {
      const state = doctorProfileReducer(initState, actions.fetchDoctorProfileSuccess(doctor));
      expect(state.doctor.Title).to.equals("Doctor");
    });
    it("should set the description you have set", () => {
      const state = doctorProfileReducer(initState, actions.fetchDoctorProfileSuccess(doctor));
      expect(state.doctor.Description).to.equals("A TV doctor");
    });
    it("should set the languages you have set", () => {
      const state = doctorProfileReducer(initState, actions.fetchDoctorProfileSuccess(doctor));
      expect(state.doctor.Language).to.deep.equals(["English"]);
    });
    it("should set the medical interests you have set", () => {
      const state = doctorProfileReducer(initState, actions.fetchDoctorProfileSuccess(doctor));
      expect(state.doctor.MedicalInterests).to.deep.equals(["Lupus"]);
    });
    it("should set the education you have set", () => {
      const state = doctorProfileReducer(initState, actions.fetchDoctorProfileSuccess(doctor));
      expect(state.doctor.Education).to.deep.equals(["Medical hoohaa"]);
    });
    it("should set the affiliations you have set", () => {
      const state = doctorProfileReducer(initState, actions.fetchDoctorProfileSuccess(doctor));
      expect(state.doctor.PracticeAffiliations).to.deep.equals(["television"]);
    });
    it("should set the id you have set", () => {
      const state = doctorProfileReducer(initState, actions.fetchDoctorProfileSuccess(doctor));
      expect(state.doctor.Id).to.equals("Hugh Laurie");
    });
    it("should set the org id you have set", () => {
      const state = doctorProfileReducer(initState, actions.fetchDoctorProfileSuccess(doctor));
      expect(state.doctor.OrganisationId).to.equals("TV1");
    });
  });
});
