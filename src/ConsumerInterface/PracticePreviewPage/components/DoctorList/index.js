import React from "react";
import PropTypes from "prop-types";
import DoctorItem from "../DoctorItem";
import styles from "./doctorList.css";

const doctorList = ({ doctors }) => (
  <div className={styles.container}>
    { doctors && doctors.map((doctor) =>
      <DoctorItem key={doctor.PmsUserId} doctor={doctor} />)
    }
  </div>
);

doctorList.propTypes = {
  doctors: PropTypes.arrayOf(PropTypes.object.isRequired).isRequired,
};

export default doctorList;
