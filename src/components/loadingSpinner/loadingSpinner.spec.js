import React from "react";
import chai, { expect } from "chai";
import dirtyChai from "dirty-chai";
import { mount } from "enzyme";

import LoadingSpinner, { styles } from "./index";

chai.use(dirtyChai);

describe("Testing Component: LoadingSpinner", () => {
  const child = <div>I am child</div>;
  let isFetching = true;
  it("should show the spinner if isFetching is true", () => {
    const loadingSpinner = mount(<LoadingSpinner isFetching={isFetching} children={child} />);
    expect(loadingSpinner.find("." + styles.loadingIcon)).to.have.length(1);
  });
  it("should not show the spinner if isFetching is false", () => {
    isFetching = false;
    const loadingSpinner = mount(<LoadingSpinner isFetching={isFetching} children={child} />);
    expect(loadingSpinner.find("." + styles.loadingIcon)).to.have.length(0);
  });
  it("should render children passed in", () => {
    const loadingSpinner = mount(<LoadingSpinner isFetching={isFetching} children={child} />);
    expect(loadingSpinner.containsMatchingElement(child)).to.be.true();
  });
});
