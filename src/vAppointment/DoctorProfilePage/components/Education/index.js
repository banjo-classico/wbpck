import React from "react";
import PropTypes from "prop-types";
import { map } from "lodash/fp";

import styles from "./education.css";
import SectionTitle from "../../../PracticeProfilePage/components/SectionTitle";

const Education = ({ education }) => (
  <div className={styles.container}>
    <SectionTitle title="Education" />
    <div className={styles.educationContainer}>
      {
      map(l => <span className={styles.education} key={l}>{l}</span>, education)
    }
    </div>
  </div>
);

Education.propTypes = {
  education: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default Education;
