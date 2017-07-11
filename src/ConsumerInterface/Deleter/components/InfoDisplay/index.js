import React from "react";
import PropTypes from "prop-types";

import styles from "./infoDisplay.css";

const InfoDisplay = ({ details }) => (
  <div className={styles.container}>
    {details}
  </div>
);

InfoDisplay.propTypes = {
  details: PropTypes.node.isRequired,
};

export default InfoDisplay;
