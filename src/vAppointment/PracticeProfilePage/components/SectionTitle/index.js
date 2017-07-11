import React from "react";
import PropTypes from "prop-types";
import classnames from "classnames";

import styles from "./sectionTitle.css";

const SectionTitle = ({ title, className }) => (
  <div className={classnames(className, styles.container)}>
    <span className={styles.title}>{title}</span>
  </div>
);

SectionTitle.propTypes = {
  title: PropTypes.string.isRequired,
  className: PropTypes.string,
};

export default SectionTitle;
