import React from "react";
import PropTypes from "prop-types";

import SectionTitle from "../SectionTitle";
import styles from "./practiceDescription.css";

const PracticeDescription = ({ description }) => (
  <div className={styles.container}>
    <SectionTitle title="About us" />
    <span className={styles.text}>{description}</span>
  </div>
);

PracticeDescription.propTypes = {
  description: PropTypes.string,
};

export default PracticeDescription;
