import React from "react";
import PropTypes from "prop-types";
import styles from "./doctorProfile.css";
import { DoctorProfilePropType } from "../../propTypes";

const DoctorProfile = ({ doctor, onClick }) => (
  <div className={styles.container} onClick={() => onClick(doctor.PmsUserId)}>
    <img className={styles.img} src={doctor.ProfilePictureURL} alt={doctor.Name} />
    <div className={styles.profile}>
      <span className={styles.name}>{doctor.Name}</span>
      <span className={styles.type}>{doctor.Type}</span>
    </div>
  </div>
);

DoctorProfile.propTypes = {
  doctor: DoctorProfilePropType.isRequired,
  onClick: PropTypes.func.isRequired,
};

export default DoctorProfile;
export {
  styles,
};
