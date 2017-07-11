import React, { Component } from "react";
import PropTypes from "prop-types";

import miniMobile from "../../../../images/miniMobile.png";
import InputWithError from "../../../../components/inputError";
import CtaButton from "../../../../components/CtaButton";
import styles from "./mobileInput.css";
import { isValidMobile } from "../../../../libs/ValidBasicInfo";

class MobileInput extends Component {
  static propTypes = {
    switcheroo: PropTypes.func.isRequired,
    sendCode: PropTypes.func.isRequired,
    setMobile: PropTypes.func.isRequired,
    mobile: PropTypes.string.isRequired,
    onStateChange: PropTypes.func,
  }
  constructor(props) {
    super(props);
    this.changeState = this.changeState.bind(this);
    this.onLabelClick = this.onLabelClick.bind(this);
    this.isValidMobile = this.isValidMobile.bind(this);
    this.clearMobileError = this.clearMobileError.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }
  state = {
    mobile: this.props.mobile,
    mobileError: null,
  }
  onLabelClick(inputName) {
    return () => {
      this[inputName].focus();
    };
  }
  changeState(newState) {
    this.props.setMobile(newState.mobile);
    this.setState(newState, () => this.props.onStateChange && this.props.onStateChange());
  }
  handleChange(key) {
    return (e) => {
      this.changeState({ [key]: e.target.value });
    };
  }
  clearMobileError() {
    this.changeState({ mobileError: null });
  }
  isValidMobile() {
    return isValidMobile(this.state.mobile, true);
  }
  handleClick() {
    if (!this.isValidMobile()) {
      this.changeState({ mobileError: "Invalid Mobile, Please enter a valid NZ mobile number." });
    } else {
      this.props.sendCode(this.state.mobile);
      this.props.switcheroo();
    }
  }
  render() {
    return (
      <div className={styles.container}>
        <div className={styles.text}>Enter your mobile number:</div>
        <div className={styles.inputContainer}>
          <img src={miniMobile} alt="mobile" className={styles.icon} />
          <InputWithError
            className={styles.input}
            type="tel"
            inputRef={c => { this.mobileInput = c; }}
            value={this.state.mobile}
            onChange={this.handleChange("mobile")}
            onFocus={this.clearMobileError}
            onErrorClick={this.clearMobileError}
            isError={this.state.mobileError}
            errorMessage={this.state.mobileError}
          />
        </div>
        <CtaButton
          className={styles.button}
          active={this.isValidMobile()}
          onClick={this.handleClick}
        />
      </div>
    );
  }
}

export default MobileInput;
