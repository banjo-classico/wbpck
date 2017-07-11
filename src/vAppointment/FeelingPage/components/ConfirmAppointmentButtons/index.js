import React from "react";
import PropTypes from "prop-types";

import styles from "./confirmAppointmentButtons.css";

const ConfirmAppointmentButtons = ({ onConfirmClick, onCancelClick }) => (
  <div className={styles.container}>
    <button className={styles.confirm} onClick={onConfirmClick} >Confirm Appointment</button>
    <button className={styles.cancel} onClick={onCancelClick} >Cancel</button>
  </div>
);

ConfirmAppointmentButtons.propTypes = {
  onConfirmClick: PropTypes.func.isRequired,
  onCancelClick: PropTypes.func.isRequired,
};

export default ConfirmAppointmentButtons;
