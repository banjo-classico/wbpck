import React from "react";
import PropTypes from "prop-types";
import moment from "moment";

import styles from "./nextAvailableSlot.css";

const NextAvailableSlot = ({ nextAvailableDate, onClickAction }) => (
  <div className={styles.container}>
    <div
      className={styles.noAppointments}
    >
      Next Available:&nbsp;
      <a
        className={styles.link}
        onClick={onClickAction}
      >{moment(nextAvailableDate).format("dddd, Do MMM")}</a>
    </div>
  </div>
);

NextAvailableSlot.propTypes = {
  nextAvailableDate: PropTypes.string.isRequired,
  onClickAction: PropTypes.func.isRequired,
};

export default NextAvailableSlot;
