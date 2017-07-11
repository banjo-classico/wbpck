import React from "react";
import PropTypes from "prop-types";

import styles from "./legalRequirementPreface.css";
import kiwi from "../../../../images/kiwiWithBaby.png";

const LegalRequirementPreface = ({ onClick }) => (
  <div className={styles.container}>
    <img src={kiwi} alt="Guardian Details" className={styles.kiwi} />
    <div className={styles.textContainer}>
      <div className={styles.text}>
        It is a legal requirement that an online booking is made by a parent or guardian.
      </div>
      <div className={styles.text}>
        Please provide us with your details to proceed with the booking.
      </div>
    </div>
    <button className={styles.button} onClick={onClick}>OK</button>
  </div>
);

LegalRequirementPreface.propTypes = {
  onClick: PropTypes.func.isRequired,
};

export default LegalRequirementPreface;
