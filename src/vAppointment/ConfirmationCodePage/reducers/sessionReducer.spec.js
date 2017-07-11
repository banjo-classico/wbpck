import chai, { expect } from "chai";
import dirtyChai from "dirty-chai";

import sessionReducer from "./sessionReducer";
import { actions } from "../actions/sessionActions";

chai.use(dirtyChai);

describe("Testing Reducer: sessionReducer", () => {
  const initState = {
    sessionId: "58008",
    isFetching: false,
    error: null,
    guestBookingError: null,
  };
  describe("On init", () => {
    it("should have a sessionId property", () => {
      const state = sessionReducer(initState, { type: "init" });
      expect(state.sessionId).to.equal("58008");
    });
    it("should have a isFetching property", () => {
      const state = sessionReducer(initState, { type: "init" });
      expect(state.isFetching).to.equal(false);
    });
    it("should have an error property", () => {
      const state = sessionReducer(initState, { type: "init" });
      expect(state.error).to.equal(null);
    });
    it("should have a guestBookingError property", () => {
      const state = sessionReducer(initState, { type: "init" });
      expect(state.guestBookingError).to.equal(null);
    });
  });
  describe("action: createSession", () => {
    it("should set isFetching to true", () => {
      const state = sessionReducer(initState, actions.createSession({
        token: "0000000",
        firstName: "Darth",
        lastName: "Vader",
        dateOfBirth: "1979",
        mobile: "000111000",
        organisationId: "DEATHSTAR",
        pmsUserId: "SITH LORD",
        appointmentId: "LIGHTSABER BATTLE",
        time: "now",
        note: "Come to the dark side",
        sessionId: "11111111",
      }));
      expect(state.isFetching).to.equal(true);
    });
    it("should leave sessionId as it is", () => {
      const state = sessionReducer(initState, actions.createSession({
        token: "0000000",
        firstName: "Darth",
        lastName: "Vader",
        dateOfBirth: "1979",
        mobile: "000111000",
        organisationId: "DEATHSTAR",
        pmsUserId: "SITH LORD",
        appointmentId: "LIGHTSABER BATTLE",
        time: "now",
        note: "Come to the dark side",
        sessionId: "11111111",
      }));
      expect(state.sessionId).to.equal("58008");
    });
    it("should set error to null", () => {
      const state = sessionReducer(initState, actions.createSession({
        token: "0000000",
        firstName: "Darth",
        lastName: "Vader",
        dateOfBirth: "1979",
        mobile: "000111000",
        organisationId: "DEATHSTAR",
        pmsUserId: "SITH LORD",
        appointmentId: "LIGHTSABER BATTLE",
        time: "now",
        note: "Come to the dark side",
        sessionId: "11111111",
      }));
      expect(state.error).to.equal(null);
    });
  });
  describe("action: createSessionSuccess", () => {
    it("should set isFetching to false", () => {
      const state = sessionReducer(initState, actions.createSessionSuccess("BAZINGA!"));
      expect(state.isFetching).to.equal(false);
    });
    it("should set sessionId to a string", () => {
      const state = sessionReducer(initState, actions.createSessionSuccess("BAZINGA!"));
      expect(state.sessionId).to.equal("BAZINGA!");
    });
    it("should set error to null", () => {
      const state = sessionReducer(initState, actions.createSessionSuccess("BAZINGA!"));
      expect(state.error).to.equal(null);
    });
  });
  describe("action: createSessionFailure", () => {
    it("should set isFetching to false", () => {
      const state = sessionReducer(initState, actions.createSessionFailure("MAYDAY"));
      expect(state.isFetching).to.equal(false);
    });
    it("should set sessionId to empty", () => {
      const state = sessionReducer(initState, actions.createSessionFailure("MAYDAY"));
      expect(state.sessionId).to.equal("58008");
    });
    it("should set the error", () => {
      const state =
        sessionReducer(initState, actions.createSessionFailure("MAYDAY"));
      expect(state.error).to.equal("MAYDAY");
    });
  });
});
