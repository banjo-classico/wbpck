import React from "react";
import PropTypes from "prop-types";

import styles from "./waitTime.css";

const WaitTime = ({ onClick }) => (
  <div className={styles.container}>
    <div className={styles.content}>
      <div>Please give it another go later.</div>
    </div>
    <button className={styles.button} onClick={onClick}>OK</button>
  </div>
);
WaitTime.propTypes = {
  onClick: PropTypes.func.isRequired,
};

export default WaitTime;
