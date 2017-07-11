import React from "react";
import PropTypes from "prop-types";
import styles from "./doctorItem.css";

const DoctorItem = ({ doctor }) => (
  <div className={styles.container}>
    <img className={styles.img} src={doctor.Picture} alt="doctor" />
    <div className={styles.text}>{doctor.Name}</div>
  </div>
);

DoctorItem.propTypes = {
  doctor: PropTypes.object.isRequired,
};

export default DoctorItem;
