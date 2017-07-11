import React from "react";
import PropTypes from "prop-types";
import moment from "moment";
import { map, times } from "lodash/fp";

import EmptySlots from "../EmptySlots";
import { slotPropType } from "../../propTypes";
import styles from "./slots.css";

const createSlot = (time, doctorId, appointmentId, setTime, togglePopUp) => (
  <div
    className={styles.slot}
    key={Math.random()}
    onClick={() => { setTime(doctorId, appointmentId, time); togglePopUp(); }}
  >
    {moment(time).format("h:mm a")}
  </div>
);

const createDash = () => (
  <div className={styles.dash} key={Math.random()}>
    <hr />
  </div>
);

const Slots = ({
  togglePopUp,
  toggleDoctorProfile,
  setTime,
  doctorId,
  appointments,
  currentFilter,
  hasAvailableSlots,
  currentDay,
}) => (
  <div className={styles.slotsContainer}>
    {
        appointments.length ?
        map(s => createSlot(
          s.Time,
          doctorId,
          s.Guid,
          setTime,
          togglePopUp))(appointments.slice(0, 3)) :
        <EmptySlots
          hasAvailableSlots={hasAvailableSlots}
          onClick={() => toggleDoctorProfile(doctorId, moment(currentDay), false)}
          currentFilter={currentFilter}
        />
      }
    {
        appointments.length < 3 && appointments.length > 0 ?
        times(() => createDash())(3 - appointments.length) : null
      }
    {
         hasAvailableSlots && appointments.length ?
           <div
             className={styles.seeMore}
             onClick={() => toggleDoctorProfile(doctorId, moment(currentDay), false)}
           >See more</div> : null
      }
  </div>
  );

Slots.propTypes = {
  togglePopUp: PropTypes.func.isRequired,
  toggleDoctorProfile: PropTypes.func.isRequired,
  setTime: PropTypes.func.isRequired,
  doctorId: PropTypes.string.isRequired,
  appointments: PropTypes.arrayOf(slotPropType).isRequired,
  currentFilter: PropTypes.string.isRequired,
  hasAvailableSlots: PropTypes.bool.isRequired,
  currentDay: PropTypes.string.isRequired,
};

export default Slots;
