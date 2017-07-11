import React, { Component } from "react";
import PropTypes from "prop-types";
import isEmail from "validator/lib/isEmail";
import classnames from "classnames";

import LoadingSpinner from "../../../../components/loadingSpinner";
import ScrollingInput from "../scrollingInput";
import CtaButton from "../../../../components/CtaButton";
import WelcomeBack from "../WelcomeBack";
import styles from "./email.css";

class Email extends Component {
  static propTypes = {
    checkEmail: PropTypes.func.isRequired,
    onClick: PropTypes.func.isRequired,
    login: PropTypes.func.isRequired,
    requestNewPassword: PropTypes.func.isRequired,
    clearPasswordState: PropTypes.func.isRequired,
    clearCheckState: PropTypes.func.isRequired,
    email: PropTypes.string,
    isFetching: PropTypes.bool,
    hasSentPassword: PropTypes.bool,
    shouldErrorPassword: PropTypes.bool,
    isEmailValid: PropTypes.bool,
    isEmailError: PropTypes.bool,
    isEmailChecking: PropTypes.bool,
    usedEmail: PropTypes.string,
  }
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
    this.updateEmail = this.updateEmail.bind(this);
    this.toggleValidStatus = this.toggleValidStatus.bind(this);
    this.toggleWelcomeBack = this.toggleWelcomeBack.bind(this);
    this.switchForward = this.switchForward.bind(this);
  }
  state = {
    email: this.props.email,
    isEmailValid: this.props.isEmailValid,
    showWelcomeBack: false,
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.isEmailError !== this.props.isEmailError) {
      if (nextProps.isEmailError && nextProps.isEmailError.status === 409) {
        this.toggleWelcomeBack();
        this.props.clearCheckState();
      }
    }
    if (nextProps.isEmailValid !== this.props.isEmailValid) {
      this.toggleValidStatus();
    }
  }
  updateEmail(email) {
    this.setState({ email });
  }
  switchForward() {
    if (this.state.isEmailValid) {
      this.props.onClick();
    }
  }
  toggleValidStatus() {
    this.setState({ isEmailValid: !this.state.isEmailValid }, this.switchForward);
  }
  handleClick() {
    if (isEmail(this.state.email) && this.state.isEmailValid) {
      this.props.onClick();
    }
  }
  toggleWelcomeBack() {
    this.setState({ showWelcomeBack: !this.state.showWelcomeBack });
  }
  render() {
    const shouldError = this.props.isEmailError && this.props.isEmailError.status !== 409;
    return (
      <div className={styles.container}>
        <div className={styles.inputContainer}>
          <LoadingSpinner
            isFetching={this.props.isEmailChecking}
            iconClassName={styles.spinner}
            overlayClassName={styles.spinnerOverlay}
          >
            <ScrollingInput
              onChange={this.updateEmail}
              defaultValue={this.props.email}
              generateErrorLabel={
                e => (
                  e === "blur" ?
                    "Please enter a valid email address." :
                    "This email is already registered."
                )
              }
              generateLabel={() => "What's your email?"}
              mapBlurError={() => "blur"}
              mapUpdateError={() => "update"}
              onSuccess={this.props.checkEmail}
              shouldError={shouldError}
              type="email"
              valueIsValid={e => isEmail(e)}
            />
          </LoadingSpinner>
        </div>
        <CtaButton className={styles.button} white onClick={this.handleClick} />
        <WelcomeBack
          className={classnames(
            styles.hidden, { [styles.welcomeBack]: this.state.showWelcomeBack }
          )}
          toggleWelcomeBack={this.toggleWelcomeBack}
          login={this.props.login}
          isFetching={this.props.isFetching}
          hasSentPassword={this.props.hasSentPassword}
          shouldErrorPassword={this.props.shouldErrorPassword}
          requestNewPassword={this.props.requestNewPassword}
          clearPasswordState={this.props.clearPasswordState}
          hasSent={this.props.hasSentPassword}
          shouldError={this.props.shouldErrorPassword}
          clearState={this.props.clearPasswordState}
          usedEmail={this.props.usedEmail}
        />
      </div>
    );
  }
}


export default Email;
