import React from "react";
import PropTypes from "prop-types";

import styles from "./notReceiving.css";
import ErrorKiwi from "../../../../svgs/smsErrorKiwi.svg";
import ResendForm from "../../../ConfirmationCodePage/components/resendForm";

const NotReceiving = ({ phone, onPhoneChange, countdownStartTime, milliSecondsToWait }) => (
  <div className={styles.container}>
    <ErrorKiwi className={styles.kiwi} />
    <div className={styles.textContainer}>
      <span className={styles.text}>We apologise for the inconvenience.</span>
      <span className={styles.text}>
        You can try using a different phone number
        or call your practice to book your appointment.
      </span>
    </div>
    <ResendForm
      isWhite={false}
      phone={phone}
      onPhoneChange={onPhoneChange}
      countdownStartTime={countdownStartTime}
      milliSecondsToWait={milliSecondsToWait}
    />
  </div>
);

NotReceiving.propTypes = {
  onPhoneChange: PropTypes.func.isRequired,
  phone: PropTypes.string.isRequired,
  // moment
  countdownStartTime: PropTypes.object.isRequired,
  milliSecondsToWait: PropTypes.number.isRequired,
};

export default NotReceiving;
