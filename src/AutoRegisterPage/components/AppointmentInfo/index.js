import React from "react";
import PropTypes from "prop-types";
import moment from "moment";
import classnames from "classnames";

import styles from "./appointmentInfo.css";
import { DoctorProfilePropType } from "../../../vAppointment/PracticeBookingPage/propTypes";

const AppointmentInfo = ({ doctor, appointment, confirming }) => (
  <div className={classnames(styles.outer, { [styles.confirming]: confirming })}>
    <div className={styles.container}>
      <div className={styles.doctorInfo}>
        <img
          className={styles.doctorImg}
          src={doctor ? doctor.ProfilePictureURL : ""}
          alt={doctor.Name}
        />
        <span className={styles.doctorName}>{doctor ? doctor.Name : ""}</span>
      </div>
      <div className={styles.timeInfo}>
        <span className={styles.time}>
          <span>{appointment ? appointment.format("DD MMM") : ""}</span>
          <span>{appointment ? appointment.format("h:mm a") : ""}</span>
        </span>
      </div>
    </div>
  </div>
);

AppointmentInfo.propTypes = {
  confirming: PropTypes.bool,
  doctor: DoctorProfilePropType.isRequired,
  appointment: PropTypes.instanceOf(moment).isRequired,
};

export default AppointmentInfo;
