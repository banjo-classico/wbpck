import React from "react";
import PropTypes from "prop-types";
import moment from "moment";

import styles from "./appointmentInfo.css";
import Clock from "../../../../svgs/clock.svg";
import Calendar from "../../../../svgs/calendar.svg";

const AppointmentInfo = ({ appointment }) => (
  <div className={styles.container}>
    <div className={styles.info1}>
      <Calendar className={styles.icon} />
      <span>{appointment ? moment(appointment).format("DD MMM") : "01 Jan"}</span>
    </div>
    <div className={styles.info2}>
      <Clock className={styles.icon} />
      <span>{appointment ? moment(appointment).format("h:mm a") : "12:01am"}</span>
    </div>
  </div>
);

AppointmentInfo.propTypes = {
  appointment: PropTypes.string,
};

export default AppointmentInfo;
