import React from "react";
import PropTypes from "prop-types";

import styles from "./notEnrolled.css";
import notEnrolled from "../../../../images/notEnrolled.png";

const NotEnrolled = ({ error, goToBooking }) => {
  const showButton = error ? (error.Resolution === 1 || error.Resolution === 2) : false;
  return (
    <div className={styles.container}>
      <img src={notEnrolled} className={styles.icon} alt="Error" />
      <div className={styles.textContainer}>
        {error && error.Reason && error.Reason}
      </div>
      {showButton ?
        <button className={styles.button} onClick={goToBooking}>
          {error.Resolution === 1 ? "Book with a different practitioner" : "Book a different time"}
        </button> : null
      }
    </div>
  );
};

NotEnrolled.propTypes = {
  goToBooking: PropTypes.func.isRequired,
  error: PropTypes.object.isRequired,
};

export default NotEnrolled;
