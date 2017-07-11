import chai, { expect } from "chai";
import dirtyChai from "dirty-chai";

import submitAppointmentReducer from "./submitAppointmentReducer";
import { actions } from "../actions/actions";

chai.use(dirtyChai);

describe("Testing Reducer: submitAppointment", () => {
  const initState = {
    confirmed: false,
    isFetching: false,
    error: null,
  };
  describe("On init", () => {
    it("should have a confirmed property", () => {
      const state = submitAppointmentReducer(undefined, { type: "init" });
      expect(state.confirmed).to.equal(false);
    });
    it("should have a isFetching property", () => {
      const state = submitAppointmentReducer(undefined, { type: "init" });
      expect(state.isFetching).to.equal(false);
    });
    it("should have an error property", () => {
      const state = submitAppointmentReducer(undefined, { type: "init" });
      expect(state.error).to.equal(null);
    });
  });
  describe("action: submitAppointment", () => {
    it("should set isFetching to true", () => {
      const state = submitAppointmentReducer(initState, actions.submitAppointment());
      expect(state.isFetching).to.equal(true);
    });
    it("should set confirmed to false", () => {
      const state = submitAppointmentReducer(initState, actions.submitAppointment());
      expect(state.confirmed).to.equal(false);
    });
    it("should set error to null", () => {
      const state = submitAppointmentReducer(initState, actions.submitAppointment());
      expect(state.error).to.equal(null);
    });
  });
  describe("action: submitAppointmentSuccess", () => {
    it("should set isFetching to false", () => {
      const state = submitAppointmentReducer(initState, actions.submitAppointmentSuccess());
      expect(state.isFetching).to.equal(false);
    });
    it("should set confirmed to true", () => {
      const state = submitAppointmentReducer(initState, actions.submitAppointmentSuccess());
      expect(state.confirmed).to.equal(true);
    });
    it("should set error to null", () => {
      const state = submitAppointmentReducer(initState, actions.submitAppointmentSuccess());
      expect(state.error).to.equal(null);
    });
  });
  describe("action: submitAppointmentFailure", () => {
    it("should set isFetching to false", () => {
      const state = submitAppointmentReducer(
        initState,
        actions.submitAppointmentFailure("This is bad")
      );
      expect(state.isFetching).to.equal(false);
    });
    it("should set confirmed to false", () => {
      const state = submitAppointmentReducer(
        initState,
        actions.submitAppointmentFailure("This is bad")
      );
      expect(state.confirmed).to.equal(false);
    });
    it("should set the error", () => {
      const state =
        submitAppointmentReducer(initState, actions.submitAppointmentFailure("This is bad"));
      expect(state.error).to.equal("This is bad");
    });
  });
});
