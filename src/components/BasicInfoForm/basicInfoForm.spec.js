import React from "react";
import chai, { expect } from "chai";
import dirtyChai from "dirty-chai";
import { shallow } from "enzyme";
import { rewire$getErrorMessage, restore } from "../../libs/Dates"

chai.use(dirtyChai);

import BasicInfoForm from "./index";
describe("Testing Component: BasicInfoForm", () => {
  let basicInfoForm;
  let baseProps;
  let props;
  let instance;
  let submitSpy;

  beforeEach(() => {
    submitSpy = sinon.spy()
    baseProps = {
      allowUnderage: false,
      onlyUnderAge: false,
      submit: submitSpy,
    };
  });
  afterEach(() => {
    instance = undefined;
    basicInfoForm = undefined;
    submitSpy.reset()
  })
  describe("On - Init", () => {
    it("should start with empty state if not provided by props", () => {
      props = baseProps;
      basicInfoForm = shallow(<BasicInfoForm {...props} />);
      instance = basicInfoForm.instance()
      expect(instance.state.name).to.equal("");
      expect(instance.state.surname).to.equal("");
      expect(instance.state.birthday).to.equal("");
      expect(instance.state.phone).to.equal("");
    });
    it("should set state with values provided by props", () => {
      props = {...baseProps, firstName: "Name", lastName: "Surname", birthday: "29/02/1992"};
      basicInfoForm = shallow(<BasicInfoForm {...props} />);
      instance = basicInfoForm.instance()
      expect(instance.state.name).to.equal("Name");
      expect(instance.state.surname).to.equal("Surname");
      expect(instance.state.birthday).to.equal("29/02/1992");
      expect(instance.state.phone).to.equal("");
    });
  })
  describe("Method - onLabelClick", () => {
    beforeEach(() => {
      props = baseProps;
      basicInfoForm = shallow(<BasicInfoForm {...props} />);
      instance = basicInfoForm.instance()
    })
    it("should put focus on the associated input", () => {
      let timesRun = 0;
      instance.coolInput = {focus: () => timesRun++}
      instance.onLabelClick("coolInput")()
      expect(timesRun).to.equal(1)
    })
  })
  describe("Method - handleSubmit", () => {
    let event;
    let changeStateSpy;
    let firstNameStub;
    let lastNameStub;
    let dateStub;
    let mobileStub;

    beforeEach(() => {
      event = {preventDefault: () => {}}
      props = baseProps;
      basicInfoForm = shallow(<BasicInfoForm {...props} />);
      instance = basicInfoForm.instance()
      changeStateSpy = sinon.spy(instance, 'changeState')
      firstNameStub = sinon.stub(instance, 'isValidFirstName').returns(false)
      lastNameStub = sinon.stub(instance, 'isValidLastName').returns(false)
      dateStub = sinon.stub(instance, 'isValidDate').returns(false)
      mobileStub = sinon.stub(instance, 'isValidMobile').returns(false)
    })
    it("should set error when first name is invalid", () => {
      const value = instance.handleSubmit(event)
      sinon.assert.calledWith(changeStateSpy, { nameError: "Invalid First Name." })
      expect(value).to.be.false()
    })
    it("should set error when last name is invalid", () => {
      firstNameStub.returns(true)
      const value = instance.handleSubmit(event)
      sinon.assert.calledWith(changeStateSpy, { surnameError: "Invalid Last Name." })
      expect(value).to.be.false()
    })
    it("should set error when date is invalid", () => {
      rewire$getErrorMessage(sinon.stub().returns("hi"))
      firstNameStub.returns(true)
      lastNameStub.returns(true)
      const value = instance.handleSubmit(event)
      sinon.assert.calledWith(changeStateSpy, { birthdayError: "hi" })
      expect(value).to.be.false()
      restore()
    })
    it("should set error when mobile is invalid", () => {
      firstNameStub.returns(true)
      lastNameStub.returns(true)
      dateStub.returns(true)
      mobileStub.returns(false)
      const value = instance.handleSubmit(event)
      sinon.assert.calledWith(changeStateSpy, { phoneError: "Invalid Mobile, Please enter a valid NZ mobile number." })
      expect(value).to.be.false()
    })
    it("should return true when there are no errors", () => {
      firstNameStub.returns(true)
      lastNameStub.returns(true)
      dateStub.returns(true)
      mobileStub.returns(true)
      const value = instance.handleSubmit(event)
      expect(value).to.be.true()
    })
    it("should run submit method when there are no errors", () => {
      firstNameStub.returns(true)
      lastNameStub.returns(true)
      dateStub.returns(true)
      mobileStub.returns(true)
      instance.handleSubmit(event)
      sinon.assert.notCalled(changeStateSpy)
      sinon.assert.calledOnce(submitSpy)
    })
    it("should run submit method with getInfo when there are no errors", () => {
      firstNameStub.returns(true)
      lastNameStub.returns(true)
      dateStub.returns(true)
      mobileStub.returns(true)
      sinon.stub(instance, 'getInfo').returns("hello")
      instance.handleSubmit(event)
      sinon.assert.calledWith(submitSpy, "hello")
    })
  })
  describe("Method - getInfo", () => {
    it("should return all state details in correct format", () => {
      let props = baseProps;
      basicInfoForm = shallow(<BasicInfoForm {...props} />);
      instance = basicInfoForm.instance()
      const state = {
        name: "Some",
        surname: "Thing",
        birthday: "01/01/1950",
        phone: "0270009999",
      }
      basicInfoForm.setState(state)
      expect(instance.getInfo()).to.deep.equal(state)
    })
  })
});
