import React, { Component, PropTypes } from "react";
import classnames from "classnames";
import moment from "moment";
import isMobilePhone from "validator/lib/isMobilePhone";

import TnC from "../../../../components/TnC";
import InputWithError from "../../../../components/inputError";
import Tick from "../../../../svgs/tick.svg";
import {
  isValidDate,
  getErrorMessage,
  isUnderAge,
  isInFuture,
  toServerFormat,
  dateDelimeter,
  dateBlurOutput,
} from "../../../../libs/Dates";
import CircleCheckbox from "../../../../components/CircleCheckbox";
import NextButton from "../NextButton";
import DobInput from "../DobInput";
import styles from "./patientDetailsForm.css";
import { isDesktop } from "../../../../config";
import RightArrow from "../../../../svgs/rightarrow.svg";
import CtaButton from "../../../../components/CtaButton";

class PatientDetailsForm extends Component {
  static propTypes = {
    isBookingForSomeoneElse: PropTypes.bool.isRequired,
    goToReasonForVisit: PropTypes.func.isRequired,
    addDetails: PropTypes.func.isRequired,
    addGuardianDetails: PropTypes.func.isRequired,
    clearGuardianDetails: PropTypes.func.isRequired,
    checkEnrollment: PropTypes.func.isRequired,
    login: PropTypes.func.isRequired,
    goToPatientSelection: PropTypes.func.isRequired,
    isEnrolled: PropTypes.bool.isRequired,
    isChecking: PropTypes.bool.isRequired,
    time: PropTypes.string,
    doctorId: PropTypes.string,
    practiceId: PropTypes.string,
    enrolledError: PropTypes.object,
    isLoggedIn: PropTypes.string,
    firstName: PropTypes.string,
    lastName: PropTypes.string,
    birthday: PropTypes.string,
    phone: PropTypes.string,
  }
  state = {
    name: this.props.firstName || "",
    surname: this.props.lastName || "",
    birthday: this.props.birthday ?
      moment(this.props.birthday, "YYYY-MM-DD").format("DD-MM-YYYY") : "",
    phone: this.props.phone || "",
    nameError: null,
    surnameError: null,
    birthdayError: {},
    phoneError: null,
  }
  componentWillMount() {
    if (this.props.birthday) {
      if (!isValidDate(moment(this.props.birthday), this.props.isBookingForSomeoneElse)) {
        this.setBirthdayError(this.props.birthday);
      }
    }
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.isEnrolled !== this.props.isEnrolled) {
      this.props.addDetails(this.getInfo());
      this.props.goToReasonForVisit();
    }
  }
  onLabelClick = (inputName) => () => {
    this[inputName].focus();
  }
  getInfo = () => ({
    name: this.state.name,
    surname: this.state.surname,
    birthday: moment(this.state.birthday, ["DD-MM-YYYY", "DD/MM/YYYY"]).format("YYYY-MM-DD"),
    phone: this.state.phone,
  })
  setBirthdayError = (birthday) => {
    this.setState({
      birthdayError: {
        message: getErrorMessage(birthday),
        isUnderAge: !isInFuture(birthday) && isUnderAge(birthday),
      },
    });
  }
  handleChange = (key) => (e) => {
    this.setState({ [key]: e.target.value });
  }
  handleDateChange = () => (e) => {
    const output = dateDelimeter(e.target.value);
    this.setState({ birthday: output });
  }
  clearNameError = () => {
    this.setState({ nameError: null });
  }
  clearSurnameError = () => {
    this.setState({ surnameError: null });
  }
  clearBirthdayError = () => {
    this.setState({ birthdayError: {} });
  }
  clearPhoneError = () => {
    this.setState({ phoneError: null });
  }
  hasValue = (key) => this.state[key];
  validateForm = () => this.allDetailsFilled();
  allDetailsFilled = () => (
    this.isValidMobile() &&
    this.isValidDate(this.state.birthday) &&
    this.isValidFirstName() &&
    this.isValidLastName()
  )
  isValidMobile = () => isMobilePhone(this.state.phone, "en-NZ");
  isValidDate = (date) => isValidDate(date, this.props.isBookingForSomeoneElse);
  isValidFirstName = () => this.state.name.length;
  isValidLastName = () => this.state.surname.length;
  checkEnrollment = () => {
    this.props.checkEnrollment(
      this.state.name,
      this.state.surname,
      toServerFormat(this.state.birthday),
      this.state.phone,
      this.props.time,
      this.props.practiceId,
      this.props.doctorId,
    );
  }
  handleSubmit = (e) => {
    e.preventDefault();
    this.props.clearGuardianDetails();
    if (!this.isValidFirstName()) {
      this.setState({ nameError: "Invalid First Name." });
    } else if (!this.isValidLastName()) {
      this.setState({ surnameError: "Invalid Last Name." });
    } else if (!this.isValidDate(this.state.birthday)) {
      this.setBirthdayError(this.state.birthday);
    } else if (!this.isValidMobile()) {
      this.setState({ phoneError: "Invalid Mobile, Please enter a valid NZ mobile number." });
    } else if (this.props.enrolledError) {
      return;
    } else {
      this.checkEnrollment();
    }
  }
  handleBackClick = (e) => {
    e.preventDefault();
    this.props.goToPatientSelection();
  }
  dateOfBirthBlur = (e) => {
    const birthday = dateBlurOutput(e.target.value);
    if (this.isValidDate(birthday)) {
      this.clearBirthdayError();
    } else {
      this.setBirthdayError(birthday);
    }
  }
  render() {
    const backButton = this.props.isLoggedIn ? (
      <a
        className={styles.navLinkLarge}
        onClick={this.handleBackClick}
      >
        <RightArrow className={styles.backwardArrow} />
        <span>Back</span>
      </a>
    ) : (
      <div className={styles.loginText}>
        Already with us?
        <a className={styles.loginLink} onClick={this.props.login}>Log In</a>
      </div>
    );

    return (
      <form
        ref={c => { this.form = c; }}
        className={styles.form}
        onSubmit={this.handleSubmit}
        name="detailsForm"
        noValidate
      >
        <div className={classnames(styles.shadow, { [styles.completed]: this.allDetailsFilled() })}>
          <div className={styles.title}>
            {
              this.allDetailsFilled() ?
                <Tick className={styles.tick} /> :
                <CircleCheckbox selected className={styles.icon} />
            }
            Patient Details
          </div>
          <div className={styles.item}>
            <span
              className={classnames(styles.label, { [styles.filledLabel]: this.hasValue("name") })}
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
              className={classnames(
                styles.label,
                { [styles.filledLabel]: this.hasValue("surname") }
              )}
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
          {
            isDesktop() ? <div className={styles.desktopInputContainer}>
              <DobInput
                containerClassName={styles.item}
                labelClassName={classnames(
                  styles.label,
                  { [styles.filledLabel]: this.hasValue("birthday") }
                )}
                onLabelClick={this.onLabelClick("dateInput")}
                inputClassName={
                  classnames(
                    styles.dateInput,
                    { [styles.filled]: this.hasValue("birthday") }
                  )
                }
                inputRef={c => { this.dateInput = c; }}
                value={this.state.birthday}
                onChange={this.handleDateChange()}
                onBlur={this.dateOfBirthBlur}
                clearError={this.clearBirthdayError}
                error={this.state.birthdayError}
                isBookingAsGuest={!this.props.isBookingForSomeoneElse}
                onClick={() => this.props.addGuardianDetails(this.getInfo())}
              />
              <div className={styles.item}>
                <span
                  className={classnames(
                    styles.label,
                    { [styles.filledLabel]: this.hasValue("phone") }
                  )}
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
            <DobInput
              containerClassName={styles.item}
              labelClassName={styles.label}
              onLabelClick={this.onLabelClick("dateInput")}
              inputClassName={
                classnames(styles.input, { [styles.filled]: this.hasValue("birthday") })
              }
              inputRef={c => { this.dateInput = c; }}
              value={this.state.birthday}
              onChange={this.handleDateChange()}
              onBlur={this.dateOfBirthBlur}
              clearError={this.clearBirthdayError}
              error={this.state.birthdayError}
              isBookingAsGuest={!this.props.isBookingForSomeoneElse}
              onClick={() => this.props.addGuardianDetails(this.getInfo())}
            />
          }
          {
            (isDesktop() || this.state.birthdayError.isUnderAge) ? null :
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
        {
          (() => {
            if (this.state.birthdayError.isUnderAge && isDesktop()) { return null; }
            if (this.props.isBookingForSomeoneElse) {
              return null;
            }
            return (<TnC
              className={classnames(styles.faded, { [styles.condition]: this.allDetailsFilled() })}
            />);
          })()
        }
        <button type="submit" className={styles.hidden} />
        <div className={styles.nextContainer}>
          {isDesktop() && backButton}
          {isDesktop() ?
            <NextButton
              login={this.props.login}
              ref={c => { this.nextButton = c; }}
              onClick={this.handleSubmit}
              isFormValid={this.validateForm()}
              isLoggedIn={this.props.isLoggedIn}
              isError={this.state.birthdayError.isUnderAge}
              isChecking={this.props.isChecking}
            /> :
            <CtaButton
              onClick={this.handleSubmit}
              active={this.validateForm()}
            />
          }
        </div>
      </form>
    );
    // button is for submit on enter
  }
}
export default PatientDetailsForm;
