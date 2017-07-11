import React, { Component } from "react";
import PropTypes from "prop-types";
import classnames from "classnames";

import styles from "./passwordChange.css";
import InputWithError from "../inputError";

class PasswordChange extends Component {
  static propTypes = {
    setIsValid: PropTypes.func.isRequired,
    isWhiteBackground: PropTypes.bool.isRequired,
    isChangePassword: PropTypes.bool.isRequired,
  };
  constructor(props) {
    super(props);
    this.onNewPasswordChange = this.onNewPasswordChange.bind(this);
    this.onConfirmPasswordChange = this.onConfirmPasswordChange.bind(this);
    this.onNewPasswordBlur = this.onNewPasswordBlur.bind(this);
    this.onConfirmPasswordBlur = this.onConfirmPasswordBlur.bind(this);
    this.clearNewPasswordError = this.clearNewPasswordError.bind(this);
    this.clearConfirmPasswordError = this.clearConfirmPasswordError.bind(this);
    this.getState = this.getState.bind(this);
    this.setIsValid = this.setIsValid.bind(this);
  }
  state = {
    newPassword: "",
    confirmPassword: "",
    newPasswordError: null,
    confirmPasswordError: null,
    isValid: false,
  };
  onNewPasswordChange(e) {
    this.setState({
      newPassword: e.target.value,
      newPasswordError: null,
      confirmPasswordError: null,
    });
  }
  onConfirmPasswordChange(e) {
    this.setState({ confirmPassword: e.target.value, confirmPasswordError: null }, this.setIsValid);
  }
  onNewPasswordBlur() {
    if (this.state.newPassword.length < 6) {
      this.setState({ newPasswordError: "Your password must be longer than 5 characters." });
    }
  }
  onConfirmPasswordBlur() {
    if (this.state.confirmPassword !== this.state.newPassword) {
      this.setState({ confirmPasswordError: "Your passwords do not match." });
    }
  }
  setIsValid() {
    this.setState({
      isValid: this.state.confirmPassword === this.state.newPassword,
    }, this.props.setIsValid);
  }
  getState() {
    return this.state;
  }
  clearNewPasswordError() {
    this.setState({ newPasswordError: null });
  }
  clearConfirmPasswordError() {
    this.setState({ confirmPasswordError: null });
  }
  render() {
    const labelClass = classnames(
      styles.confirmLabel,
      { [styles.label]: this.props.isWhiteBackground });
    const inputClass = classnames(
      styles.input,
      { [styles.bigInput]: !this.props.isWhiteBackground });
    return (
      <div className={styles.container} >
        <div className={styles.inputContainer}>
          <span
            className={labelClass}
          >New Password</span>
          <InputWithError
            type="password"
            className={inputClass}
            value={this.state.newPassword}
            onChange={this.onNewPasswordChange}
            onBlur={this.onNewPasswordBlur}
            onFocus={this.clearNewPasswordError}
            onErrorClick={this.clearNewPasswordError}
            inputRef={c => { this.passwordInput = c; }}
            required
            isError={this.state.newPasswordError}
            errorMessage={this.state.newPasswordError}
          />
        </div>
        <div className={styles.inputContainer}>
          <span className={labelClass}>Confirm Password</span>
          <InputWithError
            type="password"
            className={inputClass}
            value={this.state.confirmPassword}
            onChange={this.onConfirmPasswordChange}
            onBlur={this.onConfirmPasswordBlur}
            onFocus={this.clearConfirmPasswordError}
            onErrorClick={this.clearConfirmPasswordError}
            inputRef={c => { this.confirmPasswordInput = c; }}
            required
            isError={this.state.confirmPasswordError}
            errorMessage={this.state.confirmPasswordError}
          />
        </div>
      </div>
    );
  }
}

export default PasswordChange;
