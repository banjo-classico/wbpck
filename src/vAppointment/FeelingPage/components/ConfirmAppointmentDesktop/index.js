import React from "react";
import PropTypes from "prop-types";
import moment from "moment";

import SingleInfoBox from "../SingleInfoBox";
import {
  DoctorProfilePropType,
  PracticeInfoPropType,
} from "../../../PracticeBookingPage/propTypes";
import { detailsPropType } from "../../propTypes";
import styles from "./confirmAppointmentDesktop.css";

const ConfirmAppointmentDesktop = ({
  doctor,
  time,
  practice,
  patient,
  guardian,
  onConfirmClick,
  onDoctorEditClick,
  onDetailsEditClick,
  onGuardianEditClick,
}) => (
  <div className={styles.container}>
    <div className={styles.heading}>Booking Confirmation</div>
    <div className={styles.mainContainer}>
      <div className={styles.sectionContainer}>
        <div className={styles.title}>
          Appointment Details
          <button className={styles.edit} onClick={onDoctorEditClick}>Edit</button>
        </div>
        <SingleInfoBox label="Provider" info={doctor.Name} url={doctor.ProfilePictureURL} />
        <SingleInfoBox label="Location" info={practice.Name} />
        <SingleInfoBox label="Date" info={moment(time).format("dddd Do, MMMM YYYY")} />
        <SingleInfoBox label="Time" info={moment(time).format("h:mm a")} />
      </div>
      <div className={styles.sectionContainer}>
        <div className={styles.title}>
          Patient Details
          <button className={styles.edit} onClick={onDetailsEditClick}>Edit</button>
        </div>
        <SingleInfoBox
          label="Name"
          info={`${patient.FirstName} ${patient.LastName}`}
        />
        <SingleInfoBox label="Mobile phone number" info={patient.Mobile} />
        <SingleInfoBox
          label="Date of Birth"
          info={moment(patient.DateOfBirth, ["YYYY-MM-DD", "DD-MM-YYYY"]).format("DD-MM-YYYY")}
        />
      </div>
      {
        guardian ?
          <div className={styles.sectionContainer}>
            <div className={styles.title}>
            Guardian Details
            <button className={styles.edit} onClick={onGuardianEditClick}>Edit</button>
            </div>
            <SingleInfoBox label="Name" info={`${guardian.FirstName} ${guardian.LastName}`} />
            <SingleInfoBox label="Mobile phone number" info={guardian.Mobile} />
            <SingleInfoBox
              label="Date of Birth"
              info={moment(guardian.DateOfBirth, ["YYYY-MM-DD", "DD-MM-YYYY"]).format("DD-MM-YYYY")}
            />
          </div> : null
      }
      <button className={styles.button} onClick={onConfirmClick}>Confirm Appointment</button>
    </div>
  </div>
  );

ConfirmAppointmentDesktop.propTypes = {
  doctor: DoctorProfilePropType.isRequired,
  time: PropTypes.instanceOf(moment),
  practice: PracticeInfoPropType.isRequired,
  patient: detailsPropType.isRequired,
  guardian: detailsPropType,
  onConfirmClick: PropTypes.func.isRequired,
  onDoctorEditClick: PropTypes.func.isRequired,
  onDetailsEditClick: PropTypes.func.isRequired,
  onGuardianEditClick: PropTypes.func.isRequired,
};

export default ConfirmAppointmentDesktop;
