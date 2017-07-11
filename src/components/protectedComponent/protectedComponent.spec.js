import React from "react";
import chai, { expect } from "chai";
import dirtyChai from "dirty-chai";
import { shallow } from "enzyme";

chai.use(dirtyChai);

import ProtectedComponent from "./index";

describe("Testing Component: ProtectedComponent", () => {
  it("should not show the child if the predicate is false", () => {
    const predicate = false;
    const child = <div> hi </div>;
    const protectorFn = () => {};
    const protectedComponent = shallow(
      <ProtectedComponent
        protectorFn={protectorFn}
        predicate={predicate}
        children={child}
      />
    );
    expect(protectedComponent.matchesElement(child)).to.be.false();
  });
  it("should show the child if the predicate is true", () => {
    const predicate = true;
    const child = <div> hi </div>;
    const protectorFn = () => {};
    const protectedComponent = shallow(
      <ProtectedComponent
        protectorFn={protectorFn}
        predicate={predicate}
        children={child}
      />
    );
    expect(protectedComponent.matchesElement(child)).to.be.true();
  });

  it("should run the protector fn if the predicate is false", () => {
    let times = 0;
    const protectorFn = () => { times++; };
    const predicate = false;
    const child = <div> hi </div>;
    const protectedComponent = shallow(
      <ProtectedComponent
        protectorFn={protectorFn}
        predicate={predicate}
        children={child}
      />
    );
    expect(times).to.equal(1);
  });
  it("should not run the protector fn if the predicate is true", () => {
    let times = 0;
    const protectorFn = () => { times++; };
    const predicate = true;
    const child = <div> hi </div>;
    const protectedComponent = shallow(
      <ProtectedComponent
        protectorFn={protectorFn}
        predicate={predicate}
        children={child}
      />
    );
    expect(times).to.equal(0);
  });
});
