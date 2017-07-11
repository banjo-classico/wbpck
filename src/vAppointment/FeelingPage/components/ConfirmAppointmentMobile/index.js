import React from "react";
import PropTypes from "prop-types";
import moment from "moment";

import {
  DoctorProfilePropType,
  PracticeInfoPropType,
} from "../../../PracticeBookingPage/propTypes";
import { detailsPropType } from "../../propTypes";
import styles from "./confirmAppointmentMobile.css";

const ConfirmAppointmentMobile = ({
  doctor,
  time,
  practice,
  patient,
  onConfirmClick,
  onDetailsEditClick,
}) => (
  <div className={styles.container}>
    <div className={styles.heading}>Appointment Confirmation</div>
    <div className={styles.appointmentDetailsContainer}>
      <div className={styles.appointmentDetails}>
        <img className={styles.image} src={doctor.ProfilePictureURL} alt={doctor.Name} />
        <div>
          <div className={styles.doctorName}>{doctor.Name}</div>
          <div className={styles.practiceName}>{practice.Name}</div>
          <div className={styles.appointmentDate}>{moment(time).format("dddd Do MMMM")}</div>
          <div className={styles.appointmentTime}>{moment(time).format("h:mm a")}</div>
        </div>
      </div>
    </div>
    <div className={styles.patientDetailsContainer}>
      <div className={styles.patientLabel}>Patient Details</div>
      <div className={styles.patientDetails}>
        <div className={styles.detailContainer}>
          <div className={styles.label}>Name</div>
          <div>{`${patient.FirstName} ${patient.LastName}`}</div>
        </div>
        <div className={styles.detailContainer}>
          <div className={styles.label}>Date of Birth</div>
          <div>
            {moment(patient.DateOfBirth, ["YYYY-MM-DD", "DD-MM-YYYY"]).format("DD-MM-YYYY")}
          </div>
        </div>
        <div className={styles.detailContainer}>
          <div className={styles.label}>Mobile number</div>
          <div>{patient.Mobile}</div>
        </div>
      </div>
    </div>
    <div className={styles.buttonContainer}>
      <button className={styles.confirmButton} onClick={onConfirmClick}>Confirm Appointment</button>
      <button className={styles.changeButton} onClick={onDetailsEditClick}>Change Details</button>
    </div>
  </div>
);

ConfirmAppointmentMobile.propTypes = {
  doctor: DoctorProfilePropType.isRequired,
  time: PropTypes.instanceOf(moment),
  practice: PracticeInfoPropType.isRequired,
  patient: detailsPropType.isRequired,
  onConfirmClick: PropTypes.func.isRequired,
  onDetailsEditClick: PropTypes.func.isRequired,
};

export default ConfirmAppointmentMobile;
