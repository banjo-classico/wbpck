import React from "react";
import PropTypes from "prop-types";
import { map } from "lodash/fp";

import styles from "./specialities.css";
import SectionTitle from "../SectionTitle";

const Specialities = ({ specialities }) => (
  <div className={styles.container}>
    <SectionTitle title="Specialties" />
    <div className={styles.specialitiesContainer}>
      {
      map(s => <span className={styles.speciality} key={s}>{s}</span>, specialities)
    }
    </div>
  </div>
);

Specialities.propTypes = {
  specialities: PropTypes.arrayOf(PropTypes.string),
};

export default Specialities;
