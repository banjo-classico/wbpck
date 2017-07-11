import React from "react";
import PropTypes from "prop-types";
import ReactCSSTransitionGroup from "react-addons-css-transition-group";

// import Arrow from "../../../../svgs/rightarrow2.svg";
import { appointmentPropType } from "../../propTypes";
import styles from "./addToCalendar.css";

const AddToCalendar = ({ appointment, show }) => (
  <ReactCSSTransitionGroup
    component="div"
    transitionName={{
      leave: styles.leave,
      leaveActive: styles.leaveActive,
      enter: styles.enter,
      enterActive: styles.enterActive,
    }}
    transitionLeaveTimeout={300}
    transitionEnterTimeout={300}
  >
    {
    show ?
      <div className={styles.container}>
        <div className={styles.title}>Add to my calendar</div>
        <div className={styles.buttonContainer}>
          <a
            className={styles.button}
            href={appointment.GoogleCalendarUrl}
            target="_blank"
            rel="noopener noreferrer"
          >Google Calendar</a>
          <a
            className={styles.button}
            href={appointment.CalendarUrl}
            target="_blank"
            rel="noopener noreferrer"
          >iCalendar</a>
        </div>
      </div> : null
  }
  </ReactCSSTransitionGroup>
);
// <Arrow className={styles.backArrow} onClick={toggleMenu} />

AddToCalendar.propTypes = {
  appointment: appointmentPropType.isRequired,
  show: PropTypes.bool.isRequired,
  toggleMenu: PropTypes.func.isRequired,
};

export default AddToCalendar;
