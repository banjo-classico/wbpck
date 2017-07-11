import React from "react";
import chai, { expect } from "chai";
import dirtyChai from "dirty-chai";
import { shallow } from "enzyme";

chai.use(dirtyChai);

import NDigitInput, { styles } from "./index";

describe("Testing Component: NDigitInput", () => {
  let nDigitInput;
  let props;
  let instance;
  let timesRun;

  beforeEach(() => {
    timesRun = 0;
    props = {
      digits: 4,
      clearError: () => {timesRun ++},
    };
    nDigitInput = shallow(<NDigitInput {...props} />);
    instance = nDigitInput.instance();
  });
  describe("On init:", () => {
    it("should have n number of inputs", () => {
      expect(nDigitInput.children().find("input")).to.have.length(props.digits);
    });
    it("should auto focus on the first item", () => {
      expect(nDigitInput.state().focusIndex).to.equal(0);
    });
  });
  describe("method: onFocus", () => {
    it("should set the focus index", () => {
      instance.onFocus(props.digits - 1)();
      expect(nDigitInput.state().focusIndex).to.equal(props.digits - 1);
    });
    it("should not allow you to set the focus on an element that does not exist", () => {
      nDigitInput.setState({ focusIndex: 1 });
      instance.onFocus(9)();
      expect(nDigitInput.state().focusIndex).to.equal(1);
    });
  });
  describe("method: getDigits", () => {
    beforeEach(() => {
      instance.input = {
        0: { value: "1" },
        1: { value: "2" },
        2: { value: "3" },
        3: { value: "4" },
      };
    });
    it("should concatinate the values of the digits", () => {
      expect(instance.getDigits()).to.equal("1234");
    });
  });
  describe("method: onKeyPress", () => {
    let times;
    let event;
    beforeEach(() => {
      instance.input = {
        0: { value: "" },
        1: { value: "" },
        2: { value: "" },
        3: { value: "" },
      };
      times = 0;
      event = {
        preventDefault: () => { times++; },
        key: "1",
      };
    });
    it("should not prevent default if there is a digit pressed", () => {
      instance.onKeyPress(1)(event);
      expect(times).to.equal(0);
    });
    it("should prevent default if the key pressed is not a digit", () => {
      event.key = "t";
      instance.onKeyPress(1)(event);
      expect(times).to.equal(1);
    });
    it("should clear the item if there is already one item in the input", () => {
      instance.input[1].value = "6";
      instance.onKeyPress(1)(event);
      expect(instance.input[1].value).to.equal("");
    });
  });
  describe("method: onChange", () => {
    let times;
    let focusTimes;
    let selectTimes;
    let blurTimes;
    beforeEach(() => {
      instance.input = {
        0: {
          value: "1",
          focus: () => { focusTimes[0] ++; },
          setSelectionRange: () => { selectTimes[0] ++; },
          blur: () => { blurTimes[0] ++; },
        },
        1: {
          value: "2",
          focus: () => { focusTimes[1] ++; },
          setSelectionRange: () => { selectTimes[1] ++; },
          blur: () => { blurTimes[1] ++; },
        },
        2: {
          value: "3",
          focus: () => { focusTimes[2] ++; },
          setSelectionRange: () => { selectTimes[2] ++; },
          blur: () => { blurTimes[2] ++; },
        },
        3: {
          value: "4",
          focus: () => { focusTimes[3] ++; },
          setSelectionRange: () => { selectTimes[3] ++; },
          blur: () => { blurTimes[3] ++; },
        },
      };
      times = 0;
      selectTimes = {
        0: 0,
        1: 0,
        2: 0,
        3: 0,
      };
      focusTimes = {
        0: 0,
        1: 0,
        2: 0,
        3: 0,
      };
      blurTimes = {
        0: 0,
        1: 0,
        2: 0,
        3: 0,
      };
      nDigitInput.setState({ focusIndex: 0 });
    });
    it("should set the focus index to the next input", () => {
      instance.onChange(1)();
      expect(nDigitInput.state().focusIndex).to.equal(1);
    });
    it("should keep the focus index the same if the focused item is last", () => {
      nDigitInput.setState({ focusIndex: props.digits - 1 });
      instance.onChange(1)();
      expect(nDigitInput.state().focusIndex).to.equal(props.digits - 1);
    });
    it("should blur the last input when the focuses item is last", () => {
      nDigitInput.setState({ focusIndex: props.digits - 1 });
      instance.onChange(1)();
      expect(blurTimes[3]).to.equal(1);
    });
    it("should run focus on the next focused index", () => {
      instance.onChange(0)();
      expect(focusTimes[1]).to.equals(1);
      expect(selectTimes[1]).to.equals(1);
    });
    it("should not run focus on any other index", () => {
      instance.onChange(0)();
      expect(focusTimes[0]).to.equals(0);
      expect(focusTimes[2]).to.equals(0);
      expect(focusTimes[3]).to.equals(0);
      expect(selectTimes[0]).to.equals(0);
      expect(selectTimes[2]).to.equals(0);
      expect(selectTimes[3]).to.equals(0);
    });
    it("keep the state the same if the focus index is 0 and the value is empty", () => {
      nDigitInput.setState({ focusIndex: 0 });
      instance.input[0].value = "";
      instance.onChange(0)();
      expect(nDigitInput.state().focusIndex).to.equal(0);
    });
    it("should change focus down if the value is empty", () => {
      instance.input[1].value = "";
      instance.onChange(1)();
      expect(nDigitInput.state().focusIndex).to.equal(0);
    });
    it("should run the onChange fn if it is provided with the digits", () => {
      let digits = null;
      nDigitInput.setProps({ ...props, onChange: (a) => { digits = a; } });
      instance.onChange(0)();
      expect(digits).to.equal("1234");
    });
  });
  describe("method: onKeyDown", () => {
    let times;
    let event;
    let selectTimes;
    let focusTimes;
    beforeEach(() => {
      event = {
        preventDefault: () => { times ++ },
        key: "Backspace",
      }
      times = 0;
      instance.input = {
        0: {
          value: "1",
          focus: () => { focusTimes[0] ++; },
          setSelectionRange: () => { selectTimes[0] ++; },
        },
        1: {
          value: "2",
          focus: () => { focusTimes[1] ++; },
          setSelectionRange: () => { selectTimes[1] ++; },
        },
        2: {
          value: "3",
          focus: () => { focusTimes[2] ++; },
          setSelectionRange: () => { selectTimes[2] ++; },
        },
        3: {
          value: "4",
          focus: () => { focusTimes[3] ++; },
          setSelectionRange: () => { selectTimes[3] ++; },
        },
      };
      selectTimes = {
        0: 0,
        1: 0,
        2: 0,
        3: 0,
      };
      focusTimes = {
        0: 0,
        1: 0,
        2: 0,
        3: 0,
      };
      nDigitInput.setState({ focusIndex: 0 });
    });
    it("should not do anything if the backspace key is not pressed", () => {
      event.key = "hello"
      instance.onKeyDown(1)(event);
      expect(times).to.equal(0);
      expect(selectTimes[0]).to.equals(0);
      expect(selectTimes[1]).to.equals(0);
      expect(selectTimes[2]).to.equals(0);
      expect(selectTimes[3]).to.equals(0);
      expect(focusTimes[0]).to.equals(0);
      expect(focusTimes[1]).to.equals(0);
      expect(focusTimes[2]).to.equals(0);
      expect(focusTimes[3]).to.equals(0);
    });
    it("should run the onChange fn if it is provided with the digits", () => {
      let digits = null;
      nDigitInput.setProps({ ...props, onChange: (a) => { digits = a; } });
      instance.onChange(0)();
      expect(digits).to.equal("1234");
    });
    it("should not do anything if the selected input has a value", () => {
      instance.onKeyDown(1)(event)
      expect(times).to.equal(0);
      expect(selectTimes[0]).to.equals(0);
      expect(selectTimes[1]).to.equals(0);
      expect(selectTimes[2]).to.equals(0);
      expect(selectTimes[3]).to.equals(0);
      expect(focusTimes[0]).to.equals(0);
      expect(focusTimes[1]).to.equals(0);
      expect(focusTimes[2]).to.equals(0);
      expect(focusTimes[3]).to.equals(0);
    });
    it("should change focus to the previous input if the input is empty and backspace is pressed", () => {
      nDigitInput.setState({ focusIndex: 1 });
      instance.input[1].value = "";
      instance.onKeyDown(1)(event)
      expect(times).to.equal(1);
      expect(nDigitInput.state().focusIndex).to.equal(0);
    });
  });
});
