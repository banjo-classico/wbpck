import React from "react";
import PropTypes from "prop-types";

import styles from "./confirmAppointmentPatientDetails.css";
import ConfirmAppointmentButtons from "../ConfirmAppointmentButtons";
import EditIcon from "../../../../svgs/editIcon.svg";

const ConfirmAppointmentPatientDetials = ({
  patient,
  onEditClick,
  onCancelClick,
  onConfirmClick,
}) => (
  <div className={styles.container}>
    <div className={styles.details}>
      <div className={styles.buttonContainer}>
        <a className={styles.button} onClick={onEditClick}>
          <EditIcon className={styles.icon} />
        </a>
      </div>
      <div className={styles.label}>Name</div>
      <div className={styles.content}>{patient.FirstName} {patient.LastName}</div>
      <div className={styles.label}>Date of Birth</div>
      <div className={styles.content}>
        {patient.DateOfBirth}
      </div>
      <div className={styles.label}>Phone Number</div>
      <div className={styles.content}>{patient.Mobile}</div>
    </div>
    <ConfirmAppointmentButtons onCancelClick={onCancelClick} onConfirmClick={onConfirmClick} />
  </div>
);

ConfirmAppointmentPatientDetials.propTypes = {
  onCancelClick: PropTypes.func.isRequired,
  onConfirmClick: PropTypes.func.isRequired,
  onEditClick: PropTypes.func.isRequired,
  patient: PropTypes.shape({
    FirstName: PropTypes.string.isRequired,
    LastName: PropTypes.string.isRequired,
    Mobile: PropTypes.string.isRequired,
    DateOfBirth: PropTypes.string.isRequired,
  }).isRequired,
};

export default ConfirmAppointmentPatientDetials;
