import React, { Component } from "react";
import PropTypes from "prop-types";
import classnames from "classnames";

import NDigitInput from "../../../../components/nDigitInput";
import ResendButton from "../ResendButton";
import styles from "./codeInput.css";
import Spinner from "../../../../svgs/spinner.svg";

const onChange = (sendCode, sessionId) => (digits) => (
  (digits.length === 4) && sendCode(sessionId, digits)
);

class CodeInput extends Component {
  static propTypes = {
    switcheroo: PropTypes.func.isRequired,
    displayHeaderIcons: PropTypes.func.isRequired,
    overrideBackArrow: PropTypes.func.isRequired,
    clearBackArrow: PropTypes.func.isRequired,
    mobile: PropTypes.string.isRequired,
    clearError: PropTypes.func.isRequired,
    token: PropTypes.string.isRequired,
    verifyCode: PropTypes.func.isRequired,
    sendCode: PropTypes.func.isRequired,
    countdownStartTime: PropTypes.object.isRequired,
    milliSecondsToWait: PropTypes.number.isRequired,
    isError: PropTypes.bool,
    isFetching: PropTypes.bool,
  }
  state = {
    hasClickedResend: false,
  }
  componentDidMount() {
    this.props.displayHeaderIcons({ menu: false, arrow: true, help: true });
    this.props.overrideBackArrow(() => this.props.switcheroo());
  }
  componentWillUnmount() {
    this.props.clearBackArrow();
  }
  setClicked(bool) {
    this.setState({ hasClickedResend: bool });
  }
  render() {
    return (
      <div className={styles.container}>
        {this.props.isFetching ?
          <div className={styles.spinnerContainer}>
            <Spinner className={styles.spinner} />
          </div> :
          null
        }
        <div className={styles.text}>
          {`Enter the 4-digit code sent to you at ${this.props.mobile}`}
        </div>
        <NDigitInput
          className={classnames(styles.input, { [styles.error]: this.props.isError })}
          digits={4}
          onChange={onChange(this.props.verifyCode, this.props.token)}
          key="input"
          isError={null}
          clearError={this.props.clearError}
        />
        <ResendButton
          onClick={() => this.props.sendCode(this.props.mobile)}
          countdownStartTime={this.props.countdownStartTime}
          milliSecondsToWait={this.props.milliSecondsToWait}
        />
      </div>
    );
  }
}

export default CodeInput;
