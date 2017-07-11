import React from "react";
import PropTypes from "prop-types";
import moment from "moment";

import { doctorProfilePropType } from "../../propTypes";
import styles from "./doctorProfile.css";

const DoctorProfile = ({ toggleDoctorProfile, doctor }) => (
  <div className={styles.container}>
    <img className={styles.doctorImg} src={doctor.ProfilePictureURL} alt={doctor.Name} />
    <div className={styles.textContainer}>
      <div
        className={styles.doctorName}
        onClick={() => toggleDoctorProfile(doctor.PmsUserId, moment(), true)}
      >
        {doctor.Name}
      </div>
      <div className={styles.type}>{doctor.Type}</div>
      <div className={styles.descriptionContainer}>
        <div className={styles.description}>{doctor.Description}</div>
        {doctor.Description.length > 145 ?
          <div
            className={styles.readMore}
            onClick={() => toggleDoctorProfile(doctor.PmsUserId, moment(), true)}
          >
            <span>...</span>
            <span className={styles.readMoreText}>Read more</span>
          </div> : null}
      </div>
    </div>
  </div>
);
DoctorProfile.propTypes = {
  toggleDoctorProfile: PropTypes.func.isRequired,
  doctor: doctorProfilePropType.isRequired,
};

export default DoctorProfile;
