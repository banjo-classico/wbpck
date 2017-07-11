import React from "react";
import { connect } from "react-redux";
import chai, { expect } from "chai";
import dirtyChai from "dirty-chai";
import { shallow } from "enzyme";

chai.use(dirtyChai);

import {AutoRegisterPage} from "./index";

describe("Testing Component: AutoRegisterPage", () => {
  let autoRegisterPage;
  let autoRegisterUser;
  let props;
  let instance;

  beforeEach(() => {
    props = {
      sessionId: "1",
      autoRegisterUser: sinon.spy(),
    };
    autoRegisterPage = shallow(<AutoRegisterPage {...props} />);
    instance = autoRegisterPage.instance()
  });
  describe("Method - register", () => {
    it("should run the autoRegisterUser fn with email, sessionId, and password", () => {
      instance.register("email", "password")
      sinon.assert.calledOnce(props.autoRegisterUser)
      sinon.assert.calledWith(props.autoRegisterUser, "email", "1", "password")
    })
  })
});
