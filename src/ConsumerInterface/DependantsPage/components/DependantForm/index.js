import React, { Component, PropTypes } from "react";
import isMobilePhone from "validator/lib/isMobilePhone";
import isEmail from "validator/lib/isEmail";
import moment from "moment";

import styles from "./dependantForm.css";
import RelationshipSelector from "../RelationshipSelector";
import DateLabel from "../../../../components/DateLabel";
import CtaButton from "../../../../components/CtaButton";
import InputWithError from "../../../../components/inputError";
import { dependantPropType } from "../../propTypes";
import {
  isValidDate,
  getErrorMessage,
  dateDelimeter,
  dateBlurOutput,
} from "../../../../libs/Dates";

class DependantForm extends Component {
  static propTypes = {
    addDependant: PropTypes.func.isRequired,
    onSubmit: PropTypes.func,
    token: PropTypes.string.isRequired,
    addCta: PropTypes.bool,
    addCustomIcon: PropTypes.func,
    clearCustomIcon: PropTypes.func,
    dependant: dependantPropType,
    addDependantSuccess: PropTypes.bool,
    preDataDependant: PropTypes.object,
  }
  constructor(props) {
    super(props);
    this.submit = this.submit.bind(this);
    this.validateForm = this.validateForm.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleDateChange = this.handleDateChange.bind(this);
    this.isValidFirstName = this.isValidFirstName.bind(this);
    this.isValidLastName = this.isValidLastName.bind(this);
    this.isValidDate = this.isValidDate.bind(this);
    this.isValidMobile = this.isValidMobile.bind(this);
    this.isValidEmail = this.isValidEmail.bind(this);
    this.clearFirstNameError = this.clearFirstNameError.bind(this);
    this.clearLastNameError = this.clearLastNameError.bind(this);
    this.clearDobError = this.clearDobError.bind(this);
    this.clearMobileError = this.clearMobileError.bind(this);
    this.clearEmailError = this.clearEmailError.bind(this);
    this.setRelationship = this.setRelationship.bind(this);
  }
  state = {
    firstName: this.props.dependant ? this.props.dependant.FirstName : "",
    firstNameError: null,
    lastName: this.props.dependant ? this.props.dependant.LastName : "",
    lastNameError: null,
    dob: this.props.dependant && this.props.dependant.DateOfBirth ?
      moment(this.props.dependant.DateOfBirth).format("DD-MM-YYYY") : "",
    dobError: null,
    mobile: this.props.dependant && this.props.dependant.Mobile ? this.props.dependant.Mobile : "",
    mobileError: null,
    relationship: this.props.dependant && this.props.dependant.Relationship ?
      this.props.dependant.Relationship : 0,
    email: this.props.dependant && this.props.dependant.Email ? this.props.dependant.Email : "",
    emailError: null,
  }
  componentDidMount() {
    if (this.props.addCustomIcon) {
      this.props.addCustomIcon(
        <button className={styles.button} onClick={this.submit}>SAVE</button>
      );
    }
  }
  componentWillUnmount() {
    if (this.props.clearCustomIcon) {
      this.props.clearCustomIcon();
    }
  }
  setRelationship(num) {
    this.setState({ relationship: num });
  }
  handleChange(key) {
    return (e) => {
      this.setState({ [key]: e.target.value });
    };
  }
  handleDateChange(e) {
    const output = dateDelimeter(e.target.value);
    this.setState({ dob: output });
  }
  submit(e) {
    e.preventDefault();
    if (!this.isValidFirstName()) {
      this.setState({ firstNameError: "Invalid First Name." });
    } else if (!this.isValidLastName()) {
      this.setState({ lastNameError: "Invalid Last Name." });
    } else if (!this.isValidDate()) {
      this.setState({ dobError: getErrorMessage(this.state.dob) });
    } else if (!this.isValidMobile()) {
      this.setState({ mobileError: "Invalid Mobile, Please enter a valid NZ mobile number." });
    } else if (!this.isValidEmail()) {
      this.setState({ emailError: "Invalid Email, Please enter a valid email." });
    } else if (!this.isValidRelationship()) {
      this.setRelationship(-1);
    } else {
      if (this.props.onSubmit) this.props.onSubmit();
      this.props.addDependant({
        firstName: this.state.firstName,
        lastName: this.state.lastName,
        dateOfBirth: moment(this.state.dob, ["DD-MM-YYYY", "DD/MM/YYYY"]),
        mobile: this.state.mobile,
        email: this.state.email,
        relationship: this.state.relationship,
        sessionId: this.props.dependant && this.props.dependant.SessionId,
        id: this.props.dependant ? this.props.dependant.Id : "",
      }, this.props.token);
    }
  }
  clearFirstNameError() {
    this.setState({ firstNameError: null });
  }
  clearLastNameError() {
    this.setState({ lastNameError: null });
  }
  clearDobError() {
    this.setState({ dobError: null });
  }
  clearMobileError() {
    this.setState({ mobileError: null });
  }
  clearEmailError() {
    this.setState({ emailError: null });
  }
  validateForm() {
    return this.isValidMobile() &&
      this.isValidDate() &&
      this.isValidFirstName() &&
      this.isValidLastName() &&
      this.isValidEmail() &&
      this.isValidRelationship();
  }
  isValidRelationship() {
    return this.state.relationship > 0;
  }
  isValidMobile() {
    if (this.state.mobile.length < 1) return true;
    return isMobilePhone(this.state.mobile, "en-NZ");
  }
  isValidEmail() {
    if (this.state.email.length < 1) return true;
    return isEmail(this.state.email);
  }
  isValidDate() {
    const date = dateBlurOutput(this.state.dob);
    return isValidDate(date, true);
  }
  isValidFirstName() {
    return this.state.firstName.length;
  }
  isValidLastName() {
    return this.state.lastName.length;
  }
  render() {
    return (
      <form onSubmit={this.submit} className={styles.form}>
        <span className={styles.label}>First Name</span>
        <InputWithError
          required
          onChange={this.handleChange("firstName")}
          onFocus={this.clearFirstNameError}
          className={styles.input}
          value={this.state.firstName}
          isError={this.state.firstNameError}
          errorMessage={this.state.firstNameError}
          onErrorClick={this.clearFirstNameError}
        />
        <span className={styles.label}>Last Name</span>
        <InputWithError
          required
          onChange={this.handleChange("lastName")}
          onFocus={this.clearLastNameError}
          className={styles.input}
          value={this.state.lastName}
          isError={this.state.lastNameError}
          errorMessage={this.state.lastNameError}
          onErrorClick={this.clearLastNameError}
        />
        <DateLabel className={styles.label} />
        <InputWithError
          required
          onChange={this.handleDateChange}
          onFocus={this.clearDobError}
          className={styles.input}
          value={this.state.dob}
          isError={this.state.dobError}
          errorMessage={this.state.dobError}
          onErrorClick={this.clearDobError}
        />
        <span className={styles.label}>Relationship</span>
        <RelationshipSelector
          relationship={this.state.relationship}
          setRelationship={this.setRelationship}
        />
        <span className={styles.label}>
          Mobile <span className={styles.optional}>(optional)</span>
        </span>
        <InputWithError
          type="tel"
          onChange={this.handleChange("mobile")}
          onFocus={this.clearMobileError}
          className={styles.input}
          value={this.state.mobile}
          isError={this.state.mobileError}
          errorMessage={this.state.mobileError}
          onErrorClick={this.clearMobileError}
        />
        <span className={styles.label}>
          Email <span className={styles.optional}>(optional)</span>
        </span>
        <InputWithError
          type="email"
          onChange={this.handleChange("email")}
          onFocus={this.clearEmailError}
          className={styles.input}
          value={this.state.email}
          isError={this.state.emailError}
          errorMessage={this.state.emailError}
          onErrorClick={this.clearEmailError}
        />
        {
          this.props.addCta ?
            <CtaButton
              className={styles.cta}
              active={this.validateForm()}
              onClick={this.submit}
            /> : null
        }
      </form>
    );
  }
}

export default DependantForm;
