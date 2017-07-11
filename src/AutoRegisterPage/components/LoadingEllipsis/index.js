import React from "react";
import PropTypes from "prop-types";

import styles from "./loadingEllipsis.css";

const LoadingEllipsis = ({ className }) => (
  <div className={className}><div className={styles.loader} /></div>
);

LoadingEllipsis.propTypes = {
  className: PropTypes.string,
};

export default LoadingEllipsis;
