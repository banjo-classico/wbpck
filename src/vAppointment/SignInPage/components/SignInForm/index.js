import React, { Component, PropTypes } from "react";

import Warning from "../../../../svgs/warning.svg";
import Envelope from "../../../../svgs/envelope.svg";
import Lock from "../../../../svgs/lock.svg";
import { isDesktop } from "../../../../config";
import styles from "./signInForm.css";

class SignInForm extends Component {
  static propTypes = {
    login: PropTypes.func.isRequired,
    goForgotPassword: PropTypes.func.isRequired,
    goToPatientDetails: PropTypes.func.isRequired,
    clearSideComponent: PropTypes.func,
    isError: PropTypes.bool,
  }
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.forgotPassword = this.forgotPassword.bind(this);
  }
  handleSubmit(e) {
    e.preventDefault();
    this.props.login(this.email.value, this.password.value);
  }
  forgotPassword() {
    if (this.props.clearSideComponent) {
      this.props.clearSideComponent();
    }
    this.props.goForgotPassword();
  }
  render() {
    return (
      <form className={styles.form} onSubmit={this.handleSubmit}>
        <div className={styles.innerContainer}>
          {isDesktop() ? <span className={styles.label}>Email</span> : null}
          <div className={styles.inputContainer}>
            {!isDesktop() ? <Envelope className={styles.envelope} /> : null}
            <input
              required
              className={styles.input}
              type="email"
              ref={c => { this.email = c; }}
              placeholder={isDesktop() ? null : "Email"}
            />
          </div>
          {isDesktop() ? <span className={styles.label}>Password</span> : null}
          <div className={styles.inputContainer}>
            {!isDesktop() ? <Lock className={styles.lock} /> : null}
            <input
              required
              className={styles.input}
              type="password"
              ref={c => { this.password = c; }}
              placeholder={isDesktop() ? null : "Password"}
            />
          </div>
          <a className={styles.forgotPassword} onClick={this.forgotPassword}>
            Forgot my password
          </a>
        </div>
        {
          this.props.isError && isDesktop() &&
          <div className={styles.errorContainer}>
            <Warning className={styles.warningIcon} />
            <span className={styles.error}>Invalid username or password</span>
          </div>
        }
        <div className={styles.footer}>
          <a
            className={styles.guestLink}
            onClick={this.props.goToPatientDetails}
          >I don&#39;t have a log in</a>
          <button type="submit" className={styles.buttonLogIn}>Log In</button>
        </div>
      </form>
    );
  }
}

export default SignInForm;
export {
  styles,
};
