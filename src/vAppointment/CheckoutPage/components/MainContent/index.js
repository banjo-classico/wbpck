import React from "react";
import PropTypes from "prop-types";
import classnames from "classnames";

import styles from "./mainContent.css";

const MainContent = ({ status, description, children, className }) => (
  <div className={classnames(styles.container, className)}>
    <div className={styles.mainText}>{status}</div>
    <div className={styles.secondaryText}>{description}</div>
    {children}
  </div>
);
MainContent.propTypes = {
  status: PropTypes.string.isRequired,
  description: PropTypes.string,
  children: PropTypes.node,
  className: PropTypes.string,
};

export default MainContent;
