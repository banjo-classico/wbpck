import React from "react";
import PropTypes from "prop-types";

import styles from "./success.css";
import Close from "../../../../svgs/close.svg";

const SuccessOverlay = ({ onClick }) => (
  <div className={styles.container}>
    <div className={styles.heading}>
      <span className={styles.thanks}>Sweet as!</span>
    </div>
    <div className={styles.main}>
      <div className={styles.textBlock}>
        <span className={styles.text}>
          Thanks for the message! Someone from our team will get back to you very shortly.
        </span>
        <span className={styles.greeting}>Team Vensa</span>
      </div>
      <div className={styles.closeButton} onClick={onClick}>
        <Close className={styles.icon} />
      </div>
    </div>
  </div>
);

SuccessOverlay.propTypes = {
  onClick: PropTypes.func.isRequired,
};

export default SuccessOverlay;
