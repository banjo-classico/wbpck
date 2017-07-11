import React from "react";
import PropTypes from "prop-types";
import { map } from "lodash/fp";
import moment from "moment";

import Slots from "../Slots";
import NoSlotsFiller from "../NoSlotsFiller";
import DoctorProfile from "../DoctorProfile";
import NextAvailableSlot from "../../../PracticeBookingPage/components/NextAvailableSlot";
import { doctorProfilePropType } from "../../propTypes";
import { filterTypes } from "../../../PracticeBookingPage/actions/filterActions";
import styles from "./doctorMainComponent.css";

const hasAvailableSlots = (appointments) => (
    appointments.morning.length > 0 ||
    appointments.afternoon.length > 0 ||
    appointments.evening.length > 0
  );

const hasAnyAvailableSlot = (allAppointment) =>
  allAppointment.some((appt) => hasAvailableSlots(appt) === true);

const getPartitionedAppointments = (appointments, currentFilter) => {
  switch (currentFilter) {
    case filterTypes.morning:
      return appointments.morning;
    case filterTypes.afternoon:
      return appointments.afternoon;
    case filterTypes.evening:
      return appointments.evening;
    default: return appointments.morning;
  }
};
const getCurrentDay = (appointments) => {
  if (appointments.morning.length) return appointments.morning[0].Time;
  if (appointments.afternoon.length) return appointments.afternoon[0].Time;
  if (appointments.evening.length) return appointments.evening[0].Time;
  return moment().format("dddd");
};

const DoctorMainComponent = ({
  doctor,
  appointments,
  currentFilter,
  setTime,
  togglePopUp,
  toggleDoctorProfile,
  isFetching,
  filterToDate,
}) => (
  <div className={styles.container} key={doctor.PmsUserId}>
    <DoctorProfile toggleDoctorProfile={toggleDoctorProfile} doctor={doctor} />
    <div
      className={styles.appointmentContainer}
    >
      {
        (() => {
          const result = hasAnyAvailableSlot(appointments.AvailableSlots);
          if (isFetching) {
            return <NoSlotsFiller />;
          } else if (result) {
            return map(s => <Slots
              key={s.day}
              isFetching={isFetching}
              appointments={getPartitionedAppointments(s, currentFilter)}
              hasAvailableSlots={hasAvailableSlots(s)}
              currentDay={getCurrentDay(s)}
              currentFilter={currentFilter.toLowerCase()}
              togglePopUp={togglePopUp}
              toggleDoctorProfile={toggleDoctorProfile}
              setTime={setTime}
              doctorId={doctor.PmsUserId}
            />, appointments.AvailableSlots);
          } else if (!appointments.NextAvailableSlot) {
            return (
              <div className={styles.notAvailableContainer}>
                <div className={styles.notAvailable}>
                  Currently not available for online booking.
                </div>
              </div>
            );
          }
          return (<NextAvailableSlot
            nextAvailableDate={appointments.NextAvailableSlot}
            onClickAction={() => filterToDate(appointments.NextAvailableSlot)}
            isDesktop
          />);
        })()
      }
    </div>
  </div>
);

DoctorMainComponent.propTypes = {
  doctor: doctorProfilePropType.isRequired,
  togglePopUp: PropTypes.func.isRequired,
  toggleDoctorProfile: PropTypes.func.isRequired,
  setTime: PropTypes.func.isRequired,
  currentFilter: PropTypes.string.isRequired,
  appointments: doctorProfilePropType.isRequired,
  isFetching: PropTypes.bool,
  filterToDate: PropTypes.func.isRequired,
};

export default DoctorMainComponent;
