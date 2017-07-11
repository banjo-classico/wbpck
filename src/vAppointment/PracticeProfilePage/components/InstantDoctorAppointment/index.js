import React from "react";
import PropTypes from "prop-types";

import AllowsBookingBy from "../AllowsBookingBy";
import styles from "./instantDoctorAppointment.css";

const InstantDoctorAppointment = ({ onClick, type, practice }) => (
  <div className={styles.container}>
    <div className={styles.banner}>Make an Appointment</div>
    <button className={styles.button} onClick={onClick}>Book now</button>
    <AllowsBookingBy type={type} practice={practice} />
  </div>
);
// {isDesktop() ? <DoctorSelector doctors={doctors} /> : null}

InstantDoctorAppointment.propTypes = {
  onClick: PropTypes.func.isRequired,
  type: PropTypes.number,
  practice: PropTypes.string,
};

export default InstantDoctorAppointment;
