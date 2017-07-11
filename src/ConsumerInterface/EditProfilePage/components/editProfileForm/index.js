import React, { Component, PropTypes } from "react";
import isMobilePhone from "validator/lib/isMobilePhone";

import styles from "./editProfileForm.css";
import DateLabel from "../../../../components/DateLabel";
import InputWithError from "../../../../components/inputError";
import {
  isValidDate,
  getErrorMessage,
  dateDelimeter,
  dateBlurOutput,
  isUnderAge,
  isInFuture,
} from "../../../../libs/Dates";

class EditProfileForm extends Component {
  static propTypes = {
    firstname: PropTypes.string.isRequired,
    lastname: PropTypes.string.isRequired,
    dateOfBirth: PropTypes.string.isRequired,
    mobile: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,
    setFirstName: PropTypes.func.isRequired,
    setLastName: PropTypes.func.isRequired,
    setDateOfBirth: PropTypes.func.isRequired,
    setMobile: PropTypes.func.isRequired,
    changeProfile: PropTypes.func.isRequired,
    onSubmit: PropTypes.func.isRequired,
    changeProfileSuccess: PropTypes.bool.isRequired,
    addCustomIcon: PropTypes.func.isRequired,
    clearCustomIcon: PropTypes.func.isRequired,
  }
  constructor(props) {
    super(props);
    this.submit = this.submit.bind(this);
    this.validateForm = this.validateForm.bind(this);
    this.onChange = this.onChange.bind(this);
    this.onDateChange = this.onDateChange.bind(this);
    this.isValidFirstName = this.isValidFirstName.bind(this);
    this.isValidLastName = this.isValidLastName.bind(this);
    this.isValidDate = this.isValidDate.bind(this);
    this.isValidMobile = this.isValidMobile.bind(this);
    this.clearFirstNameError = this.clearFirstNameError.bind(this);
    this.clearLastNameError = this.clearLastNameError.bind(this);
    this.clearDobError = this.clearDobError.bind(this);
    this.clearMobileError = this.clearMobileError.bind(this);
    this.clearBirthdayError = this.clearBirthdayError.bind(this);
    this.setBirthdayError = this.setBirthdayError.bind(this);
    this.dateOfBirthBlur = this.dateOfBirthBlur.bind(this);
  }
  state = {
    firstNameError: null,
    lastNameError: null,
    dobError: null,
    mobileError: null,
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
  onChange(setFn) {
    return (e) => {
      this.setState({ error: null });
      setFn(e.target.value);
    };
  }
  onDateChange() {
    return (e) => {
      const output = dateDelimeter(e.target.value)
      this.props.setDateOfBirth(output);
    };
  }
  setBirthdayError(birthday) {
    this.setState({
      birthdayError: {
        message: getErrorMessage(birthday),
        isUnderAge: !isInFuture(birthday) && isUnderAge(birthday),
      },
    });
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
  validateForm() {
    return this.isValidMobile() &&
      this.isValidDate() &&
      this.isValidFirstName() &&
      this.isValidLastName();
  }
  isValidMobile() {
    return isMobilePhone(this.props.mobile, "en-NZ");
  }
  isValidDate() {
    const date = dateBlurOutput(this.props.dateOfBirth);
    return isValidDate(date);
  }
  isValidFirstName() {
    return this.props.firstname.length;
  }
  isValidLastName() {
    return this.props.lastname.length;
  }
  dateOfBirthBlur(e) {
    const birthday = dateBlurOutput(e.target.value);
    if (!this.isValidDate(birthday)) {
      this.setState({ dobError: getErrorMessage(birthday) });
    }
  }
  clearBirthdayError() {
    this.setState({ birthdayError: {} });
  }
  submit(e) {
    e.preventDefault();
    if (!this.isValidFirstName()) {
      this.setState({ firstNameError: "Invalid First Name." });
    } else if (!this.isValidLastName()) {
      this.setState({ lastNameError: "Invalid Last Name." });
    } else if (!this.isValidDate()) {
      this.setState({ dobError: getErrorMessage(this.props.dateOfBirth) });
    } else if (!this.isValidMobile()) {
      this.setState({ mobileError: "Invalid Mobile, Please enter a valid NZ mobile number." });
    } else {
      if (this.props.onSubmit) this.props.onSubmit();
      const date = dateBlurOutput(this.props.dateOfBirth);
      this.props.changeProfile(
        this.props.firstname,
        this.props.lastname,
        date,
        this.props.mobile,
      );
    }
  }
  render() {
    return (
      <form onSubmit={this.submit} className={styles.form}>
        <span className={styles.label}>First Name</span>
        <InputWithError
          required
          onChange={this.onChange(this.props.setFirstName)}
          onFocus={this.clearFirstNameError}
          className={styles.input}
          value={this.props.firstname}
          isError={this.state.firstNameError}
          errorMessage={this.state.firstNameError}
          onErrorClick={this.clearFirstNameError}
        />
        <span className={styles.label}>Last Name</span>
        <InputWithError
          required
          onChange={this.onChange(this.props.setLastName)}
          onFocus={this.clearLastNameError}
          className={styles.input}
          value={this.props.lastname}
          isError={this.state.lastNameError}
          errorMessage={this.state.lastNameError}
          onErrorClick={this.clearLastNameError}
        />
        <DateLabel className={styles.label} />
        <InputWithError
          required
          onChange={this.onDateChange()}
          onFocus={this.clearDobError}
          className={styles.input}
          value={this.props.dateOfBirth}
          isError={this.state.dobError}
          error={this.state.birthdayError}
          errorMessage={this.state.dobError}
          onErrorClick={this.clearDobError}
          onBlur={this.dateOfBirthBlur}
        />
        <span className={styles.label}>Mobile</span>
        <InputWithError
          type="tel"
          required
          onChange={this.onChange(this.props.setMobile)}
          onFocus={this.clearMobileError}
          className={styles.input}
          value={this.props.mobile}
          isError={this.state.mobileError}
          errorMessage={this.state.mobileError}
          onErrorClick={this.clearMobileError}
        />
        <span className={styles.label}>Email</span>
        <InputWithError
          type="email"
          required
          readOnly
          onErrorClick={() => {}}
          className={styles.inputBlocked}
          value={this.props.email}
        />
        <button className={styles.button} type="submit">SAVE</button>
      </form>
    );
  }
}

export default EditProfileForm;
