import React, { Component, PropTypes } from "react";
import classnames from "classnames";
import isMobilePhone from "validator/lib/isMobilePhone";
import moment from "moment";

import InputWithError from "../../../../components/inputError";
import DateLabel from "../../../../components/DateLabel";
import Tick from "../../../../svgs/tick.svg";
import {
  isValidDate,
  getErrorMessage,
  dateBlurOutput,
  dateDelimeter,
} from "../../../../libs/Dates";
import CircleCheckbox from "../../../../components/CircleCheckbox";
import TnC from "../../../../components/TnC";
import RightArrow from "../../../../svgs/rightarrow.svg";
import styles from "./desktopGuardianForm.css";

class DesktopGuardianForm extends Component {

  static propTypes = {
    isBookingForSomeoneElse: PropTypes.bool.isRequired,
    goToReasonForVisit: PropTypes.func.isRequired,
    handleMinorSubmit: PropTypes.func.isRequired,
    addDetails: PropTypes.func.isRequired,
    checkEnrollment: PropTypes.func.isRequired,
    isEnrolled: PropTypes.bool.isRequired,
    isChecking: PropTypes.bool.isRequired,
    enrolledError: PropTypes.object,
    details: PropTypes.shape({
      name: PropTypes.string,
      surname: PropTypes.string,
      birthday: PropTypes.string,
      phone: PropTypes.string,
    }),
    minorDetails: PropTypes.shape({
      name: PropTypes.string,
      surname: PropTypes.string,
      birthday: PropTypes.string,
      phone: PropTypes.string,
    }),
    time: PropTypes.string,
    practiceId: PropTypes.string,
    doctorId: PropTypes.string,

  }

  constructor(props) {
    super(props);
    this.allDetailsFilled = this.allDetailsFilled.bind(this);
    this.hasValue = this.hasValue.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleDateChange = this.handleDateChange.bind(this);
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
    this.dateOfBirthBlur = this.dateOfBirthBlur.bind(this);
  }
  state = {
    name: this.props.details.name || "",
    surname: this.props.details.surname || "",
    birthday: this.props.details.birthday ?
      moment(this.props.details.birthday, "YYYY-MM-DD").format("DD-MM-YYYY") : "",
    phone: this.props.details.phone || "",
    nameError: null,
    surnameError: null,
    birthdayError: null,
    phoneError: null,
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.isEnrolled !== this.props.isEnrolled) {
      this.props.addDetails(
      this.state.name,
      this.state.surname,
      moment(this.state.birthday, ["DD-MM-YYYY", "DD/MM/YYYY"]).format("YYYY-MM-DD"),
      this.state.phone
    );
      this.props.goToReasonForVisit();
    }
  }
  onLabelClick(inputName) {
    return () => {
      this[inputName].focus();
    };
  }
  handleChange(key) {
    return (e) => {
      this.setState({ [key]: e.target.value });
    };
  }
  handleDateChange(e) {
    const output = dateDelimeter(e.target.value);
    this.setState({ birthday: output });
  }

  clearNameError() {
    this.setState({ nameError: null });
  }
  clearSurnameError() {
    this.setState({ surnameError: null });
  }
  clearBirthdayError() {
    this.setState({ birthdayError: null });
  }
  clearPhoneError() {
    this.setState({ phoneError: null });
  }
  hasValue(key) {
    return this.state[key];
  }
  validateForm() {
    return this.allDetailsFilled();
  }
  // this does not mean the form is valid, we user might not have accepted
  // ts and cs. This is for the tick
  allDetailsFilled() {
    return this.isValidMobile() &&
      this.isValidDate() &&
      this.isValidFirstName() &&
      this.isValidLastName();
  }
  isValidMobile() {
    return isMobilePhone(this.state.phone, "en-NZ");
  }
  isValidDate() {
    const date = dateBlurOutput(this.state.birthday);
    return isValidDate(date);
  }
  isValidFirstName() {
    return this.state.name.length;
  }
  isValidLastName() {
    return this.state.surname.length;
  }
  checkEnrollment() {
    this.props.checkEnrollment(
      this.props.minorDetails.name,
      this.props.minorDetails.surname,
      this.props.minorDetails.birthday,
      this.state.phone,
      this.props.time,
      this.props.practiceId,
      this.props.doctorId,
    );
  }
  handleSubmit(e) {
    e.preventDefault();
    if (this.props.handleMinorSubmit(e)) {
      if (!this.isValidFirstName()) {
        this.setState({ nameError: "Invalid First Name." });
      } else if (!this.isValidLastName()) {
        this.setState({ surnameError: "Invalid Last Name." });
      } else if (!this.isValidDate()) {
        this.setState({ birthdayError: getErrorMessage(this.state.birthday, false) });
      } else if (!this.isValidMobile()) {
        this.setState({ phoneError: "Invalid Mobile, Please enter a valid NZ mobile number." });
      } else if (this.props.enrolledError) {
        return;
      } else this.checkEnrollment();
    }
  }
  dateOfBirthBlur() {
    if (this.isValidDate()) {
      this.clearBirthdayError();
    } else {
      this.setBirthdayError();
    }
  }
  render() {
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
            Guardian Details
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
          </div>
        </div>
        <TnC
          ref={c => { this.tnc = c; }}
          tAndCError={this.state.conditionError}
          clearTAndCError={this.clearConditionError}
          onChange={this.clearConditionError}
          className={classnames(styles.faded, { [styles.condition]: this.allDetailsFilled() })}
          disabled={!this.allDetailsFilled()}
        />
        <button type="submit" className={styles.hidden} />
        <div className={styles.navContainer}>
          <a
            className={classnames(styles.fadedLink, { [styles.navLinkLarge]: this.validateForm() })}
            onClick={this.handleSubmit}
          >
            <span>Next</span>
            <RightArrow className={styles.forwardArrow} />
          </a>
        </div>
      </form>
    );
    // button is for submit on enter
  }
}
export default DesktopGuardianForm;
