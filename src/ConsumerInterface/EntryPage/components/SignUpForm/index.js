import React, { Component, PropTypes } from "react";
import classnames from "classnames";

import Envelope from "../../../../svgs/envelope.svg";
import Lock from "../../../../svgs/lock.svg";
import CtaButton from "../../../../components/CtaButton";
import styles from "./signUpForm.css";

class SignUpForm extends Component {
  static propTypes = {
    login: PropTypes.func.isRequired,
    toggleForgotPassword: PropTypes.func.isRequired,
    isFetching: PropTypes.bool.isRequired,
    secondaryCta: PropTypes.bool,
    usedEmail: PropTypes.string,
    goToRegister: PropTypes.func,
  }
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  handleSubmit(e) {
    e.preventDefault();
    this.email.blur();
    this.password.blur();
    this.props.login(this.email.value, this.password.value);
  }
  render() {
    return (
      <div className={styles.outerContainer}>
        <form className={styles.signUpForm} onSubmit={this.handleSubmit}>
          <div className={styles.innerContainer}>
            <div className={styles.inputContainer}>
              <Envelope className={styles.envelope} />
              <input
                value={this.props.usedEmail ? this.props.usedEmail : undefined}
                required
                className={styles.input}
                type="email"
                // autoFocus
                ref={c => { this.email = c; }}
                placeholder="Email"
              />
            </div>
            <div className={styles.inputContainer}>
              <Lock className={styles.lock} />
              <input
                required
                className={styles.input}
                type="password"
                ref={c => { this.password = c; }}
                placeholder="Password"
              />
            </div>
            <div className={styles.forgotContainer}>
              <a onClick={this.props.toggleForgotPassword}>Forgot my password</a>
            </div>
          </div>
          <div className={classnames(styles.footer, { [styles.column]: !this.props.secondaryCta })}>
            {this.props.secondaryCta ?
              <div className={styles.secondaryCta}>
                <div>New here?</div>
                <a onClick={this.props.goToRegister}>Sign up now!</a>
              </div> : null
            }
            <CtaButton
              type="submit"
              white
              className={styles.button}
            />
          </div>
        </form>
      </div>
    );
  }
}
export default SignUpForm;
export {
  styles,
};
