import React from "react";
import PropTypes from "prop-types";
import moment from "moment";

import styles from "./emptyBookings.css";

const EmptyBookings = ({ goToDate, nextAvailable }) => (
  <div className={styles.container}>
    <div className={styles.text}>No appointments available on this date.</div>
    {nextAvailable ?
      <div className={styles.nextAvailable} onClick={goToDate(nextAvailable)}>
        Next Available:
        <span className={styles.date}>
          {moment(nextAvailable).format("dddd, Do MMMM")}
        </span>
      </div> : null
    }
  </div>
);

EmptyBookings.propTypes = {
  nextAvailable: PropTypes.string,
};

export default EmptyBookings;
