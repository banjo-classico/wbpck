import React from "react";

import styles from "./practiceTitle.css";
import { practicePropType } from "../../propTypes";

const PracticeTitle = ({ practice }) => (
  <div className={styles.container}>
    <h1 className={styles.name}>{practice.Name}</h1>
    <h2 className={styles.address}>{practice.Address}</h2>
  </div>
);

PracticeTitle.propTypes = {
  practice: practicePropType.isRequired,
};

export default PracticeTitle;
