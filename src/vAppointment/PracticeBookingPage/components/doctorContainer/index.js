import React from "react";
import PropTypes from "prop-types";

import DoctorProfile from "../doctorProfile";
import DoctorAppointment from "../doctorAppointment";
import styles from "./doctorContainer.css";
import { DoctorProfilePropType, SelectedTimePropType } from "../../propTypes";

const DoctorContainer = ({ doctor, selectedTime, setTime, onClick, goToDate }) => (
  <div className={styles.container}>
    <DoctorProfile doctor={doctor} onClick={onClick} />
    <DoctorAppointment
      selectedTime={selectedTime}
      setTime={setTime}
      appointmentSlots={doctor.AvailableSlots}
      doctorId={doctor.PmsUserId}
      nextAvailableSlot={doctor.NextAvailableSlot}
      goToDate={goToDate}
    />
  </div>
);

DoctorContainer.propTypes = {
  doctor: DoctorProfilePropType.isRequired,
  selectedTime: SelectedTimePropType.isRequired,
  setTime: PropTypes.func.isRequired,
  onClick: PropTypes.func.isRequired,
  goToDate: PropTypes.func.isRequired,
};

export default DoctorContainer;
