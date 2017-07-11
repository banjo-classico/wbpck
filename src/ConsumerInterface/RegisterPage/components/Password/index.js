import React, { Component } from "react";
import PropTypes from "prop-types";

import ScrollingInput from "../scrollingInput";
import CtaButton from "../../../../components/CtaButton";
import TnC from "../../../../components/TnC";
import styles from "./password.css";

class Password extends Component {
  static propTypes = {
    setPassword: PropTypes.func.isRequired,
    onClick: PropTypes.func.isRequired,
    password: PropTypes.string,
  }
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
    this.updatePassword = this.updatePassword.bind(this);
    this.updateConfirmPassword = this.updateConfirmPassword.bind(this);
  }
  state = {
    password: this.props.password,
    confirmPassword: "",
  }
  updatePassword(password) {
    this.setState({ password });
  }
  updateConfirmPassword(confirmPassword) {
    this.setState({ confirmPassword });
  }
  handleClick() {
    if (
      (this.state.password === this.state.confirmPassword) &&
      (this.state.password.length > 5)
    ) {
      this.props.onClick();
    }
  }
  render() {
    return (
      <div className={styles.container}>
        <div className={styles.inputContainer}>
          <ScrollingInput
            key={1}
            onChange={this.updatePassword}
            checkSuccessOnKeyPress
            defaultValue={this.props.password}
            generateErrorLabel={() => "Your password must be at least 6 characters long."}
            generateLabel={() => "Create your password:"}
            mapBlurError={p => p.length <= 5}
            onError={() => this.confirmPasswordInput && this.confirmPasswordInput.onBlur()}
            onSuccess={this.props.setPassword}
            ref={c => { this.passwordInput = c; }}
            type="password"
            valueIsValid={p =>
              p.length > 5 &&
              this.confirmPasswordInput &&
              this.confirmPasswordInput.getValue() === this.passwordInput.getValue()
            }
          />
          {this.state.password.length > 5 ?
            <ScrollingInput
              key={2}
              onChange={this.updateConfirmPassword}
              checkSuccessOnKeyPress
              defaultValue={this.state.confimPassword}
              generateErrorLabel={() => "The two passwords do not match."}
              generateLabel={() => "Please confirm your password:"}
              mapBlurError={p => p.length > 5}
              onSuccess={this.props.setPassword}
              ref={c => { this.confirmPasswordInput = c; }}
              type="password"
              valueIsValid={p =>
                p.length > 5 &&
                this.confirmPasswordInput.getValue() === this.passwordInput.getValue()
              }
            /> :
            <div className={styles.caveat}>
              Your password should have a minimum of 6 characters.
            </div>
          }
        </div>
        <div className={styles.bottomContainer}>
          <TnC
            isWhite
          />
          <CtaButton className={styles.button} white onClick={this.handleClick} />
        </div>
      </div>
    );
  }
}


export default Password;
