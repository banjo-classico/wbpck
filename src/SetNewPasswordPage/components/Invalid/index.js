import React from "react";
import PropTypes from "prop-types";

import styles from "./invalid.css";

const Invalid = ({ goToRequest }) => (
  <div className={styles.container}>
    <span className={styles.text}>Sorry! Your link has expired.</span>
    <span className={styles.text}>Please request a new one.</span>
    <button className={styles.button} onClick={goToRequest}>Request new link</button>
  </div>
);

Invalid.propTypes = {
  goToRequest: PropTypes.func.isRequired,
};

export default Invalid;
