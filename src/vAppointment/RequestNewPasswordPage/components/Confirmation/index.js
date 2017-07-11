import React from "react";
import PropTypes from "prop-types";

import styles from "./confirmation.css";
import { isDesktop } from "../../../../config";

const Confirmation = ({ goToLogin, email, Icon, text, iconStyles, buttonText = "OK" }) => (
  <div className={styles.container}>
    <div className={styles.innerContainer}>
      <Icon className={iconStyles} />
      {isDesktop() ? <div className={styles.sweetAs}>Sweet as!</div> : null}
      <div className={styles.confirmation}>
        <div>{text}</div>
        {email ? <span className={styles.email}>{email}</span> : null}
      </div>
    </div>
    <a className={styles.button} onClick={goToLogin}>
      <span className={styles.ok}>{buttonText}</span>
    </a>
  </div>
);
Confirmation.propTypes = {
  goToLogin: PropTypes.func.isRequired,
  // this is a react class
  Icon: PropTypes.any.isRequired,
  text: PropTypes.string.isRequired,
  iconStyles: PropTypes.string,
  email: PropTypes.string,
  text2: PropTypes.string,
  buttonText: PropTypes.string,
};

export default Confirmation;
