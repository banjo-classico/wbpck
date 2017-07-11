import React from "react";
import chai, { expect } from "chai";
import dirtyChai from "dirty-chai";
import { shallow } from "enzyme";

chai.use(dirtyChai);

import PageNav, { styles } from "./index";

describe("Testing Component: PageNav", () => {
  let pageNav;
  let props;
  beforeEach(() => {
    props = {
      total: 5,
      currentIndex: 2,
    };
    pageNav = shallow(<PageNav {...props} />);
  });
  it("should have the correct number of items", () => {
    expect(pageNav.children()).to.have.length(props.total);
  });
  it("should set the selected classname on the currently selected item", () => {
    expect(pageNav.childAt(props.currentIndex).hasClass(styles.selected));
  });
  it("should not set the selected classname on unselected childern", () => {
    const children = pageNav.children();
    const unSelectedChildren = children.filterWhere(c => !c.hasClass(styles.selected));
    expect(unSelectedChildren).to.have.length(props.total - 1);
  });
});
