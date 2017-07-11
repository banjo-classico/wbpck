import React, { Component } from "react";
import PropTypes from "prop-types";

import CtaButton from "../../../../components/CtaButton";
import styles from "./passwordVerification.css";

class PasswordVerification extends Component {
  static propTypes = {
    checkPassword: PropTypes.func.isRequired,
    goToRequestPassword: PropTypes.func.isRequired,
    goBack: PropTypes.func.isRequired,
    email: PropTypes.string.isRequired,
  }
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.handleCtaClick = this.handleCtaClick.bind(this);
  }
  state = {
    password: "",
  }
  handleChange(e) {
    this.setState({ password: e.target.value });
  }
  handleCtaClick() {
    this.props.checkPassword(this.state.password);
  }
  render() {
    const isActive = this.state.password.length > 5;
    return (
      <div className={styles.container}>
        <div className={styles.innerContainer}>
          <div className={styles.heading}>You&#39;re welcome to come back anytime.</div>
          <div className={styles.text}>
          If you wish to use Vensa.com again, just login as
          <span className={styles.email}>{this.props.email}</span>
          and we will get you up and running again.
        </div>
          <div className={styles.inputContainer}>
            <div className={styles.label}>Type your password</div>
            <input
              type="password"
              className={styles.input}
              onChange={this.handleChange}
            />
            <div className={styles.forgotPasswordContainer}>
              <button
                className={styles.forgotPassword}
                onClick={this.props.goToRequestPassword}
              >
              Forgot my password
            </button>
            </div>
          </div>
        </div>
        <div className={styles.ctaContainer}>
          <button className={styles.secondaryCta} onClick={this.props.goBack}>
        No, don&#39;t deactivate my account
      </button>
          <CtaButton
            className={styles.cta}
            active={isActive}
            onClick={isActive ? this.handleCtaClick : () => {}}
          />
        </div>
      </div>
    );
  }
}

export default PasswordVerification;
export {
  styles,
};
