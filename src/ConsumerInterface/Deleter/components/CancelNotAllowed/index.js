import React from "react";
import PropTypes from "prop-types";

import CallPractice from "../../../../components/CallPractice";
import hospitalIcon from "../../../../images/notEnrolled.png";
import Arrow from "../../../../svgs/rightarrow2.svg";
import styles from "./cancelNotAllowed.css";

const CancelNotAllowed = ({ data, toggleError }) => (
  <div className={styles.container}>
    <Arrow className={styles.arrow} onClick={toggleError} />
    <div className={styles.heading}>Whoops!</div>
    <div className={styles.innerContainer}>
      <img src={hospitalIcon} alt="hospital" className={styles.hospital} />
      <div>
        {
          `This practice does not allow bookings to be cancelled
          online within ${data.CancellationHour} hours of the appointment time.`
        }
        <br />
        <br />
        {"Please call your practice to cancel this appointment."}
      </div>
      <CallPractice practice={data} />
    </div>
  </div>
);

CancelNotAllowed.propTypes = {
  toggleError: PropTypes.func.isRequired,
  data: PropTypes.shape({
    Name: PropTypes.string,
    Phone: PropTypes.string,
    CancellationHour: PropTypes.number,
  }),
};

export default CancelNotAllowed;
