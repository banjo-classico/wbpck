import React from "react";

import styles from "./callPractice.css";
import Phone from "../../svgs/phone.svg";
import { PracticeInfoPropType } from "../../vAppointment/PracticeBookingPage/propTypes";

const CallPractice = ({ practice }) => (
  <div className={styles.container}>
    <span className={styles.practiceName}>{practice.Name}</span>
    <span className={styles.phone}>
      {practice.Phone ? practice.Phone : "Phone Number Unavailable"}
    </span>
    <a
      href={`tel:${practice.Phone}`}
      className={styles.phoneLink}
    >
      <Phone className={styles.icon} />
    </a>
  </div>
);

CallPractice.propTypes = {
  practice: PracticeInfoPropType.isRequired,
};

export default CallPractice;
