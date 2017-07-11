import chai, { expect } from "chai";
import dirtyChai from "dirty-chai";

import patientDetailsReducer from "./patientDetailsReducer";
import { actions } from "../actions/actions";

chai.use(dirtyChai);

describe("Testing Reducer: patientDetails", () => {
  let initState;
  beforeEach(() => {
    initState = { patientDetails: {} };
  });
  describe("initial state", () => {
    it("should have a key named patientDetails", () => {
      const initState = patientDetailsReducer(undefined, { type: "init" });
      expect(initState.patientDetails).to.deep.equal({});
    });
  });
  describe("action: addDetails", () => {
    it("should add patient details", () => {
      const state = patientDetailsReducer(initState, actions.addDetails({ de: "tails" }));
      expect(state.patientDetails).to.deep.equal({ de: "tails" });
    });
  });
  describe("action: changePhone", () => {
    beforeEach(() => {
      initState = {
        patientDetails: {
          phone: "myPhone",
          some: "other",
          thing: "here",
        },
      };
    });
    it("should change patient phone number", () => {
      const state = patientDetailsReducer(initState, actions.changePhone("SUP"));
      expect(state.patientDetails.phone).to.equal("SUP");
    });
    it("should not change any other patient details", () => {
      const state = patientDetailsReducer(initState, actions.changePhone("SUP"));
      expect(state.patientDetails.some).to.equal("other");
      expect(state.patientDetails.thing).to.equal("here");
    });
  });
});
