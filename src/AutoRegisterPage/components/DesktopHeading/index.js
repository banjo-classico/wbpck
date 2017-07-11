import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import classnames from "classnames";
import moment from "moment";

import Logo from "../../../svgs/logo.svg";
import Clock from "../../../svgs/clock.svg";
import Calendar from "../../../svgs/calendar.svg";
import styles from "./desktopHeading.css";
import { DoctorProfilePropType } from "../../../vAppointment/PracticeBookingPage/propTypes";

const DesktopHeading = ({ confirming, error, doctor, appointment }) => {
  const confirmed = !confirming && !error;
  return (
    <div className={styles.container}>
      <div className={styles.inner}>
        <Logo className={styles.logo} />
        <div className={styles.info}>
          <img
            className={styles.doctorImg}
            src={doctor ? doctor.Picture : ""}
            alt={doctor.Name}
          />
          <span className={styles.doctorName}>{doctor ? doctor.Name : ""}</span>
        </div>
        <div className={styles.info}>
          <Clock className={styles.icon} />
          <span>{appointment ? appointment.format("h:mm a") : ""}</span>
        </div>
        <div className={styles.info}>
          <Calendar className={styles.icon} />
          <span>{appointment ? appointment.format("dddd, DD MMMM YYYY") : ""}</span>
        </div>
      </div>
      <div className={classnames(styles.status, { [styles.confirmed]: confirmed })}>
        {confirmed ? "Confirmed" : "Confirming"}
      </div>
    </div>
  );
};
DesktopHeading.propTypes = {
  error: PropTypes.any,
  confirming: PropTypes.bool,
  doctor: DoctorProfilePropType.isRequired,
  appointment: PropTypes.instanceOf(moment).isRequired,
};

const mapStateToProps = (state) => ({
  confirming: state.appointmentConfirmationReducer.checking,
  error: state.appointmentConfirmationReducer.error,
});
const mapDispatchToProps = () => ({
});

export default connect(mapStateToProps, mapDispatchToProps)(DesktopHeading);
