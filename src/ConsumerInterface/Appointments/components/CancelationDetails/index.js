import React from "react";
import moment from "moment";

import { appointmentPropType } from "../../propTypes";
import styles from "./cancelationDetails.css";

const CancelationDetails = ({ appointment }) => (
  <div className={styles.container}>
    <div className={styles.doctorName}>{appointment.ProviderName}</div>
    <div className={styles.otherDetails}>
      <div className={styles.patientName}>
        {`For ${appointment.FirstName} ${appointment.LastName}`}
      </div>
      <div className={styles.practiceName}>{`at ${appointment.PracticeName}`}</div>
    </div>
    <div className={styles.date}>
      {moment(appointment.Time).format("dddd, DD MMM h:mmA")}
    </div>
  </div>
);

CancelationDetails.propTypes = {
  appointment: appointmentPropType.isRequired,
};

export default CancelationDetails;
