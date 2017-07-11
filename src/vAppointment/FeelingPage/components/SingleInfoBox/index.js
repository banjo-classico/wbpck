import React from "react";
import PropTypes from "prop-types";

import styles from "./singleInfoBox.css";

const SingleInfoBox = ({ label, info, url }) => (
  <div className={styles.container}>
    <div className={styles.label}>{label}</div>
    <div className={styles.info}>{info}</div>
    {url ? <img className={styles.img} src={url} alt={info} /> : null}
  </div>
);

SingleInfoBox.propTypes = {
  label: PropTypes.string.isRequired,
  info: PropTypes.string.isRequired,
  url: PropTypes.string,
};

export default SingleInfoBox;
