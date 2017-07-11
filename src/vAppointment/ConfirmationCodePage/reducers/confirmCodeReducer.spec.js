import chai, { expect } from "chai";
import dirtyChai from "dirty-chai";

import confirmCodeReducer from "./confirmCodeReducer";
import { actions } from "../actions/codeConfirmationActions";

chai.use(dirtyChai);

describe("Testing Reducer: confirmCodeReducer", () => {
  const initState = {
    requestCode: {
      isFetching: "I ain't fetching nothing",
      error: "What you talkin about, error?",
      success: "Who you gonna call?",
    },
    sendCode: {
      isFetching: "I am not a dog",
      error: "Houston we have a problem",
      success: "It's ALIVE!",
    },
  };
  describe("On init", () => {
    it("should have a requestCode property", () => {
      const state = confirmCodeReducer(undefined, { type: "init" });
      expect(state).to.have.property("requestCode").that.is.an("object");
    });
    it("should have a sendCode property", () => {
      const state = confirmCodeReducer(undefined, { type: "init" });
      expect(state).to.have.property("sendCode").that.is.an("object");
    });
    it("should have an isFetching, error, and success property in each initial property", () => {
      const state = confirmCodeReducer(undefined, { type: "init" });
      expect(state.requestCode).to.have.all.keys("isFetching", "error", "success");
      expect(state.sendCode).to.have.all.keys("isFetching", "error", "success");
    });
    it("should set all inner properties to false", () => {
      const state = confirmCodeReducer(undefined, { type: "init" });
      expect(state.requestCode).to.have.deep.property("isFetching", false);
      expect(state.requestCode).to.have.deep.property("error", false);
      expect(state.requestCode).to.have.deep.property("success", false);
      expect(state.sendCode).to.have.deep.property("isFetching", false);
      expect(state.sendCode).to.have.deep.property("error", null);
      expect(state.sendCode).to.have.deep.property("success", false);
    });
  });
  describe("action: sendToConfirm", () => {
    it("should set requestCode.isFetching to true", () => {
      const state = confirmCodeReducer(initState, actions.sendToConfirm());
      expect(state.requestCode.isFetching).to.equal(true);
    });
    it("should set requestCode.success to false", () => {
      const state = confirmCodeReducer(initState, actions.sendToConfirm());
      expect(state.requestCode.success).to.equal(false);
    });
    it("should set requestCode.error to false", () => {
      const state = confirmCodeReducer(initState, actions.sendToConfirm());
      expect(state.requestCode.error).to.equal(false);
    });
    it("should not change state.sendCode properties", () => {
      const state = confirmCodeReducer(initState, actions.sendToConfirm());
      expect(state.sendCode).to.have.deep.property("isFetching", "I am not a dog");
      expect(state.sendCode).to.have.deep.property("error", "Houston we have a problem");
      expect(state.sendCode).to.have.deep.property("success", "It's ALIVE!");
    });
  });
  describe("action: sendToConfirmSuccess", () => {
    it("should set requestCode.isFetching to false", () => {
      const state = confirmCodeReducer(initState, actions.sendToConfirmSuccess());
      expect(state.requestCode.isFetching).to.equal(false);
    });
    it("should set requestCode.success to true", () => {
      const state = confirmCodeReducer(initState, actions.sendToConfirmSuccess());
      expect(state.requestCode.success).to.equal(true);
    });
    it("should set requestCode.error to false", () => {
      const state = confirmCodeReducer(initState, actions.sendToConfirmSuccess());
      expect(state.requestCode.error).to.equal(false);
    });
    it("should not change state.sendCode properties", () => {
      const state = confirmCodeReducer(initState, actions.sendToConfirmSuccess());
      expect(state.sendCode).to.have.deep.property("isFetching", "I am not a dog");
      expect(state.sendCode).to.have.deep.property("error", "Houston we have a problem");
      expect(state.sendCode).to.have.deep.property("success", "It's ALIVE!");
    });
  });
  describe("action: sendToConfirmFailure", () => {
    it("should set requestCode.isFetching to false", () => {
      const state = confirmCodeReducer(initState, actions.sendToConfirmFailure());
      expect(state.requestCode.isFetching).to.equal(false);
    });
    it("should set requestCode.success to false", () => {
      const state = confirmCodeReducer(initState, actions.sendToConfirmFailure());
      expect(state.requestCode.success).to.equal(false);
    });
    it("should set the requestCode.error to true", () => {
      const state =
        confirmCodeReducer(initState, actions.sendToConfirmFailure());
      expect(state.requestCode.error).to.equal(true);
    });
    it("should not change state.sendCode properties", () => {
      const state = confirmCodeReducer(initState, actions.sendToConfirmFailure());
      expect(state.sendCode).to.have.deep.property("isFetching", "I am not a dog");
      expect(state.sendCode).to.have.deep.property("error", "Houston we have a problem");
      expect(state.sendCode).to.have.deep.property("success", "It's ALIVE!");
    });
  });
  describe("action: sendCode", () => {
    it("should set sendCode.isFetching to false", () => {
      const state = confirmCodeReducer(initState, actions.sendCode());
      expect(state.sendCode.isFetching).to.equal(false);
    });
    it("should set sendCode.success to false", () => {
      const state = confirmCodeReducer(initState, actions.sendCode());
      expect(state.sendCode.success).to.equal(false);
    });
    it("should set sendCode.error to null", () => {
      const state = confirmCodeReducer(initState, actions.sendCode());
      expect(state.sendCode.error).to.equal(null);
    });
    it("should not change state.requestCode properties", () => {
      const state = confirmCodeReducer(initState, actions.sendCode());
      expect(state.requestCode).to.have.deep.property("isFetching", "I ain't fetching nothing");
      expect(state.requestCode).to.have.deep.property("error", "What you talkin about, error?");
      expect(state.requestCode).to.have.deep.property("success", "Who you gonna call?");
    });
  });
  describe("action: sendCodeFetching", () => {
    it("should set sendCode.isFetching to true", () => {
      const state = confirmCodeReducer(initState, actions.sendCodeFetching());
      expect(state.sendCode.isFetching).to.equal(true);
    });
    it("should set sendCode.success to false", () => {
      const state = confirmCodeReducer(initState, actions.sendCodeFetching());
      expect(state.sendCode.success).to.equal(false);
    });
    it("should set sendCode.error to null", () => {
      const state = confirmCodeReducer(initState, actions.sendCodeFetching());
      expect(state.sendCode.error).to.equal(null);
    });
    it("should not change state.requestCode properties", () => {
      const state = confirmCodeReducer(initState, actions.sendCodeFetching());
      expect(state.requestCode).to.have.deep.property("isFetching", "I ain't fetching nothing");
      expect(state.requestCode).to.have.deep.property("error", "What you talkin about, error?");
      expect(state.requestCode).to.have.deep.property("success", "Who you gonna call?");
    });
  });
  describe("action: sendCodeSuccess", () => {
    it("should set sendCode.isFetching to false", () => {
      const state = confirmCodeReducer(initState, actions.sendCodeSuccess());
      expect(state.sendCode.isFetching).to.equal(false);
    });
    it("should set sendCode.success to true", () => {
      const state = confirmCodeReducer(initState, actions.sendCodeSuccess());
      expect(state.sendCode.success).to.equal(true);
    });
    it("should set sendCode.error to null", () => {
      const state = confirmCodeReducer(initState, actions.sendCodeSuccess());
      expect(state.sendCode.error).to.equal(null);
    });
    it("should not change state.requestCode properties", () => {
      const state = confirmCodeReducer(initState, actions.sendCode());
      expect(state.requestCode).to.have.deep.property("isFetching", "I ain't fetching nothing");
      expect(state.requestCode).to.have.deep.property("error", "What you talkin about, error?");
      expect(state.requestCode).to.have.deep.property("success", "Who you gonna call?");
    });
  });
  describe("action: sendCodeFailure", () => {
    it("should set sendCode.isFetching to false", () => {
      const state = confirmCodeReducer(initState, actions.sendCodeFailure());
      expect(state.sendCode.isFetching).to.equal(false);
    });
    it("should set sendCode.success to false", () => {
      const state = confirmCodeReducer(initState, actions.sendCodeFailure());
      expect(state.sendCode.success).to.equal(false);
    });
    it("should set the sendCode.error to true", () => {
      const state =
        confirmCodeReducer(initState, actions.sendCodeFailure("ERROR"));
      expect(state.sendCode.error).to.equal("ERROR");
    });
    it("should not change state.requestCode properties", () => {
      const state = confirmCodeReducer(initState, actions.sendCode());
      expect(state.requestCode).to.have.deep.property("isFetching", "I ain't fetching nothing");
      expect(state.requestCode).to.have.deep.property("error", "What you talkin about, error?");
      expect(state.requestCode).to.have.deep.property("success", "Who you gonna call?");
    });
  });
});
