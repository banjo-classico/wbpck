import React, { Component, PropTypes } from "react";
import classnames from "classnames";
import moment from "moment";

import Countdown from "../../../../components/Countdown";
import styles from "./resendButton.css";

const timeFormatFn = (time) => {
  const t = Math.floor(time / 1000);
  if (t < 10) return `0${t}`;
  return t;
};

class ResendButton extends Component {
  static propTypes = {
    onClick: PropTypes.func.isRequired,
    milliSecondsToWait: PropTypes.number.isRequired,
    countdownStartTime: PropTypes.object.isRequired,
  }
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
    this.getMilliSecondsRemaining = this.getMilliSecondsRemaining.bind(this);
    this.isAllowedToResend = this.isAllowedToResend.bind(this);
    this.updatePage = this.updatePage.bind(this);
  }
  getMilliSecondsRemaining() {
    return (
      (this.props.countdownStartTime.unix() + (this.props.milliSecondsToWait / 1000))
        - moment().unix()
      ) * 1000;
  }
  isAllowedToResend() {
    return this.getMilliSecondsRemaining() <= 0;
  }
  updatePage() {
    this.forceUpdate();
  }
  handleClick() {
    if (this.isAllowedToResend()) {
      this.props.onClick();
    }
  }
  render() {
    return (
      <button
        className={classnames(
          styles.container, { [styles.faded]: !this.isAllowedToResend() }
        )}
        onClick={this.handleClick}
      >
        Resend code
        {
          this.isAllowedToResend() ? null :
          <div className={styles.countdownText}>
            <div>in 0:</div>
            <Countdown
              className={styles.countdown}
              milliSecondsRemaining={this.getMilliSecondsRemaining()}
              interval={1000}
              formatTime={timeFormatFn}
              completedCallback={this.updatePage}
            />
          </div>
        }
      </button>
    );
  }
}

export default ResendButton;
