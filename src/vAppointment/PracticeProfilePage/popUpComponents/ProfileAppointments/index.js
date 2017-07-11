import React from "react";
import PropTypes from "prop-types";
import { map } from "lodash/fp";
import moment from "moment";

import Arrow from "../../../../svgs/leftarrow.svg";
import styles from "./profileAppointments.css";
import { popUpAppointmentsPropType } from "../../propTypes";

const createTimeBlock = (time, onClick) => {
  // this is to align the times vertically.
  const style = moment(time).format("h:mm a").length < 8 ? "singleDigit" : "doubleDigit";
  return (
    <div
      className={styles[style]}
      onClick={onClick}
      key={time}
    >{moment(time).format("h:mm a")}
    </div>
  );
};

const createAppointmentBlock = (
  timeOfDay,
  doctorId,
  appointments,
  setTime,
  setPopUp,
  isFetching
) => {
  const sortedAppointments = appointments && appointments[`${timeOfDay}Appointments`];
  return (
    (sortedAppointments && sortedAppointments.length) ?
      <div className={styles.appointmentContainer}>
        <div className={styles.timeOfDay}>
          <div className={styles.text}>{timeOfDay}</div>
        </div>
        <div className={styles.appointment}>
          {map(
            a => createTimeBlock(a.Time, () => { setTime(doctorId, a.Guid, a.Time); setPopUp(); }),
            sortedAppointments
          )}
        </div>
      </div> :
      <div className={styles.appointmentContainer}>
        <div className={styles.emptyAppointments}>
          <div>{isFetching ? "" : `No ${timeOfDay} appointments available on this day`}</div>
        </div>
      </div>
  );
};

const ProfileAppointments = ({
  setTime,
  setPopUp,
  doctorId,
  appointments,
  selectedDay,
  fetchAppointments,
  isFetching,
}) => (
  <div className={styles.container}>
    <div className={styles.banner}>
      <div className={styles.banner}>
        <div className={styles.arrowContainer} onClick={() => fetchAppointments("back")}>
          <Arrow className={styles.arrowIconLeft} />
        </div>
        {selectedDay.format("dddd, Do MMMM YYYY")}
        <div className={styles.arrowContainer} onClick={() => fetchAppointments("forward")}>
          <Arrow className={styles.arrowIcon} />
        </div>
      </div>
    </div>
    <div className={styles.appointments}>
      {createAppointmentBlock(
        "morning",
        doctorId,
        appointments,
        setTime,
        setPopUp,
        isFetching,
      )}
      {createAppointmentBlock(
        "afternoon",
        doctorId,
        appointments,
        setTime,
        setPopUp,
        isFetching,
      )}
      {createAppointmentBlock(
        "evening",
        doctorId,
        appointments,
        setTime,
        setPopUp,
        isFetching,
      )}
    </div>
  </div>
);
ProfileAppointments.propTypes = {
  setTime: PropTypes.func.isRequired,
  setPopUp: PropTypes.func.isRequired,
  doctorId: PropTypes.string.isRequired,
  appointments: popUpAppointmentsPropType.isRequired,
  selectedDay: PropTypes.instanceOf(moment).isRequired,
  fetchAppointments: PropTypes.func.isRequired,
  isFetching: PropTypes.bool.isRequired,
};

export default ProfileAppointments;
