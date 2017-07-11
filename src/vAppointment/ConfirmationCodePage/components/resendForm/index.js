import React, { Component, PropTypes } from "react";
import classnames from "classnames";
import moment from "moment";

import Countdown from "../../../../components/Countdown";
import styles from "./resendForm.css";
import LoadingSpinner from "../../../../components/loadingSpinner";

class ResendForm extends Component {
  static propTypes = {
    phone: PropTypes.string,
    onPhoneChange: PropTypes.func.isRequired,
    setClicked: PropTypes.func.isRequired,
    milliSecondsToWait: PropTypes.number.isRequired,
    countdownStartTime: PropTypes.object.isRequired,
  }
  constructor(props) {
    super(props);
    this.submit = this.submit.bind(this);
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
  submit(e) {
    e.preventDefault();
    if (this.isAllowedToResend()) {
      this.props.onPhoneChange(this.input.value);
    }
    this.props.setClicked(true);
  }
  render() {
    return (
      <form
        className={styles.message}
        onSubmit={this.submit}
      >
        <div className={styles.inputContainer}>
          <input
            className={classnames(styles.input, { [styles.faded]: !this.isAllowedToResend() })}
            defaultValue={this.props.phone}
            required
            size="10"
            type="tel"
            ref={c => { this.input = c; }}
          />
          <button
            type="submit"
            className={styles.resendButton}
          >
            <LoadingSpinner
              isFetching={!this.isAllowedToResend()}
              iconClassName={styles.countdownSpinner}
            >
              {this.isAllowedToResend() ? <span>resend</span> : null}
            </LoadingSpinner>
          </button>
        </div>
        {
          this.isAllowedToResend() ? null :
          <div className={styles.countdownText}>
            <span>Wait</span>
            <Countdown
              className={styles.countdown}
              milliSecondsRemaining={this.getMilliSecondsRemaining()}
              interval={1000}
              formatTime={t => Math.floor(t / 1000)}
              completedCallback={this.updatePage}
            />
            <span>seconds to resend.</span>
          </div>
        }
      </form>
    );
  }
}

export default ResendForm;
export {
  styles,
};
