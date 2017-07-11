import React from "react";
import PropTypes from "prop-types";
import styles from "./previewHeader.css";

const PreviewHeader = ({ practiceName, practiceAddress }) => (
  <div className={styles.container}>
    <div className={styles.name}>{practiceName}</div>
    <div className={styles.address}>{practiceAddress}</div>
  </div>
);

PreviewHeader.propTypes = {
  practiceName: PropTypes.string.isRequired,
  practiceAddress: PropTypes.string.isRequired,
};

export default PreviewHeader;
