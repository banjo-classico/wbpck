import React, { Component, PropTypes } from "react";
import classnames from "classnames";
import moment from "moment";

import styles from "./basicInfoForm.css";
import InputWithError from "../inputError";
import DateLabel from "../DateLabel";
import {
  isValidDate,
  getErrorMessage,
  dateBlurOutput,
  dateDelimeter,
} from "../../libs/Dates";
import { isValidMobile, isValidName, isValidBasicInfo } from "../../libs/ValidBasicInfo";
import { isDesktop } from "../../config";

class BasicInfoForm extends Component {
  static propTypes = {
    onValid: PropTypes.func,
    allowUnderage: PropTypes.bool,
    onlyUnderAge: PropTypes.bool,
    submit: PropTypes.func.isRequired,
    className: PropTypes.string,
    firstName: PropTypes.string,
    onStateChange: PropTypes.func,
    lastName: PropTypes.string,
    birthday: PropTypes.string,
    phone: PropTypes.string,
    firstNameRequired: PropTypes.bool,
    lastNameRequired: PropTypes.bool,
    birthdayRequired: PropTypes.bool,
    phoneRequired: PropTypes.bool,
    buttons: PropTypes.node,
  }
  static defaultProps = {
    firstNameRequired: true,
    lastNameRequired: true,
    birthdayRequired: true,
    phoneRequired: true,
  }

