import React from "react";
import PropTypes from "prop-types";
import styles from "./noAppointmentCard.css";

const NoAppointmentCard = ({ onClick }) => (
  <div className={styles.container}>
    <div className={styles.bold}>No upcoming appointments</div>
    <div>
      You have no appointments booked through Vensa.
    </div>
    <div
      className={styles.button}
      onClick={onClick}
    >
      Book an appointment now
    </div>
  </div>
);

NoAppointmentCard.propTypes = {
  onClick: PropTypes.func.isRequired,
};

export default NoAppointmentCard;
