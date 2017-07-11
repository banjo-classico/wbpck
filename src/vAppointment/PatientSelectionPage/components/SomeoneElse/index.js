import React from "react";
import PropTypes from "prop-types";

import styles from "./someoneElse.css";

const SomeoneElse = ({ onClick }) => (
  <a className={styles.container} onClick={onClick}>
    Someone else
  </a>
);

SomeoneElse.propTypes = {
  onClick: PropTypes.func.isRequired,
};

export default SomeoneElse;
