import React from "react";
import PropTypes from "prop-types";

import styles from "./timeNotAvailable.css";

const TimeNotAvailable = ({ onYesClick, onNoClick }) => (
  <div className={styles.container}>
    <div>It seems like the time you&#39;ve selected is no longer available.</div>
    <div className={styles.secondText}>Would you like to select a different time?</div>
    <div className={styles.buttonContainer}>
      <button className={styles.no} onClick={onNoClick}>No</button>
      <button className={styles.yes} onClick={onYesClick}>Yes</button>
    </div>
  </div>
);

TimeNotAvailable.propTypes = {
  onYesClick: PropTypes.func.isRequired,
  onNoClick: PropTypes.func.isRequired,
};

export default TimeNotAvailable;
