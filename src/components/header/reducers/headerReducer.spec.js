import React from "react";
import chai, { expect } from "chai";
import dirtyChai from "dirty-chai";

import headerReducer from "./headerReducer";
import { actions } from "../actions/actions";
import Logo from "../components/Logo";
import styles from "../header.css";

chai.use(dirtyChai);

describe("Testing headerReducer: ", () => {
  let initState;
  beforeEach(() => {
    initState = headerReducer(undefined, { type: "init" });
  });
  describe("actions: setHeading", () => {
    it("should set the heading", () => {
      const state = headerReducer(initState, actions.setHeading("hi"));
      expect(state.heading).to.equal("hi");
    });
  });
  describe("actions: clearHeading", () => {
    it("should clear the heading", () => {
      const newState = { ...initState, heading: "wassupp peeps" };
      const state = headerReducer(newState, actions.clearHeading());
      expect(state.heading).to.deep.equal(<Logo />);
    });
  });
  describe("actions: addStyles", () => {
    it("should add header styles", () => {
      const styles = ["hi", "i", "am", "styles"];
      const state = headerReducer(initState, actions.addStyles(styles));
      expect(state.headerClassNames).to.eql(styles);
    });
    it("should add arrow styles", () => {
      const styles = ["hi", "i", "am", "styles"];
      const state = headerReducer(initState, actions.addStyles([], styles));
      expect(state.arrowClassNames).to.eql(styles);
    });
    it("should add menuIcon styles", () => {
      const styles = ["hi", "i", "am", "styles"];
      const state = headerReducer(initState, actions.addStyles([], [], styles));
      expect(state.menuIconClassNames).to.eql(styles);
    });
    it("should add help styles", () => {
      const styles = ["hi", "i", "am", "styles"];
      const state = headerReducer(initState, actions.addStyles([], [], [], styles));
      expect(state.helpClassNames).to.eql(styles);
    });
    it("should add all the styles", () => {
      const styles = ["hi", "i", "am", "styles"];
      const state = headerReducer(initState, actions.addStyles(styles, styles, styles, styles));
      expect(state.headerClassNames).to.eql(styles);
      expect(state.arrowClassNames).to.eql(styles);
      expect(state.menuIconClassNames).to.eql(styles);
      expect(state.helpClassNames).to.eql(styles);
    });
  });
  describe("actions: clear the styles", () => {
    it("should clear styles", () => {
      const styles = ["hi", "i", "am", "styles"];
      const newState = {
        ...initState,
        headerClassNames: styles,
        arrowClassNames: styles,
        menuIconClassNames: styles,
        helpClassNames: styles
      };
      const state = headerReducer(newState, actions.clearStyles());
      expect(state.headerClassNames).to.deep.equal([]);
      expect(state.arrowClassNames).to.deep.equal([]);
      expect(state.menuIconClassNames).to.deep.equal([]);
      expect(state.helpClassNames).to.deep.equal([]);
    });
  });
  describe("actions: setSecondLine", () => {
    it("should set the secondLine", () => {
      const state = headerReducer(initState, actions.setSecondLine("hi"));
      expect(state.secondLine).to.equal("hi");
    });
  });
  describe("actions: clearSecondLine", () => {
    it("should clear the heading", () => {
      const newState = { ...initState, secondLine: "wassupp peeps" };
      const state = headerReducer(newState, actions.clearSecondLine());
      expect(state.secondLine).to.deep.equal(null);
    });
  });
});
