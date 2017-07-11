import React from "react";
import PropTypes from "prop-types";
import moment from "moment";

import styles from "./confirmAppointmentDoctorInfo.css";

import ConfirmAppointmentButtons from "../ConfirmAppointmentButtons";
// eslint-disable-next-line max-len
import { DoctorProfilePropType, PracticeInfoPropType } from "../../../PracticeBookingPage/propTypes";
import EditIcon from "../../../../svgs/editIcon.svg";

const ConfirmAppointmentDoctorInfo = ({
  doctor,
  time,
  practice,
  onCancelClick,
  onConfirmClick,
  onEditClick,
}) => (
  <div className={styles.container}>
    <a className={styles.button} onClick={onEditClick}>
      <EditIcon className={styles.icon} />
    </a>
    <div className={styles.profile}>
      <img className={styles.img} alt={doctor.Name} src={doctor.ProfilePictureURL} />
      <div className={styles.name}>{doctor.Name}</div>
      <div className={styles.practice}>{practice.Name}</div>
      <div className={styles.appt}>
        <span className={styles.date}>{time.format("DD MMM")}</span>
        <span className={styles.time}>{time.format("h:mm a")}</span>
      </div>
    </div>
    <ConfirmAppointmentButtons onCancelClick={onCancelClick} onConfirmClick={onConfirmClick} />
  </div>
);

ConfirmAppointmentDoctorInfo.propTypes = {
  onCancelClick: PropTypes.func.isRequired,
  onConfirmClick: PropTypes.func.isRequired,
  onEditClick: PropTypes.func.isRequired,
  doctor: DoctorProfilePropType.isRequired,
  time: PropTypes.instanceOf(moment),
  practice: PracticeInfoPropType.isRequired,
};

export default ConfirmAppointmentDoctorInfo;