  constructor(props) {
    super(props);
    this.changeState = this.changeState.bind(this);
    this.hasValue = this.hasValue.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.onLabelClick = this.onLabelClick.bind(this);
    this.validateForm = this.validateForm.bind(this);
    this.isValidFirstName = this.isValidFirstName.bind(this);
    this.isValidLastName = this.isValidLastName.bind(this);
    this.isValidDate = this.isValidDate.bind(this);
    this.isValidMobile = this.isValidMobile.bind(this);
    this.clearNameError = this.clearNameError.bind(this);
    this.clearSurnameError = this.clearSurnameError.bind(this);
    this.clearBirthdayError = this.clearBirthdayError.bind(this);
    this.clearPhoneError = this.clearPhoneError.bind(this);
    this.handleDateChange = this.handleDateChange.bind(this);
  }
  state = {
    name: this.props.firstName || "",
    surname: this.props.lastName || "",
    birthday: this.props.birthday ?
      moment(this.props.birthday, "YYYY-MM-DD").format("DD-MM-YYYY") : "",
    phone: this.props.phone || "",
    nameError: null,
    surnameError: null,
    birthdayError: null,
    phoneError: null,
  }
  componentWillMount() {
    this.validateForm();
  }
  onLabelClick(inputName) {
    return () => {
      this[inputName].focus();
    };
  }
  getInfo() {
    return {
      name: this.state.name,
      surname: this.state.surname,
      birthday: moment(this.state.birthday, ["DD-MM-YYYY", "DD/MM/YYYY"]).format("YYYY-MM-DD"),
      phone: this.state.phone,
    };
  }
  changeState(newState) {
    this.setState(newState, () => this.validateForm());
  }
  handleChange(key) {
    return (e) => {
      this.changeState({ [key]: e.target.value });
    };
  }
  handleDateChange(e) {
    const date = dateDelimeter(e.target.value);
    this.changeState({ birthday: date });
  }
  clearNameError() {
    this.changeState({ nameError: null });
  }
  clearSurnameError() {
    this.changeState({ surnameError: null });
  }
  clearBirthdayError() {
    this.changeState({ birthdayError: null });
  }
  clearPhoneError() {
    this.changeState({ phoneError: null });
  }
  hasValue(key) {
    return this.state[key];
  }
  validateForm() {
    const isValidForm =
    isValidBasicInfo(
      this.state.name,
      this.state.surname,
      dateBlurOutput(this.state.birthday),
      this.state.phone,
      this.props.allowUnderage,
      this.props.onlyUnderAge,
      this.props.firstNameRequired,
      this.props.lastNameRequired,
      this.props.birthdayRequired,
      this.props.phoneRequired,
    );
    if (this.props.onValid) {
      this.props.onValid(isValidForm);
    }
    return isValidForm;
  }
  isValidMobile() {
    return isValidMobile(this.state.phone, this.props.phoneRequired);
  }
  isValidDate() {
    return isValidDate(
      dateBlurOutput(this.state.birthday),
      this.props.allowUnderage,
      this.props.onlyUnderAge,
      this.props.birthdayRequired,
    );
  }
  isValidFirstName() {
    return isValidName(this.state.name, this.props.firstNameRequired);
  }
  isValidLastName() {
    return isValidName(this.state.surname, this.props.lastNameRequired);
  }
  handleSubmit(e) {
    e.preventDefault();
    if (!this.isValidFirstName()) {
      this.changeState({ nameError: "Invalid First Name." });
    } else if (!this.isValidLastName()) {
      this.changeState({ surnameError: "Invalid Last Name." });
    } else if (!this.isValidDate(this.state.birthday)) {
      this.changeState({
        birthdayError: getErrorMessage(this.state.birthday, this.props.onlyUnderAge),
      });
    } else if (!this.isValidMobile()) {
      this.changeState({ phoneError: "Invalid Mobile, Please enter a valid NZ mobile number." });
    } else {
      if (this.props.submit) this.props.submit(this.getInfo());
      return true;
    }
    return false;
  }
  render() {
    return (
      <form
        ref={c => { this.form = c; }}
        className={classnames(styles.form, this.props.className)}
        onSubmit={this.handleSubmit}
        noValidate
      >
        <div className={styles.container}>
          <div className={styles.item}>
            <span
              className={styles.label}
              onClick={this.onLabelClick("nameInput")}
            >name</span>
            <InputWithError
              required
              className={classnames(styles.input, { [styles.filled]: this.hasValue("name") })}
              type="text"
              inputRef={c => { this.nameInput = c; }}
              value={this.state.name}
              onChange={this.handleChange("name")}
              onFocus={this.clearNameError}
              onErrorClick={this.clearNameError}
              isError={this.state.nameError}
              errorMessage={this.state.nameError}
            />
          </div>
          <div className={styles.item}>
            <span
              className={styles.label}
              onClick={this.onLabelClick("surnameInput")}
            >surname</span>
            <InputWithError
              className={classnames(styles.input, { [styles.filled]: this.hasValue("surname") })}
              type="text"
              inputRef={c => { this.surnameInput = c; }}
              value={this.state.surname}
              onChange={this.handleChange("surname")}
              onFocus={this.clearSurnameError}
              onErrorClick={this.clearSurnameError}
              isError={this.state.surnameError}
              errorMessage={this.state.surnameError}
            />
          </div>
          { isDesktop() ?
            <div className={styles.desktopInputContainer}>
              <div className={styles.item}>
                <DateLabel
                  className={styles.label}
                  onClick={this.onLabelClick("dateInput")}
                />
                <InputWithError
                  className={classnames(
                    styles.dateInput,
                    { [styles.filled]: this.hasValue("birthday") }
                  )}
                  type="text"
                  inputRef={c => { this.dateInput = c; }}
                  value={this.state.birthday}
                  onChange={this.handleDateChange}
                  onFocus={this.clearBirthdayError}
                  onErrorClick={this.clearBirthdayError}
                  isError={this.state.birthdayError}
                  errorMessage={this.state.birthdayError}
                />
              </div>
              <div className={styles.item}>
                <span
                  className={styles.label}
                  onClick={this.onLabelClick("phoneInput")}
                >mobile phone number</span>
                <InputWithError
                  className={classnames(styles.input, { [styles.filled]: this.hasValue("phone") })}
                  type="tel"
                  inputRef={c => { this.phoneInput = c; }}
                  value={this.state.phone}
                  onChange={this.handleChange("phone")}
                  onFocus={this.clearPhoneError}
                  onErrorClick={this.clearPhoneError}
                  isError={this.state.phoneError}
                  errorMessage={this.state.phoneError}
                />
              </div>
            </div> :
            <div className={styles.item}>
              <DateLabel
                className={styles.label}
                onClick={this.onLabelClick("dateInput")}
              />
              <InputWithError
                className={classnames(styles.input, { [styles.filled]: this.hasValue("birthday") })}
                type="text"
                inputRef={c => { this.dateInput = c; }}
                value={this.state.birthday}
                onChange={this.handleDateChange}
                onFocus={this.clearBirthdayError}
                onErrorClick={this.clearBirthdayError}
                isError={this.state.birthdayError}
                errorMessage={this.state.birthdayError}
              />
            </div>
          }
          {isDesktop() ? null :
          <div className={styles.item}>
            <span
              className={styles.label}
              onClick={this.onLabelClick("phoneInput")}
            >mobile phone number</span>
            <InputWithError
              className={classnames(styles.input, { [styles.filled]: this.hasValue("phone") })}
              type="tel"
              inputRef={c => { this.phoneInput = c; }}
              value={this.state.phone}
              onChange={this.handleChange("phone")}
              onFocus={this.clearPhoneError}
              onErrorClick={this.clearPhoneError}
              isError={this.state.phoneError}
              errorMessage={this.state.phoneError}
            />
          </div>
          }
        </div>
        {this.props.buttons}
      </form>
    );
  }
}
export default BasicInfoForm;
export {
  styles,
};
