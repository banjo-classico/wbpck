import React from "react";
import PropTypes from "prop-types";

import NotEnrolled from "../../../GuestBookingErrorPage/components/NotEnrolled";
import CallPractice from "../../../../components/CallPractice";
import Close from "../../../../svgs/close.svg";
import styles from "./enrolledErrorPopUp.css";

const EnrolledErrorPopUp = ({ closePopUp, practice, error }) => (
  <div className={styles.container}>
    <a
      className={styles.button}
      onClick={closePopUp}
    >
      <Close className={styles.icon} />
    </a>
    <div className={styles.innerContainer}>
      <div className={styles.whoops}>Whoops</div>
      <NotEnrolled error={error} />
      <CallPractice practice={practice} />
    </div>
  </div>
);

EnrolledErrorPopUp.propTypes = {
  closePopUp: PropTypes.func.isRequired,
  error: PropTypes.object.isRequired,
  practice: PropTypes.string,
  goToBooking: PropTypes.func.isRequired,
};

export default EnrolledErrorPopUp;
