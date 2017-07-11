import React from "react";
import PropTypes from "prop-types";

import Phone from "../../../../svgs/phone.svg";
import { PracticeInfoPropType } from "../../../PracticeBookingPage/propTypes";
import styles from "./connectionIssue.css";

const ConnectionIssue = ({ clinic, onCancelClick, onRetryClick }) => (
  <div className={styles.container}>
    <div>Sorry, we weren&#39;t able to book your appointment due to a connection issue.</div>
    <div className={styles.secondText}>
      To finalise your booking, please get in touch with your practice.
    </div>
    <div className={styles.contactContainer}>
      <div className={styles.buttonContainer}>
        <button className={styles.cancel} onClick={onCancelClick}>Cancel</button>
        <button className={styles.retry} onClick={onRetryClick}>Retry</button>
      </div>
      <div className={styles.name}>{clinic.Name}</div>
      <div className={styles.phone}>{clinic.Phone}</div>
      <a
        href={`tel:${clinic.Phone}`}
        className={styles.phoneLink}
      >
        <Phone className={styles.icon} />
      </a>
    </div>
  </div>
);

ConnectionIssue.propTypes = {
  clinic: PracticeInfoPropType.isRequired,
  onCancelClick: PropTypes.func.isRequired,
  onRetryClick: PropTypes.func.isRequired,
};

export default ConnectionIssue;
