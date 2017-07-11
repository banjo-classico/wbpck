import React from "react";
import PropTypes from "prop-types";

import smartPhoneIcon from "../../../../images/smartPhone.png";
import styles from "./accountVerificationCard.css";

const AccountVerificationCard = ({ onClick }) => (
  <div className={styles.container}>
    <div className={styles.header}>Account verification</div>
    <div className={styles.text}>
      <img
        src={smartPhoneIcon}
        className={styles.icon}
        key="icon"
        alt="SMS code"
      />
      
      Verify it now to enable your online appointment booking.
    </div>
    <div className={styles.buttonContainer}>
      <button
        onClick={onClick}
        className={styles.button}
      >
        Verify now
      </button>
    </div>
  </div>
);

AccountVerificationCard.propTypes = {
  onClick: PropTypes.func.isRequired,
};

export default AccountVerificationCard;
