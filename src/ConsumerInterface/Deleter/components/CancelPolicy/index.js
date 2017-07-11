import React from "react";
import PropTypes from "prop-types";

import hospitalIcon from "../../../../images/notEnrolled.png";
import Arrow from "../../../../svgs/rightarrow2.svg";
import styles from "./cancelPolicy.css";

const CancelPolicy = ({ practiceName, note, cancelFn, togglePolicy }) => (
  <div className={styles.container}>
    <Arrow className={styles.arrow} onClick={togglePolicy()} />
    <div className={styles.heading}>Cancellation Policy</div>
    <div className={styles.innerContainer}>
      <img src={hospitalIcon} alt="hospital" className={styles.hospital} />
      <div>
        {`${practiceName} has the following cancellation policy:`}
      </div>
      <div className={styles.policy}>{note}</div>
      <button className={styles.cancelButton} onClick={cancelFn}>Cancel this appointment</button>
      <button className={styles.closeButton} onClick={togglePolicy(true)}>
        Keep this appointment
      </button>
    </div>
  </div>
);

CancelPolicy.propTypes = {
  cancelFn: PropTypes.func.isRequired,
  togglePolicy: PropTypes.func.isRequired,
  practiceName: PropTypes.string.isRequired,
  note: PropTypes.string.isRequired,
};

export default CancelPolicy;
