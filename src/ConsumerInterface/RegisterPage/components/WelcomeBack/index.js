import React, { Component } from "react";
import PropTypes from "prop-types";

import SignUpForm from "../../../EntryPage/components/SignUpForm";
import ForgotPasswordSlider from "../../../EntryPage/components/ForgotPasswordSlider";
import Header from "../Header";
import Switcheroo from "../../../../components/Switcheroo";
import styles from "./welcomeBack.css";

class WelcomeBack extends Component {
  static propTypes = {
    toggleWelcomeBack: PropTypes.func.isRequired,
    login: PropTypes.func.isRequired,
    clearPasswordState: PropTypes.func.isRequired,
    clearState: PropTypes.func.isRequired,
    requestNewPassword: PropTypes.func.isRequired,
    className: PropTypes.string.isRequired,
    usedEmail: PropTypes.string,
    hasSent: PropTypes.bool,
    shouldError: PropTypes.bool,
    isFetching: PropTypes.bool,
    hasSentPassword: PropTypes.bool,
    shouldErrorPassword: PropTypes.bool,
  }
  constructor(props) {
    super(props);
    this.toggleForgotPassword = this.toggleForgotPassword.bind(this);
    this.handleSwitcheroo = this.handleSwitcheroo.bind(this);
  }
  toggleForgotPassword(showForgotPassword) {
    if (showForgotPassword) {
      this.handleSwitcheroo(2, 1);
    } else {
      this.handleSwitcheroo(1, 2);
    }
  }
  handleSwitcheroo(next, prev) {
    if (this.switcheroo) {
      this.switcheroo.setItemToShow(next, prev);
    }
  }
  render() {
    return (
      <div className={this.props.className}>
        <Switcheroo
          className={styles.switcheroo}
          ref={c => { this.switcheroo = c; }}
          firstItem={
            <div className={styles.mainContainer}>
              <Header text="Welcome back!" onClick={this.props.toggleWelcomeBack} />
              <div className={styles.innerContainer}>
                <div className={styles.textContainer}>
                  <div className={styles.text}>
                  It looks like you have an account with this email already.
                </div>
                  <div>You can log in here:</div>
                </div>
                <SignUpForm
                  usedEmail={this.props.usedEmail}
                  toggleForgotPassword={() => this.toggleForgotPassword(true)}
                  login={this.props.login}
                  isFetching={this.props.isFetching}
                />
              </div>
            </div>
        }
          secondItem={
            <ForgotPasswordSlider
              hasSent={this.props.hasSentPassword}
              shouldError={this.props.shouldErrorPassword}
              requestNewPassword={this.props.requestNewPassword}
              clearState={this.props.clearPasswordState}
              toggleForgotPassword={() => this.toggleForgotPassword(false)}
            />
        }
        />
      </div>
    );
  }
}

export default WelcomeBack;
