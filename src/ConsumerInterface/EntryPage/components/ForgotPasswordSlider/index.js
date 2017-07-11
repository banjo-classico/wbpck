import React, { Component, PropTypes } from "react";
import classnames from "classnames";

import styles from "./forgotPasswordSlider.css";
import Arrow from "../../../../svgs/rightarrow2.svg";
import InputWithError from "../../../../components/inputError";
import CtaButton from "../../../../components/CtaButton";
import Alert from "../../../../libs/Alert";

class ForgotPasswordSlider extends Component {
  static propTypes = {
    requestNewPassword: PropTypes.func.isRequired,
    toggleForgotPassword: PropTypes.func.isRequired,
    clearState: PropTypes.func.isRequired,
    isRequesting: PropTypes.bool,
    hasSent: PropTypes.bool.isRequired,
    defaultError: PropTypes.bool,
    shouldError: PropTypes.bool,
  }
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
    this.onChange = this.onChange.bind(this);
    this.clearError = this.clearError.bind(this);
  }
  state = {
    email: "",
    error: this.props.defaultError || false,
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.shouldError) {
      this.setState({ error: true });
    }
    if (nextProps.hasSent) {
      Alert.success(`We've sent a password reset link to ${this.state.email}`);
      this.props.toggleForgotPassword();
    }
  }
  componentWillUnmount() {
    this.props.clearState();
  }
  onChange(e) {
    if (this.state.error) {
      this.clearError();
    }
    this.setState({ email: e.target.value });
  }
  clearError() {
    this.setState({ error: false });
  }
  handleClick(e) {
    e.preventDefault();
    this.props.requestNewPassword(this.state.email);
  }
  render() {
    const canClick = this.state.email.length >= 5;
    return (
      <form
        className={styles.container}
        onSubmit={this.handleClick}
      >
        <Arrow className={styles.backArrow} onClick={this.props.toggleForgotPassword} />
        <span className={styles.topText}>Forgot my password</span>
        <div className={styles.secondText}>
          Enter your email address below and we&#39;ll
          send you a link to reset your password.
        </div>
        <div className={styles.innerContainer}>
          <div className={styles.inputContainer}>
            <span className={styles.label}>Email</span>
            <InputWithError
              required
              value={this.state.email}
              onChange={this.onChange}
              onFocus={this.clearError}
              type="email"
              onErrorClick={this.clearError}
              isError={this.state.error}
              errorMessage={"This email is not registered with Vensa."}
              className={styles.input}
            />
          </div>
          <CtaButton
            white
            className={classnames(styles.button, { [styles.faded]: !canClick })}
            onClick={canClick ? this.handleClick : () => {}}
          />
        </div>
      </form>
    );
  }
}

export default ForgotPasswordSlider;
