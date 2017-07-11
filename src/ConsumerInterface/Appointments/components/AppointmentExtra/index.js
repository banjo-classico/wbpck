import React from "react";
import PropTypes from "prop-types";

import { GOOGLE_API_KEY } from "../../../../config";
import { appointmentPropType } from "../../propTypes";
import styles from "./appointmentExtra.css";


const AppointmentExtra = ({
  appointment,
  toggleDeleter,
  goToAddDependant,
  preLoadDependant,
  past,
  isDependant,
}) => (
  <div className={styles.container}>
    <div className={styles.contentContainer}>
      <div className={styles.labelContainer}>
        <div className={styles.label}>Patient</div>
        {
          !isDependant ?
            <button
              className={styles.button} onClick={() => {
                goToAddDependant();
                preLoadDependant(
                  {
                    FirstName: appointment.FirstName,
                    LastName: appointment.LastName,
                    DateOfBirth: appointment.DateOfBirth,
                    Mobile: appointment.PatientPhone,
                    SessionId: appointment.SessionId,
                  }
              );
              }}
            >
              + Add as my dependant
            </button> : null
        }
      </div>
      <div className={styles.text}>{`${appointment.FirstName} ${appointment.LastName}`}</div>
    </div>
    <div className={styles.contentContainer}>
      <div className={styles.reasonLabel}>Reason for consultation</div>
      <div className={styles.text}>{appointment.Note}</div>
    </div>
    <div className={styles.contentContainer}>
      <div className={styles.labelContainer}>
        <div className={styles.label}>Address</div>
        <a
          href={`https://www.google.co.nz/maps/place/${appointment.Address}`}
          className={styles.link}
        >
          <span>Get directions</span>
        </a>
      </div>
      <div className={styles.address}>{appointment.Address}</div>
    </div>
    <iframe
      src={
        `https://www.google.com/maps/embed/v1/place?key=${GOOGLE_API_KEY}&q=${appointment.Address}`
      }
      className={styles.iframe}
    />
    {
      appointment.Status !== "CANCELED" && !past &&
      <button
        className={styles.cancelButton}
        onClick={toggleDeleter}
      >
        Cancel this appointment
      </button>
    }
  </div>
);

AppointmentExtra.propTypes = {
  appointment: appointmentPropType.isRequired,
  toggleDeleter: PropTypes.func.isRequired,
  goToAddDependant: PropTypes.func.isRequired,
  preLoadDependant: PropTypes.func.isRequired,
  past: PropTypes.bool,
  isDependant: PropTypes.bool,
};

export default AppointmentExtra;
