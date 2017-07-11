import React from "react";
import PropTypes from "prop-types";
import moment from "moment";

import styles from "./appointmentInfoContainer.css";
import Clock from "../../../../svgs/clock.svg";
import Calendar from "../../../../svgs/calendar.svg";
import Pin from "../../../../svgs/pin.svg";
import Logo from "../../../../svgs/logo.svg";
import EditAppointment from "../EditAppointment";
import { doctorProfilePropType } from "../../propTypes";

const AppointmentInfoContainer = ({ doctor, practiceName, appointment, closePopUp }) => (
  <div className={styles.appointmentContainer}>
    <Logo className={styles.logo} />
    <div className={styles.doctorContainer}>
      <img className={styles.doctorImg} src={doctor.Picture} alt={doctor.Name} />
      <div className={styles.doctorName}>{doctor.Name}</div>
      <div className={styles.doctorType}>{doctor.Type}</div>
    </div>
    <div className={styles.detailsContainer}>
      <div className={styles.practiceName}>
        <Pin className={styles.pin} />{practiceName}
      </div>
      <div className={styles.time}>
        <Clock className={styles.icon} />
        <div>{moment(appointment).format("h:mm a")}</div>
      </div>
      <div className={styles.date}>
        <Calendar className={styles.icon} />
        <div>{moment(appointment).format("dddd Do, MMMM")}</div>
      </div>
    </div>
    <EditAppointment closePopUp={closePopUp} />
  </div>
);

AppointmentInfoContainer.propTypes = {
  doctor: doctorProfilePropType.isRequired,
  practiceName: PropTypes.string.isRequired,
  appointment: PropTypes.string.isRequired,
  closePopUp: PropTypes.func.isRequired,
};

export default AppointmentInfoContainer;
