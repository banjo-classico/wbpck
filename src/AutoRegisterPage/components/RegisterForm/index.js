import React, { Component, PropTypes } from "react";
import classnames from "classnames";
import isEmail from "validator/lib/isEmail";

import styles from "./registerForm.css";
import CtaButton from "../../../components/CtaButton";
import LoadingSpinner from "../../../components/loadingSpinner";
import InputWithError from "../../../components/inputError";
import { isDesktop } from "../../../config";

class RegisterForm extends Component {
  static propTypes = {
    registerUser: PropTypes.func.isRequired,
    checkEmail: PropTypes.func.isRequired,
    goToLogin: PropTypes.func.isRequired,
    isEmailChecking: PropTypes.bool.isRequired,
    isValidEmail: PropTypes.bool.isRequired,
    isEmailError: PropTypes.bool.isRequired,
  }
  constructor(props) {
    super(props);
    this.onEmailChange = this.onEmailChange.bind(this);
    this.onPasswordChange = this.onPasswordChange.bind(this);
    this.onConfirmPasswordChange = this.onConfirmPasswordChange.bind(this);
    this.onPasswordBlur = this.onPasswordBlur.bind(this);
    this.onConfirmPasswordBlur = this.onConfirmPasswordBlur.bind(this);
    this.clearEmailError = this.clearEmailError.bind(this);
    this.clearPasswordError = this.clearPasswordError.bind(this);
    this.clearConfirmPasswordError = this.clearConfirmPasswordError.bind(this);
    this.checkEmail = this.checkEmail.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }
  state = {
    email: "",
    emailError: null,
    password: "",
    confirmPassword: "",
    passwordError: null,
    confirmPasswordError: null,
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.isEmailError) {
      this.setState({ emailError: "This email is already registered." });
    }
  }
  onSubmit(e) {
    e.preventDefault();
    if (
      !this.state.passwordError &&
      !this.state.confirmPasswordError &&
      this.state.password === this.state.confirmPassword &&
      !this.state.emailError &&
      this.props.isValidEmail
    ) {
      this.props.registerUser(this.state.email, this.state.password);
    } else {
      this.onConfirmPasswordBlur();
    }
  }
  onEmailChange(e) {
    this.setState({ email: e.target.value, emailError: null });
  }
  onPasswordChange(e) {
    this.setState({ password: e.target.value, passwordError: null, confirmPasswordError: null });
  }
  onConfirmPasswordChange(e) {
    this.setState({ confirmPassword: e.target.value, confirmPasswordError: null });
  }
  onPasswordBlur() {
    if (this.state.password.length < 6) {
      this.setState({ passwordError: "Your password must be longer than 5 characters." });
    }
  }
  onConfirmPasswordBlur() {
    if (this.state.confirmPassword !== this.state.password) {
      this.setState({ confirmPasswordError: "Your passwords do not match." });
    }
  }
  clearEmailError() {
    this.setState({ emailError: null });
  }
  clearPasswordError() {
    this.setState({ passwordError: null });
  }
  clearConfirmPasswordError() {
    this.setState({ confirmPasswordError: null });
  }
  checkEmail() {
    if (!isEmail(this.state.email)) {
      this.setState({ emailError: "Please enter a valid email address." });
    } else {
      this.props.checkEmail(this.state.email);
    }
  }
  render() {
    return (
      <form className={styles.container} onSubmit={this.onSubmit}>
        <div>
          <div className={styles.heading}>Create your log in</div>
          <div className={styles.secondaryHeading}>
            {isDesktop() ?
              "Sign up to conveniently book and manage your appointments." :
              "You're just one step away from your patient profile..."
            }
          </div>
          <div className={styles.inputContainer}>
            <LoadingSpinner
              containerClassName={styles.spinnerContainer}
              overlayClassName={styles.spinnerOverlay}
              iconClassName={styles.spinner}
              isFetching={this.props.isEmailChecking}
            >
              <InputWithError
                type="email"
                placeholder="Email"
                className={classnames(styles.input, styles.email)}
                value={this.state.email}
                onChange={this.onEmailChange}
                onBlur={this.checkEmail}
                onFocus={this.clearEmailError}
                onErrorClick={this.clearEmailError}
                required
                isError={this.state.emailError}
                errorMessage={this.state.emailError}
              />
            </LoadingSpinner>
          </div>
          <div className={styles.inputContainer}>
            <InputWithError
              type="password"
              placeholder="Password"
              className={styles.input}
              value={this.state.password}
              onChange={this.onPasswordChange}
              onBlur={this.onPasswordBlur}
              onFocus={this.clearPasswordError}
              onErrorClick={this.clearPasswordError}
              isError={this.state.passwordError}
              errorMessage={this.state.passwordError}
              required
            />
          </div>
          {this.state.password.length > 5 ?
            <div className={styles.inputContainer}>
              <InputWithError
                type="password"
                placeholder="Confirm Password"
                className={styles.input}
                value={this.state.confirmPassword}
                onChange={this.onConfirmPasswordChange}
                onBlur={this.onConfirmPasswordBlur}
                onFocus={this.clearConfirmPasswordError}
                onErrorClick={this.clearConfirmPasswordError}
                isError={this.state.confirmPasswordError}
                errorMessage={this.state.confirmPasswordError}
                required
              />
            </div> : null
          }
        </div>
        <div className={styles.footer}>
          <div className={styles.secondaryCta}>
            <div>Already have one?</div>
            <a onClick={this.props.goToLogin}>Log in</a>
          </div>
          <CtaButton
            type="submit"
            white
            className={styles.button}
          />
        </div>
      </form>
    );
  }
}

export default RegisterForm;
