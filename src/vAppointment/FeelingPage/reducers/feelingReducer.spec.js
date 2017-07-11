import chai, { expect } from "chai";
import dirtyChai from "dirty-chai";

import feelingPageReducer from "./feelingPageReducer";
import { actions } from "../actions/actions";

chai.use(dirtyChai);

describe("Testing Reducer: feelingPageReducer", () => {
  const initState = {
    feelings: "something",
    skip: false,
  };
  describe("On init", () => {
    it("should have a feelings property", () => {
      const state = feelingPageReducer(undefined, { type: "init" });
      expect(state.feelings).to.equal("");
    });
    it("should have a skip property", () => {
      const state = feelingPageReducer(undefined, { type: "init" });
      expect(state.skip).to.equal(false);
    });
  });
  describe("action: addFeelings", () => {
    it("should add feelings to the state", () => {
      const state = feelingPageReducer(initState, actions.addFeelings("some feeling"));
      expect(state.feelings).to.equal("some feeling");
    });
    it("should set the skip to false", () => {
      const state = feelingPageReducer(initState, actions.addFeelings("some feeling"));
      expect(state.skip).to.equal(false);
    });
  });
  describe("action: skipFeelings", () => {
    it("should set the skip feelings flag", () => {
      const state = feelingPageReducer(initState, actions.skipFeelings());
      expect(state.skip).to.equal(true);
    });
    it("should set the feelings to empty string", () => {
      const state = feelingPageReducer(initState, actions.skipFeelings());
      expect(state.feelings).to.equal("");
    });
  });
});
