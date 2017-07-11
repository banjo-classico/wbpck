import React from "react";
import PropTypes from "prop-types";

import SmsFailurePage from "../../../SmsFailurePage";
import Close from "../../../../svgs/close.svg";
import styles from "./errorPopUp.css";

const ErrorPopUp = ({ closePopUp }) => (
  <div className={styles.container}>
    <a
      className={styles.button}
      onClick={closePopUp}
    >
      <Close className={styles.icon} />
    </a>
    <SmsFailurePage />
  </div>
);

ErrorPopUp.propTypes = {
  closePopUp: PropTypes.func.isRequired,
};

export default ErrorPopUp;
